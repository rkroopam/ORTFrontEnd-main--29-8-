import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const CustomDialog = ({ open, onClose, content,type='' }: any) => {
  const profileStyle = {
    "& .MuiPaper-root":{
      backgroundColor: "transparent",
      borderRadius: 5,
      boxShadow: "none",
      },
    "& .MuiDialogContent-root": {
      // backgroundColor: "#000000",
      borderRadius: 5,
    },
  };
  return (
    <Dialog sx={{...(type === 'profile' && profileStyle),}} open={open} onClose={onClose}>
      {type !== 'profile' &&<CancelOutlinedIcon
        onClick={onClose}
        sx={{ position: "absolute", right: "10px", top: "10px" }}
      />}
      <DialogContent>{content}</DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
