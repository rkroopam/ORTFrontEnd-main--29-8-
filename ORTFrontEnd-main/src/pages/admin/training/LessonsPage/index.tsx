import React, { useEffect, useState, useRef } from "react";
import {
  // Card,
  // CardContent,
  Typography,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemText,
  // TextField,
  // Button,
  Box,
  // Checkbox,
  LinearProgress,
} from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import DoneIcon from "@mui/icons-material/Done";
import LockIcon from "@mui/icons-material/Lock";

const sections = [
  { title: "What is Interaction Design", completed: true },
  { title: "Motion in UI Design", completed: true },
  { title: "Fundamentals of Web Design", completed: false },
  { title: "Improving Visual Skills", completed: false },
  { title: "Finding Inspiration", completed: false },
];

const LessonPage = () => {
  const location = useLocation()?.state?.lesson;
  console.log("location: ", location);
  const [data, setData] = useState(location || []);
  const [videoCourse, setVideoCourse] = useState(location.video[0].url || "");
  const videoRef = useRef<HTMLVideoElement>(null);

  const completedSections = data?.video?.filter(
    (section: any) => section.status == true
  ).length;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoCourse]);

  return (
    <Box sx={{ padding: "0px 16px",  }}>
     <Typography variant="h5" sx={{ marginBottom: 2 }}>
              Masterclass: Designing for web
            </Typography>
      <Grid container spacing={2} >
        <Grid item xs={12} lg={8} sm={12} md={8} textAlign={"left"}>
          
          {/* <Typography variant="h6" sx={{ marginTop: 2 }}>
            Title: {data?.title}
          </Typography>
          <Typography variant="subtitle1" color="gray">
            Course Category: {data?.category}
          </Typography> */}
          <Box sx={{ position: "relative",borderRadius:5   }}>
            <video
              key={videoCourse} // Force re-render by changing key
              poster={data?.image}
              controls
              ref={videoRef}
              style={{ width: "90%", borderRadius:5,height:"60vh", minHeight: "300px", maxHeight: "600px"}}
            >
              <source src={videoCourse} type="video/mp4" />
            </video>
            <IconButton
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                opacity: 0,
                transition: "opacity 0.3s",
                "&:hover": { opacity: 1 },
                
              }}
            >
              <PlayCircleOutline fontSize="large" />
            </IconButton>
          </Box>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Title: {data?.title}
          </Typography>
          <Typography variant="subtitle1" color="gray">
            Course Category: {data?.category}
          </Typography>
        </Grid>
        <Grid item xs={12} lg={4} sm={12} md={4} style={{}}>
          <Box sx={{ padding: "0px 16px",borderLeft:"1px solid black", height:"100%",  }}>
            
            <Typography variant="subtitle1" sx={{ marginBottom: 2 }}>
              {completedSections}/{data?.video?.length} COMPLETED
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(completedSections / data?.video?.length) * 100}
              sx={{ marginBottom: 2 }}
            />
            <List>
              {data?.video?.map((section: any, index: any) => (
                <ListItem
                  key={index}
                  sx={{ display: "flex", alignItems: "center" }}
                >
                  <ListItemText
                    primary={"video"}
                    onClick={() => setVideoCourse(section?.url)}
                  />
                  {section.status ? (
                    <DoneIcon sx={{ color: "green" }} />
                  ) : (
                    <LockIcon sx={{ color: "gray" }} />
                  )}
                </ListItem>
              ))}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LessonPage;
