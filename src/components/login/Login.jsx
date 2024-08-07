import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LoginWith from "./LoginWith";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Request } from "../../util/request";
import { AuthContext } from "../../context/AuthProvider";
import Cookies from "js-cookie";

function Copyright(props) {
  return (
    <Typography
      variant='body2'
      color='text.secondary'
      align='center'
      {...props}>
      {"Copyright © "}
      <Typography color='inherit' component={Link} to='/'>
        Ace Interview
      </Typography>
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Login() {
  const [errors, setErrors] = useState({ identifier: "", password: "" });
  const { sethLogin, setUserLogin, login, userLogin, user } =
    useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const identifier = data.get("identifier");
    const password = data.get("password");

    if (!identifier) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        identifier: "Identifier is required",
      }));
      return;
    }
    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required",
      }));
      return;
    }

    try {
      const response = await Request("user/login", { identifier, password });

      if (response) {
        Cookies.set("accessToken", response.accessToken);
        const userData = JSON.stringify(response);
        Cookies.set("user", userData);
        // Set access token in cookies
        sethLogin(true);
        setUserLogin(response);
        if (response.user.roleID === 1) {
          navigate("/");
        }
        if (response.user.roleID === 2) {
          navigate("/recruiter");
        }
        if (response.user.roleID === 3) {
          navigate("/admin");
        }
        // Navigate to the home page on successful login
      } else {
        // Handle login failure (e.g., invalid credentials)
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Invalid identifier or password",
        }));
      }
    } catch (error) {
      // Handle any other errors (e.g., network issues)
      console.error("Login error", error);
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Login failed, please try again",
      }));
    }
  };

  return (
    <Grid container>
      <Grid item md={12}>
        <Container component='main' maxWidth='md'>
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              marginBottom: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <Box>
              <img
                src={"logo.png"}
                alt='logo'
                style={{ width: "100%", height: "100px" }}
              />
            </Box>
            <Typography component='h1' variant='h5'>
              Sign in
            </Typography>
            <Box
              component='form'
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}>
              <TextField
                margin='normal'
                required
                fullWidth
                id='identifier'
                label='Email or Username'
                name='identifier'
                autoComplete='identifier'
                autoFocus
                error={!!errors.identifier}
                helperText={errors.identifier}
              />
              <TextField
                margin='normal'
                required
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                autoComplete='current-password'
                error={!!errors.password}
                helperText={errors.password}
              />
              <FormControlLabel
                control={<Checkbox value='remember' color='primary' />}
                label='Remember me'
              />
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}>
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href='#' variant='body2'></Link>
                </Grid>
                <Grid item>
                  <Typography
                    component={Link}
                    to='/forgot'
                    variant='body2'
                    color={"inherit"}>
                    Forgot password?
                  </Typography>
                </Grid>
              </Grid>
            </Box>
          </Box>

          <Box sx={{ display: "flex", m: 1 }}>
            <LoginWith />
          </Box>
          <Divider />
          <Copyright sx={{ mt: 4, mb: 4 }} />
          <Grid container sx={{ mb: 6 }}>
            <Grid item md={12} sx={{ textAlign: "center" }}>
              <Typography
                component={Link}
                to='/register'
                variant='body2'
                color={"inherit"}>
                {"Don't have an account? Sign Up"}
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Grid>
    </Grid>
  );
}
