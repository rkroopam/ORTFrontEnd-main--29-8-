import React from "react";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PracticeTestIntroduction = () => {
  const navigate = useNavigate();

  const handleStartTestClick = () => {
    navigate("/practice-question/1"); // Navigate to the first practice question
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h5" align="center">
            Practice Test
          </Typography>
          <Box mt={3}>
            <Typography variant="body1">
              Welcome to the practice test! This will help you get familiar with
              the types of questions you'll encounter.
            </Typography>
            <Typography variant="body1" mt={2}>
              Read each question carefully and select the correct answer.
            </Typography>
          </Box>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleStartTestClick}
            >
              Start Practice Test
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PracticeTestIntroduction;
