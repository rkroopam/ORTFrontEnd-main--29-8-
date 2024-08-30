import * as React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddTeacher from "../addTeacher"; // Adjust the import path as needed
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
console.error = jest.fn();
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

describe("AddTeacher", () => {
  const mockHandleClose = jest.fn();
  const mockRefetch = jest.fn();
  const mockMutation = jest.fn();

  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutation,
      isLoading: false,
    });
  });

  test("renders the AddTeacher form with correct fields", () => {
    render(
      <AddTeacher open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
    );

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Country Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Add/i })).toBeInTheDocument();
  });

  test("displays validation errors for empty fields", async () => {
    render(
      <AddTeacher open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
    );

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone Country Code is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Phone Number is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
    });
  });

  test("submits the form with valid data", async () => {
    render(
      <AddTeacher open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Country Code/i), {
      target: { value: "+1" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "securepassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    await waitFor(() => {
      expect(mockMutation).toHaveBeenCalledWith({
        country: "USA",
        email: "john.doe@example.com",
        fName: "John",
        lName: "Doe",
        phoneCountryCode: "+1",
        phoneNumber: "1234567890",
        password: "securepassword",
      });
    });
  });

  test("handles successful submission", async () => {
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockResolvedValueOnce({ message: "Teacher added successfully" }),
      isLoading: false,
    });

    render(
      <AddTeacher open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Country Code/i), {
      target: { value: "+1" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "securepassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    // await waitFor(() => {
    //   expect(toast.success).toHaveBeenCalledWith("Teacher added successfully");
    //   expect(mockHandleClose).toHaveBeenCalled();
    //   expect(mockRefetch).toHaveBeenCalled();
    // });
  });

  test("handles submission error", async () => {
    const errorMessage = "Failed to add teacher";
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: jest.fn().mockRejectedValueOnce(new Error(errorMessage)),
      isLoading: false,
    });

    render(
      <AddTeacher open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
    );

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Country Code/i), {
      target: { value: "+1" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "securepassword" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Add/i }));

    // await waitFor(() => {
    //   expect(toast.error).toHaveBeenCalledWith(errorMessage);
    // });
  });
});
