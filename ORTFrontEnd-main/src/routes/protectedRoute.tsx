// src/components/ProtectedRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../store/reducers/authSlice";
import { RootState } from "../store/store";

interface ProtectedRouteProps {
  element: React.ReactNode;
  roles?: ("superAdmin" | "admin" | "teacher" | "student")[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element, roles }) => {
  const user: any = useSelector((state: RootState) => selectUser(state));

  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  if (roles && !roles.includes(user.userType)) {
    return <Navigate to="/not-authorized" />;
  }

  return <>{element}</>;
};

export default ProtectedRoute;
