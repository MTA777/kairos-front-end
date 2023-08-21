import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Toolbar,
  TextField,
  TablePagination,
  // circularProgressClasses,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ModalComponent from "./ModalComponent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const columns = [
  "ORDER#",
  "PO NUM",
  "ORDER DATE",
  "STATUS",
  "TOTAL CHARGES",
  "TOTAL DISCOUNT",
  "GST",
  "TOTAL NET",
];

const TableComponent = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [customerData, setCustomerData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setOpenModal(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const authToken = localStorage.getItem("jwtToken");
        const config = {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        };
        const requestData = {
          // ... (if you have any data to send in the request body)
        };

        const apiUrl =
          "https://m2.kairossolutions.co/api/mcustdata/getcustomerdata";

        const response = await axios.post(apiUrl, requestData, config);
        // Handle the response data here
        setCustomerData(response.data.customerdata.orders);
        setOpenBackDrop(false);
        // console.log("Response data:", response.data);
        // console.log("customerData:", customerData);
      } catch (error) {
        // Handle errors here
        console.error("Error:", error);
      }
    };

    fetchData();
    setOpenBackDrop(true);
  }, []);

  return (
    <div>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        // open={fetchedData === null && openBackDrop}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toolbar>
        <Button
          variant="contained"
          startIcon={<Add />}
          sx={{ bgcolor: "#9A0E06", marginLeft: "auto" }}
        >
          New Order
        </Button>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          sx={{ marginLeft: "10px" }}
        />
      </Toolbar>
      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: "#9A0E06" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell sx={{ color: "white" }} key={column} align="center">
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {customerData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((c) => (
                <TableRow
                  key={c.OrderHed_OrderNum}
                  onClick={() => handleOpenModal(c.OrderHed_OrderNum)}
                  style={{ cursor: "pointer" }}
                >
                  <TableCell align="center">{c.OrderHed_OrderNum}</TableCell>
                  <TableCell align="center">{c.OrderHed_PONum}</TableCell>
                  <TableCell align="center">
                    {new Date(c.OrderHed_OrderDate).toISOString().split("T")[0]}
                  </TableCell>
                  <TableCell align="center">
                    {c.OrderHed_OpenOrder ? "OPEN" : "CLOSE"}
                  </TableCell>
                  <TableCell align="center">
                    ${c.OrderHed_TotalCharges}
                  </TableCell>
                  <TableCell align="center">
                    ${c.OrderHed_TotalDiscount}
                  </TableCell>
                  <TableCell align="center">${c.OrderHed_TotalTax}</TableCell>
                  <TableCell align="center">
                    ${c.OrderHed_TotalInvoiced}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 100]}
        component="div"
        count={customerData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <ModalComponent
        open={openModal}
        onClose={handleCloseModal}
        selectedOrderId={selectedOrderId}
      />
    </div>
  );
};

export default TableComponent;
