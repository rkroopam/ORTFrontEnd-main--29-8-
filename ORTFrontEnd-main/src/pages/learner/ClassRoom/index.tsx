import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ClassRoom = () => {
  const navigate = useNavigate();
  const shadowBoxWrapper = {
    // boxShadow: 3,
    // backgroundColor: "#00000050",
    display:"flex",
    alignItems: "center",
    justifyContent:'center',
    background:
      "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.4459033613445378) 34%, rgba(0,0,0,0.5131302521008403) 72%, rgba(0,0,0,0) 100%)",

    "&:hover": {
      backgroundColor: "transparent",
      transform: "scale(1.02)",
      cursor: "pointer",
      color:"white"
    },
    transition: "transform 0.3s ease",
  };
  return (
    <Box
      sx={{
        backgroundImage: "url('/image/welcomeScreen.png')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100%",
        width: "100vw",
        overflow: "hidden",
      }}
    >
      <Grid container spacing={2} sx={{ height: "65%", pt: "3%" }}>
        <Grid
          item
          md={3}
          sx={{
            ...shadowBoxWrapper,
          }}
        >
                  {/* <Typography variant="h5" fontWeight="bold">  Statistics</Typography> */}

        </Grid>
        <Grid
          item
          md={6}
          onClick={() =>
            navigate("/level-page", { state: { datatype: "classroom" } })
          }
          sx={{
            ...shadowBoxWrapper,
           
          }}
        >
          <Typography variant="h5" fontWeight="bold" >Classroom</Typography>
        </Grid>
        <Grid
          item
          md={3}
          onClick={() =>
            navigate("/stages-page", { state: { datatype: "progress" } })
          }
          sx={{
            ...shadowBoxWrapper,
            
          }}
        >
         <Typography variant="h5" fontWeight="bold"> Progress</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClassRoom;
