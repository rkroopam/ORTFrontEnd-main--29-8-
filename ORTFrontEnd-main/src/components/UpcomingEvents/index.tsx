import React from 'react';
import { Box, Typography, Card, CardContent, Grid, Paper } from '@mui/material';

const events = [
  { day: 'Sun', time: '9:30', label: 'Team Meeting', color: '#90ee90' }, // Light green
  { day: 'Tue', time: '11:30', label: 'Illustration', color: '#add8e6' }, // Light blue
  { day: 'Wed', time: '10:30', label: 'Research', color: '#ffb6c1' }, // Light pink
  { day: 'Thu', time: '12:00', label: 'Presentation', color: '#ffa07a' }, // Light orange
  { day: 'Sat', time: '9:30', label: 'Report', color: '#d3d3d3' }, // Light grey
];

const EventCard = ({ event }:any) => (
  <Card sx={{ backgroundColor: event.color, color: 'black',  width: '100%' }}>
    <CardContent>
      <Typography variant="h6" sx={{fontSize:"1rem"}}>{event.label}</Typography>
      <Typography variant="body2">{event.time}</Typography>
    </CardContent>
  </Card>
);

const UpcomingEvents = () => {
  return (
    <Paper elevation={5} sx={{  padding: 1,maxWidth:"300px" }}>
    <Box sx={{  padding: 1,maxWidth:"300px" }}>
      
      <Typography variant="h6" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Upcoming Events
      </Typography>
      <Grid container spacing={1} sx={{display:'flex',flexDirection:'column'}}>
        {events.map((event, index) => (
          <Grid item xs={12} sm={12} md={12} key={index}>
            <Typography variant="body2" >
              {event.day}
            </Typography>
            <EventCard event={event} />
          </Grid>
        ))}
      </Grid>
     
    </Box>
    </Paper>
  );
};

export default UpcomingEvents;
