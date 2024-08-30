import { useSelector } from "react-redux";
import { selectUser } from "../../../../store/reducers/authSlice";
import { UserType } from "../../../../constants";
import dashboardItems from './dashboard'; 
import pages from './pages'; 
import managementItems from './management'; 

const MenuItems = () => {
  const user = useSelector(selectUser);
  const userRole = user ? user.userType : UserType.student;
  console.log(userRole,'userRole')

  // Filter management items based on userRole permissions
  const filteredManagementItems = managementItems(userRole).filter(item =>
    item.permission.length === 0 || item.permission.includes(userRole)
  );

  // Filter dashboard items based on userRole permissions
  const filteredDashboardItems = dashboardItems(userRole).filter(item =>
    item.permission.length === 0 || item.permission.includes(userRole)
  );

  // Filter pages based on userRole permissions
  const filteredPages = pages.filter((item:any) =>
    item.permission.length === 0 || item.permission.includes(userRole)
  );

  const menuItems = {
    items: [
      // {
      //   id: "group-dashboard",
      //   title: "Dashboard",
      //   type: "group",
      //   children: filteredDashboardItems, 
      // },
      {
        id: "group-management",
        title: "Management",
        type: "group",
        children: filteredManagementItems,
      },
      {
        id: "group-pages",
        title: "Pages",
        type: "group",
        children: filteredPages, 
      },
    ],
  };

  return menuItems;
};

export default MenuItems;
