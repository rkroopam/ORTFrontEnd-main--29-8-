import styled from "@emotion/styled";
import { Link } from "@mui/material";
import { drawerWidth } from "../../../../config";
import { useNavigate } from "react-router-dom";
const DHeader = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: 'center',
  height: "64px",
  marginTop: 5
}));
const DrawerHeader = () => {
  const navigate = useNavigate();
  return (
    <DHeader>
      <Link style={{ cursor: 'pointer' }} onClick={() => navigate('dashboard')} >
        <img style={{
          width: "auto",
          maxWidth: drawerWidth - 20,
          maxHeight: '64px'
        }} src="https://images.squarespace-cdn.com/content/v1/6385164bf91d71181bf1adfb/c3784de1-f325-463c-aa4d-8777a6b0a7f9/OnlineReadingTutor_Logo.png.png?format=1500w" />
      </Link>
    </DHeader>
  )
};

export default DrawerHeader;
