import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { useSelector } from "react-redux";
import DrawerPage from "./drawer";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./dashboardHeader";
import { showContent } from "../../store/reducers/learnerSlice";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }: any) => ({
  flexGrow: 1,
  marginTop: 80,
  padding: 10,
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));



const AdminPage = () => {
  const showContent = useSelector((state: any) => state.testAnswer.showContent);
  const { drawerOpen } = useSelector((state: any) => state.menu);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {!showContent && <AppBar position="fixed" open={drawerOpen}>
        <DashboardHeader />
      </AppBar>}
      <DrawerPage />

      <Main open={drawerOpen}>
        <Outlet />
      </Main>
    </Box>
  );
};
export default AdminPage;
