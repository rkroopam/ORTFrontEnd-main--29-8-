import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from "@mui/material";
import { AudioVisualizer, } from 'react-audio-visualize';
import { useTheme } from '@mui/material';

interface Option {
  option: string;
  isCorrect: boolean;
}

interface QuestionProps {
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
  question,
  onNext,
  onPrevious,
  onQuit,
  isFirst,
  isLast,
  currentQuestionIndex,
  totalQuestions,
}) => {
  const [blob, setBlob] = useState<Blob>();
  const [blobUrl, setBlobUrl] = useState<string>();
  const theme = useTheme();
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const fetchAudioBlob = async () => {
    try {
      const response = await fetch("audio/sample-audio.wav");
      if (response.ok) {
        const blob = await response.blob()
        const blobUrl = URL.createObjectURL(blob);
        setBlob(blob)
        setBlobUrl(blobUrl)
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAudioBlob();
  }, [])

  return (
    <Box className="question" sx={{ padding: "20px 0px",minHeight:"100vh",
      height:"auto" }}>
      {blob && (
        <AudioVisualizer
          blob={blob}
          width={300}
          height={75}
          barWidth={5}
          gap={5}
          barColor={theme.palette.primary.main}
        />
      )}
      <Box mt={2} >
        {blobUrl && (
          <audio controls src={blobUrl} />
        )}
      </Box>
      {/* Options */}
      <Grid container spacing={2} mt={5}>
        {question.options.map((option, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card
              variant="outlined"
              sx={{ width: "100%", borderRadius: "5px", borderWidth: "1px" }}
            >
              <CardContent>
                <Typography sx={{ fontFamily: "Cadman" }}>
                  {option.option}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box mt={10}>
        <Box mb={2}>
          <Typography variant="caption" fontWeight="bold">
            Progress: {Math.round(progress)}%
          </Typography>
        </Box>
        <LinearProgress variant="determinate" value={progress} />
      </Box>
      {/* Navigation Buttons */}
      <Box display="flex" justifyContent="space-between" mt={8}>

        <Box display="flex">
          <Button
            variant="outlined"
            color="primary"
            onClick={onQuit}
          >
            Quit
          </Button>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Button
            variant="contained"
            color="primary"
            onClick={onPrevious}
            disabled={isFirst}
            style={{
              marginRight: 20
            }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={onNext}
          >
            {isLast ? "Submit" : "Next"}
          </Button>
        </Box>


      </Box>
    </Box>
  );
};

export default Question;
