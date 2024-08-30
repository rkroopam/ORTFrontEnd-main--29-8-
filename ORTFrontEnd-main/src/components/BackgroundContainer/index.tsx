import React, { FC, PropsWithChildren } from "react";
import { Box } from "@mui/material";
import { AppFooter } from "../AppFooter";
import { AppHeader } from "../AppHeader";

interface BackgroundContainerProps {
  type?: string;
}

const baseStyles = {
  display: "flex",
  alignItems: "center",
  minHeight: "100vh",
  height: "auto",
  flexDirection: "column",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const backgroundImageStyle = {
  backgroundImage:
    'url("https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/867c2e7e-b43c-4690-82d0-5f8f3da7888f/Online-Reading-Tutor_Dyslexia-Training-App_Header.jpg")',
};

export const BackgroundContainer: FC<
  PropsWithChildren<BackgroundContainerProps>
> = ({ children, type }) => {
  const combinedStyles:any = type !== "test"&& type !== "dashboard" 
    ? { ...baseStyles, ...backgroundImageStyle } 
    : {  };

  return (
    <Box component={"div"} style={combinedStyles}>
      {type!=="dashboard"&&<AppHeader />}
      {children}
      {type!== "dashboard"&&<AppFooter />}
    </Box>
  );
};
