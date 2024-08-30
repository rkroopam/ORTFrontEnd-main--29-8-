// ForgetPassword.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import ForgetPassword from "../forgetpassword/forgetpassword"; // Adjust the import based on your file structure
import "@testing-library/dom/dist";

console.error = jest.fn();

// Create a client for React Query
const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
      <ToastContainer />
    </QueryClientProvider>
  );
};

describe("ForgetPassword Component", () => {
  it("renders the ForgetPassword dialog with form elements", () => {
    renderWithProviders(<ForgetPassword />);

    expect(screen.getByText(/Forgot Password/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Send/i })).toBeInTheDocument();
  });

  it("shows validation errors when submitting an invalid form", async () => {
    renderWithProviders(<ForgetPassword />);

    fireEvent.click(screen.getByRole("button", { name: /Send/i }));

    await waitFor(() => {
      expect(screen.getByText(/Email is required/i)).toBeInTheDocument();
    });
  });

  // it("submits the form with valid data and handles success", async () => {
  //   // Mock the mutation function
  //   const mockSendMailforResetPassword = jest.fn();
  //   jest.mock("../../../api/services/user", () => ({
  //     sendMailforResetPassword: mockSendMailforResetPassword,
  //   }));

  //   mockSendMailforResetPassword.mockResolvedValueOnce({});

  //   renderWithProviders(<ForgetPassword />);

  //   fireEvent.change(screen.getByLabelText("Email"), {
  //     target: { value: "test@example.com" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: /Send/i }));

  //   await waitFor(() => {
  //     expect(mockSendMailforResetPassword).toHaveBeenCalledWith({
  //       email: "test@example.com",
  //     });
  //     expect(screen.queryByText(/Forgot Password/i)).not.toBeInTheDocument();
  //   });
  // });

  it("shows error toast on form submission failure", async () => {
    // Mock the mutation function
    const mockSendMailforResetPassword = jest.fn();
    jest.mock("../../../api/services/user", () => ({
      sendMailforResetPassword: mockSendMailforResetPassword,
    }));

    mockSendMailforResetPassword.mockRejectedValueOnce(
      new Error("Network error")
    );

    renderWithProviders(<ForgetPassword />);

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    });

    fireEvent.click(screen.getByRole("button", { name: /Send/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to send reset instructions/i)
      ).toBeInTheDocument();
    });
  });
});
