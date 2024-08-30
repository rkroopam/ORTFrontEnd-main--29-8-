import React from "react";
import { Box, Typography, Button } from "@mui/material";

const DyslexiaPage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Understanding Dyslexia
      </Typography>
      <Box sx={{ flex: 1, overflowY: "auto" }}>
        <Typography variant="h6" gutterBottom>
          What is Dyslexia?
        </Typography>
        <Typography paragraph>
          Dyslexia is a specific learning disability that affects reading and
          language processing skills. Individuals with dyslexia often have
          difficulties with phonological processing, spelling, and decoding
          words, despite having average to above-average intelligence.
        </Typography>

        <Typography variant="h6" gutterBottom>
          Characteristics of Dyslexia
        </Typography>
        <Typography paragraph>
          Some common characteristics of dyslexia include:
          <ul>
            <li>Difficulties with reading fluency and accuracy</li>
            <li>Problems with spelling and writing</li>
            <li>Challenges in decoding and recognizing words</li>
            <li>Difficulty with organizing thoughts and tasks</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          Strategies and Support
        </Typography>
        <Typography paragraph>
          There are various strategies and support systems that can help
          individuals with dyslexia:
          <ul>
            <li>Using assistive technology, such as text-to-speech software</li>
            <li>Implementing structured literacy programs</li>
            <li>Providing extra time for reading and writing tasks</li>
            <li>Offering one-on-one tutoring or support</li>
          </ul>
        </Typography>

        <Typography variant="h6" gutterBottom>
          Additional Resources
        </Typography>
        <Typography paragraph>
          For more information and resources on dyslexia, consider visiting:
          <ul>
            <li>
              <a
                href="https://www.dyslexiaida.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                International Dyslexia Association
              </a>
            </li>
            <li>
              <a
                href="https://www.dyslexiacenter.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Dyslexia Center
              </a>
            </li>
          </ul>
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "flex-end", padding: 2 }}>
        <Button variant="contained" color="primary">
          Back
        </Button>
      </Box>
    </Box>
  );
};

export default DyslexiaPage;
