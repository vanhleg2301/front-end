import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/Footer";
import { Box, Divider } from "@mui/material";
import { ThemeProvider } from "@mui/system";
import { SocketProvider } from "../../context/socket";

export default function Layout() {
  return (
    <>
      <ThemeProvider>
        <SocketProvider>
          <Header />
          <Box>
            <Outlet />
          </Box>
          <Divider />
          <Footer />
        </SocketProvider>
      </ThemeProvider>
    </>
  );
}
