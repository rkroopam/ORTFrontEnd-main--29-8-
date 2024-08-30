import React from "react";
import { Container, Paper, Box, Typography, Button, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackgroundContainer } from "../../../components/BackgroundContainer";

const RegularTestPage = () => {
  const navigate = useNavigate();

  const handleStartTest = () => {
    navigate("/test-level-page"); // Redirects to the first question of the regular test
  };

  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="md" sx={{margin:"auto"}}>
        <Paper elevation={3}>
          <Box p={4} >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              You're ready to start the assessment!
            </Typography>
            <Box mt={3}>
              <Typography variant="h6" textAlign="center">
              The assessment consists of several questions designed to give a detailed analysis of your decoding and reading skills.
              </Typography>
              <Typography variant="h6">
                Please follow the instructions and answer each question to the
                best of your ability.
              </Typography>
              <Typography variant="h6">If you don't have enough time to answer a question, don't worry. Timing is part of the assessment.</Typography>
            </Box>
            <Grid item xs={6} mt={3}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleStartTest}
                sx={{padding:"10px 20px",fontSize:"15px" }}
              >
                start assessment
              </Button>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </BackgroundContainer>
  );
};

export default RegularTestPage;
