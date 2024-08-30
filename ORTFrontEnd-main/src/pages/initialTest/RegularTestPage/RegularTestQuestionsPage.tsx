import React, { useState } from "react";
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
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "What is the largest planet in our solar system?",
    options: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: ["Harper Lee", "Jane Austen", "Mark Twain", "Ernest Hemingway"],
    answer: "Harper Lee",
  },
  {
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Pb", "Fe"],
    answer: "Au",
  },
  {
    question: "What year did the Titanic sink?",
    options: ["1912", "1905", "1898", "1923"],
    answer: "1912",
  },
  {
    question: "Which element has the atomic number 1?",
    options: ["Hydrogen", "Helium", "Oxygen", "Nitrogen"],
    answer: "Hydrogen",
  },
  {
    question: "What is the hardest natural substance on Earth?",
    options: ["Gold", "Iron", "Diamond", "Platinum"],
    answer: "Diamond",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Leonardo da Vinci",
      "Vincent van Gogh",
      "Claude Monet",
      "Pablo Picasso",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Saturn", "Uranus"],
    answer: "Mars",
  },
  {
    question: "Who discovered penicillin?",
    options: [
      "Alexander Fleming",
      "Louis Pasteur",
      "Marie Curie",
      "Isaac Newton",
    ],
    answer: "Alexander Fleming",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado",
  },
  {
    question: "What is the largest land animal?",
    options: ["Elephant", "Giraffe", "Rhino", "Hippopotamus"],
    answer: "Elephant",
  },
  {
    question: "In which country would you find the ancient city of Petra?",
    options: ["Egypt", "Jordan", "Greece", "Turkey"],
    answer: "Jordan",
  },
];

const TestQuestionPage = () => {
  const { questionNumber } = useParams<{ questionNumber?: string }>();
  const navigate = useNavigate();
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");

  const currentQuestionIndex = questionNumber
    ? parseInt(questionNumber) - 1
    : 0;
  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  const handleNextClick = () => {
    const nextQuestionNumber = currentQuestionIndex + 2; // To get the next question number
    if (nextQuestionNumber <= questions.length) {
      navigate(`/test-question/${nextQuestionNumber}`);
    } else {
      navigate("/test-result"); // Navigate to the result page
    }
  };

  const handlePreviousClick = () => {
    const prevQuestionNumber = currentQuestionIndex;
    if (prevQuestionNumber >= 1) {
      navigate(`/test-question/${prevQuestionNumber}`);
    }
  };

  if (
    !questionNumber ||
    currentQuestionIndex < 0 ||
    currentQuestionIndex >= questions.length
  ) {
    return (
      <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <Box p={4} mt={5}>
            <Typography variant="h5" align="center">
              Question not found
            </Typography>
          </Box>
        </Paper>
      </Container>
    );
  }

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h5" align="center">
            Question {questionNumber}
          </Typography>
          <Box mt={3}>
            <Typography variant="body1">{currentQuestion.question}</Typography>
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
                {currentQuestion.options.map((option, index) => (
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

export default TestQuestionPage;
