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
                <Typography variant="body2" display="flex" alignItems="center">
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
                        <InputAdornment position="flex-end">
                          <SearchIcon sx={{ color: "#9A0E06" }} />
                        </InputAdornment>
                      ),
                    }}
                    id="outlined-basic"
                    label="Search"
                  />
                </Typography>
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
                        fontSize: "12px",
                      }}
                    >
                      PARTNUM
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      DESCRIPTION
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      TYPE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      UNIT PRICE
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      QTY
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      DISCOUNT
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        bgcolor: "#9A0E06",
                        color: "white",
                        fontSize: "12px",
                      }}
                    >
                      TOTAL PRICE
                    </TableCell>
                  </TableRow>
                </TableHead>
                {/* Table Body */}
                <TableBody>
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
            <Box display="flex" flexDirection="row">
              <Box display="flex" flexDirection="column">
                <Box sx={{ m: 1, mr: 10 }}>
                  <Typography display="flex" alignItems="center">
                    Address:
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
                  </Typography>
                </Box>
                <Box sx={{ m: 1, mr: 10, mt: 0 }}>
                  <Typography display="flex" alignItems="center" sx={{ ml: 2 }}>
                    Name:
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
                  </Typography>
                </Box>
                <Box sx={{ m: 1, mr: 10, mt: 0 }}>
                  <Typography display="flex" alignItems="center" sx={{ ml: 4 }}>
                    City:
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
                  </Typography>
                </Box>
              </Box>
              <Box display="flex" flexDirection="column">
                <Box sx={{ m: 1, mr: 10, mt: 0 }}>
                  <Typography display="flex" alignItems="center" sx={{ ml: 4 }}>
                    OTS: <Checkbox />
                  </Typography>
                </Box>
                <Box sx={{ m: 1, mr: 10, mt: 0 }}>
                  <Typography display="flex" alignItems="center" sx={{ ml: 2 }}>
                    Addr1:
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
                  </Typography>
                </Box>
                <Box sx={{ m: 1, mr: 10, mt: 0 }}>
                  <Typography
                    display="flex"
                    alignItems="center"
                    sx={{ ml: 4.5 }}
                  >
                    Zip:
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
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ m: 1, mr: 10, mt: 1 }}>
                <Typography display="flex" alignItems="center" sx={{ ml: 4 }}>
                  Addr2:
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
                </Typography>
              </Box>
            </Box>
          </section>
          <Box textAlign="right">
            <Button
              fontsize
              variant="contained"
              sx={{ bgcolor: "#1565C0", marginLeft: "auto", fontSize: "10px" }}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              fontsize
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
