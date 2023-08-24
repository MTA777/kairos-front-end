import React from "react";
import { Box, Typography, Container, Link } from "@mui/material";

const Footer = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between" // This will create space between the two components
      sx={{
        p: 4,
        bgcolor: "#9A0E06",
        color: "white",
        py: 2,
        mt: "auto",
        textAlign: "center",
      }}
    >
      <Typography variant="body2">
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
    </Box>
  );
};

export default Footer;
