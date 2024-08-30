// ActiveHoursChart.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Bar } from 'react-chartjs-2';

const barData = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  datasets: [
    {
      label: "Active Hours",
      data: [8, 6, 7, 5, 6, 4, 3],
      backgroundColor: "rgba(75, 192, 192, 0.6)",
      borderRadius: 10, // Curved top corners
      barThickness: 20,
    },
  ],
};

const ActiveHoursChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Active Hours
        </Typography>
        <Bar data={barData} />
      </CardContent>
    </Card>
  );
};

export default ActiveHoursChart;
