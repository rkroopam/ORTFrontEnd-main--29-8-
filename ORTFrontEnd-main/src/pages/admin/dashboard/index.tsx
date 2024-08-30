// import { useState } from "react";
import { Box } from "@mui/material";
import MyAssignments from "../../../components/MyAssignment";
// import Teachers from "../teachers";
import TopStats from "../topStats";
import { UserType } from "../../../constants";
import { usePermissions } from "../../../utils/permission";


const Dashboard = () => {
  // const [slot, setSlot] = useState("week");
  const { hasPermission } = usePermissions();

  return (
    <Box>
      <TopStats />
      <Box sx={{ marginTop: 3 }}>
        {hasPermission([UserType.student]) && (
          <>
            <MyAssignments />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;
