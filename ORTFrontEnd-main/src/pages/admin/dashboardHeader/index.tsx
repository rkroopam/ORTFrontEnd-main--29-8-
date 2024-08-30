import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { openDrawer } from "../../../store/reducers/menu";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import { useBreakpoints } from "../../../utils/mediaQuery";
import { removeUserData } from "../../../utils/updateCurrentUser";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../store/reducers";
import { selectUser } from "../../../store/reducers/authSlice";
import { Roles } from "../../../constants";
import { useMutation } from "@tanstack/react-query"; // Adjust import if necessary
import { toast } from "react-toastify";
import { sendMailforResetPassword } from "../../../api/services/auth";
import { calculateElapsedTimeInHHMM, getCookieWithDetails } from "../../../utils/commonFunction/utilities";
// import { getCookieWithExpiration } from "../../../utils/commonFunction/utilities";
// import StarIcon from "@mui/icons-material/Star";

const DashboardHeader = () => {
  const { drawerOpen } = useSelector((state: any) => state.menu);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const dispatch = useDispatch();
  const { isMd, isSm, isLg } = useBreakpoints();
  const navigate = useNavigate();
  const user: any = useSelector((state: RootState) => selectUser(state));

  // Define the mutation for resetting password
  const sendMailforResetPasswordMutation = useMutation({
    mutationFn: (payload: any) => sendMailforResetPassword(payload),
    onSuccess: () => {
      toast.success("Password reset instructions sent to your email");
      handleCloseUserMenu(); // Close menu after success
    },
    onError: (error: any) => {
      toast.error(error?.message || "Failed to send reset instructions");
    },
  });

  const settings = [
    {
      id: 1,
      label: "Logout",
      to: "/auth/login",
    },
    {
      id: 2,
      label: "Reset Password",
      to: "/auth/reset-password",
    },
  ];

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    if (isSm && drawerOpen) {
      dispatch(openDrawer({ drawerOpen: false }));
    } else if (isLg && drawerOpen) {
      dispatch(openDrawer({ drawerOpen: true }));
    }
  }, [isMd, isLg, drawerOpen, dispatch]);

  const handleDrawerToggle = () => {
    dispatch(openDrawer({ drawerOpen: !drawerOpen }));
  };

  const handleLogout = (id: any) => {
    const selectedSetting = settings.find((item) => item.id === id);
    if (selectedSetting) {
      if (selectedSetting.label === "Logout") {
        removeUserData(dispatch);
      } else if (selectedSetting.label === "Reset Password") {
        // Call forgotPasswordMutation here
        sendMailforResetPasswordMutation.mutate({ email: user.username }); // Adjust payload as needed
        return; // Prevent further navigation
      }
      navigate(selectedSetting.to);
    }
  };

  console.log("object",getCookieWithDetails('username')?.createdAt)
  console.log("object current", new Date(new Date().getTime()))
  console.log("object total",calculateElapsedTimeInHHMM() )


  return (
    <Toolbar style={{ backgroundColor: "white" }}>
      <>
        <IconButton
          color="primary"
          aria-label="open drawer"
          onClick={handleDrawerToggle}
          edge="start"
          sx={{ mx: 1 }}
        >
          {drawerOpen ? <MenuOpenIcon /> : <MenuIcon />}
        </IconButton>
        {/* <Tooltip title="5 days Streak">
          <StarIcon style={{ color: "#FFC700" }} />
        </Tooltip> */}
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          {Roles.filter((item) => item.value === user.role).map(
            (item) => item.name
          )}
        </Typography>
      </>
      <Box sx={{ flexGrow: 0 }}>
        <Tooltip title="">
          <Button variant="text" onClick={handleOpenUserMenu} sx={{ p: 0
           }}>
            <Typography
              variant="body1"
              fontWeight="bold"
              fontStyle="normal"
            >{`${user.firstName} ${user.lastName}`}</Typography>
            
          </Button>
        </Tooltip>

        
        <Menu
          sx={{ mt: "45px" }}
          id="menu-appbar"
          anchorEl={anchorElUser}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={Boolean(anchorElUser)}
          onClose={handleCloseUserMenu}
        >
          {settings.map((setting) => (
            <MenuItem key={setting.id} onClick={handleCloseUserMenu}>
              <Typography
                textAlign="center"
                onClick={() => handleLogout(setting.id)}
              >
                {setting.label}
              </Typography>
             
            </MenuItem>
          ))}
           <MenuItem >
              <Typography
                textAlign="center"
              >
               Total Login Time:{calculateElapsedTimeInHHMM()}
              </Typography>
             
            </MenuItem>
        </Menu>
      </Box>
    </Toolbar>
  );
};

export default DashboardHeader;
