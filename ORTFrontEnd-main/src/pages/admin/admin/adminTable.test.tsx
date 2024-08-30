import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Admins from '../admin';  // Adjust the import path if necessary
import { useSelector } from 'react-redux';
import { useQuery, useMutation } from '@tanstack/react-query';
console.error = jest.fn();
// Mocking useSelector, useQuery, and useMutation
jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('@tanstack/react-query', () => ({
  useQuery: jest.fn(),
  useMutation: jest.fn(),
}));

describe('Admins Component', () => {
  beforeEach(() => {
    // Mocking useSelector
    (useSelector as unknown as jest.Mock).mockReturnValue('mocked-token');

    // Mocking useQuery
    (useQuery as jest.Mock).mockReturnValue({
      data: { items: [] },
      refetch: jest.fn(),
    });

    // Mocking useMutation
    (useMutation as jest.Mock).mockReturnValue({
      mutate: jest.fn(),
      isLoading: false,
      isError: false,
    });
  });

  test('renders Admins component with title and Add New button', () => {
    render(<Admins />);
    expect(screen.getByText('Admins')).toBeInTheDocument();
    expect(screen.getByText('Add new')).toBeInTheDocument();
  });

  test('opens and closes the Add Admin form', () => {
    render(<Admins />);

    // Initially, the AddAdmin component should not be visible
    expect(screen.queryByText('Add New ')).not.toBeInTheDocument();

    // Click the Add New button
    fireEvent.click(screen.getByText('Add new'));

    // Debugging: Inspect what's in the DOM after clicking the button
    screen.debug();

    // Check if the AddAdmin form is visible now
    expect(screen.getByText('Add New ')).toBeInTheDocument();

    // Simulate closing the form
    fireEvent.click(screen.getByText('Close')); // Assuming there is a close button with text 'Close'

    // Form should not be visible after closing
    expect(screen.queryByText('Add New ')).not.toBeInTheDocument();
  });

  test('triggers handleEdit when edit button is clicked', () => {
    const mockData = {
      items: [
        {
          id: '1',
          fName: 'John',
          lName: 'Doe',
          email: 'john.doe@example.com',
          phoneNumber: '1234567890',
          country: 'USA',
        },
      ],
    };

    // Mocking useQuery with data
    (useQuery as jest.Mock).mockReturnValue({
      data: mockData,
      refetch: jest.fn(),
    });

    render(<Admins />);
    
    // Ensure edit button is rendered
    const editButton = screen.getByLabelText('Edit');
    expect(editButton).toBeInTheDocument();
    
    fireEvent.click(editButton);

    // Debugging: Inspect what's in the DOM after clicking the edit button
    screen.debug();

    // Check if the editing form is open with the correct data
    expect(screen.getByText('Edit Admin')).toBeInTheDocument();
    expect(screen.getByDisplayValue('John')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Doe')).toBeInTheDocument();
  });
});
