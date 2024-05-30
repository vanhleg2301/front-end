import * as React from "react";
import PropTypes from "prop-types";

import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import ToggleColorMode from "./ToggleColorMode";
import { Link } from "react-router-dom";
import "./header.css";

const logoStyle = {
  width: "30px",
  height: "auto",
  cursor: "pointer",
};

function Header({ mode, toggleColorMode }) {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const scrollToSection = (sectionId) => {
    const sectionElement = document.getElementById(sectionId);
    const offset = 128;
    if (sectionElement) {
      const targetScroll = sectionElement.offsetTop - offset;
      sectionElement.scrollIntoView({ behavior: "smooth" });
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setOpen(false);
    }
  };

  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          boxShadow: 0,
          backgroundColor: "transparent",
          backgroundImage: "none",
          mt: 2,
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            variant="regular"
            sx={(theme) => ({
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              borderRadius: "999px",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "rgba(240, 248, 255, 10)" // AliceBlue for light mode
                  : "rgba(25, 25, 112, 0.9)", // MidnightBlue for dark mode
              backdropFilter: "blur(20px)",
              maxHeight: 40,
              border: "1px solid",
              borderColor: "divider",
              boxShadow:
                theme.palette.mode === "light"
                  ? `0 0 1px rgba(0, 0, 0, 0.1), 1px 1.5px 2px -1px rgba(0, 0, 0, 0.15), 4px 4px 12px -2.5px rgba(0, 0, 0, 0.15)`
                  : "0 0 1px rgba(255, 255, 255, 0.1), 1px 1.5px 2px -1px rgba(255, 255, 255, 0.15), 4px 4px 12px -2.5px rgba(255, 255, 255, 0.15)",
            })}
          >
            <Box
              sx={{
                flexGrow: 1,
                display: "flex",
                alignItems: "center",
                ml: "-18px",
                px: 0,
              }}
            >
              <Box sx={{ ml: 2 }}>
                <img
                  src={"mon.png"}
                  style={logoStyle}
                  alt="logo of ace interview"
                />
              </Box>

              {/* Header top */}
              <Box sx={{ display: { xs: "none", md: "flex" }, ml: 7 }}>
                <MenuItem
                  onClick={() => scrollToSection("features")}
                  sx={{ py: "6px", px: "12px" }}
                  className="menu-item"
                >
                  <Typography variant="body2" color="text.primary">
                    Jobs
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("testimonials")}
                  sx={{ py: "6px", px: "12px" }}
                  className="menu-item"
                >
                  <Typography variant="body2" color="text.primary">
                    Profile & CV
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("highlights")}
                  sx={{ py: "6px", px: "12px" }}
                  className="menu-item"
                >
                  <Typography variant="body2" color="text.primary">
                    Companies
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("pricing")}
                  sx={{ py: "6px", px: "12px" }}
                  className="menu-item"
                >
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                <MenuItem
                  onClick={() => scrollToSection("faq")}
                  className="menu-item"
                >
                  <Typography variant="body2" color="text.primary">
                    FAQ
                  </Typography>
                </MenuItem>
              </Box>
            </Box>
            <Box
              sx={{
                display: { xs: "none", md: "flex" },
                gap: 0.5,
                alignItems: "center",
              }}
            >
              {/*<ToggleColorMode mode={mode} toggleColorMode={toggleColorMode} />*/}

              <Button
                color="primary"
                variant="text"
                size="small"
                component={Link}
                to="/login"
              >
                Sign in
              </Button>
              <Button
                color="info"
                variant="contained"
                size="small"
                component={Link}
                to="/register"
              >
                Sign up
              </Button>
            </Box>
            {/* Header right */}
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
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "end",
                      flexGrow: 1,
                    }}
                  >
                    <ToggleColorMode
                      mode={mode}
                      toggleColorMode={toggleColorMode}
                    />
                  </Box>
                  <MenuItem onClick={() => scrollToSection("features")}>
                    Jobs
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("testimonials")}>
                    Profile & CV
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("highlights")}>
                    Companies
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("pricing")}>
                    Pricing
                  </MenuItem>
                  <MenuItem onClick={() => scrollToSection("faq")}>
                    FAQ
                  </MenuItem>
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
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
}

Header.propTypes = {
  mode: PropTypes.oneOf(["dark", "light"]).isRequired,
  toggleColorMode: PropTypes.func.isRequired,
};

export default Header;
