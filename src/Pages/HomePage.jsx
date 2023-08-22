import React from "react";
import Header from "../Components/Header";
import TableComponent from "../Components/TableComponent";
import Footer from "../Components/Footer";
import ChartComponent from "../Components/ChartCompoenent";

function HomePage() {
  return (
    <>
      <Header />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyItems: "center",
        }}
      >
        <TableComponent />
        <ChartComponent />
      </div>
      <Footer />
    </>
  );
}

export default HomePage;
