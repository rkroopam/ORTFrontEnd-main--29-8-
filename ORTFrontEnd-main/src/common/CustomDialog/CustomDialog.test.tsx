import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import CustomDialog from "../CustomDialog";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const theme = createTheme();

describe("CustomDialog", () => {
  //TC-013
  test("renders dialog with title, content, and buttons", () => {
    const handleClose = jest.fn();
    const handleConfirm = jest.fn();

    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <CustomDialog
            open={true}
            onClose={handleClose}
            title="Dialog Title"
            onConfirm={handleConfirm}
          >
            <p>Dialog Content</p>
          </CustomDialog>
        </ThemeProvider>
      );
    });

    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);

    const confirmButton = screen.getByRole("button", { name: /Confirm/i });
    expect(confirmButton).toBeInTheDocument();
    fireEvent.click(confirmButton);
    expect(handleConfirm).toHaveBeenCalledTimes(1);
  });

  //TC-014
  test("does not render dialog when open is false", () => {
    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <CustomDialog open={false} onClose={() => {}} title="Hidden Dialog">
            <p>Should not see this</p>
          </CustomDialog>
        </ThemeProvider>
      );
    });

    expect(screen.queryByText("Hidden Dialog")).not.toBeInTheDocument();
    expect(screen.queryByText("Should not see this")).not.toBeInTheDocument();
  });

  //TC-015
  test("renders dialog with a custom close button label", () => {
    const handleClose = jest.fn();

    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <CustomDialog
            open={true}
            onClose={handleClose}
            title="Dialog with Custom Close"
            closeLabel="Dismiss"
          >
            <p>Dialog Content</p>
          </CustomDialog>
        </ThemeProvider>
      );
    });

    const dismissButton = screen.getByRole("button", { name: "Cancel" });
    expect(dismissButton).toBeInTheDocument();
    fireEvent.click(dismissButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  //TC-016
  test("renders dialog without a confirm button when onConfirm is not provided", () => {
    const handleClose = jest.fn();

    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <CustomDialog
            open={true}
            onClose={handleClose}
            title="Dialog without Confirm"
          >
            <p>Dialog Content</p>
          </CustomDialog>
        </ThemeProvider>
      );
    });

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    expect(cancelButton).toBeInTheDocument();

    expect(
      screen.queryByRole("button", { name: "onConfirm" })
    ).not.toBeInTheDocument();
  });

  //TC-017
  test("renders dialog with custom content", () => {
    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <CustomDialog
            open={true}
            onClose={() => {}}
            title="Dialog with Custom Content"
          >
            <div>
              <p>First line of content</p>
              <p>Second line of content</p>
            </div>
          </CustomDialog>
        </ThemeProvider>
      );
    });

    expect(screen.getByText("First line of content")).toBeInTheDocument();
    expect(screen.getByText("Second line of content")).toBeInTheDocument();
  });

  //TC-018
  test("closes dialog when close button is clicked", () => {
    const handleClose = jest.fn();

    act(() => {
      render(
        <ThemeProvider theme={theme}>
          <CustomDialog
            open={true}
            onClose={handleClose}
            title="Dialog to be Closed"
          >
            <p>Dialog Content</p>
          </CustomDialog>
        </ThemeProvider>
      );
    });

    const cancelButton = screen.getByRole("button", { name: /Cancel/i });
    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
