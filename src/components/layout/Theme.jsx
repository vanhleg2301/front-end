import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "'Rubik', sans-serif",
    fontOpticalSizing: "auto",
    fontWeight: 400, // Replace 400 with the desired font weight
    fontStyle: "normal",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Rubik', sans-serif",
          fontOpticalSizing: "auto",
          fontWeight: 400,
          fontStyle: "normal",
        },
      },
    },
  },
});

export default theme;
