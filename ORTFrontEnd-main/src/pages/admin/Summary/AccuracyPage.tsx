import React from "react";
import {
  Box,
  Grid,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import ResultsChart from "../../../components/ResultChart/ResultsChart";
import MasteryCard from "../../../components/MasteryCard";
import ErrorListTable from "../../../components/ErrorListTable";
import EmailFormat from "../../../components/StudentReportBar";
import AccuracyAndFluencyBar from "../../../components/AcuracyAndFlunecyBar";
import EmailFormatReport from "../../EmailFormatReport";

const AccuracyChart = () => {
  return <ResultsChart />;
};

const AccuracyPage = () => {
  return (
    <Box sx={{ p: 3,  }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Typography variant="h4" gutterBottom textAlign="left">
          Training - Letter-Sound Match - Group 1 letters
        </Typography>
        <img
          src="https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/c3784de1-f325-463c-aa4d-8777a6b0a7f9/OnlineReadingTutor_Logo.png.png?format=1500w"
          alt="Logo"
          style={{ width: "auto", maxWidth: "240px", maxHeight: "64px" }}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Paper
            sx={{ p: 2, display: "flex", justifyContent: "center" }}
          >
            <Box sx={{ display: "flex", flexDirection: "column",width:"100%" }}>
              <Typography variant="h6">Your Results</Typography>
              <AccuracyChart />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ p: 2 }}>
            <MasteryCard />
          </Paper>
        </Grid>
        <ErrorListTable />
        <EmailFormatReport />
        {/* <AccuracyAndFluencyBar/> */}
      </Grid>
    </Box>
  );
};

export default AccuracyPage;
