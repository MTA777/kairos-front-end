import React from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/TableComponent";
import Footer from "../Components/Footer";
import ChartComponent from "../Components/ChartCompoenent";
import Box from "@mui/material/Box";
import { useTheme } from "@mui/material/styles";
import { Container, Grid } from "@material-ui/core";

function HomePage() {
  const theme = useTheme();

  return (
    <>
      {/* <Header />
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

      <Footer /> */}

      <Header />
      <Container sx={{ ml: 2, mr: 2 }}>
        <Grid container spacing={0}>
          <Grid item xs={12} md={9}>
            <TableComponent />
          </Grid>
          <Grid item xs={12} md={3}>
            <ChartComponent />
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default HomePage;
