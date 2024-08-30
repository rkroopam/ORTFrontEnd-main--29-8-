import * as React from "react";
import {
  Avatar,
  Box,
  Button,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import XIcon from "@mui/icons-material/X";
import { pink } from "@mui/material/colors";
const BestTeachers = () => {
  const teacherList = [
    {
      name: "William Smith",
      profileImg: "/teacher1.png",
      designation: "Science Professor",
      socialMedia: [
        { title: "whatsapp", url: "" },
        { title: "facebook", url: "" },
        { title: "twitter", url: "" },
      ],
    },
    {
      name: "Emma Johnson",
      profileImg: "/teacher1.png",
      designation: "Math Teacher",
      socialMedia: [
        { title: "whatsapp", url: "" },
        { title: "facebook", url: "" },
        { title: "twitter", url: "" },
      ],
    },
    {
      name: "Daniel Brown",
      profileImg: "/teacher1.png",
      designation: "History Lecturer",
      socialMedia: [
        { title: "whatsapp", url: "" },
        { title: "facebook", url: "" },
        { title: "twitter", url: "" },
      ],
    },
    {
      name: "Daniel Brown",
      profileImg: "/teacher1.png",
      designation: "History Lecturer",
      socialMedia: [
        { title: "whatsapp", url: "" },
        { title: "facebook", url: "" },
        { title: "twitter", url: "" },
      ],
    },
  ];

  return (
    <Box sx={{ backgroundColor: "#F8F8F8" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          gap: 1,
          padding: 1,
          mr: 10,
          ml: 10,
        }}
      >
        <Typography gutterBottom variant="h4" fontWeight="600" component="div">
          Meet Our Best Teachers
        </Typography>
        <Box sx={{ display: { alignItems: "left", md: "flex" } }}>
          <Button
            variant="contained"
            color="secondary"
            sx={{ borderRadius: "18px", padding: "12px 18px" }}
          >
            <Typography sx={{ fontSize: "15px" }}>All Team Member </Typography>
          </Button>
        </Box>
      </Box>
      <Grid container spacing={2}>
        {teacherList?.map((teacher, index) => (
          <Grid item lg={3} md={3} sm={6} xs={6} key={index}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box
                sx={{
                  p: 1,
                  width: { sx: "80px", md: "180px" },
                  border: "1px solid #00000015",
                  borderRadius: "50%",
                  backgroundColor: "white",
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <CardMedia
                  component="img"
                  alt="teacher"
                  sx={{
                    borderRadius: "50%",
                    boxShadow: "inset 0px 2px 15px #00000050",
                    transition: "transform 0.3s ease-in-out",
                    width: { sx: "80px", md: "180px" },
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                  image={teacher.profileImg}
                />
              </Box>
            </Box>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {teacher.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {teacher.designation}
              </Typography>
            </CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 1,
                padding: 1,
              }}
            >
              {teacher.socialMedia.map((social, index) => (
                <Avatar
                  key={index}
                  sx={{
                    bgcolor: pink[500],
                    transition: "transform 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                >
                  {social.title === "facebook" && (
                    <FacebookIcon fontSize="small" />
                  )}
                  {social.title === "whatsapp" && (
                    <WhatsAppIcon fontSize="small" />
                  )}
                  {social.title === "twitter" && <XIcon fontSize="small" />}
                </Avatar>
              ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BestTeachers;
