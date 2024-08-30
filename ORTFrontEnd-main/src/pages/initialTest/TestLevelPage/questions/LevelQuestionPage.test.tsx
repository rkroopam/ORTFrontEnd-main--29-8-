import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import Question from '../questions'; // Adjust the path if necessary
console.error = jest.fn();
describe('Question Component', () => {
  const mockOnNext = jest.fn();
  const mockOnPrevious = jest.fn();

  const mockQuestion = {
    audioPath: 'https://file-examples.com/storage/fe44eeb9cb66ab8ce934f14/2017/11/file_example_MP3_700KB.mp3',
    options: [
      { option: 'Option 1', isCorrect: false },
      { option: 'Option 2', isCorrect: true },
      { option: 'Option 3', isCorrect: false },
    ],
  };

  const setup = (isFirst: boolean, isLast: boolean) => {
    // render(
    //   // <Question
    //   //   question={mockQuestion}
    //   //   onNext={mockOnNext}
    //   //   onPrevious={mockOnPrevious}
    //   //   isFirst={isFirst}
    //   //   isLast={isLast}
    //   //   currentQuestionIndex={0}
    //   //   totalQuestions={5}
        
    //   // />
    // );
  };

  test('renders the audio player', () => {
    setup(false, false);
    const audioElement = screen.getByRole('audio');
    expect(audioElement).toBeInTheDocument();
    expect(audioElement).toHaveAttribute('src', mockQuestion.audioPath);
  });

  test('renders the options correctly', () => {
    setup(false, false);
    mockQuestion.options.forEach(option => {
      expect(screen.getByText(option.option)).toBeInTheDocument();
    });
  });

  test('renders the progress bar correctly', () => {
    setup(false, false);
    expect(screen.getByText('Progress: 20%')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '20');
  });

  test('calls onNext when Next button is clicked', () => {
    setup(false, false);
    fireEvent.click(screen.getByText('Next'));
    expect(mockOnNext).toHaveBeenCalledTimes(1);
  });

  test('calls onPrevious when Previous button is clicked', () => {
    setup(false, false);
    fireEvent.click(screen.getByText('Previous'));
    expect(mockOnPrevious).toHaveBeenCalledTimes(1);
  });

  test('disables Previous button if it is the first question', () => {
    setup(true, false);
    expect(screen.getByText('Previous')).toBeDisabled();
  });

  test('renders Submit instead of Next if it is the last question', () => {
    setup(false, true);
    expect(screen.getByText('Submit')).toBeInTheDocument();
  });
});
