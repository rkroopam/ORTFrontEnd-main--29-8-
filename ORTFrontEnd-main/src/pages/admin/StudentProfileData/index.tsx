import React from "react";
import {
  Box,
  Typography,
  Avatar,
  //  Button,
  Paper,
} from "@mui/material";
import { Wallet, SignalCellularAlt, Favorite } from "@mui/icons-material";

const StudentProfileDataPage = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      bgcolor="#f9fafb"
    >
      <Paper
        elevation={4}
        sx={{
          borderRadius: "25px",
          padding: "28px 30px 30px 35px",
          width: "500px",
          position: "relative",
          mt: 5,
        }}
      >
        <Avatar
          src="http://i.pravatar.cc/250?img=58"
          alt="ananddavis"
          sx={{
            width: 125,
            height: 125,
            border: "10px solid #ffffff",
            position: "absolute",
            top: "-40px",
            left: "50%",
            transform: "translateX(-50%)",
            boxShadow: "0 0 40px rgba(0, 0, 0, 0.17)",
          }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={8}
          mb={2}
        >
          <Typography
            variant="h6"
            component="h4"
            sx={{
              flex: 1,
              textAlign: "right",
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 600,
              pl: "135px",
            }}
          >
            ananddavis
          </Typography>
          <Box
            sx={{
              ml: 3,
              width: "140px",
            }}
          ></Box>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex={1}
            sx={{
              borderRight: "1px solid #e9e9e9",
              padding: "10px 4px",
              "&:nth-of-type(1)": { animationDelay: "400ms" },
            }}
          >
            <Wallet sx={{ fontSize: "1.5em", color: "#eab100" }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
              }}
            >
              47
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Wallet
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex={1}
            sx={{
              borderRight: "1px solid #e9e9e9",
              padding: "10px 4px",
              "&:nth-of-type(2)": { animationDelay: "500ms" },
            }}
          >
            <SignalCellularAlt sx={{ fontSize: "1.5em", color: "#8faae8" }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
              }}
            >
              357
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Ranking
            </Typography>
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            flex={1}
            sx={{
              padding: "10px 4px",
              "&:nth-of-type(3)": { animationDelay: "600ms" },
            }}
          >
            <Favorite sx={{ fontSize: "1.5em", color: "#ff86af" }} />
            <Typography
              variant="h4"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 700,
              }}
            >
              4
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Montserrat, sans-serif",
                fontSize: "13px",
                fontWeight: 400,
                textAlign: "center",
              }}
            >
              Lives
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default StudentProfileDataPage;
