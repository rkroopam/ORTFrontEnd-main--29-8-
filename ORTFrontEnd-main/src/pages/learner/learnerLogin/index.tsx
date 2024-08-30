import React, { useEffect, useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import {
  // Switch,
  Button,
  TextField,
  // FormControlLabel,
  // FormGroup,
  Grid,
  Typography,
  Link,
  Container,
  Paper,
  Box,
  InputLabel,
  IconButton,
  InputAdornment,
  OutlinedInput,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { useSafeNavigate } from "../../../components/hooks/useSafeNavigate";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

import { setCurrentUser } from "../../../store/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectUser } from "../../../store/reducers/authSlice";
import {
  checkUserDetails,
  dispatchUser,
  setToken,
  setUserData,
} from "../../../utils/updateCurrentUser";
import { RootState } from "../../../store/reducers";
// import { CustomTextField } from "../../../common";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { BackgroundContainer } from "../../../components/BackgroundContainer";
import { login_user } from "../../../api/services/auth";


interface FormValues {
  username: string;
  password: string;
}

const Login = () => {
  // const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useSafeNavigate();
  const dispatch = useDispatch();
  const user: any = useSelector((state: RootState) => selectUser(state)); 

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: any) => {
    event.preventDefault();
  };

  const loginMutation = useMutation({
    mutationFn: (payload: FormValues) => login_user(payload),
    onSuccess: (res: any) => {
      if (res) {
        setUserData(res.data);
        setToken(res.data.token, dispatch);
        console.log(res, "Response data ");
        setCurrentUser(res.data);
        dispatchUser(dispatch, res.data);
        toast.success("Login successful");
        formik.resetForm();
        routeOnLogined(res.data.userType);
      } else {
        toast.error("Something went wrong");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message);
    },
  });
  useEffect(() => {
    const checkAndRouteUser = async () => {
      if (user == null) {
        const uData = await checkUserDetails(dispatch);
        console.log(uData, "helllo");
        if (uData?.userType) {
          routeOnLogined(uData?.userType);
        }
      } else {
        routeOnLogined(user?.userType);
      }
    };

    void checkAndRouteUser();
  }, [user, dispatch]);

  const routeOnLogined = (data: any) => {
    const role = data;
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else if (role === "superAdmin") {
      navigate("/superAdmin/dashboard");
    } else if (role === "teacher") {
      navigate("/teacher/dashboard");
    } else {
      navigate("/student/dashboard");
      // try {
      //   const formFilled = data.studentInfoFormFilled;
      //   const testSubmitted = data.testSubmitted;
      //   const paymentDone = data.paymentDone;
      //   if (formFilled) {
      //     navigate("/studentinfo");
      //   } else if (testSubmitted) {
      //     navigate("/student/initialTest");
      //   } else if (paymentDone) {
      //     navigate("/student/payment");
      //   } else {
      //     navigate("/student/courses");
      //   }
      // } catch (error) {
      //   console.error("Error checking student status:", error);

      // }
    }
  };

  const formik = useFormik<FormValues>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Required"),
      password: Yup.string()
    .required("Password is required")
    // .min(8, "Password must be at least 8 characters long")
    // .matches(/[!@#$%^&*(),.?":{}|<>]/),
    }),
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        loginMutation.mutate(values);
      } catch (error) {
        console.error("Authentication failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="xs"  >
        <Paper elevation={3}>
          <Box p={4}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Login
            </Typography>
            <Typography variant="body1" align="center">
              Login and start your journey.
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ marginTop: "32px" }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="username"
                    name="username"
                    label="User Name"
                    variant="outlined"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.username}
                    error={formik.touched.username && Boolean(formik.errors.username)}
                    helperText={formik.touched.username && formik.errors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel
                      variant="outlined"
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                      htmlFor="outlined-adornment-password"
                    >
                      Password
                    </InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-password"
                      name="password"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      fullWidth
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                    />
                    <FormHelperText
                      error={
                        formik.touched.password &&
                        Boolean(formik.errors.password)
                      }
                    >
                      {formik.touched.password && formik.errors.password}
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" align="right">
                    <Link
                      underline="none"
                      color="primary"
                      href="/auth/forgetpassword"
                    >
                      Forgot your password?
                    </Link>
                  </Typography>
                </Grid>
                {/* <Grid item xs={12}>
                  <FormGroup row>
                    <FormControlLabel
                      label="Remember me"
                      control={
                        <Switch
                          checked={agreed}
                          onChange={(event) => setAgreed(event.target.checked)}
                          color="primary"
                        />
                      }
                      sx={{
                        "& .MuiFormControlLabel-label": {
                          fontFamily: "Cadman",
                        },
                      }}
                    />
                  </FormGroup>
                </Grid> */}
                <Grid item xs={12} mt={2}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={formik.isSubmitting || loginMutation.isPending}
                    fullWidth
                  >
                    {formik.isSubmitting || loginMutation.isPending
                      ? "Loading..."
                      : "Login"}
                  </Button>
                </Grid>

                <Grid item xs={12}>
                  <Box display='flex' mt={5} width="100%" justifyContent="space-between" alignItems='center' >
                    <Typography variant="body2" color='primary'>
                      Don't have an account?
                    </Typography>
                    <Button
                      size="small"
                      type="submit"
                      variant="outlined"
                      color="primary"
                      onClick={() => navigate("/auth/signup")}
                    >
                      {"Get Started"}
                    </Button>
                  </Box>

                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </BackgroundContainer>

  );
};

export default Login;
