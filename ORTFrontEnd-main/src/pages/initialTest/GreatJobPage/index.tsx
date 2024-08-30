import { Box, Button, Container, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import ballonImage from "../../../assets/images/learnerflowImages/iconfinder_ballon_newyears_party_2817132.svg";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";

const GreatJobPage = ({ onClick, isFinalLevel }: any) => {
  console.log(isFinalLevel, "isFinalLevel");
  return (
    <Box p={4} mt={5} textAlign="center">
      <Typography variant="h4" sx={{ fontWeight: "bold" }}>
        {isFinalLevel ? "All Done" : "Great Job"}
      </Typography>
      <Box mt={3}>
        <Box
          component="img"
          src={ballonImage}
          alt="Great Job"
          sx={{ width: "100%", maxHeight: "200px", objectFit: "contain" }}
        />
      </Box>
      <Box
        sx={{
          textAlign: "center",
        }}
      >
        <Button
          color="primary"
          variant="contained"
          type="submit"
          onClick={onClick}
          startIcon={<DoneRoundedIcon />}
        >
          {isFinalLevel ? "See My Result" : "Finish"}
        </Button>
      </Box>
    </Box>
  );
};

export default GreatJobPage;
