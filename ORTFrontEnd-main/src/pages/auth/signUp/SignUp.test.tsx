import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SignUp from "../signUp"; // Adjust the import path as needed
import { toast } from "react-toastify";
import { parent_signup } from "../../../api/services/auth";

console.error = jest.fn();

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Mock the API function
jest.mock("../../../api/services/user", () => ({
  create_user: jest.fn(() =>
    Promise.resolve({
      data: { id: "123", name: "John Doe" },
      token: "mockToken",
    })
  ),
}));

// Mock react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

// Custom render function to include QueryClientProvider and Router
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Router>{ui}</Router>
    </QueryClientProvider>
  );
};

describe("SignUp Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the SignUp form correctly", () => {
    renderWithProviders(<SignUp />);

    expect(screen.getByLabelText("First name")).toBeInTheDocument();
    expect(screen.getByLabelText("Last name")).toBeInTheDocument();
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
    expect(screen.getByLabelText("country")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone number")).toBeInTheDocument();
    expect(screen.getByLabelText("Phone Country Code")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /sign up/i })
    ).toBeInTheDocument();
  });

  test("shows validation errors when submitting an incomplete form", async () => {
    renderWithProviders(<SignUp />);

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(await screen.findByText("Required")).toBeInTheDocument();
    expect(
      await screen.findByText(/invalid email address/i)
    ).toBeInTheDocument();
  });

  test("submits the form with valid data and handles success", async () => {
    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Phone Country Code"), {
      target: { value: "+1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.queryByText("Required")).toBeNull();
      expect(screen.queryByText(/invalid email address/i)).toBeNull();
    });

    // Check for successful toast notification
    expect((toast.success as jest.Mock).mock.calls.length).toBe(1);
    expect((toast.success as jest.Mock).mock.calls[0][0]).toBe(
      "Verification link sent to email"
    );
  });

  test("handles API error on form submission", async () => {
    (parent_signup as jest.Mock).mockRejectedValueOnce(new Error("API error"));

    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Phone Country Code"), {
      target: { value: "+1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    await waitFor(() => {
      expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    });

    // Check for error toast notification
    expect((toast.error as jest.Mock).mock.calls.length).toBe(1);
    expect((toast.error as jest.Mock).mock.calls[0][0]).toBe("API error");
  });

  test("disables the submit button while submitting", async () => {
    renderWithProviders(<SignUp />);

    fireEvent.change(screen.getByLabelText("First name"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText("Last name"), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText("Phone number"), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText("Phone Country Code"), {
      target: { value: "+1" },
    });

    fireEvent.click(screen.getByRole("button", { name: /sign up/i }));

    expect(screen.getByRole("button", { name: /sign up/i })).toBeDisabled();

    // Wait for the form to be submitted
    await waitFor(() => {
      expect(
        screen.getByRole("button", { name: /sign up/i })
      ).not.toBeDisabled();
    });
  });
});
