import React, { useState } from "react";
import {
  // Container,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  getPaymentModels,
  updatePaymentModel,
} from "../../../api/services/payments";
import AddPaymentModels from "./AddPaymentModel";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/reducers";

const PaymentManagement: React.FC = () => {
  const [openAddPaymentModel, setOpenAddPaymentModel] = useState(false);
  const token = useSelector((state: RootState) => state.auth.token);

  const handleOpen = () => setOpenAddPaymentModel(true);
  const handleClose = () => setOpenAddPaymentModel(false);

  const { data, refetch } = useQuery({
    queryKey: ["paymentModels"],
    queryFn: () => getPaymentModels(token),
  });

  const updateMutation = useMutation({
    mutationFn: async (payload: any) => {
      try {
        const data = await updatePaymentModel(payload.id, payload.token);
        return data;
      } catch (error) {
        console.error("Error updating payment model:", error);
        throw error;
      }
    },
    onSuccess: (res: any) => {
      if (res) {
        refetch();
        toast.success("Payment model updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "An error occurred"); 
    },
  });
  const handleUpdateStatus = (model: any) => {
    const payload = {
      id: model.id,
      token: token as string,
    };
    updateMutation.mutate(payload);
  };

  // if (isLoading) {
  //   return <Typography>Loading...</Typography>;
  // }

  // if (isError) {
  //   return (
  //     <Typography>Error loading payment models: {error.message}</Typography>
  //   );
  // }

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
          {" "}
          Payment Management
        </Typography>
        <Button variant="contained" onClick={handleOpen}>
          Add Payment Model
        </Button>
      </Box>
      <Paper style={{ marginTop: 20 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Period</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Per Head Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.items?.map((item: any) => (
              <TableRow key={item._id}>
                <TableCell >{item.period}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.perHeadAmount}</TableCell>
                <TableCell>{item.status}</TableCell>
                <TableCell>
                  {item.status === "active" ||
                    ("inactive" && (
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUpdateStatus(item)}
                      >
                        Make {item.status == "active" ? "Inactive" : "Active"}
                      </Button>
                    ))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      <AddPaymentModels
        refetch={refetch}
        open={openAddPaymentModel}
        handleClose={handleClose}
      />
    </Box>
  );
};

export default PaymentManagement;
