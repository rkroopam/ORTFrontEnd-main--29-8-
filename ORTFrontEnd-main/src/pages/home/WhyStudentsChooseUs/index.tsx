import { Box, Button, Container, Grid, LinearProgress, Typography } from '@mui/material'
import React from 'react'
import MedalIcon from '@mui/icons-material/EmojiEvents'; // Replace with appropriate icon
import ManIcon from '@mui/icons-material/Person';

const WhyStudentChooseUs = () => {
  const skills = [
    { title: 'Completed Projects', value: 92 },
    { title: 'Financial Skills', value: 98 },
    { title: 'Reliable & Hardworking', value: 90 },
  ];
  const qualifications = [
    {
      icon: <MedalIcon sx={{ color: "#9C27B0" }} />,
      title: 'Certified Institute',
      description: 'Lacinia asperiores incididunt saepe corrupti quos eros cupidatat faucibus natus.',
    },
    {
      icon: <ManIcon sx={{ color: "#9C27B0" }} />,
      title: 'Qualified Teachers',
      description: 'Lacinia asperiores incididunt saepe corrupti quos eros cupidatat faucibus natus.',
    },
  ];
  return (
    <Box p={10}>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Box>
              <img src='https://demo.bosathemes.com/html/educator/assets/img/educator-img13.jpg' alt='demoimage' style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: '15px' }} />
            </Box>
            <Box className="skill-container" mt={5}>
              {skills.map((skill, index) => (
                <Box className="skill-wrapper" key={index} mb={3}>
                  <Typography variant="h6" sx={{ fontSize: '14px', textAlign: 'left', ml: '8px' }} className="skill-title">
                    {skill.title}
                  </Typography>
                  <Box className="progress-wrapper" >
                    <Box display="flex" alignItems="center" >
                      <Typography variant="h6" className="progress-title"></Typography>
                      <Box position="relative" flex="1" ml={1}>
                        <LinearProgress
                          variant="determinate"
                          value={skill.value}
                          sx={{

                            height: 5,
                            borderRadius: 5,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                              backgroundColor: 'black',
                            },
                          }}
                        />
                        <Box
                          className="progress-indicator-inner"
                          position="absolute"
                          top={-22}
                          left={`${skill.value}%`}
                        // transform="translateX(-50%)"
                        >
                          <Typography variant="caption" className="percent" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
                            {skill.value}%
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              ))}
            </Box>
            <Box className="regarding-us" display="flex" justifyContent="space-between" alignItems="center">
      {qualifications.map((qualification, index) => (
        <Box
          key={index}
          className="qualification-content"
          display="flex"
          flexDirection="column"
          alignItems="center"
          mb={2}
          flex={1}
        >
          <Box className="qualification-tag" display="flex" alignItems="center" mb={1}>
            <Box className="qualification-icon" mr={1}>
              {qualification.icon}
            </Box>
            <Typography variant="h5" className="qualification-title">
              {qualification.title}
            </Typography>
          </Box>
          <Box className="qualification-detail">
            <Typography variant="body1" sx={{textAlign:'left'}}>{qualification.description}</Typography>
          </Box>
        </Box>
      ))}
      <Box
        className="divider"
        sx={{
          width: '5px',
          height: '100%',
          backgroundColor: 'grey',
          mx: 2,
        }}
      />
    </Box>
            <Box sx={{ display: { alignItems: 'left', md: 'flex' } }}>
              <Button
                variant="contained"
                color="secondary"
                sx={{ borderRadius: '18px', padding: "14px 20px" }}
              >
                <Typography sx={{ fontSize: '15px' }}>More About Us </Typography>
              </Button>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box>
              <Typography variant='h4'>Why Students Choose Us for Gaining Knowledge !</Typography>
              <Typography>Per sed, mattis. Integer viverra euismod maecenas incidunt, phasellus consequatur aliquam nihil temporibus in assumens deserunt convallis. Inceptos per consectetur consequatur proin.</Typography>
            </Box>
            <Box>
              <img src='https://demo.bosathemes.com/html/educator/assets/img/educator-img12-500px.jpg' alt='demoimage' style={{ maxWidth: '100%', height: 'auto', display: 'block', borderRadius: '15px' }} />
            </Box>
          </Grid>

        </Grid>

      </Container>
    </Box>
  )
}

export default WhyStudentChooseUs
