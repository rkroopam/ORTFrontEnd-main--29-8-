import React from "react";
import { Container, Typography, Box } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import useCountdownTimer from "../../../components/hooks/useSetTimer";

const SuccessPage = () => {
  const time = useCountdownTimer(5, () => {
    window.location.href = "/student/dashboard";
  });
  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <CheckCircleIcon
          data-testid="CheckCircleIcon"
          color="success"
          fontSize="large"
        />
        <Typography variant="h4" gutterBottom>
          Payment Successful
        </Typography>
        <Typography variant="body1">
          Your payment has been processed successfully. Thank you!
        </Typography>
        <Typography variant="body1" color="green">
          Redirect to the dashboard page
        </Typography>
        <Typography variant="h2" color="green">{time !== 0 && time}</Typography>
      </Box>
    </Container>
  );
};

export default SuccessPage;
