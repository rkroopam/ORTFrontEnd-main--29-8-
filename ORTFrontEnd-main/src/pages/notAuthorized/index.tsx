import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

const NotAuthorized = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center', py: 8 }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: 4, 
            fontWeight: 'extrabold', 
            fontSize: { xs: '5rem', lg: '7rem' }, 
            color: 'primary.main' 
          }}
        >
          Not Authorized
        </Typography>
        <Typography 
          variant="h3" 
          component="p" 
          sx={{ 
            mb: 4, 
            fontWeight: 'bold' 
          }}
        >
          Something's missing.
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 4, 
            color: 'text.secondary' 
          }}
        >
          You are not authorized to view this page.
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          href="/" 
          sx={{ 
            textTransform: 'none', 
            my: 4 
          }}
        >
          Back to Homepage
        </Button>
      </Container>
    </Box>
  );
}

export default NotAuthorized;
