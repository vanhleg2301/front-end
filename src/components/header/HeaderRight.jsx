import { Box, Button, Divider, Drawer, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import React from "react";
import { Link } from "react-router-dom";

export default function HeaderRight() {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
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
          <MenuItem>Jobs</MenuItem>
          <MenuItem>CV</MenuItem>
          <MenuItem>Companies</MenuItem>
          <MenuItem>Tools</MenuItem>
          <MenuItem>FAQ</MenuItem>
          <Divider />
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
        </Box>
      </Drawer>
    </Box>
  );
}
