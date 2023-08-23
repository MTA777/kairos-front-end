import React from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/TableComponent";
import Footer from "../Components/Footer";
import ChartComponent from "../Components/ChartCompoenent";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";

function HomePage() {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="center"
          flexWrap="wrap"
        >
          <TableComponent />
          <ChartComponent />
        </Box>
      </Box>

      <Footer />
    </>
  );
}

export default HomePage;
