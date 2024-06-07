import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginWith from "../login/LoginWith";
import { Divider } from "@mui/material";
import { Request } from "../../util/request";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Typography color="inherit" component={Link} to="/">
        Ace Interview
      </Typography>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register() {
  const [user, setUser] = React.useState([]);
  const [selectedButton, setSelectedButton] = React.useState(1);
  const [errors, setErrors] = React.useState("");

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload = {
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
      fullName: data.get("fullName"),
      roleID: selectedButton === 1 ? 1 : 2,
    };
    console.log("Payload:", payload); // Log the payload for debugging

    try {
      const user = await Request("auth/register", payload);
      if (user) {
        setUser(user);
        console.log(user);
      } else {
        console.error("Failed to register user. User data is null.");
      }
    } catch (error) {
      if (error.response) {
        setErrors(error.response.data.message);
        console.error("Error response:", errors);
      } else if (error.request) {
        console.error("Error request:", error.request);
        setErrors({ message: "Network error. Please try again later." });
      } else {
        console.error("Error message:", error.message);
        setErrors({ message: error.message });
      }
    }
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/*User name*/}

            {/* Display error messages */}
            {errors && (
              <Grid item xs={12}>
                <Typography color="error" variant="body2">
                  {errors}
                </Typography>
              </Grid>
            )}

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
              />
            </Grid>
            {/*Full name*/}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="family-name"
              />
            </Grid>
            {/*Email*/}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
              />
            </Grid>
            {/*Password*/}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
              />
            </Grid>
            <input
              type="hidden"
              name="roleID"
              value={selectedButton === 1 ? "applicant" : "recruiter"}
            />
            <Grid container sx={{ textAlign: "center" }}>
              <Grid item xs={6}>
                <Button
                  name="roleID"
                  variant={selectedButton === 1 ? "contained" : "outlined"}
                  sx={{ mt: 3, mb: 2, width: "80%" }}
                  onClick={() => handleButtonClick(1)}
                >
                  applicant
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  name="roleID"
                  fullWidth
                  variant={selectedButton === 2 ? "contained" : "outlined"}
                  sx={{ mt: 3, mb: 2, width: "80%" }}
                  onClick={() => handleButtonClick(2)}
                >
                  Recruiter
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
      <Box sx={{ display: "flex", mt: 5 }}>
        <LoginWith />
      </Box>
      <Divider />
      <Copyright sx={{ mt: 5 }} />
      <Grid container justifyContent="center" sx={{ mb: 6, mt: 2 }}>
        <Grid item>
          <Typography component={Link} to="/login" variant="body2">
            Already have an account? Sign in
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
