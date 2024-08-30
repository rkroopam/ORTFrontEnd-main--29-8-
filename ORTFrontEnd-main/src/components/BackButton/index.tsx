import React from 'react';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

const BackButton = ({ label = "Back", onClick }:any) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      navigate(-1); // Default to navigate back if no onClick prop is provided
    }
  };

  return (
    <Button 
      onClick={handleClick} 
      variant="outlined" 
      startIcon={<ArrowBackIcon />}
      sx={{
        fontSize: "20px",
        padding: "10px 20px",
        borderRadius: "25px",
        borderWidth:"3px",

        position: "relative",
        overflow: "hidden",
       
      }}
    >
      {label}
    </Button>
  );
};

export default BackButton;
