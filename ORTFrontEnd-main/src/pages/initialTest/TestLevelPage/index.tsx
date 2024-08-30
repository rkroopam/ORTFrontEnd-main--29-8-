import {
  Box,
  Container,
  Grid,
  IconButton,
  Typography,
  Button,
  Paper,
  DialogTitle,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { testLevels } from "../../../utils/data";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import DoneRoundedIcon from "@mui/icons-material/DoneRounded";
import Question from "./questions"; // Import the Question component
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import CustomDialog from "../../../common/CustomDialog";
import GreatJobPage from "../GreatJobPage";
import { BackgroundContainer } from "../../../components/BackgroundContainer";

const TestLevelPage = () => {
  const [closeLevel, setCloseLevel] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currenLevel, setCurrentLevel] = useState("");
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<
    number | null | any
  >(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | any
  >(0);
  const [completedLevels, setCompletedLevels] = useState<Set<number> | any>(
    new Set()
  );
  const [selectedCardIndex, setSelectedCardIndex] = useState<any | null>(null);
  const navigate = useNavigate();

  const currentLevel: any =
    selectedLevelIndex !== null ? testLevels[selectedLevelIndex] : null;
  const currentQuestion = currentLevel
    ? currentLevel.questions[currentQuestionIndex]
    : null;

  const handleLevelSelect = (index: number) => {
    if (index === 0 || completedLevels.has(index - 1)) {
      setSelectedLevelIndex(index);
      setCurrentQuestionIndex(0);
    }
  };

  const handleNext = () => {
    setSelectedCardIndex(-1);
    if (currentQuestion && currentLevel) {
      if (currentQuestionIndex < currentLevel.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else if (selectedLevelIndex < testLevels.length - 1) {
        setCompletedLevels(new Set([...completedLevels, selectedLevelIndex]));
        setSelectedLevelIndex(null);
        setCurrentQuestionIndex(0);
        setDialogOpen(true);
      } else {
        setCompletedLevels(new Set([...completedLevels, selectedLevelIndex]));
        setSelectedLevelIndex(null);
        setDialogOpen(true);
      }
    }
  };

  const handleCardClick = (index: number) => {
    setSelectedCardIndex(index); // Update the selected card index
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (selectedLevelIndex > 0) {
      setSelectedLevelIndex(selectedLevelIndex - 1);
      setCurrentQuestionIndex(
        testLevels[selectedLevelIndex - 1].questions.length - 1
      );
    }
  };

  const isLevelCompleted = (index: number) => completedLevels.has(index);
  const onClose = () => {
    setSelectedLevelIndex(null);
    setCloseLevel(false);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setSelectedLevelIndex(null);
  };

  const isFinalLevel = completedLevels.size === testLevels.length;

  const handleResultClick = () => {
    if (isFinalLevel) {
      navigate("/test-result-page");
    } else {
      handleDialogClose();
    }
  };

  const Contain = (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      height="100%"
      p={3}
    >
      <DialogTitle id="alert-dialog-title">Stop This Test?</DialogTitle>
      <Typography sx={{ marginBottom: 2 }}>
        We will save your progress
      </Typography>

      <Box display="flex" justifyContent="center" gap={2}>
        <Button variant="contained" color="primary" onClick={onClose}>
          Yes, Stop this test
        </Button>
        <Button variant="contained" color="primary" onClick={onClose} autoFocus>
          No, keep going
        </Button>
      </Box>
    </Box>
  );

  return (
    <BackgroundContainer type={"test"}>
      <Container component="main" maxWidth="md" sx={{ display:"flex", justifyContent:"center", alignItems:"center", paddingBottom:"70px"}} >
        {/* <Paper elevation={3} style={{
          padding: "20px 32px 32px 32px", 
        }} > */}
          {selectedLevelIndex === null ? (
            <Grid container spacing={4}>
              {testLevels.map((data, index) => (
                <Grid item key={index} md={6} xs={12} sm={6}>
                  <Box
                    sx={{
                      backgroundColor: isLevelCompleted(index)
                        ? "white"
                        : "#007A4B",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px",
                      cursor: isLevelCompleted(index) ? "default" : "pointer",
                      borderRadius: 3,
                      border: "1px solid",
                      borderColor: isLevelCompleted(index) ? "#ddd" : "#007A4B",
                    }}
                    onClick={() => {handleLevelSelect(index); setCurrentLevel(data?.level)}}
                  >
                    <Typography
                      sx={{
                        color: isLevelCompleted(index) ? "black" : "white",
                        fontWeight: "bold",
                        fontFamily: "Cadman",
                      }}
                    >
                      {data.level}
                    </Typography>
                    <Box>
                      <IconButton>
                        {isLevelCompleted(index) ? (
                          <DoneRoundedIcon
                            sx={{
                              color: isLevelCompleted(index) ? "black" : "white",
                              fontFamily: "Cadman",
                            }}
                            fontSize="large"
                          />
                        ) : (
                          <PlayArrowRoundedIcon
                            sx={{
                              color: isLevelCompleted(index) ? "black" : "white",
                              fontFamily: "Cadman",
                            }}
                            fontSize="large"
                          />
                        )}
                      </IconButton>
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box >
              {currentQuestion && (
                <>
                <Typography variant="h5">{currenLevel}</Typography>
                <Question
                  question={currentQuestion}
                  // selectedCardIndex={selectedCardIndex}
                  // handleCardClick={handleCardClick}
                  onNext={handleNext}
                  onPrevious={handlePrevious}
                  onQuit={() => setCloseLevel(true)}
                  isFirst={selectedLevelIndex === 0 && currentQuestionIndex === 0}
                  isLast={
                    selectedLevelIndex === testLevels.length - 1 &&
                    currentQuestionIndex === currentLevel.questions.length - 1
                  }
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={currentLevel.questions.length}
                />
                </>
              )}
            </Box>
          )}
        {/* </Paper> */}
        <CustomDialog open={closeLevel} onClose={onClose} content={Contain} />
        <CustomDialog
          open={dialogOpen}
          onClose={handleDialogClose}
          content={
            <GreatJobPage
              onClick={handleResultClick}
              isFinalLevel={isFinalLevel}
            />
          }
        />
      </Container>
     </BackgroundContainer>
  );
};

export default TestLevelPage;
