import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import DisclaimerPage from '../DisclaimerPage';
console.error = jest.fn();

// Mock the useNavigate hook from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DisclaimerPage', () => {
  it('renders the component without crashing', () => {
    render(<DisclaimerPage />);
    expect(screen.getByText(/Here’s how it works:/i)).toBeInTheDocument();
  });

  it('displays the correct headings and text', () => {
    render(<DisclaimerPage />);
    
    expect(screen.getByText(/Here’s how it works:/i)).toBeInTheDocument();
    expect(screen.getByText(/Measure your reading accuracy/i)).toBeInTheDocument();
    expect(screen.getByText(/On average, the test will take about/i)).toBeInTheDocument();
    expect(screen.getByText(/When the test is complete/i)).toBeInTheDocument();
    expect(screen.getByText(/This test is not a formal diagnosis/i)).toBeInTheDocument();
  });

  it('displays the icons', () => {
    render(<DisclaimerPage />);
    
    expect(screen.getByTestId('VolumeUpIcon')).toBeInTheDocument();
    expect(screen.getByTestId('AccessTimeFilledIcon')).toBeInTheDocument();
  });

  // it('navigates to the next page when the "Next" button is clicked', () => {
  //   const mockNavigate = useNavigate();

  //   render(<DisclaimerPage />);
    
  //   const nextButton = screen.getByRole('button', { name: /Next/i });
    
  //   fireEvent.click(nextButton);

  //   // expect(mockNavigate).toHaveBeenCalledWith('/disclaimer-page2');
  // });
});
