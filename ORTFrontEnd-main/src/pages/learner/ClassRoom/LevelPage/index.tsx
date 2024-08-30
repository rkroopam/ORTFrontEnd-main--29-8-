import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ContinueButton from "../../../../components/ContinueButton";
import BackButton from "../../../../components/BackButton";
import Layout from "../../../../components/Layout";
import { getTestDetails, getTestList } from "../../../../api/services/tests";
import CustomDialog from "../../../../common/CustomDialog";

const LevelPage = () => {
  const location = useLocation();
  const [currentLevel, setCurrentLevel] = useState<any>(null);
  const [levelId, setLevelId] = useState<any>("");
  const [openTutorial, setOpenTutorial] = useState<any>(false);
  const [videoUrl, setVideoUrl] = useState<any>("null");
  const [hideVideoTutorial, setHideVideoTutorial] = useState<any>(true);
  const [data, setData] = useState<any>([]);
  const [testList, setTestList] = useState<any>(location?.state?.data || []);
  const token: any = localStorage.getItem("studentToken");
  console.log(testList, "Test LIst ..........");

  const navigate = useNavigate();
  console.log("in level location", location);

  // const isLevelCompleted = (index: any) =>
  //   testLevels[index]?.status === "not_started";
  // const isLevelInHardStop = (index: any) =>
  //   testLevels[index]?.status === "hard-stop";
  // const isLevelInProgress = (index: any) =>
  //   testLevels[index]?.status === "in-progress";
  // const isUpcomingLevel = (index: any) =>
  //   testLevels[index]?.status === "upcoming";

  const fetchTestList = async (id: any) => {
    console.log("idd in fetch", id);
    try {
      const response = await getTestDetails(token, id);
      if (response) {
        setData(response?.data?.questionAssessments || []);
        setVideoUrl(
          transformYouTubeUrl(response?.data?.testSettings?.instructionLink)
        );
        const initialAudioUrl =
          response?.data?.questionAssessments[0]?.question?.questionDescription
            ?.audios[0].URL || "";
        // setAudioUrl(initialAudioUrl);
        // setExamTime(
        //   response.data.testSettings.perQuestionTimeoutMSecs / 1000
        // );
        // setAudioUrl(response?.data?.questionAssessments[0]?.question?.questionDescription?.audios[0].URL)
      } else {
        console.error("No test data found");
      }
    } catch (error) {
      console.error("Failed to fetch test data:", error);
    } finally {
      // setLoading(false); // Data fetching complete
    }
  };
const Instructions=[
  "Welcome to the instructional video for this level. Please watch the video carefully to understand the guidelines and key points.",
 "Make sure you are in a quiet environment to avoid any distractions while you watch.",
  "You can pause, rewind, or rewatch the video as needed to clarify any doubts.",
  `Click "Start" to begin or "Cancel" if you wish to skip the instructions. `
];
  const handleLevelSelect = async (id: any) => {
    setLevelId(id);
    await fetchTestList(id);
    setOpenTutorial(true);

    // navigate("/lessons-page",{state:{id}})
  };
  console.log("fetch url", videoUrl);
  const { stage } = useParams();
  const handleContinue = () => {
    console.log("Move to Questions");
  };
  useEffect(() => {
    const fetchTestList = async () => {
      try {
        const response = await getTestList(token, location?.state?.datatype);
        if (response?.items) {
          setTestList(response.items);
        } else {
          console.error("No grades found");
        }
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      }
    };
    if (!location?.state?.data) {
      fetchTestList();
    }
  }, [token]);

  const transformYouTubeUrl = (url: string) => {
    if (!url) return "";
    const videoId = url.includes("youtube.com")
      ? new URL(url).searchParams.get("v")
      : url.split("youtu.be/")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const modalInstructionContent = 
    hideVideoTutorial ? 
      (
        <Box textAlign="center" mt={4}>
        <Typography variant="h5" gutterBottom>
          Instructional Video
        </Typography>
        <Box my={2}>
          {/* Embedding YouTube Video */}
          <iframe
            width="500"
            height="340"
            src={videoUrl}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </Box>
        <Box mt={2} sx={{display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap"}}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setHideVideoTutorial(false)}
          >
            Next
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenTutorial(false)}
          >
            Skip Instruction
          </Button>
        </Box>
      </Box>
      )
      : (<Box>
        {Instructions.map((item:any, index:any) =>(
          <Typography variant="body1" gutterBottom key={index} pt={index==0 ? 0 : 2}>
            {item}
          </Typography>
        ))}
        <Box mt={2} sx={{display:"flex", gap:"10px", justifyContent:"center", flexWrap:"wrap"}}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {setOpenTutorial(false); navigate("/lessons-page",{state:{id:levelId}});}}
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => setOpenTutorial(false)}
          >
            Cancel
          </Button>
        </Box>
      </Box>
      )
   
  return (
    <Layout>
      <Container>
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* back btn */}
          <Box>
            <BackButton />
          </Box>
          <Typography
            variant="h3"
            gutterBottom
            sx={{ textTransform: "capitalize" }}
          >
            Lessons
          </Typography>
          {/* continue btn */}
          <Box
            sx={
              {
                // position: "absolute",
                // top: "50%",
                // right: 0,
                // padding: "10px 40px",
              }
            }
          >
            {/* <ContinueButton onClick={handleContinue} /> */}
          </Box>
        </Box>

        <Grid container spacing={4} p={5}>
          {testList.map((data: any, index: any) => {
            let backgroundColor;
            let cursor;
            let borderColor;
            let iconColor;

            if (data.status == "completed") {
              backgroundColor = "#28a745"; // Green color
              cursor = "default";
              borderColor = "#28a745";
              iconColor = "white";
            } else if (data.status == "hard_stop") {
              backgroundColor = "#dc3545"; // Red color
              cursor = "not-allowed";
              borderColor = "#dc3545";
              iconColor = "white";
            } else if (data.status == "pending") {
              backgroundColor = "#ffc107"; // Yellow color
              cursor = "pointer";
              borderColor = "#ffc107";
              iconColor = "white";
            } else {
              backgroundColor = "#b0b0b0"; // Grey color
              cursor = "default";
              borderColor = "#6c757d";
              iconColor = "white";
            }

            return (
              <Grid item key={index} md={4} xs={12} sm={12}>
                <Box
                  sx={{
                    backgroundColor: backgroundColor,
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                    cursor: cursor,
                    borderRadius: 3,
                    // border: "1px solid",
                    borderColor: borderColor,
                  }}
                  onClick={() => {
                    console.log("iddddd", data.id);
                    // if (
                    //   !isLevelInHardStop(index) &&
                    //   !isUpcomingLevel(index) &&
                    //   location?.state?.datatype == "classroom"
                    // ) {
                    // console.log('id==========================>',data.lessons.find((data:any)=>data.status=="not_started").id)
                    if (location?.state?.datatype === "classroom") {
                      handleLevelSelect(
                        data.lessons.find(
                          (data: any) => data.status == "not_started"
                        ).id
                      );
                    }

                    //   setCurrentLevel(data?.level);
                    // }
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      color: iconColor,
                      fontWeight: "bold",
                    }}
                  >
                    Level - {data?.level}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
        <Box
          sx={{
            position: "fixed",
            bottom: 50,
            right: -70,
            transform: "translateX(-50%)",
            zIndex: 1000,
            animation: `floating 3s ease-in-out infinite`,
            "@keyframes floating": {
              "0%": {
                transform: "translateX(-50%) translateY(0)",
              },
              "50%": {
                transform: "translateX(-50%) translateY(-10px)",
              },
              "100%": {
                transform: "translateX(-50%) translateY(0)",
              },
            },
          }}
        >
          <ContinueButton onClick={handleContinue} />
        </Box>
      </Container>
      <CustomDialog
        open={openTutorial}
        onClose={() => setOpenTutorial(false)}
        content={modalInstructionContent}
      />
    </Layout>
  );
};

export default LevelPage;
