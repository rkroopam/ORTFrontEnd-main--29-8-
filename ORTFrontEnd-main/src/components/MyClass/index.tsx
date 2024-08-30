import React from 'react';
import { Box, Card, CardContent, Typography, Button, Grid, IconButton } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import WebIcon from '@mui/icons-material/Web';
import CodeIcon from '@mui/icons-material/Code';

const MyClass = () => {
  const courses = [
    { title: 'Illustration Class', subtitle: '24 Course', icon: <ArrowDownwardIcon />, buttonText: 'View course' },
    { title: 'Website Design', subtitle: '46 Course', icon: <WebIcon />, buttonText: 'View course' },
    { title: 'Coding with CSS', subtitle: '50 Course', icon: <CodeIcon />, buttonText: 'View course' },
  ];

  return (
    <Box sx={{ flexGrow: 1, padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">My Class</Typography>
        <Button variant="text">View all</Button>
      </Box>
      <Grid container spacing={2}>
        {courses.map((course, index) => (
          <Grid item xs={12} key={index}>
            <Card>
              <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton>{course.icon}</IconButton>
                  <Box ml={2}>
                    <Typography variant="h6">{course.title}</Typography>
                    <Typography color="textSecondary">{course.subtitle}</Typography>
                  </Box>
                </Box>
                <Button variant="contained">{course.buttonText}</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyClass;
