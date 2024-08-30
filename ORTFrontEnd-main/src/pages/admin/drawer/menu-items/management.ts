// import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import PaymentIcon from '@mui/icons-material/Payment';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import { UserType } from "../../../../constants";
import HistoryIcon from '@mui/icons-material/History';
import PlayLessonIcon from '@mui/icons-material/PlayLesson';
import ModelTrainingIcon from '@mui/icons-material/ModelTraining';

const icons = {
  AdminOutlined: AdminPanelSettingsIcon,
  TeacherOutlined:PeopleIcon,
  StudentOutlined:LocalLibraryIcon,
  PaymentOutlined:PaymentIcon,
  HistoryOutlined:HistoryIcon,
  LessonOutlined:PlayLessonIcon,
  ModelTrainingOutlined:ModelTrainingIcon,
};

const managementItems = (userRole:any) => [
  {
    id: UserType.admin,
    title: "Admin",
    type: "item",
    url: `/${userRole}/admin`,
    icon: icons.AdminOutlined,
    breadcrumbs: true,
    permission: [UserType.superAdmin],
  },
  {
    id: UserType.teacher,
    title: "Teachers",
    type: "item",
    url: `/${userRole}/teachers`,
    icon: icons.TeacherOutlined,
    breadcrumbs: true,
    permission: [UserType.superAdmin, UserType.admin],
  },
  {
    id: "training",
    title: "Training",
    type: "item",
    url: `/${userRole}/training`,
    icon: icons.ModelTrainingOutlined,
    breadcrumbs: true,
    permission: [UserType.student],
  },
  {
    id: "history",
    title: "History",
    type: "item",
    url: `/${userRole}/history`,
    icon: icons.HistoryOutlined,
    breadcrumbs: true,
    permission: [UserType.student],
  },
  // {
  //   id: "lessons",
  //   title: "Lessons",
  //   type: "item",
  //   url: `/${userRole}/lessons`,
  //   icon: icons.LessonOutlined,
  //   breadcrumbs: true,
  //   permission: [UserType.student],
  // },
  {
    id: UserType.student,
    title: "Students",
    type: "item",
    url: `/${userRole}/students`,
    icon: icons.StudentOutlined,
    breadcrumbs: true,
    permission: [UserType.superAdmin, UserType.admin, UserType.teacher],
  },
  {
    id: "payments-management",
    title: "Payments Management",
    type: "item",
    url: `/${userRole}/payments-management`,
    icon: icons.PaymentOutlined,
    breadcrumbs: true,
    permission: [UserType.superAdmin],
  },
];

export default managementItems;
