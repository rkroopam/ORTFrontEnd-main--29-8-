import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Typography, Container, Box, Paper } from '@mui/material';

const PasswordResetRequest = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/request-reset-password', { email });
      setMessage(response.data.message);
    } catch (error:any) {
      setMessage(error.message || 'An error occurred.');
    }
  };

  return (
    <Container component="main" maxWidth="xs" >
      <Paper elevation={3}>
        <Box p={4} mt={5}>
      <Typography variant="h4" gutterBottom>Reset Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Email"
          variant="outlined"
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button variant="contained" color="primary" type="submit" fullWidth>
          Send Reset Link
        </Button>
      </form>
      {message && <Box mt={2}><Typography color="error" variant="body2">{message}</Typography></Box>}
      </Box>
      </Paper>
    </Container>
  );
};

export default PasswordResetRequest;
