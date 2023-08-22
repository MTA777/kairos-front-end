import React, { useEffect, useState } from "react";
import axios from "axios";
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
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import {
  TextSnippetOutlined as TextSnippetOutlinedIcon,
  PermIdentityOutlined as PermIdentityOutlinedIcon,
  ConfirmationNumberOutlined as ConfirmationNumberOutlinedIcon,
  BusinessOutlined as BusinessOutlinedIcon,
  EventOutlined as EventOutlinedIcon,
  AttachMoneyOutlined as AttachMoneyOutlinedIcon,
  LocalOfferOutlined as LocalOfferOutlinedIcon,
  MonetizationOnOutlined as MonetizationOnOutlinedIcon,
  // LocalConvenienceStoreOutlined,
} from "@mui/icons-material";

const ModalComponent = ({ open, onClose, selectedOrderId }) => {
  const [fetchedData, setFetchedData] = useState(null);
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const fetchData = async () => {
    try {
      console.log("Fetching data...");
      const authToken = localStorage.getItem("jwtToken");
      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      };
      const requestData = {
        OrderNum: selectedOrderId, // (prop passed to modal) by table_row
      };

      const apiUrl =
        "https://m2.kairossolutions.co/api/mcustdata/getcustshipdtl";

      const response = await axios.post(apiUrl, requestData, config);
      // Handle the response data here
      // console.log(response.data);
      setFetchedData(response.data);
      setOpenBackDrop(false);
      setOpenModal(true);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch data when modal is opened
    if (open) {
      console.log("Opening backdrop");
      setFetchedData(null); // to flush data stored, on previous render
      fetchData();
      setOpenBackDrop(true);
    }
  }, [open]); // Trigger the effect only when 'open' changes

  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 10000 }}
        // open={fetchedData === null && openBackDrop}
        open={openBackDrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Modal
        disableAutoFocus={true}
        open={openModal}
        onClose={() => {
          onClose();
          setOpenModal(false);
        }}
      >
        <Box
          textAlign="center"
          sx={{
            position: "fixed",
            top: "50%", // Center the modal vertically
            left: "50%", // Center the modal horizontally
            transform: "translate(-50%, -50%)",
            bgcolor: "white",
            width: "80%", // Set the initial width
            height: "auto", // Set height to auto initially
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "90%", // Limit the maximum width to 90% of the viewport
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={() => {
              onClose();
              setOpenModal(false);
            }}
          >
            <CloseIcon
              sx={{
                borderRadius: "16px",
                color: "white",
                bgcolor: "#EBC0BE",
                "&:hover": { bgcolor: "#CC6F6A" },
              }}
            />
          </IconButton>
          <Box
            component={Paper}
            elevation={3}
            sx={{ borderRadius: "8px", mt: 2 }}
          >
            <Typography
              variant="h6"
              sx={{
                borderRadius: "5px",
                pl: 2,
                textAlign: "left",
                color: "white",
                bgcolor: "#9A0E06",
              }}
            >
              Order Details
            </Typography>
            {/*  */}
            <Box display="flex" flexDirection="row" sx={{ mb: 2 }}>
              <Box sx={{ m: 1, mr: 10 }}>
                <Typography variant="body2" display="flex" alignItems="center">
                  <TextSnippetOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Order:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    {fetchedData?.orderdata.OrderNum}
                  </span>
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center">
                  <PermIdentityOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Customer:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    {fetchedData?.orderdata.CustomerName}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ m: 1, mr: 16 }}>
                <Typography variant="body2" display="flex" alignItems="center">
                  <ConfirmationNumberOutlinedIcon
                    sx={{ mr: 1, color: "#9A0E06" }}
                  />
                  PO Number:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    {fetchedData?.orderdata.PONum}
                  </span>
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center">
                  <BusinessOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Plant:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    {fetchedData?.orderdata.PlantName}
                  </span>
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center">
                  <EventOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Order Date:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    {fetchedData
                      ? new Date(fetchedData?.orderdata.OrderDate)
                          .toISOString()
                          .split("T")[0]
                      : "loading"}
                  </span>
                </Typography>
              </Box>
              <Box sx={{ m: 1 }}>
                <Typography variant="body2" display="flex" alignItems="center">
                  <AttachMoneyOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Total Charges:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    $
                    {parseFloat(fetchedData?.orderdata.TotalCharges).toFixed(2)}
                  </span>
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center">
                  <LocalOfferOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Total Discount:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    $
                    {parseFloat(fetchedData?.orderdata.TotalDiscount).toFixed(
                      2
                    )}
                  </span>
                </Typography>
                <Typography variant="body2" display="flex" alignItems="center">
                  <MonetizationOnOutlinedIcon
                    sx={{ mr: 1, color: "#9A0E06" }}
                  />
                  Total Net:{" "}
                  <span style={{ marginLeft: "5px" }}>
                    ${parseFloat(fetchedData?.orderdata.TotalNet).toFixed(2)}
                  </span>
                </Typography>
              </Box>
            </Box>
          </Box>

          <section>
            <Typography
              variant="h6"
              sx={{
                borderRadius: "5px",
                pl: 2,
                textAlign: "left",
                color: "white",
                bgcolor: "#9A0E06",
              }}
            >
              Line Details
            </Typography>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ mt: 1, ml: 3, width: "95%" }}
            >
              <Table>
                {/* Table Head */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      PARTNUM
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      DESCRIPTION
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      TYPE
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      UNIT PRICE
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      QTY
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      DISCOUNT
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      TOTAL PRICE
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
                  {fetchedData?.lines.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} align="center">
                        No data Found for this Table
                      </TableCell>
                    </TableRow>
                  ) : (
                    fetchedData?.lines.map((line) => (
                      <TableRow key={line.PartNum}>
                        <TableCell align="center">{line.PartNum}</TableCell>
                        <TableCell align="center">
                          {line.PartNumPartDescription}
                        </TableCell>
                        <TableCell align="center">{line.LineType}</TableCell>
                        <TableCell align="right">
                          {parseFloat(line.UnitPrice).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {parseFloat(line.OrderQty).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {parseFloat(line.Discount).toFixed(2)}
                        </TableCell>
                        <TableCell align="right">
                          {parseFloat(line.TotalPrice).toFixed(2)}
                        </TableCell>
                        {/* Add more table cells */}
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </section>
          <section>
            <Typography
              variant="h6"
              sx={{
                borderRadius: "5px",
                pl: 2,
                textAlign: "left",
                color: "white",
                bgcolor: "#9A0E06",
                mt: 2,
              }}
            >
              Shipment Details
            </Typography>
            <TableContainer
              component={Paper}
              elevation={3}
              sx={{ mt: 1, ml: 3, width: "95%" }}
            >
              <Table>
                {/* Table Head */}
                <TableHead>
                  <TableRow>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      SHIP TO
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      PACK NO
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      ORDER DATE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      INVOICED
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      SHIP DATE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{ bgcolor: "#9A0E06", color: "white" }}
                    >
                      DOWNLOADS
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
                  {/* change this to actual shipments data when available */}
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data Found for this Table
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default ModalComponent;
