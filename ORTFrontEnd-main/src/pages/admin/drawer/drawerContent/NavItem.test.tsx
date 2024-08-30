import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { BrowserRouter } from "react-router-dom";
import NavItem from "./NavItem";
import { combineReducers } from "redux";
import { Reducer } from "redux";
console.error = jest.fn();
// Create a mock reducer for the store
const mockReducer: Reducer<any> = (state = { menu: { drawerOpen: true, openItem: [] } }, action) => {
  switch (action.type) {
    case 'ACTIVE_ITEM':
      // return { ...state, menu: { ...state.menu, openItem: action.payload.openItem } };
    default:
      return state;
  }
};

const store = createStore(
  combineReducers({ menu: mockReducer })
);

describe("NavItem Component", () => {
  const item = {
    id: "1",
    url: "/test",
    title: "Test Item",
    icon: () => <span>Icon</span>,
    chip: {
      color: "primary",
      variant: "outlined",
      size: "small",
      label: "New",
      avatar: "N"
    }
  };

  test("renders with given props", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavItem item={item} level={1} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText("Test Item")).toBeInTheDocument();
    expect(screen.getByText("Icon")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  test("handles click event and dispatches action", () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <NavItem item={item} level={1} />
        </BrowserRouter>
      </Provider>
    );

    // fireEvent.click(container.querySelector('button'));

    expect(store.getState().menu.openItem).toEqual([item.id]);
  });

  test("renders as external link", () => {
    const externalItem = { ...item, external: true, url: "https://example.com" };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavItem item={externalItem} level={1} />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://example.com');
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  test("conditionally renders icons and chips based on props", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <NavItem item={item} level={1} />
        </BrowserRouter>
      </Provider>
    );

    // Check if icon is rendered
    expect(screen.getByText("Icon")).toBeInTheDocument();

    // Check if chip is rendered
    expect(screen.getByText("New")).toBeInTheDocument();
  });

  test("applies styles based on selected state", () => {
    // Mocking selected state
    const storeWithSelected = createStore(
      combineReducers({ menu: (state = { drawerOpen: true, openItem: ["1"] }) => state })
    );

    render(
      <Provider store={storeWithSelected}>
        <BrowserRouter>
          <NavItem item={item} level={1} />
        </BrowserRouter>
      </Provider>
    );

    // Check if the selected styles are applied
    expect(screen.getByText("Test Item")).toHaveClass('Mui-selected');
  });
});
