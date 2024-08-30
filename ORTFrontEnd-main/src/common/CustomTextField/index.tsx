import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { SxProps } from "@mui/system";

interface CustomTextFieldProps {
  name: string;
  id: string;
  type: string;
  autoComplete: boolean | string;
  label?: string;
  fullWidth: boolean;
  value: any;
  error: any;
  helperText: string | undefined | any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement, Element>) => void;
  sx?: SxProps;
}

const CustomTextField = ({
  name,
  label,
  value,
  type,
  id,
  autoComplete,
  fullWidth,
  error,
  helperText,
  onChange,
  onBlur,
  sx,
  ...props
}: CustomTextFieldProps) => {
  return (
    <TextField
      label={label}
      id={id ?? name}
      name={name}
      type={type}
      autoComplete={name}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      error={error}
      helperText={helperText}
      fullWidth={fullWidth}
      sx={{
        ...sx,
        ".MuiOutlinedInput-root": {
          backgroundColor: "#E6E6E6",
          borderColor: "green",
        },
        ".MuiOutlinedInput-notchedOutline": {
          border: "none",
        },
        ".MuiFormHelperText-root": {
          backgroundColor: "transparent",
        },
      }}
      InputLabelProps={{
        sx: {
          "&.Mui-focused": {
            fontSize: "1.2rem", // Increase the font size when focused
          },
        },
      }}
      {...props}
    />
  );
};

export default CustomTextField;
