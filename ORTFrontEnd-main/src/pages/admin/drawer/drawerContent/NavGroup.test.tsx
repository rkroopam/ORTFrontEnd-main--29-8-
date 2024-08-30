import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import NavGroup from "./NavGroup";
import { combineReducers } from "redux";
import { BrowserRouter } from "react-router-dom";
import { Reducer } from "redux";
console.error = jest.fn();
// Create a mock reducer for the store
const mockReducer: Reducer<any> = (state = { menu: { drawerOpen: true } }, action) => state;

const store = createStore(
  combineReducers({ menu: mockReducer })
);

describe("NavGroup Component", () => {
  test("renders with drawerOpen true", () => {
    const item = {
      title: "Test Title",
      children: [
        { id: "1", type: "item", name: "NavItem 1" },
        { id: "2", type: "item", name: "NavItem 2" },
      ],
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavGroup item={item} />
        </BrowserRouter>
      </Provider>
    );

    // Check if title is rendered
    expect(screen.getByText("Test Title")).toBeInTheDocument();

    // Check if NavItem components are rendered
    expect(screen.getByText("NavItem 1")).toBeInTheDocument();
    expect(screen.getByText("NavItem 2")).toBeInTheDocument();
  });

  test("renders with drawerOpen false", () => {
    // Modify the store to have drawerOpen false
    const storeWithDrawerClosed = createStore(
      combineReducers({
        menu: (state = { drawerOpen: false }) => state,
      })
    );

    const item = {
      title: "Test Title",
      children: [
        { id: "1", type: "item", name: "NavItem 1" },
        { id: "2", type: "item", name: "NavItem 2" },
      ],
    };

    render(
      <Provider store={storeWithDrawerClosed}>
        <BrowserRouter>
          <NavGroup item={item} />
        </BrowserRouter>
      </Provider>
    );

    // Check if title is not rendered
    expect(screen.queryByText("Test Title")).toBeNull();

    // Check if NavItem components are rendered
    expect(screen.getByText("NavItem 1")).toBeInTheDocument();
    expect(screen.getByText("NavItem 2")).toBeInTheDocument();
  });

  test("shows error message for unknown child type", () => {
    const item = {
      title: "Test Title",
      children: [
        { id: "1", type: "unknown", name: "Unknown Item" },
      ],
    };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavGroup item={item} />
        </BrowserRouter>
      </Provider>
    );

    // Check if error message is rendered
    expect(screen.getByText("check child type")).toBeInTheDocument();
  });
});
