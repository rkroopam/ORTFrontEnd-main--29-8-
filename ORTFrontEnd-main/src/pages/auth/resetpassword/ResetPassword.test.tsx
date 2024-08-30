import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import VerifyEmail from "../verifyEmail"; // Adjust the import path as needed
import { verifyEmail } from "../../../api/services/auth";
import { toast } from "react-toastify";
import { CustomLoader } from "../../../common";
console.error = jest.fn();

// Mock necessary modules
jest.mock("../../../api/services/user", () => ({
  verifyEmail: jest.fn(),
}));

jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

jest.mock("../../../utils/updateCurrentUser", () => ({
  getUserDetails: jest.fn(),
}));

jest.mock("../../../common", () => ({
  CustomLoader: () => <div>Loading...</div>,
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

// Create a new QueryClient instance
const queryClient = new QueryClient();

// Custom render function to include QueryClientProvider and Router
const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <Router>{ui}</Router>
    </QueryClientProvider>
  );
};

describe("VerifyEmail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders correctly", () => {
    renderWithProviders(<VerifyEmail />);

    expect(screen.getByText(/verifying email/i)).toBeInTheDocument();
    expect(screen.getByText(/loading.../i)).toBeInTheDocument();
  });

  test("calls verifyEmail on mount and handles success", async () => {
    (verifyEmail as jest.Mock).mockResolvedValueOnce({});

    renderWithProviders(<VerifyEmail />);

    await waitFor(() => {
      expect(verifyEmail).toHaveBeenCalled();
      expect(toast.success).toHaveBeenCalledWith("email verified");
      expect(mockNavigate).toHaveBeenCalledWith("/auth/login");
    });
  });

  test("shows error toast on verification failure", async () => {
    (verifyEmail as jest.Mock).mockRejectedValueOnce(
      new Error("Verification failed")
    );

    renderWithProviders(<VerifyEmail />);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email failed");
    });
  });
});
