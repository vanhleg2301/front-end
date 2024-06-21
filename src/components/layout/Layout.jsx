import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/header";
import Footer from "../Footer/Footer";
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
