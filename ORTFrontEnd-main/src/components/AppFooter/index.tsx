import { FC, PropsWithChildren } from "react";
import { Box, Link, Typography } from "@mui/material";

export const AppFooter: FC<PropsWithChildren> = () => {
  return (
    <Box bgcolor={'black'} style={{ width: "100%", bottom: 0, height: '64px', zIndex:"1000",marginTop:"60px" }} >
      <Box display="flex" height="inherit" px={3} flexDirection="row" alignItems="center" justifyContent="space-between" >
        <Typography
          variant="caption"
          fontSize="10px"
          color={'primary.contrastText'}

        >
          Copyright 2024, Online Reading Tutor Services Inc.
        </Typography>

        <Box display="flex" flexDirection="row" justifyContent="space-evenly" width="20%" >
          <Link href="https://www.onlinereadingtutor.com/privacy-policy" target="_blank" color='#ffffff' >
            <Typography
              variant="caption"
              fontSize="10px"
              color='primary.contrastText'

            >
              Privacy  Policy
            </Typography>
          </Link>
          <Link href="https://www.onlinereadingtutor.com/terms-of-use" target="_blank" color='#ffffff' >
            <Typography
              variant="caption"
              fontSize="10px"
              color='primary.contrastText'

            >
              Terms Of Use
            </Typography>
          </Link>
        </Box>
      </Box>
    </Box>
  );
};
