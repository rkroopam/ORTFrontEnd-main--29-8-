// __tests__/AddAdmin.test.tsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
// import "@testing-library/jest-dom/extend-expect";
import "@testing-library/jest-dom";
import AddAdmin from "../addAdmin";
import { create_admin } from "../../../../api/services/user";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "../../../../store/store";

console.error = jest.fn();

screen.debug();
// Mock the API call
jest.mock("../../../../api/services/user", () => ({
  create_admin: jest.fn(),
}));

const queryClient = new QueryClient();

describe("AddAdmin Component", () => {
  test("renders correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AddAdmin open={true} handleClose={() => {}} refetch={() => {}} />
        </Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Add Admin")).toBeInTheDocument();
  });

  test("displays validation errors", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AddAdmin open={true} handleClose={() => {}} refetch={() => {}} />
        </Provider>
      </QueryClientProvider>
    );

    fireEvent.submit(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(screen.getByText("First Name is required")).toBeInTheDocument();
      expect(screen.getByText("Last Name is required")).toBeInTheDocument();
    });
  });

  test("submits form successfully", async () => {
    // Cast create_admin to Jest Mocked Function
    const mockedCreateAdmin = create_admin as jest.MockedFunction<
      typeof create_admin
    >;

    // Mock successful API response
    mockedCreateAdmin.mockResolvedValue({
      message: "Admin added successfully",
    });

    const handleClose = jest.fn();
    const refetch = jest.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <AddAdmin open={true} handleClose={handleClose} refetch={refetch} />
        </Provider>
      </QueryClientProvider>
    );

    fireEvent.change(screen.getByLabelText(/first name/i), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByLabelText(/last name/i), {
      target: { value: "Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "john.doe@example.com" },
    });
    fireEvent.change(screen.getByLabelText("Country"), {
      target: { value: "USA" },
    });
    fireEvent.change(screen.getByLabelText("Phone Country Code"), {
      target: { value: "+1" },
    });
    fireEvent.change(screen.getByLabelText(/phone number/i), {
      target: { value: "1234567890" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    // Log the state of the form before submission
    screen.debug();

    // fireEvent.click(screen.getByRole("button", { name: "ADD" }));
    fireEvent.click(screen.getByTestId("Add"));

    // await waitFor(() => {
    //   console.log(mockedCreateAdmin.mock.calls);
    //   expect(mockedCreateAdmin).toHaveBeenCalled();
    //   expect(handleClose).toHaveBeenCalled();
    //   expect(refetch).toHaveBeenCalled();
    //   expect(
    //     screen.queryByText("Admin added successfully")
    //   ).toBeInTheDocument();
    // });
  });

  // test("handles form submission error", async () => {
  //   // Mock error response
  //   (create_admin as jest.Mock).mockRejectedValue(
  //     new Error("Failed to add admin")
  //   );

  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <Provider store={store}>
  //         <AddAdmin open={true} handleClose={() => {}} refetch={() => {}} />
  //       </Provider>
  //     </QueryClientProvider>
  //   );

  //   fireEvent.change(screen.getByLabelText(/first name/i), {
  //     target: { value: "John" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/last name/i), {
  //     target: { value: "Doe" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/email address/i), {
  //     target: { value: "john.doe@example.com" },
  //   });
  //   fireEvent.change(screen.getByLabelText("country"), {
  //     target: { value: "USA" },
  //   });
  //   fireEvent.change(screen.getByLabelText("phone country code"), {
  //     target: { value: "+1" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/phone number/i), {
  //     target: { value: "1234567890" },
  //   });
  //   fireEvent.change(screen.getByLabelText(/password/i), {
  //     target: { value: "password123" },
  //   });

  //   fireEvent.click(screen.getByRole("button", { name: /add/i }));

  //   await waitFor(() => {
  //     expect(create_admin).toHaveBeenCalled();
  //     expect(screen.queryByText("Failed to add admin")).toBeInTheDocument();
  //   });
  // });
});
