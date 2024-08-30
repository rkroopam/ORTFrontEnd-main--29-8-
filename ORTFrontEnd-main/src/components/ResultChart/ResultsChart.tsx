import React from "react";
import { Box, Typography, Grid } from "@mui/material";

const BarChart = () => {
  const trials = [1, 2, 3, 4, 5, 6, 7, 8];
  const data = [12000, 12000, 12000, 12000, 1300, 12000, 12000, 1300]; // Example data with larger values

  const maxDataValue = Math.max(...data);
  const chartMaxHeight = 300; // Maximum height in pixels for the tallest bar

  // Find indices where the data is max, indicating where the trapezium bar will be shown
  const maxIndices = trials
    .map((_, index) => (data[index] === maxDataValue ? index : -1))
    .filter((index) => index !== -1);

  // Determine exactly three consecutive max value indices
  const threeConsecutiveMaxIndices:any = [];
  for (let i = 0; i < maxIndices.length - 2; i++) {
    if (
      maxIndices[i + 1] === maxIndices[i] + 1 &&
      maxIndices[i + 2] === maxIndices[i] + 2
    ) {
      threeConsecutiveMaxIndices.push(maxIndices[i], maxIndices[i + 1], maxIndices[i + 2]);
      i += 2; // Skip the next two indices since we've already counted them
    }
  }

  return (
    <Box
      sx={{
        width: "100%", // Responsive width
        maxWidth: 700,
        height: "auto",
        border: "2px solid #ccc",
        borderRadius: 1,
        bgcolor: "lightyellow",
        padding: 2,
        display: "flex",
        justifyContent: "space-between",
        position: "relative",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          width: "92%",
          height: "100px",
          border: "1px solid black",
          display: "flex",
          justifyContent: "center",
          marginLeft: "5%",
        }}
      ></Box>

      {/* Y-axis Labels */}
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
          }}
        >
          {[100, 80, 60, 40, 20, 0].map((percent) => (
            <Typography key={percent} variant="body2" sx={{ color: "#555" }}>
              {percent}%
            </Typography>
          ))}
        </Box>

        <Box
          sx={{
            border: "1px solid #888",
            display: "flex",
            flexDirection: "column",
            width: "92%",
            position: "relative",
          }}
        >
          {/* X-axis Labels and Bars */}
          <Grid
            container
            sx={{ height: "100%", zIndex: 1 }}
            alignItems="flex-end"
          >
            {trials.map((trial, index) => {
              const normalizedHeight =
                (data[index] / maxDataValue) * chartMaxHeight;
              const isMaxValue = data[index] === maxDataValue;
              const showAdditionalBar =
                threeConsecutiveMaxIndices.includes(index);

              return (
                <Grid
                  item
                  xs
                  key={trial}
                  sx={{
                    textAlign: "center",
                    position: "relative",
                  }}
                >
                  {/* Conditionally render Trapeziumbar if it reaches 100% */}
                  {isMaxValue && (
                    <Box
                      sx={{
                        width: "50px",
                        height: "50px",
                        bgcolor: "green",
                        clipPath:
                          "polygon(12% 75%, 89% 75%, 100% 100%, 0% 100%)",
                        position: "absolute",
                        top: "-60px", // Adjust as necessary to position above the bar
                        left: "50%",
                        transform: "translateX(-50%)",
                      }}
                    />
                  )}

                  {/* Show additional bar only if exactly three consecutive Trapeziumbars are present */}
                  {showAdditionalBar && index === threeConsecutiveMaxIndices[1] && (
                    <Box
                      sx={{
                        position: "absolute",
                        top: "-75px", // Adjust to position above the Trapeziumbar
                        left: "-100%", // Adjust to cover the width of three consecutive bars
                        width:"100%", // Adjust to cover the width of three consecutive bars
                        height: "10px",
                        bgcolor: "green",
                        zIndex: 1,
                        border: "1px solid #888",
                      }}
                    />
                  )}

                  <Box
                    sx={{
                      width: "30%",
                      height: `${normalizedHeight}px`,
                      bgcolor: "#5BC8DB",
                      margin: "0 auto",
                      borderRadius: "40px",
                      position: "relative",
                      zIndex: 1000,
                    }}
                  />
                  <Typography
                    variant="body2"
                    sx={{ borderTop: "1px solid #888" }}
                  >
                    {trial}
                  </Typography>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

const ResultsChart = () => {
  return (
    <Box
      sx={{ p: 0, width: "100%", display: "flex", justifyContent: "center" }}
    >
      <BarChart />
    </Box>
  );
};

export default ResultsChart;
