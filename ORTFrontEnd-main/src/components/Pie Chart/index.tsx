import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Pie } from 'react-chartjs-2';

const pieData = {
  labels: ["Red", "Blue", "Yellow", "Green"],
  datasets: [
    {
      data: [300, 50, 100, 75],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const PieChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Distribution
        </Typography>
        <Pie data={pieData} />
      </CardContent>
    </Card>
  );
};

export default PieChart;
