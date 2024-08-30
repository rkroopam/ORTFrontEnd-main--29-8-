import React, { useState } from "react";
import { Container, Paper, Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BackgroundContainer } from "../../../components/BackgroundContainer";
import { handlePlayAudio } from "../../../utils/commonFunction/utilities";

interface InstructionsPage2Props {
  title: string;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

const DisClaimerPage2 = () => {
  const [audio] = useState(new Audio("/audio/sample.mp3"));
  const navigate = useNavigate();
  const [isaudioPlaying, setIsaudioPlaying] = useState(false);
  const AllText = [
    "Find a quiet place so that you can focus on the sounds in the assessment.",
   " Remove all distractions like TV, games or other people talking. No distractions means a more accurate final score.",
    "Make sure the sound the sound is on. Our assessment only works if you can hear all the sounds.",
  ];

  const handleHearIt = () => {
    navigate("/regular-test-page");
  };
  const handleDontHearIt = () => {
    navigate("/cant-hearit-page");
  };

  
  const playAudio =  () => {
    setIsaudioPlaying(false);
    handlePlayAudio(AllText.join(","),  setIsaudioPlaying);
  };
  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <Box p={4} mt={5}>
            <Typography variant="h5" align="center">
              Before we start:
            </Typography>
            <Box mt={3}>
              {AllText.map((text: any, index: any) => (
                <>
                  <Typography variant="body1" mt={index == 0 ? 0 : 3}>
                    {text}
                  </Typography>
                </>
              ))}
              <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={playAudio} sx={{padding:"10px 20px",fontSize:"15px" }}>
                  Play sound to hear
                </Button>
              </Box>
            </Box>
            <Box mt={3} textAlign="center">
              <Typography variant="h6" gutterBottom>
                Did you hear the instructions?
              </Typography>
              <Button
                variant="contained"
                color="success"
                onClick={() => handleHearIt()}
                sx={{ mr: 2,padding:"10px 20px",fontSize:"15px" , color:isaudioPlaying == false? "black !important" : "white" }} // Margin right to add space between buttons
                disabled={isaudioPlaying == false}
                
              >
                I hear it
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{padding:"10px 20px",fontSize:"15px" , color:isaudioPlaying == false? "black !important" : "white"}}
                onClick={() => handleDontHearIt()}
                disabled={isaudioPlaying == false}
              >
                I don't hear it
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </BackgroundContainer>
  );
};

export default DisClaimerPage2;
