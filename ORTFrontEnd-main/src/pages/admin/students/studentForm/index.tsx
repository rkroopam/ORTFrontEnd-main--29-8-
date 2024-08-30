import * as React from "react";
import {
  Avatar,
  Button,
  Box,
  Grid,
  TextField as MuiTextField,
  Typography,
  Dialog,
  colors,
} from "@mui/material";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { create_user, update_user } from "../../../../api/services/user";
import { toast } from "react-toastify";
import SchoolIcon from "@mui/icons-material/School";

interface FormValues {
  fName: string;
  lName: string;
  email: string;
  password: string;
  country: string;
  phoneCountryCode: string;
  phoneNumber: string;
}

const validationSchema = Yup.object({
  fName: Yup.string().required("First Name is required"),
  lName: Yup.string().required("Last Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  country: Yup.string().required("Country is required"),
  phoneCountryCode: Yup.string().required("Phone Country Code is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
});

const StudentForm = ({
  open,
  handleClose,
  refetch,
  isEditing,
  student,
}: {
  open: boolean;
  handleClose: () => void;
  refetch: () => void;
  isEditing: boolean;
  student: any;
}) => {
  const registerMutation = useMutation({
    mutationFn: (payload: any) => create_user(payload),
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

  const updateMutation = useMutation({
    mutationFn: (payload: any) => update_user(payload, student._id),
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
      fName: student ? student.fName : "",
      lName: student ? student.lName : "",
      email: student ? student.email : "",
      password: "",
      country: student ? student.country : "",
      phoneCountryCode: student ? student.phoneCountryCode : "",
      phoneNumber: student ? student.phoneNumber : "",
    },
    validationSchema: validationSchema,
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        const payload = {
          fName: values.fName,
          lName: values.lName,
          email: values.email,
          password: values.password,
          country: values.country,
          phoneCountryCode: values.phoneCountryCode,
          phoneNumber: values.phoneNumber,
        };
        if (isEditing) {
          await updateMutation.mutateAsync(payload);
        } else {
          await registerMutation.mutateAsync(payload);
        }
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
          <SchoolIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isEditing ? "Update" : "Add"} Student
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
            style={{ marginTop: "16px" }}
          >
            {formik.isSubmitting
              ? "Submitting..."
              : isEditing
              ? "Update"
              : "Add"}
          </Button>
          <Button
            fullWidth
            variant="contained"
            sx={{ marginTop: "16px", backgroundColor: colors.blueGrey[50] }}
            onClick={handleClose}
          >
            Cancel
          </Button>
        </form>
      </Box>
    </Dialog>
  );
};

export default StudentForm;
