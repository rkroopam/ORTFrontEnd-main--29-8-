import { Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
const score=80
const StudentReportBar = () => {
  return (
    <Box p={4} mt={5}>
           
            <Box position="relative" mt={3}>
              <Box display="flex" height={10}>
                <Box flex={7.6} bgcolor="red" />
                <Box flex={1.3} bgcolor="yellow" />
                <Box flex={1.1} bgcolor="green" />
              </Box>
              <Box
                position="absolute"
                top={-20}
                left={`${(score / 100) * 100}%`}
                sx={{
                  transform: "translateX(-50%)",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontWeight: "bold", color: "red" }}
                >
                  ▼
                </Typography>
              </Box>
            </Box>

            <Box
              mt={5}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box display="flex" alignItems="center">
                <Box width={10} height={10} bgcolor="red" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  High risk (0-79)
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width={10} height={10} bgcolor="yellow" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  Low risk (80-89)
                </Typography>
              </Box>
              <Box display="flex" alignItems="center" mt={1}>
                <Box width={10} height={10} bgcolor="green" borderRadius="50%" />
                <Typography ml={1} sx={{ fontFamily: "Cadman" }}>
                  Pass (90-100)
                </Typography>
              </Box>
            </Box>
          </Box>
  )
}

export default StudentReportBar
