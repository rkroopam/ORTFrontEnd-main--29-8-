// import { Box, Button, IconButton, Typography } from '@mui/material'
// import React from 'react'
// import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import { useNavigate } from 'react-router-dom';

// const LessonResultPage = () => {
//   const navigate = useNavigate();
//   return (
//     <Box
//               // elevation={4}
//               sx={{
//                 backgroundColor: "white",
//                 // "&.MuiPaper-elevation": { backgroundColor: "white" },
//                 borderRadius: "25px",
//                 padding: "28px 30px 30px 35px",
//                 position: "relative",
//                 display: "flex",
//                 alignItems: "center",
//                 justifyContent: "center",
//                 flexDirection: "column",
//               }}
//             >
//               <Box
//                 sx={{
//                   width: "120px",
//                   height: "120px",
//                   borderRadius: "50%",
//                   border: "4px solid #D3D3D3",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "rgb(250 199 16)",
//                 }}
//               >
//                 <IconButton sx={{ width: "80px", height: "80px" }}>
//                   <EmojiEventsIcon sx={{ width: "80px", height: "80px" }} />
//                 </IconButton>
//               </Box>
//               <Box>
//                 <Typography variant="h4">You Passed</Typography>
//               </Box>
//               <Box
//                 mt={3}
//                 p={2}
//                 sx={{
//                   backgroundColor: "lightgrey",
//                   borderRadius: "10px",
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   flexDirection: "column",
//                 }}
//               >
//                 <Typography variant="h6">
//                   First Try:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   {
//                     reduxFinalData.filter((data: any) => data.attempt == 0)
//                       .length
//                   }
//                   /{reduxFinalData.length || 9}
//                 </Typography>

//                 <Typography variant="h6">
//                   Second Try:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   {
//                     reduxFinalData.filter((data: any) => data.attempt == 1)
//                       .length
//                   }
//                   /{reduxFinalData.length || 9}
//                 </Typography>
//                 <Typography variant="h6">
//                   Third Try:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
//                   {
//                     reduxFinalData.filter((data: any) => data.attempt == 2)
//                       .length
//                   }
//                   /{reduxFinalData.length || 9}
//                 </Typography>
//                 <Box
//                   display="flex"
//                   mt={5}
//                   width="100%"
//                   alignItems="center"
//                   flexDirection="column"
//                   gap={2}
//                 >
//                   <Button
//                     size="large"
//                     type="submit"
//                     variant="contained"
//                     color="primary"
//                   >
//                     Next Level
//                   </Button>
//                   <Button
//                     size="large"
//                     type="submit"
//                     variant="outlined"
//                     color="primary"
//                     onClick={() => navigate("/student/training")}
//                   >
//                     Back to Home
//                   </Button>
//                 </Box>
//               </Box>
//             </Box>
//   )
// }

// export default LessonResultPage
import React from "react";

const LessonResultPage = () => {
  return <div>LessonResultPage</div>;
};

export default LessonResultPage;
