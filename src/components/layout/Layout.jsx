import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { Box, CssBaseline, Divider } from "@mui/material";
import { ThemeProvider } from "@mui/system";

export default function Layout() {
  // const [mode, setMode] = React.useState("light");
  // const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  // const LPtheme = createTheme(getLPTheme(mode));
  // const defaultTheme = createTheme({ palette: { mode } });

  // const toggleColorMode = () => {
  //   setMode((prev) => (prev === "dark" ? "light" : "dark"));
  // };
  // theme={showCustomTheme ? defaultTheme : LPtheme}
  // mode={mode} toggleColorMode={toggleColorMode}
  return (
    <>
      <ThemeProvider>
        <CssBaseline />
        <Header />
        <Box
          sx={(theme) => ({
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
