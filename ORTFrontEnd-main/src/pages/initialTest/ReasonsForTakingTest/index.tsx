// import React, { useState } from "react";
// import {
//   Grid,
//   Button,
//   Card,
//   CardContent,
//   Typography,
//   IconButton,
//   Box,
//   Container,
//   Paper,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { CustomTextField } from "../../../common";
// import { Formik, Form, Field, ErrorMessage, useFormik } from "formik";
// import * as Yup from "yup";

// const reasons: any = [];
// interface FormValues {
//   other: string;
// }

// const ReasonsForTakingTest = () => {
//   const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
//   const [otherReasons, setOtherReasons] = useState<string[]>([]);
//   const [otherReason, setOtherReason] = useState<string>("");

//   const handleCardClick = (reason: string) => {
//     setSelectedReasons((prev) =>
//       prev.includes(reason)
//         ? prev.filter((r) => r !== reason)
//         : [...prev, reason]
//     );
//   };

//   const handleAddOtherReason = () => {
//     if (otherReason.trim() !== "") {
//       setOtherReasons((prev) => [...prev, otherReason.trim()]);
//       setOtherReason("");
//     }
//   };
//   const formik = useFormik<FormValues>({
//     initialValues: {
//       other: "",
//     },
//     validationSchema : Yup.object({
//       other: Yup.string()
//         .trim()
//         .required("Required")
//         .min(3, "Reason must be at least 3 characters")
//         .max(50, "Reason must be at most 50 characters"),
//     });
//     onSubmit: (values) => {
//       console.log(values);
//     },
//   });

//   return (
//     <Container
//       component="main"
//       maxWidth="sm"
//       sx={{
//         display: "flex",
//         justifyContent: "start",
//         alignItems: "center",
//         height: "100vh",
//       }}
//     >
//       <Paper elevation={5}>
//         <Box sx={{ p: 2 }}>
//           <Typography variant="h5" sx={{fontWeight:'bold'}}>
//             Reasons for taking this test:
//           </Typography>
//           <Grid container spacing={2}>
//             {reasons.map((reason) => (
//               <Grid item xs={12} sm={6} md={4} key={reason}>
//                 <Card
//                   onClick={() => handleCardClick(reason)}
//                   sx={{
//                     cursor: "pointer",
//                     backgroundColor: selectedReasons.includes(reason)
//                       ? "#1E824C"
//                       : "white",
//                     color: selectedReasons.includes(reason) ? "white" : "black",
//                   }}
//                 >
//                   <CardContent>
//                     <Typography>{reason}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//             {otherReasons.map((reason, index) => (
//               <Grid item xs={12} sm={6} md={4} key={index}>
//                 <Card sx={{ backgroundColor: "#1E824C", color: "white" }}>
//                   <CardContent>
//                     <Typography>{reason}</Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             ))}
//             <Grid item xs={12} sm={6} md={4}>
//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <CustomTextField
//                   id="other"
//                   name="other"
//                   sx={{}}
//                   label="Others"
//                   type="text"
//                   autoComplete="on"
//                   value={otherReason}
//                   onChange={(e) => setOtherReason(e.target.value)}
//                   fullWidth
//                   error={formik.touched.other && Boolean(formik.errors.other)}
//                   helperText={formik.touched.other && formik.errors.other}
//                 />
//                 <IconButton
//                   onClick={handleAddOtherReason}
//                   sx={{
//                     color: "white",
//                     backgroundColor: "#1E824C",
//                     borderRadius: "4px",
//                     marginLeft: "8px",
//                   }}
//                 >
//                   <AddIcon />
//                 </IconButton>
//               </Box>
//             </Grid>
//             <Grid item xs={12}>
//               <Typography variant="body2">
//                 Tap + to add one at a time
//               </Typography>
//             </Grid>
//             <Grid item xs={12} mt={2}>
//               <Button
//                 color="primary"
//                 variant="contained"
//                 fullWidth
//                 sx={{ backgroundColor: "#1E824C", color: "white" }}
//               >
//                 Next
//               </Button>
//             </Grid>
//           </Grid>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default ReasonsForTakingTest;

import React from "react";

const ReasonsForTakingTest = () => {
  return <div></div>;
};

export default ReasonsForTakingTest;
