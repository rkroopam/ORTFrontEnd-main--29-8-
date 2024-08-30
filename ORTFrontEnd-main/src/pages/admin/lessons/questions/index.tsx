import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import { AudioVisualizer } from "react-audio-visualize";
import { useTheme } from "@mui/material";
import useAudioBlob from "../../../../components/hooks/useAudioBlob";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';


interface Option {
  option: string;
  isCorrect: boolean;
}

interface QuestionProps {
  JSONData:any;
  handleCardClick:any;
  selectedCardIndex:any;
  question: {
    audioPath: string;
    options: Option[];
  };
  onNext: () => void;
  onPrevious: () => void;
  onQuit: () => void;
  isFirst: boolean;
  isLast: boolean;
  currentQuestionIndex: any;
  totalQuestions: any;
}

const Question: React.FC<QuestionProps> = ({
  JSONData,
  handleCardClick,
  selectedCardIndex,
  question,
  onNext,
  onPrevious,
  onQuit,
  isFirst,
  isLast,
  currentQuestionIndex,
  totalQuestions,
}) => {
  // const [blob, setBlob] = useState<Blob>();
  // const [blobUrl, setBlobUrl] = useState<string>();
  const theme = useTheme();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  const ref = useRef();

  const { blob, blobUrl, loading, error } = useAudioBlob(question?.audioPath);

  const questionAudioRef = useRef<HTMLAudioElement | null>(null);

  const handleQuestionAudioPlay = () => {
    if (questionAudioRef.current) {
      questionAudioRef.current.play();
    }
  };

  return (
    <Grid container
      className="question"
      spacing={1}
      sx={{  minHeight: "calc(100vh - 30vh)", height: "auto" }}
    >
      {/* <Typography>{level}</Typography> */}
      {/* Question */}
      <Grid item xs={5} sx={{display:"flex", alignItems:"center"}}>
        {["png", "jpeg", "jpg"].some((term) =>
          question?.audioPath?.toLowerCase()?.includes(term?.toLowerCase())
        ) ? (
          <img
            src={question?.audioPath}
            alt=""
            width="250"
            height={"250"}
            draggable={false}
            style={{ objectFit: "contain" }}
          />
        ) : ["mp3", "wav", "ogg"].some((term) =>
            question?.audioPath?.toLowerCase()?.includes(term?.toLowerCase())
          ) ? (
          <Box style={{display:"flex", flexDirection:"column", justifyContent:"center", alignItems:"center"}}>
            {/* {blob && (
              <AudioVisualizer
                blob={blob}
                width={300}
                height={75}
                barWidth={5}
                gap={5}
                barColor={theme.palette.primary.main}
              />
            )} */}
           
             {/* <Typography>Question: Lorem ipsum dolor sit amet consectetur adipisicing elit. </Typography> */}
             <Typography>Crab</Typography>
             <Box  id="playsound" mt={2}>{blobUrl && <audio ref={questionAudioRef} controls src="../../../../../public/audio/sample.mp3" />}</Box>
            <IconButton onClick={handleQuestionAudioPlay}> 
              <PlayCircleIcon sx={{color:"green"}} />
            </IconButton>
          
           
          </Box>
        ) : (
          <Typography
            variant="body1"
            sx={{ textTransform: "capitalize", fontWeight: "600" }}
          >
            {question.audioPath}
          </Typography>
        )}
      </Grid>
      {/* Options */}
      <Grid container xs={7} spacing={1} mt={2} sx={{ cursor: "pointer", borderLeft:"1px solid gray" }}>
        {question.options.map((option:any, index:any) => {
          const { blob: optionBlob, blobUrl: optionBlobUrl } = useAudioBlob(
            option.option
          );
          const audioRef = useRef<HTMLAudioElement>(null);

          const handlePlayAudio = () => {
            if (audioRef.current) {
              audioRef.current.play();
            }
          };

          const isSelected = selectedCardIndex === index;
          const [selectedQuestion, setSelectedQuestion] = useState(1);

  const handleButtonClick = (questionNumber:any) => {
    setSelectedQuestion(questionNumber);
    // Additional actions can be performed here when a question is selected
  };
          return (
            <Grid item xs={12} sm={4} md={4} key={index}>
              <Box
                onClick={() => {handleCardClick(index); console.log("data",option.isCorrect)}}
                sx={{
                  width: "100%",
                  borderRadius: "5px",
                  borderWidth: "1px",
                  borderColor: isSelected
                    ? theme.palette.primary.main
                    : "default",
                }}
              >
                <Box>
                  {["png", "jpeg", "jpg"].some((term) =>
                    option.option.toLowerCase().includes(term.toLowerCase())
                  ) ? (
                    <img
                      src={option.option}
                      alt=""
                      width="100"
                      height={"100"}
                      style={{ objectFit: "contain" ,padding:"5px"}}
                    />
                  ) : ["mp3", "wav", "ogg"].some((term) =>
                      option.option.toLowerCase().includes(term.toLowerCase())
                    ) ? (
                    optionBlobUrl ? (
                      <>
                        <Button
                          variant="contained"
                          onClick={handlePlayAudio}
                          disabled={!optionBlobUrl}
                        >
                          Play Sound {++index}
                        </Button>
                        <audio ref={audioRef} src={optionBlobUrl} />
                      </>
                    ) : (
                      <Typography>Loading audio...</Typography>
                    )
                  ) : (
                    <Typography>{option.option}</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          );
        })}
      </Grid>
     

    </Grid>
  );
};

export default Question;
