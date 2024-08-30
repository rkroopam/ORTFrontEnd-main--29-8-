import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Doughnut } from 'react-chartjs-2';

const doughnutData = {
  labels: ["Red", "Blue", "Yellow"],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

const DoughnutChart = () => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Expenses
        </Typography>
        <Doughnut data={doughnutData} />
      </CardContent>
    </Card>
  );
};

export default DoughnutChart;
