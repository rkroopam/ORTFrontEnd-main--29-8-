import React from 'react';
import { Grid, Card, CardContent, Typography, IconButton, Box } from '@mui/material';
import { ArrowBack, ArrowForward } from '@mui/icons-material';

const Calendar = () => {
  const days = ['17', '18', '19', '20', '21', '22'];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
      <Card sx={{ width: '100%', maxWidth: 400, boxShadow: 3, borderRadius: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <IconButton>
              <ArrowBack />
            </IconButton>
            <Typography variant="h6">February 2023</Typography>
            <IconButton>
              <ArrowForward />
            </IconButton>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            {days.map((day, index) => (
              <Grid item xs key={index}>
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '50%',
                    border: '1px solid grey',
                    backgroundColor: day === '20' ? 'blue' : 'transparent',
                    color: day === '20' ? 'white' : 'grey',
                  }}
                >
                  {day}
                </Box>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Calendar;
