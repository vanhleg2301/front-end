import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import { RequestPost } from "../../util/request";
import { APIUSER } from "../../util/apiEndpoint";
import { toast, ToastContainer } from "react-toastify";

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
      </Typography>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function ForgotPassword() {
  const [email, setEmail] = React.useState("");
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Gửi email với mật khẩu mới
      const response = await RequestPost(
        `${APIUSER}/forgot-password/sendmail`,
        { email: email }
      );
      if (response) {
        // console.log("New password: ", response.newpass);
        toast.success("Go to your email to get new password", response.message);
        // alert(response.message);
        // window.location.href = `https://${email}-inbox-link`;
      }
      console.log("Response: ", response);
    } catch (error) {
      toast.error("Error sending email");
      console.error("Error sending email: ", error);
    }
  };

  return (
    <>
      <ToastContainer />
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
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component='h1' variant='h5'>
                Forgot Password
              </Typography>
              <Box
                component='form'
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1, width: "80%" }}>
                <TextField
                  margin='normal'
                  required
                  fullWidth
                  name='email'
                  label='Email'
                  type='email'
                  id='email'
                  autoComplete='current-email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Button
                  type='submit'
                  fullWidth
                  variant='contained'
                  sx={{ mt: 3, mb: 2 }}>
                  Send
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link to='/login' variant='body2'>
                      Sign In
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link to='/register' variant='body2'>
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
                <Typography component={Link} to='/register' variant='body2'>
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}
