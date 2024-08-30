import React, { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store/store";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { checkUserDetails } from "./utils/updateCurrentUser";

const theme = createTheme({
  palette: {
    primary: {
      main: "#16A24A",
      light: "#3EB767",
      dark: "#128442",
      contrastText: "white",
    },
    error: {
      main: "#E46025",
      light: "#E97A4E",
      dark: "#CD4527",
      contrastText: "white",
    },
  },
  typography: {
    fontFamily: "Cadman",
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: "normal",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        outlined: {
          color: "#3EB767",
          borderColor: "#16A24A",
          fontStyle: "normal",
          ":hover": {
            borderColor: "#16A24A",
          },
        },
        contained: {
          backgroundColor: "#16A24A",
          fontStyle: "normal",
          ":hover": {
            backgroundColor: "#16A24A",
          },
        },
      },
    },
  },
});
function App() {
  const [queryClient] = useState(() => new QueryClient());
  const dispatch = useDispatch();
  useEffect(() => {
    checkUserDetails(dispatch);
  }, []);
  return (
    <div className="App">
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          <AppRoutes />
        </ThemeProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
