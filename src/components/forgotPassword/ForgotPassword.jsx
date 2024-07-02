import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Typography color="inherit" component={Link} to="/">
        Ace Interview
      </Typography>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");

  // const generatePassword = () => {
  //   const length = 8;
  //   const charset =
  //     "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  //   let retVal = "";
  //   for (let i = 0, n = charset.length; i < length; ++i) {
  //     retVal += charset[Math.floor(Math.random() * n)];
  //   }
  //   return retVal;
  // };

  // const handleSubmit = async () => {
  //   const newPassword = generatePassword();
  //   // Send the new password to the user's email
  //   await sendEmail(
  //     email,
  //     "Your new password",
  //     `Your new password is: ${newPassword}`
  //   );
  //   console.log("send");
  // };

  // Rest of your component

  return (
    <Grid container>
      <Grid item md={12}>
        <Container component="main" maxWidth="md">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Forgot Password
            </Typography>
            <Box
              component="form"
              // onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1, width: "80%" }}>
              <TextField
                margin="normal"
                required
                fullWidth
                name="email"
                label="Email"
                type="email"
                id="email"
                autoComplete="current-email"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}>
                Send
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/login" variant="body2">
                    Sign In
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/register" variant="body2">
                    Sign Up
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Divider />
          <Copyright sx={{ mt: 4, mb: 4 }} />
          <Grid container sx={{ mb: 6 }}>
            <Grid item md={12} sx={{ textAlign: "center" }}>
              <Typography component={Link} to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
