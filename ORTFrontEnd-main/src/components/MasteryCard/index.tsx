import { Box, Paper, Typography } from "@mui/material";
import React from "react";

const MasteryCard = () => {
  return (
    <Box>
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            width: "100%",
            height: "100%",
            border: "1px solid green",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src="https://as1.ftcdn.net/v2/jpg/08/38/34/78/1000_F_838347858_JTY6hnL6IXdgNMZtNBqGz0VJ2np5WPz0.jpg"
            alt=""
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h6" fontWeight="bold">Key to mastery:</Typography>
        <Box width={100} height={50}>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Crypto_key.svg/651px-Crypto_key.svg.png"
            alt=""
            width="100%"
            height="100%"
          />
        </Box>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Typography variant="h6" fontWeight="bold">Time on skill:</Typography>
        <Typography variant="h6">3 min</Typography>
      </Box>
      <Box display="flex" justifyContent="space-around">
        <Typography variant="h6" fontWeight="bold">Total time on task:</Typography>
        <Typography variant="h6">1 hr 14 min</Typography>
      </Box>
    </Box>
  );
};

export default MasteryCard;
