import * as React from "react";

import {
  Avatar,
  Button,
  Box,
  Grid,
  TextField as MuiTextField,
  Typography,
  Dialog,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { create_admin } from "../../../../api/services/user";
import { toast } from "react-toastify";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface FormValues {
  country: string;
  email: string;
  fName: string;
  lName: string;
  phoneCountryCode: string;
  phoneNumber: string;
  password: string;
}

const validationSchema = Yup.object({
  country: Yup.string().required("Country is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  fName: Yup.string().required("First Name is required"),
  lName: Yup.string().required("Last Name is required"),
  phoneCountryCode: Yup.string().required("Phone Country Code is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  password: Yup.string().required("Password is required"),
});

const AddAdmin = ({
  open,
  handleClose,
  refetch,
}: {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
}) => {
  const signupMutation = useMutation({
    mutationFn: async (payload: any) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      return create_admin(payload, token);
    },
    onSuccess: (res: any) => {
      if (res) {
        refetch();
        handleClose();
        refetch();
        if (res.isSuccess) {
          toast.success("Admin added successfully");
        } else {
          toast.error(res.error);
        }

        formik.resetForm();

        // toast.error(res.error);
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
      country: "",
      email: "",
      fName: "",
      lName: "",
      phoneCountryCode: "",
      phoneNumber: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        const payload = {
          country: values.country,
          email: values.email,
          fName: values.fName,
          lName: values.lName,
          phoneCountryCode: values.phoneCountryCode,
          phoneNumber: values.phoneNumber,
          password: values.password,
          userType: "admin",
        };
        await signupMutation.mutateAsync(payload);
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box className="d-center" sx={{ py: 3, flexDirection: "column" }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <AdminPanelSettingsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Add Admin
        </Typography>
      </Box>
      <Box sx={{ px: 5, pb: 3 }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{ width: "100%", marginTop: "16px" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <MuiTextField
                id="fName"
                name="fName"
                label="First Name"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fName}
                error={formik.touched.fName && Boolean(formik.errors.fName)}
                helperText={formik.touched.fName && formik.errors.fName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiTextField
                id="lName"
                name="lName"
                label="Last Name"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.lName}
                error={formik.touched.lName && Boolean(formik.errors.lName)}
                helperText={formik.touched.lName && formik.errors.lName}
              />
            </Grid>

            <Grid item xs={12}>
              <MuiTextField
                id="country"
                name="country"
                label="Country"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id="email"
                name="email"
                label="Email Address"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <MuiTextField
                id="phoneCountryCode"
                name="phoneCountryCode"
                label="Phone Country Code"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneCountryCode}
                error={
                  formik.touched.phoneCountryCode &&
                  Boolean(formik.errors.phoneCountryCode)
                }
                helperText={
                  formik.touched.phoneCountryCode &&
                  formik.errors.phoneCountryCode
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <MuiTextField
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phoneNumber}
                error={
                  formik.touched.phoneNumber &&
                  Boolean(formik.errors.phoneNumber)
                }
                helperText={
                  formik.touched.phoneNumber && formik.errors.phoneNumber
                }
              />
            </Grid>
            <Grid item xs={12}>
              <MuiTextField
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
            data-testId="Add"
          >
            {formik.isSubmitting ? "Adding..." : "Add"}
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default AddAdmin;
