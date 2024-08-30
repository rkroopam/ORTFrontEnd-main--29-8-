import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RegularTestPage from "./RegularTestPage";
import { BrowserRouter as Router, useNavigate } from "react-router-dom";
console.error = jest.fn();
// Mock useNavigate before rendering the component
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("RegularTestPage", () => {
  it("renders the component correctly", () => {
    render(
      <Router>
        <RegularTestPage />
      </Router>
    );

    // Check if the heading is displayed
    expect(screen.getByText("You're ready to start the test!")).toBeInTheDocument();

    // Check if the instructions are displayed
    expect(
      screen.getByText(
        "The regular test consists of several questions designed to assess your reading skills."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Please follow the instructions and answer each question to the best of your ability."
      )
    ).toBeInTheDocument();
  });

  it("calls handleStartTest when the 'Take the test' button is clicked", () => {
    const navigateMock = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);

    render(
      <Router>
        <RegularTestPage />
      </Router>
    );

    // Simulate clicking the "Take the test" button
    const button = screen.getByText("Take the test");
    fireEvent.click(button);

    // Check if navigate was called with the correct route
    expect(navigateMock).toHaveBeenCalledWith("/test-level-page");
  });
});
