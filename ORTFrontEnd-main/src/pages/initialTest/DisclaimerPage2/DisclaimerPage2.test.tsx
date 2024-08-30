import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useNavigate } from 'react-router-dom';
import DisClaimerPage2 from '../DisclaimerPage2';

// Mock useNavigate from react-router-dom
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('DisClaimerPage2', () => {
  it('renders the component with correct content', () => {
    render(<DisClaimerPage2 />);

    expect(screen.getByText(/Before we start:/i)).toBeInTheDocument();
    expect(screen.getByText(/Find a quiet place./i)).toBeInTheDocument();
    expect(screen.getByText(/Remove all distractions./i)).toBeInTheDocument();
    expect(screen.getByText(/Make sure the sound is on./i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Play sound to hear/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I hear it/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /I don't hear it/i })).toBeInTheDocument();
  });

  it('plays audio when the "Play sound to hear" button is clicked', () => {
    // Mock the audio play method
    const playMock = jest.fn();
    window.HTMLMediaElement.prototype.play = playMock;

    render(<DisClaimerPage2 />);
    
    const playButton = screen.getByRole('button', { name: /Play sound to hear/i });
    fireEvent.click(playButton);

    expect(playMock).toHaveBeenCalledTimes(1);
  });

  // it('navigates to the correct page when "I hear it" or "I don\'t hear it" buttons are clicked', () => {
  //   const mockNavigate = useNavigate();

  //   render(<DisClaimerPage2 />);
    
  //   const hearItButton = screen.getByRole('button', { name: /I hear it/i });
  //   const dontHearItButton = screen.getByRole('button', { name: /I don't hear it/i });
    
  //   // Click "I hear it" button and verify navigation
  //   fireEvent.click(hearItButton);
  //   expect(mockNavigate).toHaveBeenCalledWith('/regular-test-page');

  //   // Click "I don't hear it" button and verify navigation
  //   fireEvent.click(dontHearItButton);
  //   expect(mockNavigate).toHaveBeenCalledWith('/cant-hearit-page');
  // });
});
