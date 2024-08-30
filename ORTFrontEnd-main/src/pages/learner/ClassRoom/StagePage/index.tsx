import React, { useEffect, useState } from "react";
import { Box, Grid, Typography, Button, Container, IconButton } from "@mui/material";
import LevelPage from "../LevelPage"; // Import LevelPage component
import { useLocation, useNavigate } from "react-router-dom";
import BackButton from "../../../../components/BackButton";
import ContinueButton from "../../../../components/ContinueButton";
import useFullScreen from "../../../../components/hooks/useFullSCreen";
import { getTestList } from "../../../../api/services/tests";
import Layout from "../../../../components/Layout";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";




const StagesPage = () => {
  const [selectedStage, setSelectedStage] = useState(null);
  const { enterFullScreen, errorF, exitFullScreen } = useFullScreen();
  const [testList, setTestList] = useState<any>([]);
  const location = useLocation();
  console.log("location", location);
  const [disabled, setDisabled] = useState(location?.state?.ScreenName || true);
  const navigate = useNavigate();
  console.log("disabled location", disabled);
  const token: any = localStorage.getItem("studentToken");

  // const isStageCompleted = (index: any) => stages[index].status === "completed";
  // const isStageInHardStop = (index: any) =>
  //   stages[index].status === "hard-stop";
  // const isStageInProgress = (index: any) =>
  //   stages[index].status === "in-progress";
  // const isUpcomingStage = (index: any) => stages[index].status === "upcoming";

  const handleStageSelect = (index: any, data:any) => {
    // if (!isStageInHardStop(index) && !isUpcomingStage(index)) {
      // const stageName = stages[index].stage.toLowerCase();
      console.log( "Stage name:",data);

      navigate(`/level-page`, { state: { access: disabled, data:data } });
    // }
  };
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

    fetchTestList();
  }, [token]);

  console.log(testList, "TestList");
  return (
    <Layout>
    <Container style={{ position: "relative",}}>
      
      <Box sx={{ position: "relative" }}>
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{ textTransform: "capitalize" }}
        >
          Stages
        </Typography>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            p: 2,
          }}
        >
          <BackButton />
        </Box>
      </Box>
        <Grid container spacing={4} p={5}>
          {testList.map((data:any, index:any) => {
            let backgroundColor;
            let cursor;
            let borderColor;
            let iconColor;

            // if (isStageCompleted(index)) {
            //   backgroundColor = "#0E6D38"; // Green
            //   cursor = "pointer";
            //   borderColor = "#0E6D38";
            //   iconColor = "white";
            // } else if (isStageInHardStop(index)) {
            //   backgroundColor = "#dc3545"; // Red
            //   cursor = "not-allowed";
            //   borderColor = "#dc3545";
            //   iconColor = "white";
            // } else if (isStageInProgress(index)) {
            //   backgroundColor = "#3498db"; // Yellow
            //   cursor = "pointer";
            //   borderColor = "#3498db";
            //   iconColor = "white";
            // } else {
            //   backgroundColor = "#6c757d"; // Grey
            //   cursor = "default";
            //   borderColor = "#6c757d";
            //   iconColor = "white";
            // }

            return (
              <Grid item key={index} md={4} xs={12} sm={12}>
                <Box
                  sx={{
                    backgroundColor:"#30D5C8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    padding: "20px",
                    cursor: cursor,
                    borderRadius: 3,
                    borderColor: borderColor,
                  }}
                  onClick={() => handleStageSelect(index,data?.lessons)}
                >
                  <Typography
                  variant="h6"
                    sx={{
                      color: "white",
                      fontWeight: "bold",
                    }}
                  >
                    Stage - {data?.stage}
                  </Typography>
                  <IconButton>
                    <ArrowForwardIcon sx={{color:"white",fontSize:"30px"}}/>
                  </IconButton>
                </Box>
              </Grid>
            ); 
          })}
        </Grid>
      </Box>
    </Container>
    </Layout>
  );
};

export default StagesPage;
