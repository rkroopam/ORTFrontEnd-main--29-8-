import React, { useEffect, useState } from "react";
import { FormikHelpers, useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Paper,
  Box,
  Grid,
  Typography,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { get_grades  } from "../../../api/services/user";
import { CustomButton, CustomTextField } from "../../../common";
import { useMutation } from "@tanstack/react-query";
import { setStudentToken, setToken, setUserData } from "../../../utils/updateCurrentUser";
import { toast } from "react-toastify";
import { BackgroundContainer } from "../../../components/BackgroundContainer";
import { useDispatch, useSelector } from "react-redux";
import { learner_signup } from "../../../api/services/auth";

interface Grade {
  id: string;
  label: string;
}

interface Parent {
  id: any;
  name: any;
}

interface FormValues {
  fName: string;
  lName: string;
  gradeId: string;
  age: number;
  parentUserId: string;
  isSelf: boolean;
}

const classNames = ["Class1", "Class2", "Class3", "Class4", "Class5", "Class6"];

const StudentInfoForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [grades, setGrades] = useState<any>([]);
// const token = getToken  
// const token: any = useSelector((state: any) => state.auth);
const token: any = localStorage.getItem("parentToken");
console.log("token======",token)
  const parentData: any = localStorage.getItem("ParentData");
  const parentId = JSON.parse(parentData);
  console.log("parent Iddddddddddddddddd",parentId.id)
  const [parent, setParent] = useState([JSON.parse(parentData)]);
  const LeranerSignupMutation = useMutation({
    mutationFn: (payload: any) => learner_signup(payload, token),
    
    onSuccess: (res: any) => {
      if (res) {
        setUserData(res.data);
        setStudentToken(res.data.token, dispatch);
        // toast.success("Verification link sent to email");
        navigate("/disclaimer-page");
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
      fName: "",
      lName: "",
      gradeId: "",
      age: 0,
      parentUserId: parentId?.id,
      isSelf: false,
    },
    validationSchema: Yup.object({
      fName: Yup.string().required("Required"),
      lName: Yup.string().required("Required"),
      age: Yup.number()
        .min(1, "Age must be greater than 0")
        .required("Required"),
      gradeId: Yup.string().required("Required"),
      parentUserId: Yup.string().required("Required"),
      isSelf: Yup.boolean().oneOf(
        [true],
        "You must confirm you are taking the test for yourself"
      ),
    }),
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        console.log('Submitting.....')
        const payload = {
          fName: values.fName,
          lName: values.lName,
          gradeId: values.gradeId,
          age: values.age,
          parentUserId: parentId?.id,
          isSelf: values.isSelf,
        };
        await LeranerSignupMutation.mutateAsync(payload);
        console.log(payload,"Parent data-----------")
        navigate("/disclaimer-page");
      } catch (error) {
        console.error("Error submitting form:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const response = await get_grades(token);
        if (response?.items) {
          setGrades(response.items);
        } else {
          console.error("No grades found");
        }
      } catch (error) {
        console.error("Failed to fetch grades:", error);
      }
    };

    fetchGrades();
  }, [token]);

  // const handleBack = () => {
  //   navigate("/previous-step");
  // };

  return (
    <BackgroundContainer>
      <Container component="main" maxWidth="xs">
        <Paper elevation={3}>
          <Box p={4}>
            <Box mb={2}>
              <Typography
                variant="h5"
                align="center"
                fontWeight="bold"
              >
                Student Info
              </Typography>
            </Box>
            <form
              onSubmit={formik.handleSubmit}
              style={{ marginTop: "32px" }}
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    id="fName"
                    name="fName"
                    label="First Name"
                    type="text"
                    variant="outlined"
                    autoComplete="given-name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.fName}
                    error={formik.touched.fName && Boolean(formik.errors.fName)}
                    helperText={formik.touched.fName && formik.errors.fName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="lName"
                    name="lName"
                    label="Last Name"
                    type="text"
                    variant="outlined"
                    autoComplete="family-name"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.lName}
                    error={formik.touched.lName && Boolean(formik.errors.lName)}
                    helperText={formik.touched.lName && formik.errors.lName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="age"
                    name="age"
                    label="Age"
                    type="number"
                    variant="outlined"
                    autoComplete="age"
                    fullWidth
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.age == 0 ? "" : formik.values.age}
                    error={formik.touched.age && Boolean(formik.errors.age)}
                    helperText={formik.touched.age && formik.errors.age}
                  />

                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl
                    fullWidth
                    variant="outlined"

                  >
                    <InputLabel error={formik.touched.gradeId && Boolean(formik.errors.gradeId)}>Grade</InputLabel>
                    <Select
                      id="gradeId"
                      name="gradeId"
                      label="Grade"
                      value={formik.values.gradeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.gradeId && Boolean(formik.errors.gradeId)
                      }
                    >
                      {grades.map((item:any) => (
                        <MenuItem key={item.id} value={item?.id}>
                          {item.label}
                        </MenuItem>
                      ))}
                    </Select>
                    <FormHelperText error={formik.touched.gradeId && Boolean(formik.errors.gradeId)}>{formik.touched.gradeId && formik.errors.gradeId}</FormHelperText>
                  </FormControl>
                </Grid>
                {/* <Grid item xs={12} sm={6}>
                  <InputLabel
                    sx={{
                      color: "black",
                    }}
                  >
                    Parent
                  </InputLabel>

                  <FormControl
                    fullWidth
                    variant="outlined"
                    sx={{ backgroundColor: "#E6E6E6" }}
                  >
                    <Select
                      id="parentUserId"
                      name="parentUserId"
                      value={formik.values.parentUserId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      // label="Parent"
                      error={
                        formik.touched.parentUserId &&
                        Boolean(formik.errors.parentUserId)
                      }
                    >
                      {parent.map((data) => (
                        <MenuItem key={data?.id} value={data?.id}>
                          {data?.email}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid> */}
                <Grid item xs={12}>
                  <FormControlLabel

                    control={
                      <Checkbox
                        id="isSelf"
                        name="isSelf"
                        color="primary"
                        checked={formik.values.isSelf}
                        onChange={formik.handleChange}
                      />
                    }
                    label="I'm taking the assessment  for myself"
                  />
                </Grid>

                {/* <Grid item xs={12}>
                <Button
                  color="secondary"
                  variant="outlined"
                  fullWidth
                  onClick={handleBack}
                >
                  Back
                </Button>
              </Grid> */}
              </Grid>
              <Box mt={2}>
                <Typography variant="caption" color="primary">
                  By submitting your info you agree to have your results shared with
                  our team. We will not share your results or personal details with
                  anyone outside our organization.
                </Typography>
              </Box>
              <Grid item xs={12} mt={2}>
                <Button
                  color="primary"
                  variant="contained"
                  fullWidth
                  type="submit"
                >
                  Next
                </Button>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Container>
    </BackgroundContainer>
  );
};

export default StudentInfoForm;
