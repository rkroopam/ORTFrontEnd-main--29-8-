import React from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const CircularProgressWithLabel = ({
  value,
}: {
  value: number;
  label: string;
}) => {
  return (
    <Box
      position="relative"
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress
        variant="determinate"
        value={100}
        size={150}
        sx={{ color: "grey.300" }}
      />
      <CircularProgress
        variant="determinate"
        value={value}
        size={150}
        sx={{ color: "primary.main", position: "absolute" }}
      />
      <Box
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* Optional content or labels */}
      </Box>
    </Box>
  );
};

const MyProgress = () => {
  return (
    <Paper elevation={8} sx={{ padding: 2, maxWidth: "350px" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={2}
          alignItems="center"
          sx={{ display: "flex", flexDirection: "column" }}
        >
          <Grid item xs={12} sm={6} md={4}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="center"
            >
              <Box
                position="relative"
                display="flex"
                flexDirection="row"
                alignItems="center"
              >
                <CircularProgressWithLabel value={70} label="Completed" />
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                    ml: 2,
                  }}
                >
                  <Typography variant="caption" color="textSecondary">
                    {`70% Completed`}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {`20% Progress`}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {`10% Start`}
                  </Typography>
                </Box>
                <Box
                  position="absolute"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    top: "50%",
                    left: "30%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Typography variant="h6" component="div">
                    24
                  </Typography>
                  <Typography variant="subtitle1" component="div">
                    Courses
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Box sx={{display:"flex", alignItems:"center",
                  justifyContent:"center"
              }}>
            <Grid item xs={12} sm={12} md={6}>
              <Box textAlign="center" mt={2}>
                <Typography variant="h6">Illustration Class</Typography>
                <Typography variant="body2">5 Courses left</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={6} ml={5}>
              <Box display="flex" flexDirection="column" alignItems="center">
                <Box mt={2}>
                  <IconButton color="primary">
                    <PlayArrowIcon />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>
    </Paper>
  );
};

export default MyProgress;
