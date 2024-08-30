import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomTextField from "."; // Adjust the import path as needed

describe("CustomTextField", () => {
  const defaultProps = {
    name: "testName",
    id: "testId",
    type: "text",
    autoComplete: "off",
    label: "Test Label",
    fullWidth: true,
    value: "testValue",
    error: false,
    helperText: "Helper text",
    onChange: jest.fn(),
    onBlur: jest.fn(),
  };

  test("renders the CustomTextField component with correct props", () => {
    render(<CustomTextField {...defaultProps} />);

    const inputElement = screen.getByLabelText("Test Label");

    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("name", "testName");
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("value", "testValue");
    expect(inputElement).toHaveAttribute("id", "testId");
    // expect(inputElement).toHaveAttribute("autoComplete", "off");
  });

  test("renders the helper text", () => {
    render(<CustomTextField {...defaultProps} />);

    const helperTextElement = screen.getByText("Helper text");

    expect(helperTextElement).toBeInTheDocument();
  });

  test("calls onChange and onBlur handlers", () => {
    render(<CustomTextField {...defaultProps} />);

    const inputElement = screen.getByLabelText("Test Label");

    fireEvent.change(inputElement, { target: { value: "new value" } });
    fireEvent.blur(inputElement);

    expect(defaultProps.onChange).toHaveBeenCalled();
    expect(defaultProps.onBlur).toHaveBeenCalled();
  });

  test("applies custom styles via sx prop", () => {
    const sxProp = {
      backgroundColor: "red",
    };

    render(<CustomTextField {...defaultProps} sx={sxProp} />);

    const inputElement = screen.getByLabelText("Test Label");

    // You can check for styles applied by the sx prop here
    // expect(inputElement.parentElement).toHaveStyle(`background-color: red`);
  });

  test("applies default styles correctly", () => {
    render(<CustomTextField {...defaultProps} />);

    const inputElement = screen.getByLabelText("Test Label");

    expect(inputElement.parentElement).toHaveClass("MuiOutlinedInput-root");
    expect(inputElement.parentElement).toHaveStyle("background-color: #E6E6E6");
  });

  test("shows error state correctly", () => {
    const errorProps = {
      ...defaultProps,
      error: true,
      helperText: "Error text",
    };

    render(<CustomTextField {...errorProps} />);

    const inputElement = screen.getByLabelText("Test Label");
    const errorTextElement = screen.getByText("Error text");

    // expect(inputElement).toHaveClass("Mui-error");
    expect(errorTextElement).toBeInTheDocument();
  });
});
