import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Grid,
  Typography,
  Link,
  Dialog,
  CircularProgress,
} from "@mui/material";

interface Props {
  open: boolean | true;
  onClose: () => void;
  email: string;
}

interface FormValues {
  otp1: string;
  otp2: string;
}

const OTPVerificationDialog: React.FC<Props> = ({ open = true, onClose }) => {
  const otpInputFeild = [1, 2, 3, 4, 5, 6];

  //   const verifyOTPMutation = useMutation({
  //     mutationFn: (payload: any) => verifyOTP(payload),
  //     onSuccess: () => {
  //       toast.success('OTP verification successful');
  //       onClose(); // Close dialog after successful verification
  //       navigate('/auth/reset-password'); // Redirect to password reset page
  //     },
  //     onError: (error: any) => {
  //       toast.error(error?.message || 'Invalid OTP');
  //     },
  //   });

  //   const resendOTPMutation = useMutation({
  //     mutationFn: (payload: any) => resendOTP(payload),
  //     onSuccess: () => {
  //       toast.success('OTP resent successfully');
  //     },
  //     onError: (error: any) => {
  //       toast.error(error?.message || 'Failed to resend OTP');
  //     },
  //   });

  const formik = useFormik<FormValues>({
    initialValues: {
      otp1: "",
      otp2: "",
    },
    validationSchema: Yup.object({
      otp: Yup.string().required("OTP is required"),
    }),
    onSubmit: async (values: FormValues, { setSubmitting }) => {
      try {
        // await verifyOTPMutation.mutateAsync({ email, otp: values.otp });
        console.log(values);
      } catch (error) {
        console.error("OTP verification failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleResendOTP = async () => {
    try {
      //   await resendOTPMutation.mutateAsync({ email });
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ padding: "24px" }}>
        <Typography variant="h5" align="center">
          OTP Verification
        </Typography>
        <Typography variant="body1" align="center">
          Enter the OTP sent to your email.
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "16px" }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={12}>
              <TextField
                id="otp"
                name="otp"
                label="OTP"
                variant="outlined"
                fullWidth
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.otp}
                error={formik.touched.otp && Boolean(formik.errors.otp)}
                helperText={formik.touched.otp && formik.errors.otp}
              /> */}
            {otpInputFeild.map((item, index) => {
              return (
                <Grid item xs={2} key={index}>
                  <TextField
                    id="otp"
                    name={`otp${index + 1}`}
                    // label="OTP"
                    variant="outlined"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.otp1}
                    // error={formik.touched.otp && Boolean(formik.errors.otp)}
                    // helperText={formik.touched.otp && formik.errors.otp}
                  />
                </Grid>
              );
            })}
            {/* </Grid> */}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                style={{ marginTop: "16px" }}
              >
                {formik.isSubmitting ? (
                  <CircularProgress size={24} />
                ) : (
                  "Verify OTP"
                )}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" align="center">
                Didn't receive the OTP?{" "}
                <Link
                  component="button"
                  onClick={handleResendOTP}
                  color="primary"
                >
                  Resend OTP
                </Link>
                .
              </Typography>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};

export default OTPVerificationDialog;
