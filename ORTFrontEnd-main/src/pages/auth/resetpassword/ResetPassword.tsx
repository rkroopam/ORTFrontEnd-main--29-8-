import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Container,
  Box,
  Paper,
} from "@mui/material";
import { reset_password } from "../../../api/services/auth";
import { toast } from "react-toastify";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const ResetPassword = () => {
  const query = useQuery();
  const token = query.get("token");

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required("New password is required")
        .min(6, "Password must be at least 6 characters long"),
      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf([Yup.ref("password")], "Passwords must match"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      if (values.password !== values.confirmPassword) {
        toast.error("Passwords must match");
        setSubmitting(false);
        return;
      }
      const passwod = values.password;
      try {
        if (token) {
          await reset_password(token, passwod);
          toast.success("Password reset successfully");
          navigate("/auth/login");
        }
      } catch (error: any) {
        toast.error(error.message || "An error occurred.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Box p={4} mt={5}>
          <Typography variant="h4" gutterBottom>
            Set New Password
          </Typography>
          <form onSubmit={formik.handleSubmit}>
            <TextField
              fullWidth
              label="New Password"
              variant="outlined"
              margin="normal"
              type="password"
              id="password"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              required
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              required
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              fullWidth
              disabled={formik.isSubmitting}
            >
              Reset Password
            </Button>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default ResetPassword;
