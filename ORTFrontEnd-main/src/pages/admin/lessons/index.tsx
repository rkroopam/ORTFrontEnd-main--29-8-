import {
  Avatar,
  Box,
  Button,
  Card,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Typography,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveAnswers } from "../../../store/reducers/learnerSlice";
import useLessonCountdownTimer from "../../../components/hooks/useCountdownTimer";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useLocation, useNavigate } from "react-router-dom";
import CustomDialog from "../../../common/CustomDialog";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import { getTestDetails } from "../../../api/services/tests";
import { AudioVisualizer } from "react-audio-visualize";
import { useTheme } from "@emotion/react";
import useFullScreen from "../../../components/hooks/useFullSCreen";
import useAudioBlob from "../../../components/hooks/useAudioBlob";

const PlaySound = ({ audioURL }: { audioURL: any }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [blob, setBlob] = useState<Blob>();
  const [blobUrl, setBlobUrl] = useState<string>();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Effect to create a new audio object whenever the audio URL changes
  useEffect(() => {
    if (audioURL) {
      audioRef.current = new Audio(audioURL);
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null; // Clean up the audio object on unmount or when URL changes
      }
    };
    // fetchAudioBlob();
  }, [audioURL]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  const fetchAudioBlob = async () => {
    try {
      const audio:any=new Audio(audioURL);
      const response = await fetch(audio);
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
    <div>
      {/* <IconButton onClick={togglePlay} sx={{ width: "100px", height: "100px" }}>
        <VolumeUpIcon sx={{ color: "green", fontSize: "50px" }} />
      </IconButton> */}
      {blob && (
        <AudioVisualizer
          blob={blob}
          width={300}
          height={75}
          barWidth={5}
          gap={5}
          barColor="green"
        />
      )}
      <Box mt={2} >
        {blobUrl && (
          <audio controls src={blobUrl} />
        )}
      </Box>
    </div>
  );
};

const LessonsComponent = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  console.log("location lession", location);
  const theme = useTheme();
  const { enterFullScreen, errorF, exitFullScreen } = useFullScreen();

  const [data, setData] = useState<any>([]); // Initialize with an empty array
  const [loading, setLoading] = useState(true); // Add loading state
  const [questionProgress, setQuestionProgress] = useState(0);
  const navigate = useNavigate();
  const reduxFinalData = useSelector((state: any) => state.testAnswer.answers);
  const progress = (reduxFinalData.length / data.length) * 100;
  const token: any = localStorage.getItem("studentToken");
  const [currentOption, setCurrentOption] = useState<any>(-1);
  const [selectedAnswer, setSelectedAnswer] = useState<any>({});
  const [optionStatus, setOptionStatus] = useState<any>(null); // Track option status
  const [disabledOptions, setDisabledOptions] = useState<any[]>([]); // Track disabled options
  const [buffer, setBuffer] = React.useState(10);
  const [viewLessonResult, setViewLessonResult] = useState(false);
  const [audioUrl, setAudioUrl] = useState<any>("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<any>(0);
  const [currentData, setCurrentData] = useState<any>({});
  const [ExamTime, setExamTime] = useState<any>(0);
    const [blob, setBlob] = useState<Blob>();
    const [blobUrl, setBlobUrl] = useState<string>();
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

  console.log("audioUrl", audioUrl);

  console.log("reduxFinalData", reduxFinalData);
  // Fetch data from API
  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await getTestDetails(token, location?.state?.id);
        if (response) {
          setData(response?.data?.questionAssessments || []);
          const initialAudioUrl =
            response?.data?.questionAssessments[0]?.question
              ?.questionDescription?.audios[0].URL || "";
          setAudioUrl(initialAudioUrl);
          setExamTime(
            response.data.testSettings.perQuestionTimeoutMSecs / 1000
          );
          // setAudioUrl(response?.data?.questionAssessments[0]?.question?.questionDescription?.audios[0].URL)
        } else {
          console.error("No test data found");
        }
      } catch (error) {
        console.error("Failed to fetch test data:", error);
      } finally {
        setLoading(false); // Data fetching complete
      }
    };

    fetchTestList();
  }, [token, location.state.id]);
  // const ExamTime = 9; // Total exam time in seconds
  const { time, startTimer, stopTimer } = useLessonCountdownTimer(
    ExamTime,
    () => {
      if (data.length >= currentQuestionIndex) {
        console.log(
          "same",
          data.length - 1,
          reduxFinalData.length,
          data.length - 1 == reduxFinalData.length
        );
        console.log("same same", optionStatus);
        // if(currentData)dispatch(saveAnswers({ text: null, answer: false }));
        NextQuestion();
      } else {
        console.log(
          "not same",
          data.length,
          reduxFinalData.length,
          data.length == reduxFinalData.length
        );
        setViewLessonResult(true);
        stopTimer();
      }
      // dispatch(saveAnswers({ text: null, answer: false }));
    }
  );

  console.log("questionProgress", reduxFinalData.length, data.length);
  const timerProgress = ((ExamTime - time + 1) / ExamTime) * 100; // Calculate progress based on remaining time

  console.log("currentData", currentData);

  useEffect(() => {
    if (data.length >= 0) {
      setCurrentData(data[currentQuestionIndex]); // Only update when data is fetched
      // setAudioUrl(data[0])
      const questionAudioUrl: any =
        data[currentQuestionIndex]?.question?.questionDescription?.audios[0]
          ?.URL || "";
      setAudioUrl(questionAudioUrl);
      if (
        currentQuestionIndex !== 0 &&
        !selectedAnswer?.text &&
        data.length !== reduxFinalData
      )
        dispatch(saveAnswers({ text: null, answer: false }));
      startTimer(); // Start the timer once data is available
    }
  }, [currentQuestionIndex, data, startTimer]);

  useEffect(() => {
    if (!loading && data.length === 0) {
      console.log("No data available.");
      setViewLessonResult(true); // Show result if there's no data
      stopTimer();
    }
  }, [loading, data, stopTimer]);
  useEffect(() => {
    if (data.length !== 0 && data.length == reduxFinalData.length) {
      setViewLessonResult(true); // Show result if there's no data
      console.log("stoppingg 1");
      stopTimer();
      console.log("stoppingg 2");
    }
  }, [reduxFinalData.length]);

  useEffect(() => {
    // Cleanup previous audio if any
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = ""; // Clear the src to free up resources
      audioRef.current = null;
    }

    // Create a new Audio object with the new URL
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
    }

    return () => {
      // Cleanup on component unmount
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = "";
        audioRef.current = null;
      }
    };
  }, [audioUrl]);

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  console.log(currentQuestionIndex, "currentOptioncurrentOption");
  const handlePlayAudio = (url: any) => {
    setAudioUrl(url);
    togglePlayPause();
  };

  const audioRef: any = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const NextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setOptionStatus(null);
    setBuffer(10);
    setDisabledOptions([]);
    setAudioUrl("");
  };

  const handleOptionClick = (index: any, isCorrect: boolean, data: any) => {
    if (disabledOptions.includes(index)) return; // Prevent clicking on disabled options

    setCurrentOption(index);
    setSelectedAnswer({ text: data.text, answer: isCorrect });

    if (isCorrect) {
      setOptionStatus("correct");
      console.log("with correct answer", disabledOptions);
      setTimeout(() => {
        dispatch(
          saveAnswers({
            text: data.text,
            answer: isCorrect || false,
            attempt: disabledOptions.length ? disabledOptions.length : 0,
          })
        );
        NextQuestion();
      }, 1000); // Delay of 1 second
    } else {
      setOptionStatus("wrong");
      setDisabledOptions([...disabledOptions, index]); // Disable the selected option
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading indicator while data is being fetched
  }
  console.log("currentData", currentData);
  console.log("optionStatus", optionStatus);
  console.log("disabledOptions", disabledOptions);

  console.log(
    "currentData?.question?.questionDescription?.audios?.URL",
    currentData?.question?.questionDescription?.audios[0].URL
  );

  return (
    <>
      
      {data.length > 0 && (
        <Grid container sx={{ height: "100%", backgroundColor: "#F2F2F2" }}>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              variant="h2"
              position={"absolute"}
              top={0}
              right={0}
              p={5}
            >
              {time !== 0 && time}
            </Typography>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  gap: "10px",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                }}
              >
                <Box>
                  {currentData?.question?.questionDescription?.audios && (
                    <Box
                      sx={{
                        width: "auto",
                        height: "auto",
                        padding: "20px",
                        borderRadius: "5%",
                        // border: "4px solid #D3D3D3",
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexDirection: "column",
                      }}
                    >
                      <PlaySound audioURL={audioUrl} />
                    </Box>
                  )}
                  {!currentData?.question?.questionDescription?.audios && (
                    <Box
                      sx={{
                        width: "auto",
                        height: "auto",
                        padding: "10px 25px",
                        borderRadius: "5%",
                        backgroundColor: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: "bold" }}>
                        {currentData?.question?.questionDescription?.text}
                      </Typography>
                    </Box>
                  )}
                </Box>
                {data.length > currentQuestionIndex && (
                  <LinearProgress
                    variant="determinate"
                    value={timerProgress} // Set progress based on timer
                    sx={{
                      margin: "10px 0px 20px 0px",
                      height: "10px",
                      width: "450px",
                      backgroundColor: "white",
                      ".css-1wr6bps-MuiLinearProgress-bar1": {
                        backgroundColor: "#bbbbbb !important",
                        transition: "transform 1s linear !important",
                      },
                    }}
                  />
                )}
                <Box style={{ display: "flex", flexDirection: "column" }}>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      gap: "20px",
                      // marginTop: 5,
                    }}
                  >
                    {/* options */}
                    <Box sx={{ display: "flex", gap: "20px" }}>
                      {currentData?.question?.options &&
                        currentData?.question?.options?.map(
                          (data: any, index: any) => {
                            console.log("all options: " + data);
                            return (
                              <Box
                                sx={{
                                  display: "flex",
                                  flexDirection: "column",
                                }}
                                key={index}
                              >
                                <Card
                                  sx={{
                                    padding: "20px 40px",
                                    cursor: "pointer",
                                    border:
                                      currentOption === index
                                        ? optionStatus === "correct"
                                          ? "4px solid green"
                                          : optionStatus === "wrong"
                                          ? "4px solid red"
                                          : "1px solid green"
                                        : disabledOptions?.includes(index)
                                        ? "4px solid red"
                                        : "1px solid green",
                                    pointerEvents:
                                      disabledOptions?.includes(index) ||
                                      optionStatus === "correct"
                                        ? "none"
                                        : "auto",
                                    opacity: disabledOptions?.includes(index)
                                      ? 0.5
                                      : 1, // Visually disable the option
                                  }}
                                  onClick={() => {
                                    handleOptionClick(
                                      index,
                                      data.isCorrect,
                                      data
                                    );
                                  }}
                                >
                                  <Box
                                    sx={{
                                      display: "flex",
                                      flexDirection: "row",
                                      justifyContent: "space-between",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="h6"
                                      sx={{ fontWeight: "bold" }}
                                    >
                                      {!data?.audio && data?.text}
                                    </Typography>
                                  </Box>
                                </Card>
                                {data?.audio && (
                                  <PlaySound audioURL={data.audio.URL} />
                                  // <IconButton
                                  //   sx={{
                                  //     pointerEvents:
                                  //       disabledOptions.includes(index) ||
                                  //       optionStatus === "correct"
                                  //         ? "none"
                                  //         : "auto",
                                  //     opacity: disabledOptions?.includes(index)
                                  //       ? 0.5
                                  //       : 1,
                                  //   }}
                                  //   //data.audio.URL
                                  // >
                                  //   <VolumeUpIcon
                                  //     sx={{ color: "green", fontSize: "30px" }}
                                  //   />
                                  // </IconButton>
                                )}
                              </Box>
                            );
                          }
                        )}
                    </Box>
                    <Box position={"absolute"} top={0} width={"100vw"} left={0}>
                      <LinearProgress
                        color="secondary"
                        variant="buffer"
                        valueBuffer={buffer}
                        value={progress}
                        sx={{
                          height: "10px",
                          ".css-1b9ox91-MuiLinearProgress-bar1": {
                            backgroundColor: "#77DD77 !important",
                          },
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <CustomDialog
            type="result"
            open={viewLessonResult}
            onClose={() =>
              // console.log("click")
              {
                console.log("navigate");
                setViewLessonResult(false);
                navigate("/level-page");
              }
            }
            content={
              <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "25px",
                  padding: "28px 30px 30px 35px",
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Box
                  sx={{
                    width: "120px",
                    height: "120px",
                    borderRadius: "50%",
                    border: "4px solid #D3D3D3",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgb(250 199 16)",
                  }}
                >
                  <IconButton sx={{ width: "80px", height: "80px" }}>
                    <EmojiEventsIcon sx={{ width: "80px", height: "80px" }} />
                  </IconButton>
                </Box>
                <Box>
                  <Typography variant="h4">You Passed</Typography>
                </Box>
                <Box
                  mt={3}
                  p={2}
                  sx={{
                    backgroundColor: "lightgrey",
                    borderRadius: "10px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h6">
                    First Try:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      reduxFinalData.filter((data: any) => data.attempt == 0)
                        .length
                    }
                    /{reduxFinalData.length || 9}
                  </Typography>

                  <Typography variant="h6">
                    Second Try:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      reduxFinalData.filter((data: any) => data.attempt == 1)
                        .length
                    }
                    /{reduxFinalData.length || 9}
                  </Typography>
                  <Typography variant="h6">
                    Third Try:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    {
                      reduxFinalData.filter((data: any) => data.attempt == 2)
                        .length
                    }
                    /{reduxFinalData.length || 9}
                  </Typography>
                  <Box
                    display="flex"
                    mt={5}
                    width="100%"
                    alignItems="center"
                    flexDirection="column"
                    gap={2}
                  >
                    <Button
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                    >
                      Next Level
                    </Button>
                    <Button
                      size="large"
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate("/classroom-page")}
                    >
                      Back to Home
                    </Button>
                  </Box>
                </Box>
              </Box>
            }
          />
        </Grid>
      )}
    </>
  );
};

export default LessonsComponent;
