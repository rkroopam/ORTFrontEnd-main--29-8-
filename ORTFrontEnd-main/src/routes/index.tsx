import React from "react";
import { lazy } from "react";
import { useRoutes } from "react-router-dom";
import Loadable from "../components/lodable";
import ProtectedRoute from "./protectedRoute";
import Admins from "../pages/admin/admin";
import ProfilePage from "../pages/profile";
import PasswordResetRequest from "../pages/auth/resetpassword/PasswordResetRequest";
import VerifyEmail from "../pages/auth/verifyEmail";
import PaymentManagement from "../pages/admin/PaymentManagement";
import ResetPassword from "../pages/auth/resetpassword/ResetPassword";
import PageNotFound from "../pages/404";
import { UserType } from "../constants";
import StudentInfoForm from "../pages/initialTest/StudentInfoForm";
import ReasonsForTakingTest from "../pages/initialTest/ReasonsForTakingTest";
import DisclaimerPage from "../pages/initialTest/DisclaimerPage";
import RegularTestPage from "../pages/initialTest/RegularTestPage/RegularTestPage";
import TestLevelPage from "../pages/initialTest/TestLevelPage";
import path from "path";
import GreatJobPage from "../pages/initialTest/GreatJobPage";
import TestResultPage from "../pages/initialTest/TestResultPage";
import PaymentPage from "../pages/initialTest/PaymentPage";
import DisclaimerPage2 from "../pages/initialTest/DisclaimerPage2";
import CantHearItPage from "../pages/initialTest/CantHearItPage";
import TrainingPage from "../pages/admin/training";
import HistoryPage from "../pages/admin/history";
import LessonsPage from "../pages/admin/training/LessonsPage";
import Lessons from "../pages/admin/lessons";
import AccuracyPage from "../pages/admin/Summary/AccuracyPage";
import SectionPage from "../pages/admin/lessons/sections";
import LevelPage from "../pages/learner/ClassRoom/LevelPage";
import StagesPage from "../pages/learner/ClassRoom/StagePage";
import ClassRoom from "../pages/learner/ClassRoom";

const Login = Loadable(lazy(() => import("../pages/auth/login")));
const LearnerLogin = Loadable(
  lazy(() => import("../pages/learner/learnerLogin"))
);
const SignUp = Loadable(lazy(() => import("../pages/auth/signUp")));
const Forgetpassword = Loadable(
  lazy(() => import("../pages/auth/forgetpassword/forgetpassword"))
);
const OTPVerificationDialog = Loadable(
  lazy(() => import("../pages/auth/forgetpassword/Otp"))
);
const Courses = Loadable(lazy(() => import("../pages/courses")));
const AdminPage = Loadable(lazy(() => import("../pages/admin")));
const Student = Loadable(lazy(() => import("../pages/admin/students")));
const Teacher = Loadable(lazy(() => import("../pages/admin/teachers")));
const Dashboard = Loadable(lazy(() => import("../pages/admin/dashboard")));
const Payments = Loadable(lazy(() => import("../pages/admin/Payments")));
const InitialTest = Loadable(lazy(() => import("../pages/initialTest")));
const SuccessPage = Loadable(
  lazy(() => import("../pages/PayPalComponents/PaymentStatus/SuccessPage"))
);
const CanceledPage = Loadable(
  lazy(() => import("../pages/PayPalComponents/PaymentStatus/FailedPage"))
);

