import { Box, LinearProgress, Typography } from '@mui/material'
import React from 'react'

const AccuracyAndFluencyBar = () => {
 

  return (
    <Box sx={{ width: '100%', maxWidth: 700 }} mt={5}>
      <LinearProgress
        variant="determinate"
        value={55}
        sx={{
          height: 10,
          borderRadius: 5,
          '& .MuiLinearProgress-bar': {
            borderRadius: 5,
            backgroundColor: '#388E3C', // Progress color
          },
          backgroundColor: '#C8E6C9', // Background color of the bar
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Visual 45%
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Auditory 55%
        </Typography>
      </Box>
    </Box>
  )
}

export default AccuracyAndFluencyBar
