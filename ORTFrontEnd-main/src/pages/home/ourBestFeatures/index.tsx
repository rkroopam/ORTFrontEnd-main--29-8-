import { Box, IconButton, Link, Typography } from '@mui/material'
import React from 'react'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SchoolIcon from '@mui/icons-material/School';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ScienceIcon from '@mui/icons-material/Science';

const features = [
  {
    number: '1',
    icon: <SchoolIcon fontSize="large" />,
    heading: 'Skilled Teachers',
    info: 'Dictumst magni irure nascetur nam primis, aliquam ipsum. Element, occaecat rerum.',
    link: 'single-page.html',
  },
  {
    number: '2',
    icon: <MonetizationOnIcon fontSize="large" />,
    heading: 'Affordable Courses',
    info: 'Dictumst magni irure nascetur nam primis, aliquam ipsum. Element, occaecat rerum.',
    link: 'single-page.html',
  },
  {
    number: '3',
    icon: <ScienceIcon fontSize="large" />,
    heading: 'Efficient & Flexible',
    info: 'Dictumst magni irure nascetur nam primis, aliquam ipsum. Element, occaecat rerum.',
    link: 'single-page.html',
  },
];

const FeatureCard = ({ feature }: any) => (
  <Box
  sx={{
    textAlign: 'center',
    m: 2,
    p: 2,
    boxShadow: 3,
    borderRadius: 5,
    border: '1px dashed',
    borderColor: 'grey.500',
    width: { xs: '100%', sm: '45%', md: '25%' },
  }}
>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 1 }}>
    <Typography variant="h5" sx={{ mr: 1 }}>
      {feature.number}
    </Typography>
    {feature.icon}
  </Box>
  <Typography variant="h6" sx={{ mb: 1 }}>
    {feature.heading}
  </Typography>
  <Typography variant="body2" sx={{ mb: 2 }}>
    {feature.info}
  </Typography>
  <Link href={feature.link} sx={{ textDecoration: 'none', color: 'inherit' }}>
    <IconButton aria-label="right-arrow">
      <ArrowForwardIcon />
    </IconButton>
  </Link>
</Box>
);

const OurBestFeatures = () => {
  return (
    <Box  >
      <Box sx={{ backgroundColor: '#F8F8F8', alignContent: 'center', justifyContent: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1, padding: 1, alignItems: 'center', flexDirection: 'column' }}>
          <Typography gutterBottom variant="h4" fontWeight="600" component="div">
            Our Best Features
          </Typography>
          <Typography paragraph sx={{ textAlign: 'center' }}>Saepe quo labore aenean dictumst expedita commodi auctor, nisl, lorem iusto feugiat nemo reiciendis laboris.</Typography>

        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} />
          ))}
        </Box>

      </Box>

    </Box>
  )
}

export default OurBestFeatures
