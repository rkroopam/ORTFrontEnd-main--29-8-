import React from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { dispatchUser, setToken, setUserData } from "../../../utils/updateCurrentUser";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { Box, Container, Paper, Typography, Grid, FormHelperText } from "@mui/material";
import { parent_signup } from "../../../api/services/auth";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/reducers/authSlice";
import { RootState } from "../../../store/reducers";
import { CustomTextField } from "../../../common";
import { BackgroundContainer } from "../../../components/BackgroundContainer";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  // country: string;
  phoneNumber: string;
  phoneCountryCode: string;
}

const SignUp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const user: any = useSelector((state: RootState) => selectUser(state));

  const signupMutation = useMutation({
    mutationFn: (payload: any) => parent_signup(payload),
    onSuccess: (res: any) => {
      console.log(res, "result");
      if (res) {
        setUserData(res.data);
        console.log(res,"Parent Data")
        localStorage.setItem("ParentData", JSON.stringify(res.data));
        // setToken(res.data.token, dispatch);
        toast.success("Verification link sent to email");
        navigate("/auth/login");
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
      firstName: "",
      lastName: "",
      email: "",
      // country: "",
      phoneNumber: "",
      phoneCountryCode: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      // country: Yup.string().required("Required"),
      phoneNumber: Yup.string().required("Required"),
      phoneCountryCode: Yup.string().required("Required"),
    }),
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        const payload = {
          fName: values.firstName,
          lName: values.lastName,
          email: values.email,
          // country: values.country,
          phoneNumber: values.phoneNumber,
          phoneCountryCode: values.phoneCountryCode,
        };
        await signupMutation.mutateAsync(payload);
        navigate("/studentinfo");
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="sm">
        <Paper elevation={3}>
          <Box p={4}>
            <Box mb={2}>
              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
              >
                Tell us about yourself
              </Typography>
            </Box>
            <form
              onSubmit={formik.handleSubmit}
              style={{ marginTop: "32px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="firstName"
                    name="firstName"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    autoComplete="given-name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.firstName}
                    error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                    helperText={formik.touched.firstName && formik.errors.firstName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="lastName"
                    name="lastName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    autoComplete="family-name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lastName}
                    error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                    helperText={formik.touched.lastName && formik.errors.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                  />
                </Grid>

                <Grid item xs={12} sm={3}>
                  <FormControl
                    fullWidth
                    variant="outlined"
                  >
                    <InputLabel error={formik.touched.phoneCountryCode && Boolean(formik.errors.phoneCountryCode)}>Code</InputLabel>
                    <Select
                      id="country-input"
                      name="phoneCountryCode"
                      label='Code'
                      value={formik.values.phoneCountryCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.phoneCountryCode &&
                        Boolean(formik.errors.phoneCountryCode)
                      }
                    >
                      <MenuItem value="91">India</MenuItem>
                      <MenuItem value="1">Canada</MenuItem>
                      <MenuItem value="17">USA</MenuItem>
                    </Select>
                    <FormHelperText error={formik.touched.phoneCountryCode && Boolean(formik.errors.phoneCountryCode)}>{formik.touched.phoneCountryCode && formik.errors.phoneCountryCode}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={9}>
                  <TextField
                    id="phoneNumber"
                    name="phoneNumber"
                    label="Phone Number"
                    variant="outlined"
                    type="tel"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.phoneNumber}
                    error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                    helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                    inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                    onKeyPress={(e) => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Typography variant="body1" color="primary">
                  By submitting your info you agree to have your results shared with
                  our team. We will not share your results or personal details with
                  anyone outside our organization.
                </Typography>
              </Box>
              <Box mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Sign Up
                </Button>
              </Box>
            </form>
          </Box>
        </Paper>
      </Container>
    </BackgroundContainer>
  );
};

export default SignUp;
