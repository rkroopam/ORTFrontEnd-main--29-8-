import React from "react";
import { Container, Grid, Typography, Button, Box } from "@mui/material";
import { styled } from "@mui/system";
import landingImage from "../../assets/images/landingPageImages/educator-img33.png"; // Replace with your image path
import WhyStudentChooseUs from "./WhyStudentsChooseUs";
import BestTeachers from "./bestTeachers";
import MostFeaturedCourses from "./mostFeaturedCourses";
import OurBestFeatures from "./ourBestFeatures";

const HomePage = () => {
  return (
    <Box>
      <Box sx={{ flexGrow: 1, bgcolor: "#41246D", p: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            {/* Left side content */}
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  height: "100%",
                }}
              >
                <Typography
                  variant="h2"
                  gutterBottom
                  sx={{ color: "white", fontWeight: "800", textAlign: "left" }}
                >
                  Providing Best Education For Brighter future
                </Typography>
                <Typography
                  variant="body1"
                  paragraph
                  sx={{ color: "white", textAlign: "left" }}
                >
                  Per sed, mattis. Integer viverra euismod maecenas incidunt,
                  phasellus consequatur aliquam nihil temporibus in assumens
                  deserunt convallis. Inceptos per consectetur consequatur
                  proin.
                </Typography>
                <Box sx={{ display: { alignItems: "left", md: "flex" } }}>
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: "18px", padding: "14px 20px" }}
                  >
                    <Typography sx={{ fontSize: "15px" }}>
                      Join Us Now
                    </Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>

            {/* Right side image */}
            <Grid item xs={12} md={6}>
              <ImageContainer>
                <img
                  src={landingImage}
                  alt="Landing"
                  style={{
                    maxWidth: "100%",
                    height: "auto",
                    display: "block",
                    borderRadius: "8px",
                  }}
                />
              </ImageContainer>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <WhyStudentChooseUs />
      <MostFeaturedCourses />
      <OurBestFeatures />
      <BestTeachers />
    </Box>
  );
};

// Custom styled component for the image container
const ImageContainer = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
}));

export default HomePage;
