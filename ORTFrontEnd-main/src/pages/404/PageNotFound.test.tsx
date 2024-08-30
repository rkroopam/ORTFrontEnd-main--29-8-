import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import PageNotFound from "../404";

console.error = jest.fn();

describe("PageNotFound", () => {
  test("renders the 404 heading", () => {
    render(<PageNotFound />);
    const headingElement = screen.getByText(/404/i);
    expect(headingElement).toBeInTheDocument();
  });

  test("renders the descriptive text", () => {
    render(<PageNotFound />);
    const descriptionElement = screen.getByText(/Something's missing./i);
    expect(descriptionElement).toBeInTheDocument();
  });

  test("renders the additional text", () => {
    render(<PageNotFound />);
    const additionalTextElement = screen.getByText(
      /Sorry, we can't find that page. You'll find lots to explore on the home page./i
    );
    expect(additionalTextElement).toBeInTheDocument();
  });

  test('renders the "Back to Homepage" link', () => {
    render(<PageNotFound />);
    const linkElement = screen.getByRole("link", { name: /Back to Homepage/i });
    expect(linkElement).toBeInTheDocument();
  });

  test("renders button with correct styles", () => {
    render(<PageNotFound />);
    const linkElement = screen.getByRole("link", { name: /Back to Homepage/i });

    // Check if button has MUI-specific classes
    expect(linkElement).toHaveClass("MuiButton-containedPrimary");
    expect(linkElement).toHaveStyle({ backgroundColor: "#primary-600" }); // Update with actual value

    // Additional assertions for appearance can be added
  });
});
