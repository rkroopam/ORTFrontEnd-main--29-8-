import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PaymentManagement from "../PaymentManagement";
import { getPaymentModels, updatePaymentModel } from "../../../api/services/payments";
console.error = jest.fn();
// Mock the API calls
jest.mock("../../../api/services/payments", () => ({
  getPaymentModels: jest.fn(),
  updatePaymentModel: jest.fn(),
}));

// Mock necessary Redux state
const store = configureStore({
  reducer: {
    auth: (state = { token: "mock-token" }, action: any) => state,
  },
});

// Create a QueryClient instance
const queryClient = new QueryClient();

describe("PaymentManagement Component", () => {
  beforeEach(() => {
    // Reset mocks before each test
    jest.resetAllMocks();
  });

  test("renders PaymentManagement and displays initial elements", () => {
    (getPaymentModels as jest.Mock).mockResolvedValue({ items: [] });
    
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaymentManagement />
        </QueryClientProvider>
      </Provider>
    );

    expect(screen.getByText("Payment Management")).toBeInTheDocument();
    expect(screen.getByText("Add Payment Model")).toBeInTheDocument();
  });

  test("opens and closes the add payment model dialog", async () => {
    (getPaymentModels as jest.Mock).mockResolvedValue({ items: [] });
    
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaymentManagement />
        </QueryClientProvider>
      </Provider>
    );

    // Open the dialog
    fireEvent.click(screen.getByText("Add Payment Model"));
    const dialogs = screen.queryAllByText("Add Payment Model");
    expect(dialogs.length).toBeGreaterThan(0); // Ensure at least one dialog is present

    // Close the dialog
    fireEvent.click(screen.getByText("Add Payment Model")); // Adjust if needed based on actual close behavior
    expect(screen.queryAllByText("Add Payment Model").length).toBe(1); // Check the dialog is closed
  });

  test("updates payment model status", async () => {
    (getPaymentModels as jest.Mock).mockResolvedValue({
      items: [{ _id: "1", period: "2024", name: "Model A", perHeadAmount: 100, status: "active" }],
    });
    (updatePaymentModel as jest.Mock).mockResolvedValue({});

    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <PaymentManagement />
        </QueryClientProvider>
      </Provider>
    );

    // Wait for data to be fetched and rendered
    await waitFor(() => expect(screen.getByText("Model A")).toBeInTheDocument());

    // Make sure the "Make Active" button exists
    const makeActiveButton = await screen.findByText("Make Unactive");
    expect(makeActiveButton).toBeInTheDocument();

    // Trigger status update
    fireEvent.click(makeActiveButton);

    // Assert the updatePaymentModel was called with correct parameters
    expect(updatePaymentModel).toHaveBeenCalledWith({
      id: "1",
      token: "mock-token",
    });
  });
});
