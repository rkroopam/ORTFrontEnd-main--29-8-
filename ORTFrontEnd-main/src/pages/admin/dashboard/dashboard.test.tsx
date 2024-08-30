import React from "react";
import { render, screen } from "@testing-library/react";
import Dashboard from "../dashboard";
import { UserType } from "../../../constants";
import { usePermissions } from "../../../utils/permission";

console.error = jest.fn();

// Mock the `usePermissions` hook
jest.mock("../../../utils/permission", () => ({
  usePermissions: jest.fn(),
}));

// Mock the components used in the Dashboard
jest.mock("../../../components/MyAssignment", () => () => (
  <div>My Assignments Component</div>
));
jest.mock("../topStats", () => () => <div>Top Stats Component</div>);

describe("Dashboard Component", () => {
  test("renders TopStats and MyAssignments components when the user is a student", () => {
    (usePermissions as jest.Mock).mockReturnValue({
      hasPermission: (userTypes: Array<typeof UserType[keyof typeof UserType]>) =>
        userTypes.includes(UserType.student),
    });

    render(<Dashboard />);

    // Check if TopStats component is rendered
    expect(screen.getByText("Top Stats Component")).toBeInTheDocument();

    // Check if MyAssignments component is rendered
    expect(screen.getByText("My Assignments Component")).toBeInTheDocument();
  });

  test("renders TopStats component but not MyAssignments when the user is not a student", () => {
    (usePermissions as jest.Mock).mockReturnValue({
      hasPermission: (userTypes: Array<typeof UserType[keyof typeof UserType]>) =>
        !userTypes.includes(UserType.student),
    });

    render(<Dashboard />);

    // Check if TopStats component is rendered
    expect(screen.getByText("Top Stats Component")).toBeInTheDocument();

    // Check if MyAssignments component is NOT rendered
    expect(screen.queryByText("My Assignments Component")).toBeNull();
  });
});
