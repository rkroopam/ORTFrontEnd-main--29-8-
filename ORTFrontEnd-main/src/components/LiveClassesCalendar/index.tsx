import React from 'react';
import { Button, Card, CardHeader, Typography, IconButton, Paper } from '@mui/material';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { styled } from '@mui/system';

const CalendarContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    width: '100%',
    padding: theme.spacing(1),
  },
}));

const CalendarHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const CalendarGrid = styled('div')(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: theme.spacing(1),
  textAlign: 'center',
}));

const DayCell = styled('div')(({ theme, isSelected }: any) => ({
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: isSelected ? '#2196F3' : 'transparent',
  color: isSelected ? '#fff' : 'inherit',
  cursor: 'pointer',
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const LiveClassesCalendar = () => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1); // Simple array of days
  const selectedDate = 18;

  return (
    <Paper elevation={5} sx={{  maxWidth: '330px', margin: '0 auto' }}>
      <CalendarContainer>
        <CalendarHeader>
          <IconButton aria-label="previous month">
            <ChevronLeft />
          </IconButton>
          <Typography variant="h6">December 2020</Typography>
          <IconButton aria-label="next month">
            <ChevronRight />
          </IconButton>
        </CalendarHeader>
        <CalendarGrid>
          {days.map(day => (
            <DayCell key={day} >
              {day}
            </DayCell>
          ))}
        </CalendarGrid>
        <Card>
          <CardHeader
            title="Flat Illustration Intro"
            titleTypographyProps={{ variant: 'h6', }}
          />
          <Typography variant="body2" sx={{ textAlign: 'center', margin: 2 }}>
            09:00 pm
          </Typography>
          <Button variant="contained" color="primary" fullWidth>
            Live now
          </Button>
        </Card>
      </CalendarContainer>
    </Paper>
  );
};

export default LiveClassesCalendar;
