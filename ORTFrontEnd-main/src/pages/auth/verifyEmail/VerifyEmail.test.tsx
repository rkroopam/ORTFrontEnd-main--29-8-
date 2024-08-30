import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { toast } from "react-toastify";
import VerifyEmail from "../verifyEmail"; // Adjust the import path as necessary
import { verifyEmail } from "../../../api/services/auth";
import { store } from "../../../store/store";

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
  setToken: jest.fn(),
  getUserDetails: jest.fn(),
}));

const queryClient = new QueryClient();

const renderWithProviders = (ui: any, { route = "/" } = {}) => {
  window.history.pushState({}, "Test page", route);
  return render(
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={[route]}>{ui}</MemoryRouter>
      </QueryClientProvider>
    </Provider>
  );
};

describe("VerifyEmail Component", () => {
  it("renders the component", () => {
    renderWithProviders(<VerifyEmail />, {
      route: "/verify-email?token=test-token",
    });

    expect(screen.getByText(/Verifying Email/i)).toBeInTheDocument();
  });

  it("calls verifyEmail API and handles success", async () => {
    (verifyEmail as jest.Mock).mockResolvedValueOnce({});

    renderWithProviders(<VerifyEmail />, {
      route: "/verify-email?token=test-token",
    });

    await waitFor(() => {
      expect(verifyEmail).toHaveBeenCalledWith("test-token");
    });

    await waitFor(() => {
      expect(toast.success).toHaveBeenCalledWith("email verified");
    });
  });

  it("calls verifyEmail API and handles error", async () => {
    (verifyEmail as jest.Mock).mockRejectedValueOnce(
      new Error("Email verification failed")
    );

    renderWithProviders(<VerifyEmail />, {
      route: "/verify-email?token=test-token",
    });

    await waitFor(() => {
      expect(verifyEmail).toHaveBeenCalledWith("test-token");
    });

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith("Email failed");
    });
  });
});
