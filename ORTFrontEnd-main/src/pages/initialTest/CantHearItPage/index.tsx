import React, { useState } from "react";
import { Container, Paper, Box, Typography, Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import HeadsetRoundedIcon from "@mui/icons-material/HeadsetRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import RemoveCircleRoundedIcon from "@mui/icons-material/RemoveCircleRounded";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { handlePlayAudio } from "../../../utils/commonFunction/utilities";
import { BackgroundContainer } from "../../../components/BackgroundContainer";

const CantHearItPage = () => {
  const navigate = useNavigate();
  const [audio] = useState(new Audio("/path/to/audio/file.mp3"));
  const theme = useTheme();

  const handleNext = () => {
    navigate("/regular-test-page");
  };
  const iconStyle = {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.light, 
    borderRadius: "50%",
    padding: "8px", 
    display: "inline-flex",
    alignItems: "center", 
    justifyContent: "center",
    marginRight: "10px",
  };

  const textData =[
    {text:"Make sure your device is not on mute.",icon:<VolumeUpIcon />},
    {text:"Check to see if your headphones are connected.",icon:<HeadsetRoundedIcon />},
    {text:"Adjust app sound settings in your devices settings menu.",icon: <SettingsRoundedIcon />},
    {text:"Turn off 'Do Not Disturb' mode.",icon:   <RemoveCircleRoundedIcon />},
    {text:"Reboot your device.",icon: <PowerSettingsNewRoundedIcon />},
  ]

  const [isaudioPlaying,setIsaudioPlaying] = useState(false)
    // Function to play the audio when the button is clicked
    const PlayAudio = () => {
      setIsaudioPlaying(false)
      handlePlayAudio(textData.map((data:any)=>data.text).join(","),  setIsaudioPlaying);
    };
  return (
    <BackgroundContainer>
    <Container component="main" maxWidth="md"  >
      <Paper elevation={3}>
        <Box p={4} mt={5} mb={4}>
          <Typography variant="h5" align="center">
            Can't Hear:
          </Typography>
          <Box mt={3}>
            {
             textData.map((data:any)=>(
              <Box mt={1}>
              <Typography
                variant="h6"
                paragraph
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box sx={iconStyle}>
                  {data.icon}
                </Box>
                {data.text}
              </Typography>
            </Box>
             )) 
            }
          </Box>
          <Box mt={3} display="flex" flexDirection="column" alignItems="center">
            <Button
              variant="contained"
              color="primary"
              onClick={PlayAudio}
              style={{ marginBottom: "16px",padding:"10px 20px",fontSize:"15px" }}
            >
              Tap to hear again
            </Button>
            <Button variant="contained" disabled={isaudioPlaying == false} sx={{padding:"10px 20px",fontSize:"15px" ,color:isaudioPlaying == false? "black !important" : "white"}} color="primary" onClick={handleNext}>
              I hear it
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
    </BackgroundContainer>
  );
};

export default CantHearItPage;
