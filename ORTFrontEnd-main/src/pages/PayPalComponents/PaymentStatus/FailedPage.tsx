import React, { useEffect, useState } from "react";
import { Container, Typography, Box } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import useCountdownTimer from "../../../components/hooks/useSetTimer";

const FailedPage = () => {
  const time = useCountdownTimer(5, () => {
    window.location.href = "/payment-page";
  });
  console.log("time=================",time)

  return (
    <Container maxWidth="sm">
      <Box mt={5} textAlign="center">
        <CancelIcon color="error" fontSize="large" />
        <Typography variant="h4" gutterBottom>
          Payment Failed
        </Typography>
        <Typography variant="body1">
          Your payment was Failed. If you have any questions, please contact us.
        </Typography>
        <Typography variant="body1" color={"red"}>
          Redirect to the payment Page.
        </Typography>
        <Typography variant="h2" color={"red"}>{time !== 0 && time}</Typography>
      </Box>
    </Container>
  );
};

export default FailedPage;
