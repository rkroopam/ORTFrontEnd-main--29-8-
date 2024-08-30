import React from "react";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PracticeTestCompleted = () => {
  const navigate = useNavigate();

  const handleRetakeClick = () => {
    navigate("/page5.1"); // Navigate back to the practice test introduction
  };

  const handleFullTestClick = () => {
    navigate("/page6");
  };

  return (
    <Container component="main" maxWidth="md">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h5" align="center">
            Practice Test Completed
          </Typography>
          <Box mt={3}>
            <Typography variant="body1">
              Thank you for completing the practice test!
            </Typography>
            <Typography variant="body1" mt={2}>
              You can now proceed to the full test or retake the practice test
              if you'd like.
            </Typography>
          </Box>
          <Box mt={3} display="flex" justifyContent="space-around">
            <Button
              variant="contained"
              color="primary"
              onClick={handleRetakeClick}
            >
              Retake Practice Test
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={handleFullTestClick}
            >
              Proceed to Full Test
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default PracticeTestCompleted;
