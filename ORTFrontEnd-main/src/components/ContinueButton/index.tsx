import React from "react";
import { Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const ContinueButton = ({ label = "Continue", onClick }:any) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      sx={{
        fontSize: "20px",
        padding: "15px 25px",
        borderRadius: "25px",
        borderWidth:"3px",
        position: "relative",
        overflow: "hidden",
        animation: "pulse 2s infinite", // Adding continuous animation
        "& .MuiButton-endIcon": {
          display: "inline-flex",
          animation: "slide 1.5s infinite", // Continuous slide animation for the icon
        },
        "@keyframes pulse": {
          "0%": {
            transform: "scale(1)",
          },
          "50%": {
            transform: "scale(1.15)", // Slightly increase the size
          },
          "100%": {
            transform: "scale(1)",
          },
        },
        "@keyframes slide": {
          "0%": {
            transform: "translateX(0)",
          },
          "50%": {
            transform: "translateX(5px)", // Slightly move the icon to the right
          },
          "100%": {
            transform: "translateX(0)",
          },
        },
      }}
      endIcon={<ArrowForwardIcon />}
    >
      {label}
    </Button>
  );
};

export default ContinueButton;
