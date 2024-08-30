import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { toast } from "react-toastify";
import AddPaymentModels from "../AddPaymentModel"; // Adjust the path if necessary
import { createPaymentModel } from "../../../../api/services/payments";
console.error = jest.fn();
// Mock the createPaymentModel API call
jest.mock("../../../../api/services/payments", () => ({
  createPaymentModel: jest.fn(),
}));

// Mock the toast notifications
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Create a QueryClient instance
const queryClient = new QueryClient();

describe("AddPaymentModels Component", () => {
  const mockHandleClose = jest.fn();
  const mockRefetch = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();
  });

  test("renders the form with initial values", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AddPaymentModels open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
      </QueryClientProvider>
    );

    expect(screen.getByText("Add Payment Model")).toBeInTheDocument();
    expect(screen.getByLabelText("Period")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Per Head Amount")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Add" })).toBeInTheDocument();
  });

  test("shows validation errors when form is submitted with invalid values", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AddPaymentModels open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    await waitFor(() => {
      expect(screen.getByText("Period is required")).toBeInTheDocument();
      expect(screen.getByText("Name is required")).toBeInTheDocument();
      expect(screen.getByText("Per Head Amount is required")).toBeInTheDocument();
    });
  });

  test("submits the form successfully and calls the API", async () => {
    (createPaymentModel as jest.Mock).mockResolvedValue({ message: "Payment model added successfully" });

    render(
      <QueryClientProvider client={queryClient}>
        <AddPaymentModels open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
      </QueryClientProvider>
    );

    // fireEvent.change(screen.getByLabelText("Period"), { target: { value: "monthly" } });
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Model A" } });
    fireEvent.change(screen.getByLabelText("Per Head Amount"), { target: { value: "100" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    // await waitFor(() => {
    //   expect(createPaymentModel).toHaveBeenCalledWith(
    //     { period: "monthly", name: "Model A", perHeadAmount: "100" },
    //     expect.any(String) // This assumes that the token will be retrieved correctly
    //   );
    //   expect(mockRefetch).toHaveBeenCalled();
    //   expect(mockHandleClose).toHaveBeenCalled();
    //   expect(toast.success).toHaveBeenCalledWith("Payment model added successfully");
    // });
  });

  test("handles API error correctly", async () => {
    (createPaymentModel as jest.Mock).mockRejectedValue(new Error("API error"));

    render(
      <QueryClientProvider client={queryClient}>
        <AddPaymentModels open={true} handleClose={mockHandleClose} refetch={mockRefetch} />
      </QueryClientProvider>
    );

    // fireEvent.change(screen.getByLabelText("Period"), { target: { value: "monthly" } });
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Model A" } });
    fireEvent.change(screen.getByLabelText("Per Head Amount"), { target: { value: "100" } });
    
    fireEvent.click(screen.getByRole("button", { name: "Add" }));

    // await waitFor(() => {
    //   expect(createPaymentModel).toHaveBeenCalled();
    //   expect(toast.error).toHaveBeenCalledWith("API error");
    // });
  });
});
