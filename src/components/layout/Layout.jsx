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
        <Box
          sx={(theme) => ({
            pt: 7,
            width: "100%",
            backgroundImage:
              theme.palette.mode === "light"
                ? "linear-gradient(180deg, #CEE5FD, #FFF)"
                : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
            backgroundSize: "100% 20%",
            backgroundRepeat: "no-repeat",
          })}
        >
          <Outlet />
        </Box>
        <Divider />
        <Footer />
      </ThemeProvider>
    </>
  );
}
