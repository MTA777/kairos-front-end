import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "#9A0E06",
        color: "white",
        py: 2,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="body2" sx={{ mb: 1 }}>
          2022© Kairos Version 20220413-10514
        </Typography>
        <Typography variant="body2">
          <Link href="#" sx={{ textDecoration: "none", color: "white" }}>
            About
          </Link>{" "}
          |{" "}
          <Link href="#" sx={{ textDecoration: "none", color: "white" }}>
            Team
          </Link>{" "}
          |{" "}
          <Link href="#" sx={{ textDecoration: "none", color: "white" }}>
            Contact
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
