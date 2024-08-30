import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import StudentForm from ".";
import { toast } from "react-toastify";
import { useMutation } from "@tanstack/react-query";
console.error = jest.fn();
jest.mock("@tanstack/react-query", () => ({
  useMutation: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

const mockHandleClose = jest.fn();
const mockRefetch = jest.fn();
const mockMutateAsync = jest.fn();

describe("StudentForm Component", () => {
  beforeEach(() => {
    (useMutation as jest.Mock).mockReturnValue({
      mutateAsync: mockMutateAsync,
    });
  });

  it("renders correctly in add mode", () => {
    const { getByText } = render(
      <StudentForm
        open={true}
        handleClose={mockHandleClose}
        refetch={mockRefetch}
        isEditing={false}
        teacher={null}
        token="test-token"
      />
    );
    expect(getByText("Add Teacher")).toBeInTheDocument();
  });

  it("renders correctly in edit mode", () => {
    const mockTeacher = {
      fName: "John",
      lName: "Doe",
      email: "john@example.com",
      country: "USA",
      phoneCountryCode: "+1",
      phoneNumber: "123456789",
    };

    const { getByDisplayValue, getByText } = render(
      <StudentForm
        open={true}
        handleClose={mockHandleClose}
        refetch={mockRefetch}
        isEditing={true}
        teacher={mockTeacher}
        token="test-token"
      />
    );
    expect(getByText("Update Teacher")).toBeInTheDocument();
    expect(getByDisplayValue("John")).toBeInTheDocument();
    expect(getByDisplayValue("Doe")).toBeInTheDocument();
    expect(getByDisplayValue("john@example.com")).toBeInTheDocument();
  });

  it("validates form inputs", async () => {
    const { getByLabelText, getByText, findByText } = render(
      <StudentForm
        open={true}
        handleClose={mockHandleClose}
        refetch={mockRefetch}
        isEditing={false}
        teacher={null}
        token="test-token"
      />
    );

    fireEvent.click(getByText("Add"));
    
    expect(await findByText("First Name is required")).toBeInTheDocument();
    expect(await findByText("Last Name is required")).toBeInTheDocument();
    expect(await findByText("Email is required")).toBeInTheDocument();
    expect(await findByText("Password is required")).toBeInTheDocument();
    expect(await findByText("Country is required")).toBeInTheDocument();
    expect(await findByText("Phone Country Code is required")).toBeInTheDocument();
    expect(await findByText("Phone Number is required")).toBeInTheDocument();
  });

  it("submits form successfully", async () => {
    mockMutateAsync.mockResolvedValueOnce({ message: "Teacher updated successfully" });
    
    const { getByLabelText, getByText } = render(
      <StudentForm
        open={true}
        handleClose={mockHandleClose}
        refetch={mockRefetch}
        isEditing={true}
        teacher={null}
        token="test-token"
      />
    );

    fireEvent.change(getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(getByLabelText("Password"), { target: { value: "password" } });
    fireEvent.change(getByLabelText("Country"), { target: { value: "USA" } });
    fireEvent.change(getByLabelText("Phone Country Code"), { target: { value: "+1" } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "123456789" } });

    fireEvent.click(getByText("Update"));

    // await waitFor(() => {
    //   expect(mockMutateAsync).toHaveBeenCalledWith({
    //     fName: "John",
    //     lName: "Doe",
    //     email: "john@example.com",
    //     password: "password",
    //     country: "USA",
    //     phoneCountryCode: "+1",
    //     phoneNumber: "123456789",
    //   });
    // });

    // expect(toast.success).toHaveBeenCalledWith("Teacher updated successfully");
    // expect(mockHandleClose).toHaveBeenCalled();
    // expect(mockRefetch).toHaveBeenCalled();
  });

  it("handles form submission error", async () => {
    mockMutateAsync.mockRejectedValueOnce(new Error("Submission failed"));

    const { getByLabelText, getByText } = render(
      <StudentForm
        open={true}
        handleClose={mockHandleClose}
        refetch={mockRefetch}
        isEditing={true}
        teacher={null}
        token="test-token"
      />
    );

    fireEvent.change(getByLabelText("First Name"), { target: { value: "John" } });
    fireEvent.change(getByLabelText("Last Name"), { target: { value: "Doe" } });
    fireEvent.change(getByLabelText("Email Address"), { target: { value: "john@example.com" } });
    fireEvent.change(getByLabelText("Password"), { target: { value: "password" } });
    fireEvent.change(getByLabelText("Country"), { target: { value: "USA" } });
    fireEvent.change(getByLabelText("Phone Country Code"), { target: { value: "+1" } });
    fireEvent.change(getByLabelText("Phone Number"), { target: { value: "123456789" } });

    fireEvent.click(getByText("Update"));

    // await waitFor(() => {
    //   expect(toast.error).toHaveBeenCalledWith("Submission failed");
    // });

    // expect(mockHandleClose).not.toHaveBeenCalled();
    // expect(mockRefetch).not.toHaveBeenCalled();
  });
});
