import React, { useState } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Grid,
  Avatar,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { get_AllStudent } from "../../../api/services/user";
import { CustomLoader } from "../../../common";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { selectUser } from "../../../store/reducers/authSlice";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CustomDialog from "../../../common/CustomDialog";
import WalletIcon from "@mui/icons-material/Wallet";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PersonIcon from '@mui/icons-material/Person';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';

const Students = () => {
  const [openAddStudent, setOpenAddStudent] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<any>(null); // Changed to null instead of empty string
  const handleOpen = () => setOpenAddStudent(true);
  const [viewStudentData, setViewStudentData] = useState(false);
  const handleClose = () => {
    setIsEditing(false);
    setOpenAddStudent(false);
    setSelectedStudent(null); // Reset to null
  };
  const [IndividualData, setIndividualData] = useState<any>([]);
  const [viewStudentReport, setViewStudentReport] = useState(false);
  const [IndividualReport, setIndividualReport] = useState<any>([]);
  const token: any = useSelector((state: any) => state.auth.token);
  const user: any = useSelector((state: RootState) => selectUser(state));
  const score = 76;


  const { isPending, data, refetch } = useQuery({
    queryKey: ["student"],
    queryFn: () => get_AllStudent(user, token),
  });
  const handleDialogClose = () => {
    setViewStudentData(false);
    setViewStudentReport(false);
  };

  // const handleDelete = async (id: string) => {
  //   try {
  //     await delete_user(id);
  //     refetch();
  //     console.log("Item Deleted successfully");
  //   } catch (error) {
  //     console.error("Error deleting student:", error);
  //   }
  // };

  // const handleEdit = (item: any) => {
  //   setOpenAddStudent(true);
  //   setIsEditing(true);
  //   setSelectedStudent(item);
  // };

  if (isPending) return <CustomLoader />;
console.log(IndividualData)
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Students
        </Typography>
        {/* <Button variant="contained" onClick={handleOpen}>
          Add new
        </Button> */}
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Student Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell> Teacher Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell sx={{textAlign:"center"}}>Student Details</TableCell>
              <TableCell sx={{textAlign:"center"}}>Student Report</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items?.map((item: any, index: number) => (
              <TableRow
                key={index}
                
                sx={{textAlign:"center", "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell component="th" scope="row">
                  {item.fName} {item.lName} {/* Concatenate properly */}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell> XYZ</TableCell>
                <TableCell>Active</TableCell>
                <TableCell sx={{textAlign:"center"}} >
                  <Tooltip title="View Student Info">
                    <IconButton
                      onClick={() => {
                        setViewStudentData(true);
                        setIndividualData(item);
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
                <TableCell sx={{textAlign:"center"}}>
                  <Tooltip title="View Student Report">
                    <IconButton
                      onClick={() => {
                        setViewStudentReport(true);
                        setIndividualReport(item);
                      }}
                    >
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>

                {/* <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(item._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell> */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <StudentForm
        refetch={refetch}
        open={openAddStudent}
        handleClose={handleClose}
        isEditing={isEditing}
        student={selectedStudent}
      /> */}
      <CustomDialog
        type="profile"
        open={viewStudentData}
        onClose={()=>setViewStudentData(false)}
        content={
          //       <Box
          //   display="flex"
          //   justifyContent="center"
          //   alignItems="center"
          //   height="100vh"
          //   bgcolor="#f9fafb"
          // >
          <Paper
            elevation={4}
            sx={{
              backgroundColor: "white",
              "&.MuiPaper-elevation": { backgroundColor: "white" },
              borderRadius: "25px",
              padding: "28px 30px 30px 35px",
              width: "500px",
              position: "relative",
              mt: 5,
            }}
          >
            <Avatar
              src="https://img.freepik.com/premium-photo/cartoon-monster-with-big-eyes-white-background_14117-19079.jpg?w=826"
              alt="ananddavis"
              sx={{
                width: 125,
                height: 125,
                border: "10px solid #ffffff",
                position: "absolute",
                top: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.17)",
              }}
            />
            <CancelOutlinedIcon
              onClick={handleDialogClose}
              sx={{ position: "absolute", right: "10px", top: "10px" }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection='column'
              mt={8}
              mb={2}
            >
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  // pl: "135px",
                }}
              >
                {IndividualData.fName}{" "}{IndividualData.lName}
              </Typography>
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  // pl: "135px",
                }}
              >
                {IndividualData.email}
              </Typography>
              
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  // pl: "135px",
                }}
              >
                {IndividualData.phoneNumber}
              </Typography>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                sx={{
                  borderRight: "1px solid #e9e9e9",
                  padding: "10px 4px",
                  "&:nth-of-type(1)": { animationDelay: "400ms" },
                }}
              >
                <WalletIcon sx={{ fontSize: "1.5em", color: "#eab100" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  10
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  No of Courses
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                sx={{
                  borderRight: "1px solid #e9e9e9",
                  padding: "10px 4px",
                  "&:nth-of-type(2)": { animationDelay: "500ms" },
                }}
              >
                <LocationOnIcon
                  sx={{ fontSize: "1.5em", color: "#8faae8" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  USA
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                 Region 
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                sx={{
                  padding: "10px 4px",
                  "&:nth-of-type(3)": { animationDelay: "600ms" },
                }}
              >
                <PersonIcon sx={{ fontSize: "1.5em", color: "#ff86af" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  XYZ
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Teacher Name
                </Typography>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                sx={{
                  borderRight: "1px solid #e9e9e9",
                  padding: "10px 4px",
                  "&:nth-of-type(1)": { animationDelay: "400ms" },
                }}
              >
                <ModeStandbyIcon sx={{ fontSize: "1.5em", color: "#eab100" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  47
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Score
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                sx={{
                  borderRight: "1px solid #e9e9e9",
                  padding: "10px 4px",
                  "&:nth-of-type(2)": { animationDelay: "500ms" },
                }}
              >
                <SignalCellularAltIcon
                  sx={{ fontSize: "1.5em", color: "#8faae8" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  357
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Active Courses
                </Typography>
              </Box>
              <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                flex={1}
                sx={{
                  padding: "10px 4px",
                  "&:nth-of-type(3)": { animationDelay: "600ms" },
                }}
              >
                <FavoriteIcon sx={{ fontSize: "1.5em", color: "#ff86af" }} />
                <Typography
                  variant="h6"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontWeight: 600,
                  }}
                >
                  Active
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Montserrat, sans-serif",
                    fontSize: "13px",
                    fontWeight: 400,
                    textAlign: "center",
                  }}
                >
                  Status
                </Typography>
              </Box>
            </Box> 
          </Paper>
          // </Box>
        }
      />
      <CustomDialog
        type="profile"
        open={viewStudentReport}
        onClose={()=>setViewStudentReport(false)}
        content={
          //       <Box
          //   display="flex"
          //   justifyContent="center"
          //   alignItems="center"
          //   height="100vh"
          //   bgcolor="#f9fafb"
          // >
          <Paper
            elevation={4}
            sx={{
              backgroundColor: "white",
              "&.MuiPaper-elevation": { backgroundColor: "white" },
              borderRadius: "25px",
              padding: "28px 30px 30px 35px",
              width: "500px",
              position: "relative",
              mt: 5,
            }}
          >
            <Avatar
              src="https://img.freepik.com/premium-photo/cartoon-monster-with-big-eyes-white-background_14117-19079.jpg?w=826"
              alt="ananddavis"
              sx={{
                width: 125,
                height: 125,
                border: "10px solid #ffffff",
                position: "absolute",
                top: "-40px",
                left: "50%",
                transform: "translateX(-50%)",
                boxShadow: "0 0 40px rgba(0, 0, 0, 0.17)",
              }}
            />
            <CancelOutlinedIcon
              onClick={handleDialogClose}
              sx={{ position: "absolute", right: "10px", top: "10px" }}
            />
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              flexDirection='column'
              mt={8}
              mb={2}
            >
              <Typography
                variant="h6"
                component="h4"
                sx={{
                  flex: 1,
                  textAlign: "right",
                  fontFamily: "Montserrat, sans-serif",
                  fontWeight: 600,
                  // pl: "135px",
                }}
              >
                Alex's Your score is {score}
              </Typography>
              
             
            </Box>
            <Box position="relative" mt={3}>
              <Box display="flex" height={10}>
                <Box flex={7.6} bgcolor="red" />
                <Box flex={1.3} bgcolor="yellow" />
                <Box flex={1.1} bgcolor="green" />
              </Box>
              <Box
                position="absolute"
                top={-20}
                left={`${(score / 100) * 100}%`}
                sx={{
                  transform: "translateX(-50%)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "red" }}
                >
                  ▼
                </Typography>
              </Box>
            </Box>
            <Box
              mt={2}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <Box width={10} height={10} bgcolor="red" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  High risk (0-79)
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width={10} height={10} bgcolor="yellow" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  Low risk (80-89)
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width={10} height={10} bgcolor="green" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  Pass (90-100)
                </Typography>
              </Box>
            </Box>
            <Typography mt={3} textAlign="left" sx={{ fontFamily: "Cadman" }}>
              This score indicates that you are at high risk.
            </Typography>
            <Typography mt={1} textAlign="left" sx={{ fontFamily: "Cadman" }}>
              This means that:
            </Typography>
            <Box component="ul">
              <li
                style={{
                  textAlign: "left",
                  fontFamily: "Cadman",
                }}
              >
                Item one
              </li>
              <li
                style={{
                  textAlign: "left",
                  fontFamily: "Cadman",
                }}
              >
                Item two
              </li>
              <li
                style={{
                  textAlign: "left",
                  fontFamily: "Cadman",
                }}
              >
                Item three
              </li>
            </Box>
          </Paper>
          // </Box>
        }
      />
    </Box>
  );
};

export default Students;
