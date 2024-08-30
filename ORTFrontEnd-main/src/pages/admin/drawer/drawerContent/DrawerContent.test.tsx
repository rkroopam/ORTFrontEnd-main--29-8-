import React from "react";
import { render, screen } from "@testing-library/react";
import DrawerContent from "./index";
import MenuItems from "../menu-items";
console.error = jest.fn();
// Mock the MenuItems function
jest.mock("../menu-items", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock the NavGroup component
jest.mock("./NavGroup", () => ({ item }: { item: any }) => (
  <div data-testid="nav-group">{item.name}</div>
));

describe("DrawerContent", () => {
  it('renders NavGroup components for items with type "group"', () => {
    // Mock MenuItems to return items with type 'group'
    (MenuItems as jest.Mock).mockReturnValue({
      items: [
        { id: 1, type: "group", name: "Group 1" },
        { id: 2, type: "group", name: "Group 2" },
      ],
    });

    render(<DrawerContent />);

    // Assert that NavGroup components are rendered
    const navGroups = screen.getAllByTestId("nav-group");
    expect(navGroups).toHaveLength(2);
    expect(navGroups[0]).toHaveTextContent("Group 1");
    expect(navGroups[1]).toHaveTextContent("Group 2");
  });

  it('renders error message for items with non-"group" type', () => {
    // Mock MenuItems to return items with a non-'group' type
    (MenuItems as jest.Mock).mockReturnValue({
      items: [
        { id: 1, type: "group", name: "Group 1" },
        { id: 2, type: "other", name: "Not a Group" },
      ],
    });

    render(<DrawerContent />);

    // Assert that the NavGroup component is rendered for the 'group' type item
    const navGroups = screen.getAllByTestId("nav-group");
    expect(navGroups).toHaveLength(1);
    expect(navGroups[0]).toHaveTextContent("Group 1");

    // Assert that the error message is rendered for the non-'group' type item
    const errorMessage = screen.getByText("check type");
    expect(errorMessage).toBeInTheDocument();
  });
});
