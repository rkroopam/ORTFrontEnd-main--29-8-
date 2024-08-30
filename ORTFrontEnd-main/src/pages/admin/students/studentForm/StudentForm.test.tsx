// StudentForm.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";
import StudentForm from "./index";
console.error = jest.fn();
// Mock the API services
jest.mock("../../../../api/services/user", () => ({
  create_user: jest.fn(),
  update_user: jest.fn(),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const queryClient = new QueryClient();

const setup = (props: any) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <StudentForm {...props} />
    </QueryClientProvider>
  );
};

describe("StudentForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders form fields and buttons correctly", () => {
    setup({
      open: true,
      handleClose: jest.fn(),
      refetch: jest.fn(),
      isEditing: false,
      student: null,
    });

    expect(screen.getByLabelText(/First Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Last Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Country")).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Country Code/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
    expect(screen.getByText(/Add/i)).toBeInTheDocument();
    expect(screen.getByText(/Cancel/i)).toBeInTheDocument();
  });

  it("displays errors when fields are touched but left empty", async () => {
    setup({
      open: true,
      handleClose: jest.fn(),
      refetch: jest.fn(),
      isEditing: false,
      student: null,
    });

    fireEvent.click(screen.getByText(/Add/i));

    await waitFor(() => {
      expect(screen.getByText(/First Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Last Name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Password is required/i)).toBeInTheDocument();
      expect(screen.getByText(/Country is required/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Phone Country Code is required/i)
      ).toBeInTheDocument();
      expect(screen.getByText(/Phone Number is required/i)).toBeInTheDocument();
    });
  });

  it("calls create_user on form submit when not editing", async () => {
    const createUserMock = require("../../../../api/services/user").create_user;
    createUserMock.mockResolvedValue({ message: "Student added successfully" });

    setup({
      open: true,
      handleClose: jest.fn(),
      refetch: jest.fn(),
      isEditing: false,
      student: null,
    });

    fireEvent.change(screen.getByLabelText(/First Name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/Last Name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Email Address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Country Code/i), {
      target: { value: "+91" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "1234567890" },
    });

    fireEvent.click(screen.getByText("Add"));

    await waitFor(() => {
      expect(createUserMock).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("Student added successfully");
    });
  });

  it("calls update_user on form submit when editing", async () => {
    const updateUserMock = require("../../../../api/services/user").update_user;
    updateUserMock.mockResolvedValue({
      message: "Student updated successfully",
    });

    setup({
      open: true,
      handleClose: jest.fn(),
      refetch: jest.fn(),
      isEditing: true,
      student: {
        _id: "123",
        fName: "Jane",
        lName: "Doe",
        email: "john.doe@example.com",
        password: "password123",
        country: "USA",
        phoneCountryCode: "+91",
        phoneNumber: "1234567890",
      },
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
    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "newpassword123" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "Canada" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Country Code/i), {
      target: { value: "+1" },
    });
    fireEvent.change(screen.getByLabelText(/Phone Number/i), {
      target: { value: "9876543210" },
    });

    fireEvent.click(screen.getByText("Update"));

    await waitFor(() => {
      expect(updateUserMock).toHaveBeenCalledWith(
        {
          fName: "Jane",
          lName: "Smith",
          email: "jane.smith@example.com",
          password: "newpassword123",
          country: "Canada",
          phoneCountryCode: "+1",
          phoneNumber: "9876543210",
        },
        "123"
      );
      expect(toast.success).toHaveBeenCalledWith(
        "Student updated successfully"
      );
    });
  });
});
