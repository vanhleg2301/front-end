import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Box, Divider } from "@mui/material";
import { ThemeProvider } from "@mui/system";

export default function Layout() {
  return (
    <>
      <ThemeProvider>
        <Header />
        <Box>
          <Outlet />
        </Box>
        <Divider />
        <Footer />
      </ThemeProvider>
    </>
  );
}
