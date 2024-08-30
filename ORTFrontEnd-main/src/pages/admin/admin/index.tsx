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
import { delete_admin, get_AllAdmins } from "../../../api/services/user";
import { useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";
import { selectUser } from "../../../store/reducers/authSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import StudentForm from "./adminForm";
import AddAdmin from "./addAdmin";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Admins = () => {
  const [openAddAdmin, setOpenAddAdmin] = React.useState(false);
  const [openUpdateAdmin, setOpenUpdateAdmin] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<any>(null); // Changed to null instead of empty string
  const handleOpen = () => setOpenAddAdmin(true);
  const token: any = useSelector((state: any) => state.auth.token);
  const user: any = useSelector((state: RootState) => selectUser(state));

  const { data, refetch } = useQuery({
    queryKey: ["admin"],

    queryFn: () => get_AllAdmins(user, token),
  });
  const handleClose = () => {
    setIsEditing(false);
    setOpenAddAdmin(false);
    setOpenUpdateAdmin(false);
    setSelectedAdmin(null); // Reset to null
  };
  const handleDelete = async (id: any) => {
    try {
      if (token) {
        await delete_admin(id, token);
        refetch();
        console.log("Item deleted successfully");
      } else {
        console.error("Token is missing");
      }
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  const handleEdit = (item: any) => {
    setOpenUpdateAdmin(true);
    setIsEditing(true);
    setSelectedAdmin(item);
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
          Admins
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
              <TableCell>Country</TableCell>
              <TableCell>Average Login Time</TableCell>
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
                  {item.fName} {item.lName}
                </TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.phoneNumber}</TableCell>
                <TableCell>{item.country}</TableCell>
                <TableCell>
                  <Tooltip title="Average Login Time">
                    <AccessTimeIcon />
                  </Tooltip>
                  12 Hours
                </TableCell>
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
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddAdmin
        refetch={refetch}
        open={openAddAdmin}
        handleClose={handleClose}
      />
      <StudentForm
        refetch={refetch}
        open={openUpdateAdmin}
        handleClose={handleClose}
        isEditing={isEditing}
        admin={selectedAdmin}
        token={token}
      />
    </Box>
  );
};

export default Admins;
