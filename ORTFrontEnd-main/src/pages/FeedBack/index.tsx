// FeedbackPage.tsx

import React, { useState } from 'react';
import { Container, Grid, Paper, Typography, Button, TextField, Box } from '@mui/material';

interface Props {
  testResults: { [key: string]: string };
}

const FeedbackPage: React.FC<Props> = ({ testResults }) => {
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = () => {
    // Handle feedback submission logic here
    console.log('Feedback submitted:', feedback);
    // Optionally, you can store the feedback or send it to a backend service
  };

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center" gutterBottom>
            Test Feedback
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: '16px' }}>
            <Typography variant="h6" gutterBottom>
              Test Results:
            </Typography>
            <Box mb={2}>
              {Object.entries(testResults).map(([question, answer]) => (
                <Typography key={question} variant="body1">
                  {`${question}: ${answer}`}
                </Typography>
              ))}
            </Box>
            <Typography variant="body1" gutterBottom>
              Provide your feedback on the test:
            </Typography>
            <TextField
              id="feedback"
              label="Feedback"
              multiline
              rows={4}
              fullWidth
              variant="outlined"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              style={{ marginBottom: '16px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmitFeedback}
              disabled={!feedback}
            >
              Submit Feedback
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default FeedbackPage;
