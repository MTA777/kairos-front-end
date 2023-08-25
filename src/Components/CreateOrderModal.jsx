import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, InputAdornment } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import Autocomplete from "@mui/material/Autocomplete";
import Alert from "@mui/material/Alert";
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
} from "@mui/icons-material";
import TextField from "@mui/material/TextField";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CreateOrderModal = ({ open, onClose }) => {
  const [openBackDrop, setOpenBackDrop] = useState(false);
  const [fetchedPartsData, setFetchedPartsData] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [disableSaveButton, setDisableSaveButton] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");

  const fetchData = async () => {
    try {
      console.log("fetching parts");
      const authToken = localStorage.getItem("jwtToken");

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      };

      const apiUrl = "https://m.kairossolutions.co/api/mpartinfo/getpartlist";

      const response = await axios.get(apiUrl, config);
      // Handle the response data here
      setFetchedPartsData(response.data);
      console.log("Fetched Parts:", fetchedPartsData);
      setOpenModal(true);
      setOpenBackDrop(false);
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch data when modal is opened
    if (open) {
      console.log("Opening backdrop");
      // setFetchedPartsData(null); // to flush data stored, on previous render
      fetchData();
      setOpenBackDrop(true);
    }
  }, [open]); // Trigger the effect only when 'open' changes

  const handleSubmit = async (event) => {
    event.preventDefault();
    setOpenBackDrop(true);
    setDisableSaveButton(true);

    const data = new FormData(event.currentTarget);
    const ots = data.get("ots");
    const address = data.get("address");
    const name = data.get("name");
    const city = data.get("city");
    const zip = data.get("zip");
    const addr1 = data.get("addr1");
    const addr2 = data.get("addr2");
    console.log("form called", { name, address, ots, city, zip, addr1, addr2 });

    //send req to store order
    try {
      console.log("Saving Order...");
      const authToken = localStorage.getItem("jwtToken");

      const config = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
      };

      const requestData = {
        item: [
          {
            Part: "014005",
            qty: "6",
            UnitPrice: "5.70000",
            SubTotal: "34.2",
            Description: "LEN ZINC PLATED THREADED ROD 1000XM11",
            DiscountPercent: "0.0",
            Discount: "0.0",
          },
          {
            Part: "014022",
            qty: "2",
            UnitPrice: "0.00000",
            SubTotal: "0.0",
            Description: "New part testing",
            DiscountPercent: "0.0",
            Discount: "0.0",
          },
        ],
        needbydate: "2023-08-25",
        customername: "MTA Test",
        ordernum: "",
        name,
        addr1,
        addr2,
        city,
        zip,
        shiptonum: "1",
        ots: ots === "on" ? "true" : "false",
      };

      const apiUrl = "https://m2.kairossolutions.co/api/mcustdata/createOrder";

      const response = await axios.post(apiUrl, requestData, config);
      // Handle the response data here

      console.log("Response:", response.data);
      setResponseMessage(response.data);
      setTimeout(() => {
        setResponseMessage(""); //to make alert disappear
      }, 6000);

      setDisableSaveButton(false);
      setOpenBackDrop(false);
      document.getElementById("user_details").reset(); //not sure whether to use this or not
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
      setDisableSaveButton(false);
      setOpenBackDrop(false);
    }
  };

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
            top: "43%", // for modal vertically
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
              Order Creation
            </Typography>
            {/*  */}
            <Box
              display="flex"
              flexDirection="row"
              justifyContent="space-around"
              sx={{ mb: 2 }}
              textAlign="center"
            >
              <Box sx={{ m: 1, mt: 2, mr: 7 }}>
                <Typography variant="body2" display="flex" alignItems="center">
                  <PermIdentityOutlinedIcon sx={{ mr: 1, color: "#9A0E06" }} />
                  Customer:{" "}
                  <span style={{ marginLeft: "4px" }}>
                    POS Cash Port Hedland (Internal Use Only)
                  </span>
                </Typography>
              </Box>
              <Box sx={{ m: 1, mt: 2 }}>
                <TextField
                  sx={{
                    width: "200px",
                    fontSize: "16px",
                    "& .MuiInputBase-root": {
                      height: 30,
                    },
                  }}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon sx={{ color: "#9A0E06" }} />
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  label="Search"
                />
                {/* <Autocomplete
                  disablePortal
                  id="search-parts"
                  options={fetchedPartsData.part}
                  sx={{ width: 300 }}
                  renderInput={(params) => (
                    <TextField {...params} label="Movie" />
                  )}
                /> */}
              </Box>
              <Box sx={{ m: 1, mt: 2 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    // label="Enter Date"
                    slotProps={{
                      textField: {
                        sx: {
                          "> .MuiOutlinedInput-root": {
                            height: 30, // whatever height you want here
                            width: "80%",
                          },
                        },
                      },
                    }}
                  />
                </LocalizationProvider>
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
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 2px",
                      }}
                    >
                      PARTNUM
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 16px",
                      }}
                    >
                      DESCRIPTION
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 16px",
                      }}
                    >
                      TYPE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 16px",
                      }}
                    >
                      UNIT PRICE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 16px",
                      }}
                    >
                      QTY
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 16px",
                      }}
                    >
                      DISCOUNT
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "14px",
                        p: "2px 16px",
                      }}
                    >
                      TOTAL PRICE
                    </TableCell>
                  </TableRow>
                </TableHead>
              </Table>
              <Table style={{ tableLayout: "fixed" }}>
                <TableBody>
                  {/* <div
                    style={{
                      maxHeight: "75px", // Set the maximum height of the scrollbar container
                      overflowX: "auto", // Add a vertical scrollbar when content overflows
                      width: "100%", // Match the width of the table head
                    }}
                  >
                    {fetchedPartsData?.part &&
                    fetchedPartsData.part.length > 0 ? (
                      fetchedPartsData.part.map((part) => (
                        <TableRow key={Math.random()}>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                              width: "3px", // Set a specific width for the content cell
                            }}
                          >
                            {part.Part_PartNum}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                              width: "8px",
                            }}
                          >
                            {part.Part_PartDescription}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                            }}
                          >
                            Part
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                            }}
                          >
                            {part.Part_UnitPrice}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                            }}
                          >
                            {part.PartBin_OnhandQty}
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                            }}
                          >
                            X
                          </TableCell>
                          <TableCell
                            align="center"
                            sx={{
                              fontSize: "14px",
                              p: "2px 16px",
                            }}
                          >
                            X
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center">
                          No data found for this table
                        </TableCell>
                      </TableRow>
                    )}
                  </div> */}
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No data found for this table
                    </TableCell>
                  </TableRow>
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
            <form id="user_details" onSubmit={handleSubmit}>
              {responseMessage && (
                <Alert
                  sx={{
                    width: "60%",
                    m: 1,
                    ml: "auto",
                    mr: "auto",
                  }}
                  severity={responseMessage.message}
                  onClose={() => setResponseMessage("")}
                >
                  OrderNum: <b>{responseMessage.OrderNum}</b> added successfully
                </Alert>
              )}
              <Box display="flex" flexDirection="row" noValidate sx={{ mt: 0 }}>
                <Box display="flex" flexDirection="column">
                  <Box display="flex" alignItems="center">
                    <Typography sx={{ ml: 4, mr: 1, fontSize: 14 }}>
                      OTS:
                    </Typography>
                    <Checkbox size="small" name="ots" />
                  </Box>
                  <Box
                    sx={{ m: 1, mr: 10, mt: 0 }}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography sx={{ fontSize: 14 }}>Address:</Typography>
                    <TextField
                      sx={{
                        ml: 2,
                        width: "200px",
                        fontSize: "16px",
                        "& .MuiInputBase-root": {
                          height: 30,
                        },
                      }}
                      inputProps={{ style: { fontSize: 14 } }}
                      variant="outlined"
                      name="address"
                    />
                  </Box>
                  <Box
                    sx={{ m: 1, mr: 10, mt: 0 }}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography sx={{ ml: 1.7, fontSize: 14 }}>
                      Name:
                    </Typography>
                    <TextField
                      sx={{
                        ml: 2,
                        width: "200px",
                        fontSize: "16px",
                        "& .MuiInputBase-root": {
                          height: 30,
                        },
                      }}
                      inputProps={{ style: { fontSize: 14 } }}
                      variant="outlined"
                      name="name"
                    />
                  </Box>
                  <Box
                    sx={{ m: 1, mr: 10, mt: 0 }}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography sx={{ ml: 3.5, fontSize: 14 }}>
                      City:
                    </Typography>
                    <TextField
                      sx={{
                        ml: 2,
                        width: "200px",
                        fontSize: "16px",
                        "& .MuiInputBase-root": {
                          height: 30,
                        },
                      }}
                      inputProps={{ style: { fontSize: 14 } }}
                      variant="outlined"
                      name="city"
                    />
                  </Box>
                </Box>

                <Box display="flex" flexDirection="column" sx={{ mt: 3.5 }}>
                  <Box sx={{ m: 1, mr: 10 }} display="flex" alignItems="center">
                    <Typography sx={{ ml: 5, fontSize: 14 }}>Zip:</Typography>
                    <TextField
                      sx={{
                        ml: 2,
                        width: "200px",
                        fontSize: "16px",
                        "& .MuiInputBase-root": {
                          height: 30,
                        },
                      }}
                      inputProps={{ style: { fontSize: 14 } }}
                      variant="outlined"
                      name="zip"
                    />
                  </Box>

                  <Box
                    sx={{ m: 1, mr: 10, mt: 0 }}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography sx={{ ml: 2.6, fontSize: 14 }}>
                      Addr1:
                    </Typography>

                    <TextField
                      sx={{
                        ml: 2,
                        width: "200px",
                        fontSize: "16px",
                        "& .MuiInputBase-root": {
                          height: 30,
                        },
                      }}
                      inputProps={{ style: { fontSize: 14 } }}
                      variant="outlined"
                      name="addr1"
                    />
                  </Box>

                  <Box
                    sx={{ m: 1, mr: 10, mt: 0 }}
                    display="flex"
                    alignItems="center"
                  >
                    <Typography sx={{ ml: 2.5, fontSize: 14 }}>
                      Addr2:
                    </Typography>

                    <TextField
                      sx={{
                        ml: 2,
                        width: "200px",
                        fontSize: "16px",
                        "& .MuiInputBase-root": {
                          height: 30,
                        },
                      }}
                      inputProps={{ style: { fontSize: 14 } }}
                      variant="outlined"
                      name="addr2"
                    />
                  </Box>
                </Box>
              </Box>
              <Box textAlign="right">
                <Button
                  // fontSize
                  disabled={disableSaveButton}
                  type="submit"
                  variant="contained"
                  sx={{
                    bgcolor: "#9A0E06",
                    fontSize: "10px",
                    mr: 1,
                    "&:hover": { bgcolor: "#ae3e38" },
                  }}
                >
                  Save
                </Button>

                <Button
                  // fontSize
                  variant="contained"
                  sx={{
                    bgcolor: "#1565C0",
                    marginLeft: "auto",
                    fontSize: "10px",
                  }}
                  onClick={() => {
                    onClose();
                    setOpenModal(false);
                  }}
                >
                  Close
                </Button>
              </Box>
            </form>
          </section>
        </Box>
      </Modal>
    </>
  );
};

export default CreateOrderModal;
