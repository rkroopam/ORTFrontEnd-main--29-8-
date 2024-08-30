import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestResultPage from "../TestResultPage";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("TestResultPage", () => {
  it("renders the component correctly and displays the score", () => {
    render(
      <Router>
        <TestResultPage />
      </Router>
    );

    // Check if the score is displayed
    expect(screen.getByText("Alex's Your score is 76")).toBeInTheDocument();
  });

  // it("renders the risk indicator correctly based on score", () => {
  //   render(
  //     <Router>
  //       <TestResultPage />
  //     </Router>
  //   );

  //   // Check if the arrow is positioned correctly
  //   const arrow = screen.getByText("▼");
  //   expect(arrow).toBeInTheDocument();
  //   expect(arrow).toHaveStyle("left: 76%");
  // });

  it("displays the correct risk message based on score", () => {
    render(
      <Router>
        <TestResultPage />
      </Router>
    );

    // Check if the risk message is displayed
    expect(
      screen.getByText("This score indicates that you are at high risk.")
    ).toBeInTheDocument();
  });

  // it("calls goToPaymentPage when the 'Next' button is clicked", () => {
  //   const navigateMock = jest.fn();
  //   jest.mock("react-router-dom", () => ({
  //     ...jest.requireActual("react-router-dom"),
  //     useNavigate: () => navigateMock,
  //   }));

  //   render(
  //     <Router>
  //       <TestResultPage />
  //     </Router>
  //   );

  //   // Simulate clicking the "Next" button
  //   const button = screen.getByText("Next");
  //   fireEvent.click(button);

  //   // Check if navigate was called
  //   expect(navigateMock).toHaveBeenCalledWith("/payment-page");
  // });
});
