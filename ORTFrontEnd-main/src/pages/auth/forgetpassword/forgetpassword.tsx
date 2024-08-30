import React, { useState } from "react";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";
import { Button, TextField, Grid, Typography, Dialog } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { sendMailforResetPassword } from "../../../api/services/auth";

interface FormValues {
  email: string;
}

const ForgetPassword = () => {
  const [open, setOpen] = useState(true);

  const forgotPasswordMutation = useMutation({
    mutationFn: (payload: any) => sendMailforResetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset instructions sent to your email");
      setOpen(false); // Close dialog after success
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send reset instructions");
    },
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: async (
      values: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
    ) => {
      try {
        await forgotPasswordMutation.mutateAsync(values); // Pass values to mutateAsync
      } catch (error) {
        console.error("Forgot password request failed:", error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <div style={{ padding: "24px" }}>
        <Typography variant="h5" align="center">
          Forgot Password
        </Typography>
        <form onSubmit={formik.handleSubmit} style={{ marginTop: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="email"
                name="email"
                label="Email"
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                style={{ marginTop: "16px" }}
              >
                {formik.isSubmitting ? "Loading..." : "Send"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Dialog>
  );
};

export default ForgetPassword;
