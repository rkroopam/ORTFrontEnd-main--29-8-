// PerformanceChart.tsx
import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Line } from 'react-chartjs-2';

const lineData = {
  labels: ["Jan", "Feb", "Mar", "Apr"],
  datasets: [
    {
      label: "Performance",
      data: [65, 105, 75, 90],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
      tension: 0.4, // Adjust this value for more or less curve
    },
  ],
};

const PerformanceChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Performance
        </Typography>
        <Line data={lineData} />
      </CardContent>
    </Card>
  );
};

export default PerformanceChart;
