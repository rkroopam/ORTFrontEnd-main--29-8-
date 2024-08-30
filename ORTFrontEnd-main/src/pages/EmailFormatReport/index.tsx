import { Box, Container, Paper, Typography } from '@mui/material'
import React from 'react'
import StudentReportBar from '../../components/StudentReportBar'
import AccuracyAndFluencyBar from '../../components/AcuracyAndFlunecyBar'

const EmailFormatReport = () => {
  return (
    <Container component="main" maxWidth="md">
        <Paper elevation={3}>
          <Box p={4} mt={5}>
            <Typography variant="h5" align="center" fontWeight="bold">
              Alex's Your score 
            </Typography>
            <StudentReportBar/>
            <AccuracyAndFluencyBar/>
          
            
           
          </Box>
        </Paper>
      </Container>
  )
}

export default EmailFormatReport
