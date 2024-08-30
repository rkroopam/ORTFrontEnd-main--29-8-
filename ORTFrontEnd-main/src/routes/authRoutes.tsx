import { lazy } from "react";
import Loadable from "../components/lodable";
import ResetPassword from "../pages/auth/resetpassword/PasswordResetRequest";

const Login = Loadable(lazy(() => import("../pages/auth/login")));
const SignUp = Loadable(lazy(() => import("../pages/auth/signUp")));

const LoginRoutes = {
  path: "/",
  children: [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "signup",
      element: <SignUp />,
    },
    {
      path: "reset-password",
      element: <ResetPassword />,
    },
  ],
};

export default LoginRoutes;
