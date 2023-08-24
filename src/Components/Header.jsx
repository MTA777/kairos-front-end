import React, { useState } from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import { CardMedia } from "@mui/material";
import Paper from "@mui/material/Paper";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import VerifiedIcon from "@mui/icons-material/Verified";
import MarkEmailUnreadIcon from "@mui/icons-material/MarkEmailUnread";
import LockIcon from "@mui/icons-material/Lock";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import DownloadIcon from "@mui/icons-material/Download";

function Header(props) {
  // const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleSignOut = () => {
    localStorage.clear();
    console.log("Token:", localStorage.getItem("jwtToken"), ", Signing out");
    handleCloseMenu();
    navigate("/signin");
  };

  //for menu items
  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleNavigateToProfile = () => {
    navigate("/profile");
    handleCloseMenu();
  };

  // const handleNavigateToGenrePage = (id) => {
  //   navigate(`/api/genre/${id}/series`);
  // };

  return (
    <React.Fragment>
      <Box sx={{ bgcolor: "#9A0E06" }}>
        <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
          <CardMedia
            component="img"
            src="https://m2.kairossolutions.co/assets/media/logos/Kairos-Full1.png"
            alt="Company Logo"
            sx={{ ml: 3, mt: 0 }}
            style={{ width: "10%", height: "auto" }}
          />
          <Typography color="#fff" align="right" noWrap sx={{ mx: 1, flex: 1 }}>
            Hello, User
          </Typography>{" "}
          <div>
            <IconButton onClick={handleOpenMenu}>
              <AccountCircleIcon sx={{ fontSize: 35, color: "#fff" }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
            >
              <MenuItem disabled={true} onClick={handleNavigateToProfile}>
                Profile
              </MenuItem>
              <MenuItem disabled={true} onClick={() => navigate("/account")}>
                My Account
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
          <IconButton></IconButton>
        </Toolbar>
      </Box>
      <Paper elevation={4} sx={{ p: 2, pb: 1.5, m: 1 }}>
        <Typography
          sx={{ fontWeight: "bold", fontSize: "18px", mb: 0, mt: 0 }}
          display="flex"
          alignItems="center"
        >
          POS Cash Port Hedland (Internal Use Only)
          <VerifiedIcon sx={{ color: "blue", ml: 1 }} />
        </Typography>
        <Typography
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          sx={{
            mb: 0,
            mt: 0,
            color: "#9A0E06",
            fontWeight: "bold",
            fontSize: "14px",
          }}
        >
          23 PLUMBING & GAS, 23
          <Button
            variant="contained"
            sx={{
              bgcolor: "#9A0E06",
              fontSize: "10px",
              ml: 1,
              "&:hover": { bgcolor: "#ae3e38" },
            }}
          >
            Switch Customer
          </Button>{" "}
        </Typography>
        <MarkEmailUnreadIcon
          sx={{ color: "#9A0E06", fontSize: "16px", mb: 0, mt: 0 }}
        />
        <LockIcon sx={{ color: "#9A0E06", fontSize: "16px", mb: 0, mt: 0 }} />
        <Typography
          variant="subtitle2 bold"
          sx={{ mb: 1, color: "#9A0E06", fontWeight: "bold" }}
          display="flex"
          alignItems="center"
        >
          <LocationOnIcon sx={{ color: "#9A0E06", fontSize: "16px" }} /> POS
          Cash Port Hedland (Internal Use Only)~POS Cash Port Hedland (Internal
          Use Only)~ ~AUSTRALIA
        </Typography>
        <Box display="flex">
          <Typography variant="body2" sx={{ mr: 5 }}>
            Review Date:
            <span style={{ color: "#9A0E06", marginLeft: "4px" }}>
              {new Date().toLocaleDateString()}
            </span>
          </Typography>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Last Update Date:
            <span style={{ color: "#9A0E06", marginLeft: "4px" }}>
              {new Date().toLocaleDateString()}
            </span>
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" sx={{ mb: 2 }}>
          <Typography variant="body2">
            Date range: 2023-07-01 / 2023-07-31
          </Typography>
          <Button
            variant="contained"
            sx={{
              ml: 3,
              bgcolor: "#9A0E06",
              fontSize: "10px",
              "&:hover": { bgcolor: "#ae3e38" },
            }}
            startIcon={<DownloadIcon />}
          >
            Statement
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <Typography
            variant="body2"
            display="flex"
            alignItems="center"
            sx={{ mr: 10 }}
          >
            <ShoppingCartIcon sx={{ color: "#9A0E06", marginRight: "4px" }} />
            Open Order:{" "}
            <span style={{ color: "#9A0E06", marginLeft: "4px" }}>36</span>
          </Typography>
          <Typography variant="body2" display="flex" alignItems="center">
            <AssignmentTurnedInIcon
              sx={{ color: "#9A0E06", marginRight: "4px" }}
            />
            Total Orders:{" "}
            <span style={{ color: "#9A0E06", marginLeft: "4px" }}>36</span>
          </Typography>
        </Box>
      </Paper>
    </React.Fragment>
  );
}

Header.propTypes = {
  sections: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    })
  ),
  title: PropTypes.string,
};

export default Header;
