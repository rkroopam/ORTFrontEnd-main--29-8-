import MenuIcon from "@mui/icons-material/Menu";
import { UserType } from "../../../../constants";
import { title } from "process";

const icons = {
  LoginOutlined: MenuIcon,
  ProfileOutlined: MenuIcon,
  RegisterOutlined: MenuIcon,
};

const pages = [
  // {
  //   id: "login",
  //   title: "Login",
  //   type: "item",
  //   url: "/login",
  //   icon: icons.LoginOutlined,
  //   target: true,
  //   permission: [], // No permission required for login
  // },
  {
    id:"taketest",
    title:"Take Test",
    type: "item",
    url: "/regular-test-page",
    icon: icons.LoginOutlined,
    target: false,
    permission: [UserType.student],
  },
  // {
  //   id: "register",
  //   title: "Register",
  //   type: "item",
  //   url: "/register",
  //   icon: icons.RegisterOutlined,
  //   target: true,
  //   permission: [], // No permission required for registration
  // },
  // {
  //   id: "profile",
  //   title: "Profile",
  //   type: "item",
  //   url: "/profile",
  //   icon: icons.ProfileOutlined,
  //   breadcrumbs: true,
  //   permission: [UserType.student, UserType.teacher, UserType.admin, UserType.superAdmin], // All users can access
  // },
  // {
  //   id: "settings",
  //   title: "Settings",
  //   type: "item",
  //   url: "/settings",
  //   icon: icons.ProfileOutlined,
  //   breadcrumbs: true,
  //   permission: [UserType.admin, UserType.superAdmin], // Only admins and super admins
  // },
];

export default pages;
