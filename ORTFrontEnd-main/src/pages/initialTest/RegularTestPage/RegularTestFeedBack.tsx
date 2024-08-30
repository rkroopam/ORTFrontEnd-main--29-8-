import React from "react";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const TestFeedbackPage = () => {
  const navigate = useNavigate();

  const handleReturnHome = () => {
    navigate("/"); // Navigate to home or start page
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h5" align="center">
            Test Feedback
          </Typography>
          <Box mt={3}>
            <Typography variant="body1" align="center">
              Based on your performance, we have some feedback to help you
              improve:
            </Typography>
            <Typography variant="body1" align="center" mt={2}>
              - Focus on practicing reading comprehension strategies.
            </Typography>
            <Typography variant="body1" align="center" mt={2}>
              - Consider taking additional practice tests.
            </Typography>
            <Typography variant="body1" align="center" mt={2}>
              - Review the key areas where you faced difficulties.
            </Typography>
          </Box>
          <Box mt={3} display="flex" justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              onClick={handleReturnHome}
            >
              Return to Home
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default TestFeedbackPage;
