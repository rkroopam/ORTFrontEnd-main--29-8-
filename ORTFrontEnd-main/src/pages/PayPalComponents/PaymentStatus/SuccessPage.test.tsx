import React from "react";
import { render, screen } from "@testing-library/react";
import SuccessPage from "./SuccessPage"; // Adjust the import path as needed
import "@testing-library/jest-dom";
console.error = jest.fn();
describe("SuccessPage Component", () => {
  test("renders without crashing", () => {
    render(<SuccessPage />);
  });

  test("displays the correct icon", () => {
    render(<SuccessPage />);
    const iconElement = screen.getByTestId("CheckCircleIcon");
    expect(iconElement).toBeInTheDocument();
    expect(iconElement).toHaveClass("MuiSvgIcon-root");
  });

  test("displays the correct title", () => {
    render(<SuccessPage />);
    const titleElement = screen.getByText(/Payment Successful/i);
    expect(titleElement).toBeInTheDocument();
    expect(titleElement.tagName).toBe("H4");
  });

  test("displays the correct message", () => {
    render(<SuccessPage />);
    const messageElement = screen.getByText(
      /Your payment has been processed successfully. Thank you!/i
    );
    expect(messageElement).toBeInTheDocument();
    expect(messageElement.tagName).toBe("P");
  });
});
