import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { CustomButton } from "../../../common";

interface Option {
  id: number;
  text: string;
}

interface Question {
  id: number;
  text: string;
  options: Option[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is the capital of France?",
    options: [
      { id: 1, text: "Berlin" },
      { id: 2, text: "Madrid" },
      { id: 3, text: "Paris" },
      { id: 4, text: "Rome" },
    ],
  },
  {
    id: 2,
    text: "What is 2 + 2?",
    options: [
      { id: 1, text: "3" },
      { id: 2, text: "4" },
      { id: 3, text: "5" },
      { id: 4, text: "6" },
    ],
  },
  {
    id: 3,
    text: "What is the largest ocean on Earth?",
    options: [
      { id: 1, text: "Atlantic Ocean" },
      { id: 2, text: "Indian Ocean" },
      { id: 3, text: "Arctic Ocean" },
      { id: 4, text: "Pacific Ocean" },
    ],
  },
  {
    id: 4,
    text: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      { id: 1, text: "Harper Lee" },
      { id: 2, text: "Mark Twain" },
      { id: 3, text: "J.K. Rowling" },
      { id: 4, text: "Ernest Hemingway" },
    ],
  },
  {
    id: 5,
    text: "What is the boiling point of water?",
    options: [
      { id: 1, text: "90°C" },
      { id: 2, text: "95°C" },
      { id: 3, text: "100°C" },
      { id: 4, text: "105°C" },
    ],
  },
];

const TestComponent: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleNextClick = () => {
    if (selectedOption !== null) {
      setCurrentIndex((prevIndex) =>
        Math.min(prevIndex + 1, questions.length - 1)
      );
      setSelectedOption(null); // Reset selected option for the next question
    }
  };

  const handlePreviousClick = () => {
    setCurrentIndex((prevIndex) => Math.max(prevIndex - 1, 0));
    setSelectedOption(null); // Reset selected option for the previous question
  };

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(parseInt(event.target.value, 10));
  };

  const currentQuestion = questions[currentIndex];

  return (
    <Container>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          }}
        >
          <Box sx={{ width: "100%", maxWidth: "600px" }}>
            <Typography variant="h6" sx={{ marginBottom: "16px" }}>
              {currentQuestion.text}
            </Typography>
            <FormControl component="fieldset">
              <FormLabel component="legend">Options</FormLabel>
              <RadioGroup
                aria-label="question-options"
                name="question-options"
                value={selectedOption?.toString() || ""}
                onChange={handleOptionChange}
              >
                {currentQuestion.options.map((option) => (
                  <FormControlLabel
                    key={option.id}
                    value={option.id.toString()}
                    control={<Radio />}
                    label={option.text}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
            padding: "16px",
          }}
        >
          <CustomButton
            variant="outlined"
            onClick={handlePreviousClick}
            disabled={currentIndex === 0}
          >
            Previous
          </CustomButton>
          <CustomButton
            variant="outlined"
            onClick={handleNextClick}
            disabled={
              selectedOption === null || currentIndex === questions.length - 1
            }
          >
            Next
          </CustomButton>
        </Box>
      </Box>
    </Container>
  );
};

export default TestComponent;
