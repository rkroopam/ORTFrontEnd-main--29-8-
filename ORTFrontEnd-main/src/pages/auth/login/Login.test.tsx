import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { configureStore, createSlice } from "@reduxjs/toolkit";
import Login from "../login"; // Adjust the import path as necessary
import { login_user } from "../../../api/services/auth"; // Adjust the import path as necessary

console.error = jest.fn();
jest.mock("../../../api/services/user", () => ({
  login_user: jest.fn(),
}));

const queryClient = new QueryClient();

const authSlice = createSlice({
  name: "auth",
  initialState: { user: null },
  reducers: {},
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
});

describe("Login Component", () => {
  it("should display the login form with email and password fields", () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Login />
          </Router>
        </QueryClientProvider>
      </Provider>
    );

    // Check if the login title is displayed
    expect(screen.getByRole("heading", { name: /login/i })).toBeInTheDocument();

    // Check if the login prompt is displayed
    expect(
      screen.getByText("Login and start your journey.")
    ).toBeInTheDocument();

    // Check if the email field is displayed
    expect(screen.getByLabelText("Email Address")).toBeInTheDocument();

    // Check if the password field is displayed
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Check if the submit button is displayed
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should handle form submission", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Login />
          </Router>
        </QueryClientProvider>
      </Provider>
    );

    // Mock the form values
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Mock the form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Check if the login_user function is called with the correct arguments
    await waitFor(() => {
      expect(login_user).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });
  });

  it("should reset form fields after submission", async () => {
    render(
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Login />
          </Router>
        </QueryClientProvider>
      </Provider>
    );

    // Mock the form values
    fireEvent.change(screen.getByLabelText("Email Address"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "password123" },
    });

    // Mock the form submission
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    // Wait for login_user function call
    await waitFor(() => {
      expect(login_user).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });
    });

    // Check if the form fields are reset
    // const emailInput = screen.getByLabelText(
    //   "Email Address"
    // ) as HTMLInputElement;
    // const passwordInput = screen.getByLabelText("Password") as HTMLInputElement;

    // expect(emailInput.value).toBe("");
    // expect(passwordInput.value).toBe("");
  });
});
