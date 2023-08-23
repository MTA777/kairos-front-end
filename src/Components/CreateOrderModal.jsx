import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, InputAdornment } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
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

  const fetchData = async () => {
    try {
      console.log("fetching parts");
      // const authToken = localStorage.getItem("jwtToken");
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
    } catch (error) {
      // Handle errors here
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    // Fetch data when modal is opened
    if (open) {
      console.log("Opening Create Order Modal");
      fetchData();
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
      <Modal disableAutoFocus={true} open={open} onClose={onClose}>
        <Box
          textAlign="center"
          sx={{
            position: "fixed",
            top: "43%", // Center the modal vertically
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
            onClick={onClose}
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
              </Box>
              <Box sx={{ m: 1 }}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label="Enter Date"
                    slotProps={{ textField: { size: "small" } }}
                    sx={{
                      width: "80%",
                      fontSize: "14px",
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
                  <Box
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
                  </Box>
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
            <Box display="flex" flexDirection="row">
              <Box display="flex" flexDirection="column">
                <Box sx={{}} display="flex" alignItems="center">
                  <Typography sx={{ ml: 4, mr: 1 }}>OTS:</Typography>
                  <Checkbox />
                </Box>
                <Box sx={{ m: 1, mr: 10 }} display="flex" alignItems="center">
                  <Typography>Address:</Typography>
                  <TextField
                    sx={{
                      ml: 2,
                      width: "200px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        height: 30,
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{ m: 1, mr: 10, mt: 0 }}
                  display="flex"
                  alignItems="center"
                >
                  <Typography sx={{ ml: 2 }}>Name:</Typography>
                  <TextField
                    sx={{
                      ml: 2,
                      width: "200px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        height: 30,
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{ m: 1, mr: 10, mt: 0 }}
                  display="flex"
                  alignItems="center"
                >
                  <Typography sx={{ ml: 4 }}>City:</Typography>
                  <TextField
                    sx={{
                      ml: 2,
                      width: "200px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        height: 30,
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box sx={{ m: 1, mr: 10 }} display="flex" alignItems="center">
                  <Typography sx={{ ml: 5 }}>Zip:</Typography>
                  <TextField
                    sx={{
                      ml: 2,
                      width: "200px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        height: 30,
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{ m: 1, mr: 10, mt: 0 }}
                  display="flex"
                  alignItems="center"
                >
                  <Typography sx={{ ml: 2.5 }}>Addr1:</Typography>
                  <TextField
                    sx={{
                      ml: 2,
                      width: "200px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        height: 30,
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
                <Box
                  sx={{ m: 1, mr: 10, mt: 1 }}
                  display="flex"
                  alignItems="center"
                >
                  <Typography sx={{ ml: 2.5 }}>Addr2:</Typography>
                  <TextField
                    sx={{
                      ml: 2,
                      width: "200px",
                      fontSize: "16px",
                      "& .MuiInputBase-root": {
                        height: 30,
                      },
                    }}
                    variant="outlined"
                  />
                </Box>
              </Box>
            </Box>
          </section>
          <Box textAlign="right">
            <Button
              // fontSize
              variant="contained"
              sx={{ bgcolor: "#1565C0", marginLeft: "auto", fontSize: "10px" }}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              // fontSize
              variant="contained"
              sx={{ bgcolor: "#9A0E06", marginLeft: 2, fontSize: "10px" }}
            >
              Save Changes
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CreateOrderModal;
