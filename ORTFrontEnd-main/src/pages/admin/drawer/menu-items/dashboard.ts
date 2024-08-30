import MenuIcon from "@mui/icons-material/Menu";
import { UserType } from "../../../../constants";

const icons = {
  DashboardOutlined: MenuIcon,
};

const dashboardItems = (userRole:any) => [
  {
    id: "dashboard",
    title: "Dashboard",
    type: "item",
    url: `/${userRole}/dashboard`,
    icon: icons.DashboardOutlined,
    breadcrumbs: false,
    permission: [UserType.student, UserType.teacher, UserType.admin, UserType.superAdmin], // All roles
  },
];

export default dashboardItems;
