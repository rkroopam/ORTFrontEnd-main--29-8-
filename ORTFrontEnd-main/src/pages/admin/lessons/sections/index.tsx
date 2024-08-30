import {
  Box,
  Card,
  CardContent,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { PlayArrow } from "@mui/icons-material";
import React, { useEffect } from "react";
import { allData } from "../../../../utils/lessonsData";
import { useNavigate } from "react-router-dom";
import useFullScreen from "../../../../components/hooks/useFullSCreen";
import { setCookie } from "../../../../utils/commonFunction/utilities";

console.log("allData", allData);
const SectionPage = () => {
  const { enterFullScreen, errorF, exitFullScreen } = useFullScreen();

  const navigate = useNavigate();
  const goToSectionPage = (data: any) => {
    enterFullScreen();
    navigate("/lessons-page", { state: { testSubType: data } });
  };

  // setCookie()
  // useEffect(()=>{
  //   console.log("cookie set")
  //   setCookie('username', 'JohnDoe',2);
  // },[])

  //   const COOKIE_NAME = 'username';
  // const EXPIRATION_MINUTES = 1; // Cookie expiration time in minutes

  //   const checkCookieExpiration = () => {
  //     const cookie = document.cookie.split('; ').find(row => row.startsWith(COOKIE_NAME));
  //     const expirationDateStr = localStorage.getItem(`${COOKIE_NAME}_expires`);

  //     if (!cookie) {
  //       notifyUser('Cookie not found, it may have expired.');
  //     } else if (expirationDateStr && new Date() > new Date(expirationDateStr)) {
  //       notifyUser('Cookie has expired.');
  //     }
  //   };

  //   // Function to notify the user
  //   const notifyUser = (message: string) => {
  //     alert(message); // Use alert for simplicity; consider using more sophisticated notifications
  //   };

  //   useEffect(() => {
  //     console.log("Setting cookie...");
  //     // setCookie(COOKIE_NAME, 'JohnDoe', EXPIRATION_MINUTES);

  //     // Save expiration time to local storage
  //     const date = new Date();
  //     date.setMinutes(date.getMinutes() + EXPIRATION_MINUTES);
  //     localStorage.setItem(`${COOKIE_NAME}_expires`, date.toISOString());

  //     // Set up periodic check for expiration
  //     const intervalId = setInterval(checkCookieExpiration, 30000); // Check every 30 seconds

  //     // Clean up interval on component unmount
  //     return () => clearInterval(intervalId);
  //   }, []);

  const COOKIE_NAME = "username";
  const EXPIRATION_MINUTES = 0.0333333333333333; // Cookie expiration time in minutes (48 hours)
  const ALERT_BEFORE_MINUTES = 0.0166666666666667; // Alert 10 minutes before expiration

  useEffect(() => {
    console.log("Setting cookie...");
    setCookie(COOKIE_NAME, "JohnDoe", EXPIRATION_MINUTES);

    // Save expiration time and alert time to local storage
    const expirationDate = new Date();
    expirationDate.setMinutes(expirationDate.getMinutes() + EXPIRATION_MINUTES);
    localStorage.setItem(
      `${COOKIE_NAME}_expires`,
      expirationDate.toISOString()
    );

    const alertDate = new Date(expirationDate);
    alertDate.setMinutes(alertDate.getMinutes() - ALERT_BEFORE_MINUTES);
    localStorage.setItem(`${COOKIE_NAME}_alert`, alertDate.toISOString());

    // Check for expiration and alert periodically
    const checkExpirationAndAlert = () => {
      const now = new Date();

      const alertDateStr = localStorage.getItem(`${COOKIE_NAME}_alert`);
      const expirationDateStr = localStorage.getItem(`${COOKIE_NAME}_expires`);

      if (alertDateStr && expirationDateStr) {
        const alertDate = new Date(alertDateStr);
        const expirationDate = new Date(expirationDateStr);

        if (now > alertDate && now <= expirationDate) {
          notifyUser("Cookie will expire in less than 10 minutes.");
          localStorage.removeItem(`${COOKIE_NAME}_alert`); // Ensure alert only happens once
        } else if (!cookieExists()) {
          notifyUser("Cookie not found, it may have expired.");
        }
      } else if (!alertDateStr || !expirationDateStr) {
        notifyUser("Expiration data not available.");
      }
    };

    const cookieExists = () => {
      return document.cookie
        .split("; ")
        .some((row) => row.startsWith(COOKIE_NAME));
    };

    const notifyUser = (message: string) => {
      alert(message); // Use alert for simplicity; consider using more sophisticated notifications
    };

    const intervalId = setInterval(checkExpirationAndAlert, 30000); // Check every 30 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);

  return (
    <Box sx={{ height: "100%" }} px={2}>
      <Typography variant="h4" fontWeight="bold" sx={{ marginBottom: 2 }}>
        Sections
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Grid container spacing={2} justifyContent="center">
          {allData.map((section, index) => {
            return (
              <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ margin: 1, position: "relative" }}>
                  <CardContent>
                    <Typography variant="subtitle1" color="textSecondary">
                      {/* {section.category} */}
                    </Typography>
                    {/* <Typography variant="h6">{section?.label}</Typography> */}
                    <Typography variant="h6">
                      {" "}
                      {section?.label?.length > 18
                        ? `${section.label.substring(0, 18)}...`
                        : section.label}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      {section.description}
                    </Typography>
                    {/* <Typography variant="body2" color="textSecondary">
                  +{section.progress}
                </Typography> */}
                    <IconButton
                      onClick={() => goToSectionPage(section.testSubType)}
                      sx={{
                        backgroundColor: "lightgreen",
                        color: "green",
                        "&:hover": {
                          backgroundColor: "lightgreen",
                        },
                        marginTop: "10px ",
                      }}
                    >
                      <PlayArrow />
                    </IconButton>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default SectionPage;