// Route configuration
const routes = [
  {
    path: "/",
    element: <Login />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/studentinfo",
    element: <StudentInfoForm />,
  },

  {
    path: "/disclaimer-page",
    element: <DisclaimerPage />,
  },
  {
    path: "/disclaimer-page2",
    element: <DisclaimerPage2 />,
  },
  {
    path: "/cant-hearit-page",
    element: <CantHearItPage />,
  },
  {
    path: "/regular-test-page",
    element: <RegularTestPage />,
  },
  {
    path: "/test-level-page",
    element: <TestLevelPage />,
  },
  {
    path: "/instructionpage1",
    element: <InitialTest />,
  },
  {
    path: "/great-job-page",
    element: <GreatJobPage />,
  },
  {
    path: "/test-result-page",
    element: <TestResultPage />,
  },
  {
    path: "/payment-page",
    element: <PaymentPage />,
  },
  {
    path: "/payment-success",
    element: <SuccessPage />,
  },
  {
    path: "/payment-failed",
    element: <CanceledPage />,
  },
  {
    path: `verify-mail`,
    element: <VerifyEmail />,
  },
  {
    path: "/training-page",
    element: <TrainingPage />,
  },
  {
    path: "/accuracy-page",
    element: <AccuracyPage />,
  },
  {
    path: "/lessons-page",
    element: <Lessons />,
  },
  {
    path: "/classroom-page",
    element: <ClassRoom />,
  },
  { path: "/stages-page", element: <StagesPage /> },
  {
    path: "/level-page",
    element: <LevelPage />,
  },
  //   {
  // path:"/training-page/:id",
  // element:<LessonsPage/>
  //   },
  {
    path: `/${UserType.superAdmin}`,
    element: (
      <ProtectedRoute element={<AdminPage />} roles={[UserType.superAdmin]} />
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute
            element={<Dashboard />}
            roles={[UserType.superAdmin]}
          />
        ),
      },
      {
        path: "students",
        element: (
          <ProtectedRoute element={<Student />} roles={[UserType.superAdmin]} />
        ),
      },
      {
        path: "teachers",
        element: (
          <ProtectedRoute element={<Teacher />} roles={[UserType.superAdmin]} />
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute element={<Admins />} roles={[UserType.superAdmin]} />
        ),
      },
      {
        path: "payments",
        element: (
          <ProtectedRoute
            element={<Payments />}
            roles={[UserType.superAdmin]}
          />
        ),
      },
      {
        path: "payments-management",
        element: (
          <ProtectedRoute
            element={<PaymentManagement />}
            roles={[UserType.superAdmin]}
          />
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute
            element={<ProfilePage />}
            roles={[UserType.superAdmin]}
          />
        ),
      },
    ],
  },
  {
    path: `/${UserType.admin}`,
    element: <ProtectedRoute element={<AdminPage />} roles={["admin"]} />,
    children: [
      {
        path: "dashboard",
        element: <ProtectedRoute element={<Dashboard />} roles={["admin"]} />,
      },
      {
        path: "students",
        element: <ProtectedRoute element={<Student />} roles={["admin"]} />,
      },
      {
        path: "teachers",
        element: <ProtectedRoute element={<Teacher />} roles={["admin"]} />,
      },
      {
        path: "profile",
        element: <ProtectedRoute element={<ProfilePage />} roles={["admin"]} />,
      },
    ],
  },
  {
    path: `/${UserType.teacher}`,
    element: (
      <ProtectedRoute element={<AdminPage />} roles={[UserType.teacher]} />
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute element={<Dashboard />} roles={[UserType.teacher]} />
        ),
      },
      {
        path: "students",
        element: (
          <ProtectedRoute element={<Student />} roles={[UserType.teacher]} />
        ),
      },
      {
        path: "signup",
        element: <SignUp />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute element={<ProfilePage />} roles={["superAdmin"]} />
        ),
      },
    ],
  },
  {
    path: `/${UserType.student}`,
    element: (
      <ProtectedRoute element={<AdminPage />} roles={[UserType.student]} />
    ),
    children: [
      {
        path: "dashboard",
        element: (
          <ProtectedRoute element={<Dashboard />} roles={[UserType.student]} />
        ),
      },
      {
        path: "training",
        element: (
          <ProtectedRoute
            element={<SectionPage />}
            roles={[UserType.student]}
          />
        ),
      },
      {
        path: "training-page/:id",
        element: (
          <ProtectedRoute
            element={<LessonsPage />}
            roles={[UserType.student]}
          />
        ),
      },
      {
        path: "history",
        element: (
          <ProtectedRoute
            element={<HistoryPage />}
            roles={[UserType.student]}
          />
        ),
      },
      {
        path: "learner-login",
        element: (
          <ProtectedRoute
            element={<LearnerLogin />}
            roles={[UserType.student]}
          />
        ),
      },
      // {
      //   path: "lessons",
      //   element: (
      //     <ProtectedRoute
      //       element={<Lessons />}
      //       roles={[UserType.student]}
      //     />
      //   ),
      // },
      {
        path: "profile",
        element: (
          <ProtectedRoute
            element={<ProfilePage />}
            roles={[UserType.student]}
          />
        ),
      },
    ],
  },
  {
    path: "/auth",
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
        path: "forgetpassword",
        element: <Forgetpassword />,
      },
      {
        path: "otp",
        element: <OTPVerificationDialog />,
      },
      {
        path: "reset-password-request",
        element: <PasswordResetRequest />,
      },
      {
        path: `reset-password`,
        element: <ResetPassword />,
      },
    ],
  },
];

const AppRoutes = () => {
  return useRoutes(routes);
};

export default AppRoutes;
