import React from "react";
import { render, screen } from "@testing-library/react";
import FailedPage from "./FailedPage"; // Adjust the import path as needed
import "@testing-library/jest-dom";
console.error = jest.fn();
describe("FailedPage Component", () => {
  test("renders without crashing", () => {
    render(<FailedPage />);
  });

  test("displays the correct icon", () => {
    render(<FailedPage />);
    const iconElement = screen.getByTestId("CancelIcon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass("MuiSvgIcon-root");
  });

  test("displays the correct title", () => {
    render(<FailedPage />);
    const titleElement = screen.getByText(/Payment Failed/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H4");
  });

  test("displays the correct message", () => {
    render(<FailedPage />);
    const messageElement = screen.getByText(
      /Your payment was Failed. If you have any questions, please contact us./i
    );
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.tagName).toBe("P");
  });
});
