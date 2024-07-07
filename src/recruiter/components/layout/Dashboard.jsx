import * as React from "react";
import { Link, Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { mainListItems, secondaryListItems } from "./ListItem";
import {
  CssBaseline,
  Box,
  Divider,
  Avatar,
  MenuItem,
  Menu,
} from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles"; // Updated import
import Recruiter from "../../../components/header/subHeader/recruiter";
import { useSocket } from "../../../context/socket";

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}>
      {"Copyright © "}
      <Link color='inherit' href='/'>
        AceInterview
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const defaultTheme = createTheme({
  palette: {
    mode: "dark", // Ensure mode is defined
    grey: {
      100: "#f5f5f5",
      900: "#212121",
    },
  },
});

export default function Dashboard() {
  const [isOpenProfile, setIsOpenProfile] = React.useState(false);
  const [isOpentNotification, setIsOpenNotification] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [countNotification, setCountNotification] = React.useState(0);
  const [notificationDetail, setNotificationDetail] = React.useState([]);

  const handleMouseEnter = (section) => {
    if (section === "info") {
      setIsOpenProfile(true);
    }
    if (section === "notification") {
      setIsOpenNotification(true);
    }
  };

  const handleMouseLeave = () => {
    setIsOpenProfile(false);
    setIsOpenNotification(false);
  };

  const [open, setOpen] = React.useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleNotificationClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setAnchorEl(null);
  };

  const socket = useSocket();

  React.useEffect(() => {
    if (!socket) return;

    const handleNotification = (data) => {
      console.log(data);
      console.log(data.message); // Display notification message

      // Save notification in session storage
      const storedNotifications =
        JSON.parse(sessionStorage.getItem("notifications")) || [];
      storedNotifications.push(data);
      sessionStorage.setItem(
        "notifications",
        JSON.stringify(storedNotifications)
      );

      setCountNotification(storedNotifications.length); // Update notification count
      setNotificationDetail(storedNotifications); // Update notification detail
    };

    socket.on("notification", handleNotification);

    return () => {
      socket.off("notification", handleNotification);
    };
  }, [socket]);

  React.useEffect(() => {
    // Retrieve notifications from session storage on component mount
    const storedNotifications =
      JSON.parse(sessionStorage.getItem("notifications")) || [];
    setCountNotification(storedNotifications.length);
    setNotificationDetail(storedNotifications);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <Box sx={{ display: "flex" }}>
        <AppBar position='absolute' open={open}>
          <Toolbar
            sx={{
              pr: "24px", // keep right padding when drawer closed
            }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}>
              <MenuIcon />
            </IconButton>
            <Typography
              component='h1'
              variant='h6'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}>
              Dashboard
            </Typography>
            <IconButton
              color='inherit'
              onClick={handleNotificationClick}
              onMouseEnter={() => handleMouseEnter("notification")}
              onMouseLeave={handleMouseLeave}>
              <Badge badgeContent={countNotification} color='secondary'>
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleNotificationClose}
              onMouseEnter={() => handleMouseEnter("notification")}
              onMouseLeave={handleMouseLeave}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
              {notificationDetail.length > 0 ? (
                notificationDetail.map((notification, index) => {
                  const message =
                    notification.message.length > 30
                      ? notification.message.slice(0, 30) + "..."
                      : notification.message;
                  return (
                    <MenuItem
                    title={`${notification.message}`}
                      key={index}
                      sx={{ p: 3 }}
                      component={Link}
                      to={`jobByRecruiter/${notification.jobId}`}>
                      {message}
                    </MenuItem>
                  );
                })
              ) : (
                <MenuItem sx={{ p: 3 }}>No notifications</MenuItem>
              )}
            </Menu>
            <MenuItem
              onMouseEnter={() => handleMouseEnter("info")}
              onMouseLeave={handleMouseLeave}>
              <Avatar alt='User Avatar' src='' />
              {isOpenProfile && <Recruiter />}
            </MenuItem>
          </Toolbar>
        </AppBar>
        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}>
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            {mainListItems}
            <Divider sx={{ my: 1 }} />
            {secondaryListItems}
          </List>
        </Drawer>
        <Box
          component='main'
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}>
          <Toolbar />
          {/*Outlet*/}
          <Container maxWidth='lg' sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              {/* Chart */}
              <Grid item xs={12} md={12} lg={12}>
                <Paper
                  sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                  }}>
                  <Outlet />
                </Paper>
              </Grid>
            </Grid>
            <Copyright sx={{ mt: 10 }} />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
