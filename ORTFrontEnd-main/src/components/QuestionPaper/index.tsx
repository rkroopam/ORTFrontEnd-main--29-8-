import React from "react";

interface Option {
  option: string;
  isCorrect: boolean;
}

interface QuestionProps {
  audioPath: string;
  options: Option[];
}

const QuestionPaper = ({ audioPath, options }: QuestionProps) => {
  return (
    <div className="question">
      {/* Audio Player */}
      <div className="audio-player">
        <audio controls>
          <source src={audioPath} type="audio/mp3" />
          Your browser does not support the audio element.
        </audio>
      </div>

      {/* Options */}
      <div className="options">
        {options.map((option, index) => (
          <div key={index} className="option">
            <input
              type="radio"
              name="question-option"
              id={`option-${index}`}
              value={option.option}
            />
            <label htmlFor={`option-${index}`}>{option.option}</label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionPaper;
