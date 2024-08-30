import React, { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
  FormLabel,
  FormGroup,
  Checkbox,
} from "@mui/material";

interface Question {
  id: number;
  text: string;
  options: string[];
}

const questionsForYoungerLearners: Question[] = [
  {
    id: 1,
    text: "What color is the sky during the day?",
    options: ["Blue", "Red", "Green", "Yellow"],
  },
  {
    id: 2,
    text: "How many legs does a cat have?",
    options: ["Two", "Three", "Four", "Five"],
  },
];

const questionsForOlderLearners: Question[] = [
  {
    id: 1,
    text: "Who is credited with discovering gravity when an apple fell on his head?",
    options: [
      "Isaac Newton",
      "Albert Einstein",
      "Galileo Galilei",
      "Nikola Tesla",
    ],
  },
  {
    id: 2,
    text: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Saturn"],
  },
];

const BasicTest: React.FC = () => {
  const [ageGroup, setAgeGroup] = useState<"younger" | "older">("younger");
  const [answers, setAnswers] = useState<string[]>([]);

  const handleAgeGroupChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeGroup(event.target.value as "younger" | "older");
  };

  const handleAnswerChange = (questionId: number, selectedOption: string) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionId - 1] = selectedOption;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    console.log("Submitted Answers:", answers);
  };

  const currentQuestions =
    ageGroup === "younger"
      ? questionsForYoungerLearners
      : questionsForOlderLearners;

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Basic Test for Learners
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <FormLabel component="legend">Select Age Group:</FormLabel>
            <RadioGroup
              row
              aria-label="age-group"
              name="age-group"
              value={ageGroup}
              onChange={handleAgeGroupChange}
            >
              <FormControlLabel
                value="younger"
                control={<Radio />}
                label="Younger Learners"
              />
              <FormControlLabel
                value="older"
                control={<Radio />}
                label="Older Learners"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
        {currentQuestions.map((question) => (
          <Grid item xs={12} key={question.id}>
            <Paper elevation={3} style={{ padding: "16px" }}>
              <Typography variant="body1" gutterBottom>
                {question.text}
              </Typography>
              <FormGroup>
                {question.options.map((option) => (
                  <FormControlLabel
                    key={option}
                    control={
                      <Checkbox
                        checked={answers[question.id - 1] === option}
                        onChange={() => handleAnswerChange(question.id, option)}
                      />
                    }
                    label={option}
                  />
                ))}
              </FormGroup>
            </Paper>
          </Grid>
        ))}
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <Button variant="contained" color="primary" onClick={handleSubmit}>
            Submit Test
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default BasicTest;
