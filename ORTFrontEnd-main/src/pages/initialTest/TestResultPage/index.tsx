import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Typography,
  LinearProgress,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { BackgroundContainer } from "../../../components/BackgroundContainer";

const TestResultPage = () => {
  const navigate = useNavigate();
  const score = 76;
  const goToPaymentPage = () => {
    navigate("/payment-page");
  };
  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <Box p={4} mt={5}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Alex's Your score is {score}
            </Typography>
            <Box position="relative" mt={3}>
              <Box display="flex" height={10}>
                <Box flex={7.6} bgcolor="red" />
                <Box flex={1.3} bgcolor="yellow" />
                <Box flex={1.1} bgcolor="green" />
              </Box>
              <Box
                position="absolute"
                top={-20}
                left={`${(score / 100) * 100}%`}
                sx={{
                  transform: "translateX(-50%)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "red" }}
                >
                  ▼
                </Typography>
              </Box>
            </Box>

            <Box
              mt={5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <Box width={10} height={10} bgcolor="red" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  High risk (0-79)
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width={10} height={10} bgcolor="yellow" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  Low risk (80-89)
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width={10} height={10} bgcolor="green" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  Pass (90-100)
                </Typography>
              </Box>
            </Box>
            <Typography mt={3} textAlign="left" sx={{ fontFamily: "Cadman" }}>
              This score indicates that you are at high risk.
            </Typography>
            <Typography mt={1} textAlign="left" sx={{ fontFamily: "Cadman" }}>
              This means that:
            </Typography>
            <Box component="ul">
              <li
                style={{
                  textAlign: "left",
                  fontFamily: "Cadman",
                }}
              >
                Item one
              </li>
              <li
                style={{
                  textAlign: "left",
                  fontFamily: "Cadman",
                }}
              >
                Item two
              </li>
              <li
                style={{
                  textAlign: "left",
                  fontFamily: "Cadman",
                }}
              >
                Item three
              </li>
            </Box>
            <Typography mt={2} textAlign="center" sx={{ fontFamily: "Cadman" }}>
              A copy of this assessment has been emailed to you.
            </Typography>
            <Grid item xs={12} mt={3}>
              <Box display="flex" justifyContent="flex-end" >
                <Button
                  color="primary"
                  variant="contained"
                  type="submit"
                  onClick={goToPaymentPage}
                >
                  Next
                </Button>
              </Box>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </BackgroundContainer>
  );
};

export default TestResultPage;
