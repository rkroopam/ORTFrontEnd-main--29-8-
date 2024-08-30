import React, { useState, useEffect } from "react";
import {
  Container,
  Paper,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    show: true,
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    show: false,
  },
  {
    question: "What is the color of the sky?",
    options: ["Blue", "Green", "Red", "Yellow"],
    show: true,
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
    show: true,
  },
  {
    question: "What is the boiling point of water?",
    options: ["90°C", "100°C", "110°C", "120°C"],
    show: true,
  },
];

const getVisibleQuestion = (index: number) => {
  const visibleQuestions = questions.filter((q) => q.show);
  return visibleQuestions[index - 1];
};

const PracticeQuestionPage: React.FC = () => {
  const { questionNumber } = useParams<{ questionNumber?: string }>();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  useEffect(() => {
    if (questionNumber) {
      const currentQuestionIndex = parseInt(questionNumber, 10) - 1;
      const currentQuestion = getVisibleQuestion(currentQuestionIndex + 1);
      if (!currentQuestion) {
        navigate("/practice-complete");
      }
    }
  }, [questionNumber, navigate]);

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextClick = () => {
    if (questionNumber) {
      const currentQuestionIndex = parseInt(questionNumber, 10) - 1;
      let nextQuestionIndex = currentQuestionIndex + 1;
      while (
        nextQuestionIndex < questions.length &&
        !questions[nextQuestionIndex].show
      ) {
        nextQuestionIndex++;
      }
      if (nextQuestionIndex < questions.length) {
        navigate(`/practice-question/${nextQuestionIndex + 1}`);
      } else {
        navigate("/practice-complete");
      }
    }
  };

  const handlePreviousClick = () => {
    if (questionNumber) {
      const currentQuestionIndex = parseInt(questionNumber, 10) - 1;
      let prevQuestionIndex = currentQuestionIndex - 1;
      while (prevQuestionIndex >= 0 && !questions[prevQuestionIndex].show) {
        prevQuestionIndex--;
      }
      if (prevQuestionIndex >= 0) {
        navigate(`/practice-question/${prevQuestionIndex + 1}`);
      }
    }
  };

  const currentQuestionIndex = questionNumber
    ? parseInt(questionNumber, 10) - 1
    : null;
  const currentQuestionData =
    currentQuestionIndex !== null
      ? getVisibleQuestion(currentQuestionIndex + 1)
      : null;

  if (!currentQuestionData) {
    return (
      <Typography variant="h6" align="center">
        Question not found
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h5" align="center">
            Practice Question {questionNumber}
          </Typography>
          <Box mt={3}>
            <Typography variant="body1">
              {currentQuestionData.question}
            </Typography>
          </Box>
          <Box mt={3}>
            <FormControl component="fieldset">
              <FormLabel component="legend">Select an answer</FormLabel>
              <RadioGroup
                row
                aria-label="answers"
                name="answers"
                value={selectedAnswer}
                onChange={handleOptionChange}
              >
                {currentQuestionData.options.map((option, index) => (
                  <FormControlLabel
                    key={index}
                    value={option}
                    control={<Radio />}
                    label={option}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Box>
          <Box mt={3} display="flex" justifyContent="space-between">
            <Button
              variant="outlined"
              onClick={handlePreviousClick}
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleNextClick}
              disabled={!selectedAnswer}
            >
              Next
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PracticeQuestionPage;
