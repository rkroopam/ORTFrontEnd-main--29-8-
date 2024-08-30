// RadarChart.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Radar } from 'react-chartjs-2';

const radarData = {
  labels: ["Running", "Swimming", "Cycling", "Yoga"],
  datasets: [
    {
      label: "Weekly Activity",
      data: [120, 100, 80, 70],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
      borderWidth: 1,
    },
  ],
};

const RadarChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Weekly Activity
        </Typography>
        <Radar data={radarData} />
      </CardContent>
    </Card>
  );
};

export default RadarChart;
