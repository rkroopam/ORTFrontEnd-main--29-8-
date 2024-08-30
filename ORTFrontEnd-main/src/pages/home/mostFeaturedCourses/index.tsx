import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import PeopleIcon from "@mui/icons-material/People";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const courses = [
  {
    title: "The Complete Advance Management Study",
    category: "Management",
    image:
      "	https://demo.bosathemes.com/html/educator/assets/img/educator-img30.jpg",
    rating: 4.5,
    students: 60,
    author: {
      name: "Prof. Sammy James",
      image: "assets/img/educator-img21.jpg",
    },
  },
  {
    title: "Advance Beginner's Goal & Managing Course",
    category: "Business",
    image:
      "https://demo.bosathemes.com/html/educator/assets/img/educator-img29.jpg",
    rating: 4,
    students: 55,
    author: {
      name: "Prof. Alison White",
      image: "assets/img/educator-img24.jpg",
    },
  },
  {
    title: "Advance Technology & Architecture Course",
    category: "Technology",
    image:
      "https://demo.bosathemes.com/html/educator/assets/img/educator-img31.jpg",
    rating: 4.7,
    students: 40,
    author: {
      name: "Prof. George Hobbs",
      image: "assets/img/educator-img25.jpg",
    },
  },
];

const CourseCard = ({ course }: any) => (
  <Grid item xs={12} sm={6} lg={4}>
    <Card sx={{ margin: 2, borderRadius: "15px" }}>
      <Box sx={{ position: "relative" }}>
        <CardMedia
          component="img"
          height="180"
          image={course.image}
          alt={course.title}
        />
        <IconButton
          sx={{ position: "absolute", top: 8, right: 8, color: "white" }}
          aria-label="bookmark"
        >
          <BookmarkBorderIcon />
        </IconButton>
        <Box
          sx={{
            position: "absolute",
            bottom: 8,
            left: 8,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            padding: "2px 8px",
            borderRadius: 1,
          }}
        >
          <Typography variant="body2" color="white">
            <a
              href="feature-course.html"
              style={{ color: "white", textDecoration: "none" }}
            >
              {course.category}
            </a>
          </Typography>
        </Box>
      </Box>
      <CardContent>
        <Typography variant="h6">
          <a
            href="course-detail.html"
            style={{ color: "inherit", textDecoration: "none" }}
          >
            {course.title}
          </a>
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Typography variant="body2" color="textSecondary">
            ({course.rating} ratings)
          </Typography>
          <Box
            sx={{
              ml: 1,
              position: "relative",
              width: "80px",
              height: "10px",
              backgroundColor: "#e0e0e0",
              borderRadius: "5px",
            }}
          >
            <Box
              sx={{
                width: `${(course.rating / 5) * 100}%`,
                height: "100%",
                backgroundColor: "#ffc107",
                borderRadius: "5px",
              }}
            />
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Avatar
            src={course.author.image}
            alt={course.author.name}
            sx={{ width: 24, height: 24, mr: 1 }}
          />
          <Typography variant="body2">{course.author.name}</Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <PeopleIcon fontSize="small" sx={{ mr: 0.5 }} />
          <Typography variant="body2">{course.students}+ students</Typography>
        </Box>
        <Button
          href="course-detail.html"
          variant="contained"
          color="primary"
          size="small"
          sx={{ mt: 2 }}
        >
          ENROLL COURSE <ArrowForwardIcon fontSize="small" sx={{ ml: 1 }} />
        </Button>
      </CardContent>
    </Card>
  </Grid>
);
const MostFeaturedCourses = () => {
  return (
    <Box>
      <Box
        sx={{
          backgroundColor: "#F8F8F8",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1,
            padding: 1,
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <Typography
            gutterBottom
            variant="h4"
            fontWeight="600"
            component="div"
          >
            Most Featured Courses
          </Typography>
          <Typography paragraph sx={{ textAlign: "center" }}>
            Saepe quo labore aenean dictumst expedita commodi auctor, nisl,
            lorem iusto feugiat nemo reiciendis laboris.
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1, p: 2 }}>
          <Grid container justifyContent="center" spacing={4}>
            {courses.map((course, index) => (
              <CourseCard key={index} course={course} />
            ))}
          </Grid>
        </Box>
        <Box
          sx={{
            display: {
              alignItems: "center",
              md: "flex",
              justifyContent: "center",
            },
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "18px", padding: "14px 20px" }}
          >
            <Typography sx={{ fontSize: "15px" }}>View All Courses </Typography>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MostFeaturedCourses;
