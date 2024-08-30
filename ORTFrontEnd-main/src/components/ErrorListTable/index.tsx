import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Grid,
  Typography,
} from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";

const ErrorListTable = () => {
  return (
<Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Error List
            </Typography>
            <TableContainer component={Paper}>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
            >
              Target
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold", borderRight: "1px solid #ddd" }}
            >
              Correct Answer
            </TableCell>
            <TableCell
              align="center"
              sx={{ fontWeight: "bold" }}
            >
              Your Answer
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={{ backgroundColor: "#f9f9f9" }}>
            <TableCell style={{ borderRight: "1px solid #ddd" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <span>u</span>
                <VolumeUpIcon />
              </Box>
            </TableCell>
            <TableCell style={{ borderRight: "1px solid #ddd" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <span>u</span>
                <VolumeUpIcon />
              </Box>
            </TableCell>
            <TableCell><Box display="flex" justifyContent="space-between" alignItems="center">
                <span>n</span>
                <VolumeUpIcon />
              </Box></TableCell>
          </TableRow>
          <TableRow sx={{ backgroundColor: "#ffffff" }}>
            <TableCell style={{ borderRight: "1px solid #ddd" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <span>v</span>
                <VolumeUpIcon />
              </Box>
            </TableCell>
            <TableCell style={{ borderRight: "1px solid #ddd" }}>
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <span>v</span>
                <VolumeUpIcon />
              </Box>
            </TableCell>
            <TableCell><Box display="flex" justifyContent="space-between" alignItems="center">
                <span>n</span>
                <VolumeUpIcon />
              </Box></TableCell>
          </TableRow>
          {/* Add more rows as needed */}
        </TableBody>
      </Table>
    </TableContainer>
          </Paper>
        </Grid>
    
  );
};

export default ErrorListTable;