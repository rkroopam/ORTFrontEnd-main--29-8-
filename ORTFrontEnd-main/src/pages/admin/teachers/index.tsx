import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { delete_teacher, get_AllTeachers } from "../../../api/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { selectUser } from "../../../store/reducers/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StudentForm from "./studentForm";
import AddTeacher from "./addTeacher";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

const Teachers = () => {
  const [openAddTeacher, setOpenAddTeacher] = React.useState(false);
  const [openUpdateTeacher, setOpenUpdateTeacher] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<any>(null);
  const handleOpen = () => setOpenAddTeacher(true);
  const token: any = useSelector((state: any) => state.auth.token);
  const user: any = useSelector((state: RootState) => selectUser(state));

  const { data, refetch } = useQuery({
    queryKey: ["repoData"],
    queryFn: () => get_AllTeachers(user, token),
  });

  const handleClose = () => {
    setIsEditing(false);
    setOpenAddTeacher(false);
    setOpenUpdateTeacher(false);
    setSelectedTeacher(null); // Reset to null
  };
  const handleDelete = async (id: string) => {
    console.log(id, "Teacher ID");
    try {
      if (token) {
        await delete_teacher(id, token);
        refetch();
        console.log("Item deleted successfully");
      } else {
        console.error("Token is missing");
      }
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  };

  const handleEdit = (item: any) => {
    setOpenUpdateTeacher(true);
    setIsEditing(true);
    setSelectedTeacher(item);
  };

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
          Teachers
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add new
        </Button>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Sr. No</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone Number</TableCell>
              <TableCell>Number Of Students</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items?.map((item: any, index: number) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell>
                  {item.fName}
                  {item.lName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>10</TableCell>
                <TableCell>Active</TableCell>
                <TableCell>
                  <Tooltip title="Edit">
                    <IconButton onClick={() => handleEdit(item)}>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleDelete(item.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="View Teachers">
                    <IconButton>
                      <RemoveRedEyeIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTeacher
        refetch={refetch}
        open={openAddTeacher}
        handleClose={handleClose}
      />
      <StudentForm
        refetch={refetch}
        open={openUpdateTeacher}
        handleClose={handleClose}
        isEditing={isEditing}
        teacher={selectedTeacher}
        token={token}
      />
    </Box>
  );
};

export default Teachers;
