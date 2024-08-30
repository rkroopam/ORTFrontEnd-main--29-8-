import React from "react";
import { buttonClasses } from "@mui/base/Button";
import { styled } from "@mui/system";
import { Button } from "@mui/material";

const blue = {
  200: "#99CCFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0066CC",
};

const green = {
  500: "#4CAF50",
  600: "#43A047",
  700: "#388E3C",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const StyledButton = styled(Button)(
  ({ theme, variant, backgroundColor, boxShadow }: any) => `
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: 600;
    font-size: 0.875rem;
    margin-top: 0.3rem;
    line-height: 1.5;
    background-color: ${
      variant === "contained"
        ? backgroundColor ||
          (theme.palette.mode === "dark" ? grey[800] : grey[200])
        : "transparent"
    };
    color: ${
      variant === "contained"
        ? backgroundColor
          ? "white"
          : "inherit"
        : backgroundColor || theme.palette.mode === "dark"
        ? grey[200]
        : grey[900]
    };
    border: 1px solid ${
      backgroundColor || theme.palette.mode === "dark" ? grey[700] : grey[400]
    };
    padding: 8px 16px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 150ms ease;
    box-shadow: 0 2px 1px ${
      theme.palette.mode === "dark"
        ? "rgba(0, 0, 0, 0.5)"
        : "rgba(45, 45, 60, 0.2)"
    },
    inset 0 1.5px 1px ${boxShadow || grey[400]}, inset 0 -2px 1px ${
    boxShadow || grey[600]
  };

    &:hover {
      background-color: ${
        variant === "contained"
          ? backgroundColor || theme.palette.mode === "dark"
            ? grey[700]
            : grey[300]
          : backgroundColor || theme.palette.mode === "dark"
          ? grey[900]
          : grey[50]
      };
      color: ${
        variant === "contained"
          ? "white"
          : backgroundColor || theme.palette.mode === "dark"
          ? grey[200]
          : grey[900]
      };
    }

    &.${buttonClasses.active} {
      background-color: ${
        backgroundColor || theme.palette.mode === "dark" ? grey[700] : grey[300]
      };
      box-shadow: none;
      transform: scale(0.99);
    }

    &.${buttonClasses.focusVisible} {
      box-shadow: 0 0 0 4px ${
        theme.palette.mode === "dark"
          ? backgroundColor || grey[300]
          : backgroundColor || grey[200]
      };
      outline: none;
    }

    &.${buttonClasses.disabled} {
      background-color: ${
        theme.palette.mode === "dark"
          ? backgroundColor || grey[700]
          : backgroundColor || grey[200]
      };
      color: ${
        theme.palette.mode === "dark"
          ? backgroundColor || grey[200]
          : backgroundColor || grey[700]
      };
      border: 0;
      cursor: default;
      box-shadow: none;
      transform: scale(1);
    }
  `
);

const CustomButton = ({
  children,
  sx,
  onClick,
  fullWidth,
  color,
  variant,
  backgroundColor,
  boxShadow,
  ...props
}: any) => {
  let bgColor;
  if (variant === "white") {
    bgColor = grey[50];
  } else if (variant === "green") {
    bgColor = green[500];
  } else {
    bgColor = backgroundColor || blue[500];
  }

  return (
    <StyledButton
      variant="contained"
      fullWidth={fullWidth}
      onClick={onClick}
      backgroundColor={bgColor}
      boxShadow={boxShadow}
      color={color}
      sx={{ ...sx }}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default CustomButton;
