import React from "react";
import { Line } from "react-chartjs-2";
import { Chart, registerables } from "chart.js";
import {
  Modal,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  IconButton,
  Paper,
} from "@mui/material";

Chart.register(...registerables);

const ChartComponent = () => {
  // Dummy data for the last 6 months
  const months = ["January", "February", "March", "April", "May", "June"];

  const orderData = [0, 0, 0, 0, 11, 26];

  const data = {
    labels: months,
    datasets: [
      {
        label: "Orders",
        data: orderData,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.5,
        fill: true,
        backgroundColor: "#E0E8FE",
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    // aspectRatio: 2, // Adjust the aspect ratio to control height and width
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        border: { dash: [4, 4] }, //for dashed y-axis line
        beginAtZero: true,
        ticks: {
          padding: 4, // Adjust this value to control y-axis label spacing
        },
      },
    },
  };

  return (
    <Box sx={{ m: "5px", p: "15px" }} component={Paper} elevation={3}>
      <Typography
        sx={{
          fontSize: "16px",
          pl: 2,
          textAlign: "left",
        }}
      >
        Orders
      </Typography>
      <Typography
        sx={{
          fontSize: "12px",
          pl: 2,
          textAlign: "left",
          color: "#9A0E06",
        }}
      >
        History of last 6 months
      </Typography>
      <Box sx={{ margin: "auto" }}>
        <Line height="380px" width="340px" data={data} options={options} />
      </Box>
    </Box>
  );
};

export default ChartComponent;
