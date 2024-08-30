import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";

const PageNotFound = () => {
  return (
    <Container
      sx={{
        backgroundColor: "background.default",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          textAlign: "center",
          maxWidth: "600px",
          padding: 4,
        }}
      >
        <Typography
          variant="h1"
          color="primary"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
          }}
        >
          404
        </Typography>
        <Typography variant="h4" color="textPrimary" sx={{ marginBottom: 2 }}>
          Something's missing.
        </Typography>
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{ marginBottom: 2 }}
        >
          Sorry, we can't find that page. You'll find lots to explore on the
          home page.
        </Typography>
        <Button
          href="#"
          variant="contained"
          color="primary"
          sx={{ marginTop: 4 }}
        >
          Back to Homepage
        </Button>
      </Box>
    </Container>
  );
};

export default PageNotFound;
