import React, { useEffect, useState } from "react";
import { Typography, Grid, Container, Box, Button } from "@mui/material";
import { setCookie } from "../../../utils/commonFunction/utilities";

const courses = [
  { id: 1, title: "Auditory visual match", status: "complete" },
  { id: 2, title: "Visual Match", status: "complete" },
  { id: 3, title: "Sound Match", status: "pending" },
  { id: 4, title: "Sound Match segmenting", status: "pending" },
  { id: 5, title: "Letter sound match", status: "pending" },
  { id: 6, title: "Letter sound match segmenting", status: "complete" },
  { id: 7, title: "Sound letter match", status: "active" }, // Example active course
  { id: 8, title: "Sound letter match segmenting", status: "active" }, // Example active course
  // Add more courses as needed
  {id:9, title:"Comprehension", status: "complete" },

];

const HistoryPage = () => {
  const [filter, setFilter] = useState("all");

  useEffect(()=>{
    console.log("cookie set")
    setCookie('username', 'JohnDoe',2);
  },[])
  const filteredCourses =
    filter === "all"
      ? courses
      : courses.filter((course) => course.status === filter);

  const renderLessonCards = (courses: any) =>
    courses.map((course: any) => (
      <Grid item xs={12} sm={6} md={3} key={course.id}>
        <Box
          sx={{
            boxShadow: 2,
            borderRadius: 1,
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "column",
            overflow: "hidden",
          }}
        >
          <Box sx={{display:"flex", justifyContent:"center", textAlign:"center"}}>
            <Typography variant="h6" component="div" sx={{fontSize:"1rem"}}>
              {course.title}
            </Typography>
          </Box>
          <Box
            sx={{
              padding:'5px 0px',
              boxShadow:
                "0px -1px 5px rgba(0, 0, 0, 0.10), inset 0px 1px 2px rgba(0, 0, 0, 0.10)",
              // mt: 2,
              backgroundColor:
                course.status === "complete"
                  ? "#16A24A"
                  : course.status === "pending"
                  ? "#ffbf4b"
                  : "#5353ff",
            }}
          >
            <Typography variant="body2" color={"white"}>
              {course.status}
            </Typography>
          </Box>
        </Box>
      </Grid>
    ));

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        History
      </Typography>
      <Box mb={2} sx={{ textAlign: "end" }}>
        {["all", "complete", "pending", "active"].map((item) => (
          <Button
            variant={item == filter ? "contained" : "outlined"}
            onClick={() => setFilter(item)}
            sx={{ mr: 1 }}
          >
            {item}
          </Button>
        ))}
      </Box>

      <Box my={4}>
        <Typography variant="h5" gutterBottom>
          {filter === "all"
            ? "All Lessons"
            : filter.charAt(0).toUpperCase() + filter.slice(1) + " Courses"}
        </Typography>
        <Grid container spacing={2}>
          {renderLessonCards(filteredCourses)}
        </Grid>
      </Box>
    </Container>
  );
};

export default HistoryPage;
