import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  LinearProgress,
  Grid,
  IconButton,
  Box,
} from "@mui/material";
import {  PlayArrow } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const courses = [
  {
    id: 1,
    category: "FRONTEND",
    title: "Beginner's Guide To Becoming A Professional Frontend Developer",
    progress: 124,
    video: [
     {id:1, status:true, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"},
     {id:2, status:false, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"},
     {id:3, status:false, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"},
    ],
    image:
      "https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/1673374796274-YA6P0Y5C14EVMBAWU3PU/pexels-pixabay-261909.jpg?format=100w",
  },
  {
    id: 2,
    category: "BACKEND",
    title: "Beginner's Guide To Becoming A Professional Backend Developer",
    progress: 27,
    video: [
      {id:1, status:true, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"},
      {id:2, status:false, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"},
      {id:3, status:false, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"},
     ],
    image:
      "https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/1673374796274-YA6P0Y5C14EVMBAWU3PU/pexels-pixabay-261909.jpg?format=100w",
  },
  {
    id: 3,
    category: "FRONTEND",
    title: "Beginner's Guide To Becoming A Professional Frontend Developer",
    progress: 67,
    image:
      "https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/1673374796274-YA6P0Y5C14EVMBAWU3PU/pexels-pixabay-261909.jpg?format=100w",
      video: [
        {id:1, status:true, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/SubaruOutbackOnStreetAndDirt.mp4"},
        {id:2, status:false, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4"},
        {id:3, status:false, url:"http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4"},
       ],
  },
];

const ContinueWatching = () => {
  const navigate = useNavigate();

  const goToLessonPage = (id: any, lesson: any) => {
    // Navigate to the specific lesson page using the course id
    navigate(`/student/training-page/${id}`, { state: { lesson } });
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
        Courses
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        
        <Grid container justifyContent="center">
          {courses?.map((course) => (
            <Card
              sx={{ maxWidth: 330, margin: 1, position: "relative" }}
              key={course?.id}
            >
              <CardMedia
                component="img"
                height="140"
                image={course?.image}
                alt={course?.title}
              />
              <CardContent>
                <Typography variant="subtitle1" color="textSecondary">
                  {course?.category}
                </Typography>
                <Typography variant="h6">{course?.title}</Typography>
                <LinearProgress
                  variant="determinate"
                  value={(course?.progress / 150) * 100}
                  sx={{ marginTop: 1 }}
                />
                <Typography variant="body2" color="textSecondary">
                  +{course.progress}
                </Typography>
                <IconButton
                  onClick={() => goToLessonPage(course.id, course)}
                  sx={{
                    backgroundColor: "lightgreen",
                    color: "green",
                    "&:hover": {
                      backgroundColor: "lightgreen",
                    },
                  }}
                >
                  <PlayArrow />
                </IconButton>
              </CardContent>
            </Card>
          ))}
        </Grid>
        
      </Box>
    </Box>
  );
};

export default ContinueWatching;
