import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/Footer";
import { Box, Divider } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { SocketProvider } from "../../context/socket";
import theme from "./Theme";

export default function Layout() {
  return (
    <>
      <Box sx={{ backgroundColor: "#F0F0F0", margin: -1, paddingTop: 15 }} >
        <ThemeProvider theme={theme}>
          <SocketProvider>
            <Header />
            <Box>
              <Outlet />
            </Box>
            <Divider />
            <Footer />
          </SocketProvider>
        </ThemeProvider>
      </Box>
    </>
  );
}
