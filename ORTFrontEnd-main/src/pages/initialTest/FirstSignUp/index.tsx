import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const FirstSignUp = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "",
      contactNumber: "",
      dob: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      countryCode: Yup.string().required("Required"),
      contactNumber: Yup.string().required("Required"),
      dob: Yup.date().required("Required"),
    }),
    onSubmit: (values) => {
      const age = new Date().getFullYear() - new Date(values.dob).getFullYear();
      if (age < 13) {
        alert("You cannot proceed");
      } else if (age >= 13 && age < 18) {
        if (window.confirm("Consult parent/guardian for payments")) {
          navigate("/signup/page2");
        }
      } else {
        navigate("/signup/page2");
      }
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3}>
        <Box p={4} mt={5} textAlign="center">
          <Typography variant="h5">Tell About Yourself</Typography>
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="firstName"
                  name="firstName"
                  label="First Name"
                  variant="outlined"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.firstName && Boolean(formik.errors.firstName)
                  }
                  helperText={
                    formik.touched.firstName && formik.errors.firstName
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="lastName"
                  name="lastName"
                  label="Last Name"
                  variant="outlined"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.lastName && Boolean(formik.errors.lastName)
                  }
                  helperText={formik.touched.lastName && formik.errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="countryCode"
                  name="countryCode"
                  label="Country Code"
                  variant="outlined"
                  value={formik.values.countryCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.countryCode &&
                    Boolean(formik.errors.countryCode)
                  }
                  helperText={
                    formik.touched.countryCode && formik.errors.countryCode
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="contactNumber"
                  name="contactNumber"
                  label="Contact Number"
                  variant="outlined"
                  value={formik.values.contactNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.contactNumber &&
                    Boolean(formik.errors.contactNumber)
                  }
                  helperText={
                    formik.touched.contactNumber && formik.errors.contactNumber
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="dob"
                  name="dob"
                  label="Date of Birth"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  variant="outlined"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.dob && Boolean(formik.errors.dob)}
                  helperText={formik.touched.dob && formik.errors.dob}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Next
                </Button>
              </Grid>
              {/* <Typography paragraph>
                By submitting your info you agree to have your results shared
                with our team.We will not share your results or personal details
                with others.
              </Typography> */}
            </Grid>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default FirstSignUp;
