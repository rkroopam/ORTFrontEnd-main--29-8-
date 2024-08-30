import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomButton from "./index";

console.error = jest.fn();

describe("CustomButton", () => {
  //TC-001
  test("renders the button with the correct label", () => {
    render(<CustomButton>Click Me</CustomButton>);
    const button = screen.getByRole("button", { name: /Click Me/i });
    expect(button).toBeInTheDocument();
  });

  //TC-002
  test("renders the button with full width when the fullWidth prop is true", () => {
    render(<CustomButton fullWidth>Full Width Button</CustomButton>);
    const button = screen.getByRole("button", { name: /Full Width Button/i });
    expect(button).toHaveStyle("width: 100%");
  });

  //TC-003
  test("calls the onClick handler when the button is clicked", () => {
    const handleClick = jest.fn();
    render(<CustomButton onClick={handleClick}>Clickable Button</CustomButton>);
    const button = screen.getByRole("button", { name: /Clickable Button/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  //TC-004
  test("renders the button with the correct variant", () => {
    render(<CustomButton variant="contained">Contained Button</CustomButton>);
    const button = screen.getByRole("button", { name: /Contained Button/i });
    expect(button).toHaveClass("MuiButton-contained");
  });

  //TC-005
  test("renders the button as disabled when the disabled prop is true", () => {
    render(<CustomButton disabled>Disabled Button</CustomButton>);
    const button = screen.getByRole("button", { name: /Disabled Button/i });
    expect(button).toBeDisabled();
  });

  //TC-006
  test("renders the button with additional styles passed as props", () => {
    render(
      <CustomButton style={{ backgroundColor: "red" }}>
        Styled Button
      </CustomButton>
    );
    const button = screen.getByRole("button", { name: /Styled Button/i });
    expect(button).toHaveStyle("background-color: red");
  });

  //TC-007
  test("renders the button with the correct type attribute", () => {
    render(<CustomButton type="submit">Submit Button</CustomButton>);
    const button = screen.getByRole("button", { name: /Submit Button/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  //TC-008
  test("does not call the onClick handler when the button is disabled", () => {
    const handleClick = jest.fn();
    render(
      <CustomButton disabled onClick={handleClick}>
        Disabled Button
      </CustomButton>
    );
    const button = screen.getByRole("button", { name: /Disabled Button/i });
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  //TC-009
  test("renders the button with the startIcon", () => {
    render(
      <CustomButton startIcon={<span data-testid="start-icon" />}>
        Button with Icon
      </CustomButton>
    );
    const startIcon = screen.getByTestId("start-icon");
    expect(startIcon).toBeInTheDocument();
  });

  //TC-010
  test("renders the button with the endIcon", () => {
    render(
      <CustomButton endIcon={<span data-testid="end-icon" />}>
        Button with Icon
      </CustomButton>
    );
    const endIcon = screen.getByTestId("end-icon");
    expect(endIcon).toBeInTheDocument();
  });

  //TC-011
  test("renders the button with custom className", () => {
    render(
      <CustomButton className="custom-class">Button with Class</CustomButton>
    );
    const button = screen.getByRole("button", { name: /Button with Class/i });
    expect(button).toHaveClass("custom-class");
  });

  //TC-012
  test("renders the button with the correct size", () => {
    render(<CustomButton size="large">Large Button</CustomButton>);
    const button = screen.getByRole("button", { name: /Large Button/i });
    expect(button).toHaveClass("MuiButton-sizeLarge");
  });
});
