import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  Divider,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import LoginWith from "../login/LoginWith";
import { Request, RequestPost } from "../../util/request";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate, Link } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" to="/">
        Ace Interview
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Register() {
  const [user, setUser] = React.useState(null);
  const [selectedButton, setSelectedButton] = React.useState(1);
  const [formData, setFormData] = React.useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });
  const [errors, setErrors] = React.useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
  });

  // alert
  const [isRegistered, setIsRegistered] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (isRegistered) {
      timer = setTimeout(() => {
        navigate("/login");
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [isRegistered, navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleButtonClick = (button) => {
    setSelectedButton(button);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateForm()) return;

    const payload = {
      fullName: formData.fullName,
      username: formData.username,
      email: formData.email,
      password: formData.password,
      roleID: selectedButton === 1 ? 1 : 2,
    };
    console.log(payload);
    try {
      const response = await RequestPost("user/register", payload);
      setUser(response);
      console.log("User registered successfully:", response);
      setIsRegistered(true);

      // Clear the form
      setFormData({
        username: "",
        email: "",
        password: "",
        fullName: "",
      });
      setSelectedButton(1); // Optionally reset the role selection
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        setErrors(error.response.data.errors);
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
        }}>
        {isRegistered && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Registration successful!
          </Alert>
        )}
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            {/* User name */}
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="username"
                required
                fullWidth
                id="username"
                label="User Name"
                autoFocus
                value={formData.username}
                onChange={handleInputChange}
                error={!!errors.username}
                helperText={errors.username}
              />
            </Grid>
            {/* Full name */}
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="family-name"
                value={formData.fullName}
                onChange={handleInputChange}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
            </Grid>
            {/* Email */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
                error={!!errors.email}
                helperText={errors.email}
              />
            </Grid>
            {/* Password */}
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="new-password"
                value={formData.password}
                onChange={handleInputChange}
                error={!!errors.password}
                helperText={errors.password}
              />
            </Grid>
            <Grid container sx={{ textAlign: "center" }}>
              <Grid item xs={6}>
                <Button
                  name="roleID"
                  variant={selectedButton === 1 ? "contained" : "outlined"}
                  sx={{ mt: 3, mb: 2, width: "80%" }}
                  onClick={() => handleButtonClick(1)}>
                  Applicant
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  // component={Link}
                  // to="/register/recruiter"
                  name="roleID"
                  variant={selectedButton === 2 ? "contained" : "outlined"}
                  sx={{ mt: 3, mb: 2, width: "80%" }}
                  onClick={() => handleButtonClick(2)}>
                  Recruiter
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
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
