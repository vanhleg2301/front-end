import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Collapse,
  Divider,
  Drawer,
  IconButton,
  MenuItem,
  Typography, // Import Typography from MUI
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { AuthContext } from "../../context/AuthProvider";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./headerRight.css";

export default function HeaderRight() {
  const [open, setOpen] = useState(false);
  const [expandJobsMenu, setExpandJobsMenu] = useState(false); // New state
  const { sethLogin, userLogin } = useContext(AuthContext);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleToggleJobsMenu = () => {
    setExpandJobsMenu(!expandJobsMenu);
  };

  const handleLogout = () => {
    // Xử lý đăng xuất
  };

  return (
    <Box sx={{ display: { sm: "", md: "none" } }}>
      <Button
        variant="text"
        color="primary"
        aria-label="menu"
        onClick={toggleDrawer(true)}
        sx={{ minWidth: "30px", p: "4px" }}
      >
        <MenuIcon />
      </Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            minWidth: "60dvw",
            p: 2,
            backgroundColor: "background.paper",
            flexGrow: 1,
          }}
        >
          {sethLogin && (
            <MenuItem
              sx={{
                py: "6px",
                px: "12px",
              }}
            >
              <Avatar alt="User Avatar" src="" />
              <Box sx={{ ml: 2 }}>{userLogin?.user?.fullName}</Box>
            </MenuItem>
          )}
          <MenuItem onClick={handleToggleJobsMenu}>
            Jobs {expandJobsMenu ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
          </MenuItem>
          <Collapse in={expandJobsMenu}>
            <Box sx={{ p: 1 }}>
              <MenuItem className="menuItemChildren">
                <Typography variant="inherit">jobSaved</Typography>
              </MenuItem>
              <MenuItem className="menuItemChildren">
                <Typography variant="inherit">jobApplied</Typography>
              </MenuItem>
            </Box>
          </Collapse>
          <MenuItem>CV</MenuItem>
          <MenuItem>Companies</MenuItem>
          <MenuItem>Tools</MenuItem>
          <MenuItem>FAQ</MenuItem>
          <Divider />
          {!sethLogin && (
            <>
              <MenuItem>
                <Button
                  color="info"
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{ width: "100%" }}
                >
                  Sign up
                </Button>
              </MenuItem>
              <MenuItem>
                <Button
                  color="primary"
                  variant="outlined"
                  component={Link}
                  to="/login"
                  sx={{ width: "100%" }}
                >
                  Sign in
                </Button>
              </MenuItem>
            </>
          )}
        </Box>
      </Drawer>
    </Box>
  );
}
