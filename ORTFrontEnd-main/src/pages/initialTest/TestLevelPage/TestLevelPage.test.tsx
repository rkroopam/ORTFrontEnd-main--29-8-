import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TestLevelPage from "../TestLevelPage";
import { BrowserRouter as Router } from "react-router-dom";
console.error = jest.fn();
// Mock the utils data and components
jest.mock("../../../utils/data", () => ({
  testLevels: [
    {
      level: "Level 1",
      questions: [
        { id: 1, text: "Question 1.1" },
        { id: 2, text: "Question 1.2" },
      ],
    },
    {
      level: "Level 2",
      questions: [
        { id: 1, text: "Question 2.1" },
        { id: 2, text: "Question 2.2" },
      ],
    },
  ],
}));

jest.mock("./questions", () => ({ question, onNext, onPrevious }:any) => (
  <div>
    <div>{question.text}</div>
    <button onClick={onPrevious}>Previous</button>
    <button onClick={onNext}>Next</button>
  </div>
));

jest.mock("../../../common/CustomDialog", () => ({ open, onClose, content }:any) =>
  open ? <div>{content}</div> : null
);

jest.mock("../GreatJobPage", () => ({ onClick, isFinalLevel }:any) => (
  <div>Great Job Page</div>
));

describe("TestLevelPage", () => {
  it("renders the test levels correctly", () => {
    render(
      <Router>
        <TestLevelPage />
      </Router>
    );

    expect(screen.getByText("Level 1")).toBeInTheDocument();
    expect(screen.getByText("Level 2")).toBeInTheDocument();
  });

  it("allows selecting a test level", () => {
    render(
      <Router>
        <TestLevelPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Level 1"));
    expect(screen.getByText("Question 1.1")).toBeInTheDocument();
  });

  it("navigates to the next question", () => {
    render(
      <Router>
        <TestLevelPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Level 1"));
    fireEvent.click(screen.getByText("Next"));
    expect(screen.getByText("Question 1.2")).toBeInTheDocument();
  });

  it("navigates to the previous question", () => {
    render(
      <Router>
        <TestLevelPage />
      </Router>
    );

    fireEvent.click(screen.getByText("Level 1"));
    fireEvent.click(screen.getByText("Next"));
    fireEvent.click(screen.getByText("Previous"));
    expect(screen.getByText("Question 1.1")).toBeInTheDocument();
  });

  // it("opens the stop test dialog", () => {
  //   render(
  //     <Router>
  //       <TestLevelPage />
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByText("Level 1"));
  //   fireEvent.click(screen.getByText("Question 1.1"));
  //   fireEvent.click(screen.getByText(/Yes, Stop this test/i)); 
  //   expect(screen.getByText("Stop This Test?")).toBeInTheDocument();
  // });

  // it("opens the Great Job dialog after completing all levels", () => {
  //   render(
  //     <Router>
  //       <TestLevelPage />
  //     </Router>
  //   );

  //   fireEvent.click(screen.getByText("Level 1"));
  //   fireEvent.click(screen.getByText("Next"));
  //   fireEvent.click(screen.getByText("Next"));
  //   fireEvent.click(screen.getByText("Next")); 
  //   expect(screen.getByText("Great Job Page")).toBeInTheDocument();
  // });
});
