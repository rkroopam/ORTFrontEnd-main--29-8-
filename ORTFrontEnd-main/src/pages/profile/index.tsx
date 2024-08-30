import React, { useState } from "react";
import { Grid, Paper, Box, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { CustomButton } from "../../common";
import { removeUserData } from "../../utils/updateCurrentUser";

const ProfilePage = () => {
  const [selectedSection, setSelectedSection] = useState("profileInfo");

  const user: any = localStorage.getItem("USER");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleButtonClick = (section: any) => {
    setSelectedSection(section);
  };

  const handleLogout = () => {
    removeUserData(dispatch);
    navigate("/auth/login");
  };
  const old = JSON.stringify(user, null, 2);
  console.log("json ", old);
  console.log("Object.entries(user)", Object.entries(user));
  console.log(
    "new approach ==================",
    Object.keys(user).map((key) => ({ key, value: user[key] }))
  );

  return (
    <div style={{ flexGrow: 1, padding: 24 }}>
      <Grid container spacing={3}>
        {/* Left Section */}
        <Grid item xs={4}>
          <Paper style={{ padding: 16, textAlign: "center" }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* User Profile Photo (Placeholder for an image) */}
              <Box>
                <img
                  src="https://media.istockphoto.com/id/619379486/photo/smiling-man-in-studio.jpg?s=612x612&w=0&k=20&c=IBWZxcRudIbTIHKtDukZd6Be36ODguJNBohwR8QmgKY="
                  alt="User Profile"
                  style={{ width: "60%", borderRadius: "50%" }}
                />
              </Box>
              <Typography variant="h6" gutterBottom>
                John Doe
              </Typography>
              <Typography variant="body2" gutterBottom>
                Mobile: +1234567890
              </Typography>
              <Typography variant="body2" gutterBottom>
                Location: New York, USA
              </Typography>
              {/* Buttons */}
              <Box style={{ padding: 16, textAlign: "center" }}>
                <CustomButton
                  fullWidth
                  variant={
                    selectedSection === "profileInfo" ? "contained" : "text"
                  }
                  onClick={() => handleButtonClick("profileInfo")}
                >
                  Profile Info
                </CustomButton>
                <CustomButton
                  fullWidth
                  variant={
                    selectedSection === "resetPassword" ? "contained" : "text"
                  }
                  onClick={() => handleButtonClick("resetPassword")}
                >
                  Reset Password
                </CustomButton>
                <CustomButton
                  color="error"
                  fullWidth
                  variant="outlined"
                  onClick={handleLogout}
                >
                  Logout
                </CustomButton>
              </Box>
            </Box>
          </Paper>
        </Grid>

        {/* Right Section */}
        <Grid item xs={8}>
          <Paper
            sx={{ padding: 5, textAlign: "left", color: "rgba(0, 0, 0, 0.87)" }}
          >
            <Box sx={{ minHeight: "60vh" }}>
              {selectedSection === "profileInfo" && (
                <div>
                  {user &&
                    Object.entries(user)?.map(() => {
                      return (
                        <>
                          <Typography variant="h6" gutterBottom>
                            Profile Info
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            First Name: {user.firstName}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Last Name: {user.lastName}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Username: {user.username}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Email: {user.email}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Phone: {user.phoneNumber}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Mobile: {user.phoneNumber}
                          </Typography>
                          <Typography variant="body1" gutterBottom>
                            Location: {user.address}
                          </Typography>
                        </>
                      );
                    })}
                </div>
              )}
              {selectedSection === "resetPassword" && (
                <div>
                  <Typography variant="h6" gutterBottom>
                    Reset Password Section
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    Reset Password Form or Instructions Here
                  </Typography>
                </div>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ProfilePage;
