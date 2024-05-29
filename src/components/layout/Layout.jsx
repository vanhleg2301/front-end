import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import { CssBaseline, Divider } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import getLPTheme from "../header/getLPTheme";

export default function Layout() {
  const [mode, setMode] = React.useState("light");
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const LPtheme = createTheme(getLPTheme(mode));
  const defaultTheme = createTheme({ palette: { mode } });

  const toggleColorMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };
  return (
    <>
      <ThemeProvider theme={showCustomTheme ? LPtheme : defaultTheme}>
        <CssBaseline />
        <Header mode={mode} toggleColorMode={toggleColorMode} />

        <Outlet />

        <Divider />
        <Footer />
      </ThemeProvider>
    </>
  );
}
