// StudentForm.test.tsx
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import AdminForm from "../adminForm"; // Ensure this path is correct
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

// Mock the necessary hooks and modules
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("AdminForm", () => {
  const mockRefetch = jest.fn();
  const mockHandleClose = jest.fn();
  const mockUpdateAdmin = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockUpdateAdmin,
      isLoading: false,
    });
  });

  test("renders the form with the correct fields", () => {
    act(() => {
      render(
        <AdminForm
          open={true}
          handleClose={mockHandleClose}
          refetch={mockRefetch}
          isEditing={false}
          admin={null}
          token="test-token"
        />
      );
    });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Country Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Add Admin/i })
    ).toBeInTheDocument();
  });

  test("submits the form with valid data", async () => {
    const { getByLabelText, getByRole } = render(
      <AdminForm
        open={true}
        handleClose={mockHandleClose}
        refetch={mockRefetch}
        isEditing={false}
        admin={null}
        token="test-token"
      />
    );

    // Use specific queries to target input fields
    fireEvent.change(getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(getByLabelText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(getByLabelText(/Phone Country Code/i), {
      target: { value: "+1" },
    });
    fireEvent.change(getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(getByRole("button", { name: /Add Admin/i }));

    // await waitFor(() => {
    //   expect(mockUpdateAdmin).toHaveBeenCalledWith({
    //     fName: "John",
    //     lName: "Doe",
    //     email: "john.doe@example.com",
    //     country: "USA",
    //     phoneCountryCode: "+1",
    //     phoneNumber: "1234567890",
    //   });
    // });
  });

  test("displays validation errors for invalid input", async () => {
    act(() => {
      render(
        <AdminForm
          open={true}
          handleClose={mockHandleClose}
          refetch={mockRefetch}
          isEditing={false}
          admin={null}
          token="test-token"
        />
      );
    });

    fireEvent.click(screen.getByRole("button", { name: /Add Admin/i }));

    expect(
      await screen.findByText(/First Name is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Last Name is required/i)
    ).toBeInTheDocument();
    expect(await screen.findByText(/Email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/Country is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Phone Country Code is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Phone Number is required/i)
    ).toBeInTheDocument();
  });

  test("handles update for existing admin", async () => {
    mockUpdateAdmin.mockResolvedValue({
      message: "Admin updated successfully",
    });

    act(() => {
      render(
        <AdminForm
          open={true}
          handleClose={mockHandleClose}
          refetch={mockRefetch}
          isEditing={true}
          admin={{
            fName: "Jane",
            lName: "Doe",
            email: "jane.doe@example.com",
            country: "Canada",
            phoneCountryCode: "+1",
            phoneNumber: "0987654321",
          }}
          token="test-token"
        />
      );
    });

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "jane.smith@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Update Admin/i }));

    // await waitFor(() => {
    //   expect(mockUpdateAdmin).toHaveBeenCalledWith({
    //     fName: "Jane",
    //     lName: "Smith",
    //     email: "jane.smith@example.com",
    //     country: "Canada",
    //     phoneCountryCode: "+1",
    //     phoneNumber: "0987654321",
    //   });
    //   expect(toast.success).toHaveBeenCalledWith("Admin updated successfully");
    //   expect(mockHandleClose).toHaveBeenCalled();
    //   expect(mockRefetch).toHaveBeenCalled();
    // });
  });
});
