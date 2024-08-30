import { FC, PropsWithChildren } from "react";
import { AppBar, Container, Toolbar } from "@mui/material";
import { AppLogo } from "../AppLogo";

export const AppHeader: FC<PropsWithChildren> = () => {
  return (
    <AppBar position="static" sx={{zIndex:"1000", padding:"10px 0px"}} color="transparent" elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AppLogo  onClick={() => { console.log('redirect user') }} />
        </Toolbar>
      </Container>
    </AppBar>
  );
};
