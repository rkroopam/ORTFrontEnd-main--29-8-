import * as React from "react";

import {
  Avatar,
  Button,
  Box,
  Grid,
  Typography,
  Dialog,
  TextField as MuiTextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import PaymentIcon from "@mui/icons-material/Payment";
import { createPaymentModel } from "../../../../api/services/payments";

interface FormValues {
  period: string;
  name: string;
  perHeadAmount: string;
}

const validationSchema = Yup.object({
  period: Yup.string().required("Period is required"),
  name: Yup.string().required("Name is required"),
  perHeadAmount: Yup.number()
    .required("Per Head Amount is required")
    .positive("Amount must be positive")
    .min(0.01, "Amount must be at least 0.01"),
});

const AddPaymentModels = ({
  open,
  handleClose,
  refetch,
}: {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const createPaymentModelMutation = useMutation({
    mutationFn: async (payload: FormValues) => {
      const token = localStorage.getItem("perentToken");
      if (!token) {
        throw new Error("No token found");
      }
      return createPaymentModel(payload, token);
    },
    onSuccess: (res: any) => {
      if (res) {
        refetch();
        handleClose();
        toast.success(res.message);
        formik.resetForm();
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      period: "",
      name: "",
      perHeadAmount: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        const payload={
          period: values.period,
          name: values.name,
          perHeadAmount: parseFloat(values.perHeadAmount),
        }
        await createPaymentModelMutation.mutateAsync(values);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handlePeriodChange = (event: any) => {
    formik.setFieldValue("period", event.target.value);
  };

  return (
    <Dialog onClose={handleClose} open={open} maxWidth="xs">
      <Box className="d-center" sx={{ py: 3, flexDirection: "column" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <PaymentIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Payment Model
        </Typography>
      </Box>
      <Box sx={{ px: 5, pb: 3 }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ width: "100%", marginTop: "16px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel id="period-label">Period</InputLabel>
                <Select
                  labelId="period-label"
                  id="period"
                  name="period"
                  label="Period"
                  value={formik.values.period}
                  onChange={handlePeriodChange}
                  error={formik.touched.period && Boolean(formik.errors.period)}
                >
                  <MenuItem value="monthly">Monthly</MenuItem>
                  <MenuItem value="quarterly">Quarterly</MenuItem>
                  <MenuItem value="half-yearly">Half-Yearly</MenuItem>
                  <MenuItem value="yearly">Yearly</MenuItem>
                </Select>
                {formik.touched.period && formik.errors.period && (
                  <Typography color="error" variant="caption">
                    {formik.errors.period}
                  </Typography>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id="perHeadAmount"
                name="perHeadAmount"
                label="Per Head Amount"
                variant="outlined"
                fullWidth
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.perHeadAmount}
                error={
                  formik.touched.perHeadAmount &&
                  Boolean(formik.errors.perHeadAmount)
                }
                helperText={
                  formik.touched.perHeadAmount && formik.errors.perHeadAmount
                }
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            style={{ marginTop: "16px" }}
          >
            {formik.isSubmitting ? "Adding..." : "Add"}
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddPaymentModels;
