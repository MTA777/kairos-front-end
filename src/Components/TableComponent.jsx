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
  Box,
  TablePagination,
  // circularProgressClasses,
} from "@mui/material";
import { Add } from "@mui/icons-material";
import ModalComponent from "./ModalComponent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CreateOrderModal from "./CreateOrderModal";
import { stringNumFormat } from "../Utils/stringNumFormat";

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
  const [openCreateOrderModal, setOpenCreateOrderModal] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [openBackDrop, setOpenBackDrop] = useState(false);

  // for orderId Modal
  const handleOpenModal = (orderId) => {
    setSelectedOrderId(orderId);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setSelectedOrderId(null);
    setOpenModal(false);
  };

  // for createOrder Modal
  const handleOpenCreateOrderModal = () => {
    setOpenCreateOrderModal(true);
  };

  const handleCloseCreateOrderModal = () => {
    setOpenCreateOrderModal(false);
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
    <Box
      sx={{ m: "0 auto 5px", p: "6px 60px" }}
      component={Paper}
      elevation={3}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        // open={fetchedData === null && openBackDrop}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Toolbar>
        <Button
          onClick={handleOpenCreateOrderModal}
          variant="contained"
          startIcon={<Add />}
          sx={{
            bgcolor: "#9A0E06",
            marginLeft: "auto",
            fontSize: "10px",
            "&:hover": { bgcolor: "#ae3e38" },
          }}
        >
          New Order
        </Button>
        <CreateOrderModal
          open={openCreateOrderModal}
          onClose={handleCloseCreateOrderModal}
        />
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          sx={{ marginLeft: "7px" }}
          inputProps={{
            style: {
              height: "15px",
              fontSize: "14px",
            },
          }}
        />
      </Toolbar>
      <TableContainer
        component={Paper}
        elevation={1}
        sx={{ fontSize: "2px", width: "105%" }}
      >
        <Table>
          <TableHead sx={{ bgcolor: "#9A0E06" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  sx={{ color: "white", fontSize: "12px" }}
                  key={column}
                  align={
                    column === "TOTAL CHARGES" ||
                    column === "TOTAL DISCOUNT" ||
                    column === "GST" ||
                    column === "TOTAL NET"
                      ? "right"
                      : "center"
                  }
                >
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
                  <TableCell align="right">
                    ${stringNumFormat(c.OrderHed_TotalCharges, 2, 2)}
                  </TableCell>
                  <TableCell align="right">
                    ${stringNumFormat(c.OrderHed_TotalDiscount, 2, 2)}
                  </TableCell>
                  <TableCell align="right">
                    ${stringNumFormat(c.OrderHed_TotalTax, 2, 2)}
                  </TableCell>
                  <TableCell align="right">
                    ${stringNumFormat(c.OrderHed_TotalInvoiced, 2, 2)}
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
    </Box>
  );
};

export default TableComponent;
