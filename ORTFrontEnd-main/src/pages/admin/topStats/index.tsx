import React from "react";
import { Box, Typography, Paper, Grid, CardContent, Card } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../../../store/reducers/authSlice";
import { UserType } from "../../../constants";
import ArticleIcon from "@mui/icons-material/Article";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { usePermissions } from "../../../utils/permission";

const cardData = [
  {
    title: "Courses In Progress",
    value: 18,
    color: "primary",
    icon: <AccessTimeIcon />,
  },
  {
    title: "Courses Completed",
    value: 23,
    color: "secondary",
    icon: <CheckCircleIcon />,
  },
  {
    title: "Certificates Earned",
    value: 15,
    color: "success",
    icon: <ArticleIcon />,
  },
];

const getColor = (color:any) => {
  switch (color) {
    case "primary":
      return { backgroundColor: "#e3f2fd", shadowColor: "#bbdefb" };
    case "secondary":
      return { backgroundColor: "#f8bbd0", shadowColor: "#f48fb1" };
    case "success":
      return { backgroundColor: "#c8e6c9", shadowColor: "#a5d6a7" };
    case "info":
      return { backgroundColor: "#b3e5fc", shadowColor: "#81d4fa" };
    default:
      return { backgroundColor: "#ffffff", shadowColor: "#e0e0e0" };
  }
};

const TopStats = () => {
  const navigate = useNavigate();
  const { hasPermission } = usePermissions();
  const user = useSelector(selectUser);
  const userRole = user ? user.userType : UserType.student;

  return (
    <Box>
      <Grid container spacing={3}>
        {hasPermission([UserType.superAdmin]) && (
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => navigate(`/${userRole}/admin`)}
              elevation={3}
              sx={{ p: 2, minHeight: 100, cursor: "pointer" }}
            >
              <Typography variant="h6">Admins</Typography>
              <Typography variant="h5" fontWeight="bold">5</Typography>
            </Paper>
          </Grid>
        )}
        {hasPermission([UserType.superAdmin,UserType.admin,UserType.teacher]) && (
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => navigate(`/${userRole}/admin`)}
              elevation={3}
              sx={{ p: 2, minHeight: 100, cursor: "pointer" }}
            >
              <Typography variant="h6">Students</Typography>
              <Typography variant="h5" fontWeight="bold">5</Typography>
            </Paper>
          </Grid>
        )}

        {hasPermission([UserType.student]) && (
          <Grid item xs={12}>
            <Grid container spacing={2}>
              {cardData.map((card, index) => {
                const { backgroundColor, shadowColor } = getColor(card.color);
                return (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card
                      sx={{
                        backgroundColor: backgroundColor,
                        border: "none",
                        boxShadow: `0px 4px 10px ${shadowColor}`,
                        "&:hover": {
                          boxShadow: `0px 6px 15px ${shadowColor}`,
                        },
                        p: 1,
                      }}
                    >
                      <CardContent
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          textAlign: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            mb: 2,
                            mr: 2,
                            color:
                              card.color === "primary"
                                ? "primary.main"
                                : card.color === "secondary"
                                ? "secondary.main"
                                : card.color === "success"
                                ? "success.main"
                                : card.color === "info"
                                ? "info.main"
                                : "text.primary",
                          }}
                        >
                          {card.icon}
                          <Typography
                            color={card.color}
                            variant="subtitle1"
                            gutterBottom
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {card.title}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="h5" component="div">
                            {card.value}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        )}
        {hasPermission([UserType.superAdmin,UserType.admin]) && (
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => navigate(`/${userRole}/teachers`)}
              elevation={3}
              sx={{ p: 2, minHeight: 100, cursor: "pointer" }}
            >
              <Typography variant="h6">Teachers</Typography>
              <Typography variant="h5" fontWeight="bold">5</Typography>
            </Paper>
          </Grid>
        )}
        {hasPermission([UserType.superAdmin]) && (
          <Grid item xs={12} sm={6} md={3}>
            <Paper
              onClick={() => navigate(`/${userRole}/payments-management`)}
              elevation={3}
              sx={{ p: 2, minHeight: 100, cursor: "pointer" }}
            >
              <Typography variant="h6">Payment Models</Typography>
              <Typography variant="h5" fontWeight="bold">5</Typography>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default TopStats;
