import { useSelector } from "react-redux";
import { selectUser } from "../../store/reducers/authSlice";
import { UserType } from "../../constants";


export const usePermissions = () => {
  const user = useSelector(selectUser);
  const userRole = user ? user.userType : UserType.student;

  const hasPermission = (allowedRoles:any) => {
    return allowedRoles.includes(userRole);
  };

  return { hasPermission };
};
