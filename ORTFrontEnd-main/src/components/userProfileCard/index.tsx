import React from 'react';
import { 
  // Card,
   CardContent, Typography, Avatar, Box } from '@mui/material';

const UserProfileCard = () => {
  return (
    // <Box sx={{  }}>
      <Box sx={{ display: 'flex', justifyContent: 'center',width: '100%', maxWidth: 340,  }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Avatar sx={{ width: 80, height: 80, bgcolor: 'grey.300' }}>
            <Typography variant="h4" color="textSecondary">A</Typography>
          </Avatar>
          <Typography variant="h6" sx={{ marginTop: 2 }}>
            Andreas Iniesta
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Collage Student
          </Typography>
        </CardContent>
      </Box>
    // </Box>
  );
};

export default UserProfileCard;
