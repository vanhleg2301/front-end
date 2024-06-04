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

  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenCv, setIsOpenCv] = React.useState(false);
  const [isOpenCompany, setIsOpenCompany] = React.useState(false);

  const handleMouseEnter = (section) => {
    if (section === "jobs") {
      setIsOpen(true);
      setIsOpenCv(false);
      setIsOpenCompany(false);
    } else if (section === "cv") {
      setIsOpen(false);
      setIsOpenCv(true);
      setIsOpenCompany(false);
    } else if (section === "companies") {
      setIsOpen(false);
      setIsOpenCv(false);
      setIsOpenCompany(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
    setIsOpenCv(false);
    setIsOpenCompany(false);
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
              <Box
                sx={{ ml: 2, textDecoration: "none" }}
                component={Link}
                to="/"
              >
                <img
                  src={"mon.png"}
                  style={logoStyle}
                  alt="logo of ace interview"
                />
              </Box>

              {/* Header top */}
              <Box sx={{ display: { xs: "none", md: "flex" }, ml: 7 }}>
                {/*Job*/}
                <MenuItem
                  onMouseEnter={() => handleMouseEnter("jobs")}
                  onMouseLeave={handleMouseLeave}
                  sx={{ py: "6px", px: "12px", textDecoration: "none" }}
                  className="menu-item"
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component={Link}
                    to="/jobs"
                    sx={{ textDecoration: "none" }}
                  >
                    Jobs
                  </Typography>
                  {isOpen && (
                    <Box className="dropdown-content">
                      <Link to="/jobs" className="dropdown-item">
                        Find job
                      </Link>
                      <Link to="/jobs" className="dropdown-item">
                        Job applied
                      </Link>
                      <Link to="/jobs" className="dropdown-item">
                        Job saved
                      </Link>
                    </Box>
                  )}
                </MenuItem>
                {/*Cv*/}
                <MenuItem
                  onMouseEnter={() => handleMouseEnter("cv")}
                  onMouseLeave={handleMouseLeave}
                  sx={{ py: "6px", px: "12px", textDecoration: "none" }}
                  className="menu-item"
                >
                  <Typography
                    variant="body2"
                    color="text.primary"
                    component={Link}
                    to="/profile/info"
                    sx={{ textDecoration: "none" }}
                  >
                    CV
                  </Typography>
                  {isOpenCv && (
                    <Box className="dropdown-content">
                      <Link to="/profile/info" className="dropdown-item">
                        profile
                      </Link>
                      <Link to="/profile/manager" className="dropdown-item">
                        Manager CV
                      </Link>
                      <Link to="/profile/upload" className="dropdown-item">
                        Upload CV
                      </Link>
                    </Box>
                  )}
                </MenuItem>
                {/*Companies*/}
                <MenuItem
                  onMouseEnter={() => handleMouseEnter("companies")}
                  onMouseLeave={handleMouseLeave}
                  sx={{ py: "6px", px: "12px" }}
                  className="menu-item"
                  component={Link}
                  to="/companies/all"
                >
                  <Typography variant="body2" color="text.primary">
                    Companies
                  </Typography>
                  {isOpenCompany && (
                    <Box className="dropdown-content">
                      <Link to="/companies/all" className="dropdown-item">
                        Companies
                      </Link>
                      <Link to="/companies/all" className="dropdown-item">
                        Top Company
                      </Link>
                    </Box>
                  )}
                </MenuItem>
                {/*pricing*/}
                <MenuItem sx={{ py: "6px", px: "12px" }} className="menu-item">
                  <Typography variant="body2" color="text.primary">
                    Pricing
                  </Typography>
                </MenuItem>
                {/*Faq*/}
                <MenuItem className="menu-item">
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
                  <MenuItem>Jobs</MenuItem>
                  <MenuItem>CV</MenuItem>
                  <MenuItem>Companies</MenuItem>
                  <MenuItem>Pricing</MenuItem>
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
