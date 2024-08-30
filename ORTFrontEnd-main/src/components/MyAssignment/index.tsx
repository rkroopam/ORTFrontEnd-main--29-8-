import React from 'react';
import { AppBar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, CircularProgress, Chip, Box } from '@mui/material';

const MyAssignments = () => {
  const assignments = [
    { title: 'Typography test', timestamp: 'Today, 10:30 AM', progress: 95, tag: 'Completed', grade: '190/200 Final grade' },
    { title: 'Inclusive design test', timestamp: 'Tomorrow, 10:30 AM', progress: 80, tag: 'Completed', grade: '160/200 Final grade' },
    { title: 'Drawing test', timestamp: '23 Feb, 12:30 PM', progress: 0, tag: 'Upcoming', grade: '-- /200 Final grade' },
  ];

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Typography variant="h6" sx={{ textAlign: 'center', padding: 1 }}>
          My Assignments
        </Typography>
       
      </AppBar>
      <TableContainer component={Paper} sx={{ marginTop: 2 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Task</TableCell>
              <TableCell>Timestamp</TableCell>
              <TableCell>Progress</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {assignments.map((assignment, index) => (
              <TableRow key={index}>
                <TableCell>{assignment.title}</TableCell>
                <TableCell>{assignment.timestamp}</TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CircularProgress variant="determinate" value={assignment.progress} />
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={assignment.tag} />
                </TableCell>
                <TableCell>{assignment.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default MyAssignments;
