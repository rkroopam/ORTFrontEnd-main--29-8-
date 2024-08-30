import React from "react";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TestResultPage = () => {
  const navigate = useNavigate();

  const handleFeedbackClick = () => {
    navigate("/test-feedback"); // Navigate to the feedback page
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h5" align="center">
            Test Completed
          </Typography>
          <Box mt={3}>
            <Typography variant="body1" align="center">
              Congratulations on completing the test! Your results are being
              processed.
            </Typography>
            <Typography variant="body1" align="center" mt={2}>
              You will receive feedback on your performance shortly.
            </Typography>
          </Box>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleFeedbackClick}
            >
              View Feedback
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TestResultPage;
