import React, { useEffect, useContext } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthProvider";
import { RequestGet } from "../util/request";
import { APIUSER } from "../util/apiEndpoint";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSocket } from "../context/socket";

const WaitingAccepted = () => {
  const socket = useSocket();
  const { sethLogin, userLogin, setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = React.useState();
  console.log("user before updated:", userLogin);
  useEffect(() => {
    const checkActiveStatus = async () => {
      try {
        const response = await RequestGet(
          `${APIUSER}/active/check/${userLogin.user._id}`
        );
        const userData = JSON.stringify(response);
        Cookies.set("user", userData);

        // console.log("user updated:", userData);
        console.log("response:", response.user.isActive);
        setActive(response.user.isActive);

        // Update userLogin context
        setUserLogin(response);
      } catch (error) {
        console.error("Error checking user active status:", error);
      }
    };

    checkActiveStatus();
  }, []);

  useEffect(() => {
    if (userLogin.user.isActive) {
      navigate("/recruiter");
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleCheckActive = (data) => {
      console.log("Active Recruiter:", data);
      if (data.isActive) {
        navigate("/recruiter");
      }
    };

    socket.on("activeFromAdmin", handleCheckActive);

    return () => {
      socket.off("activeFromAdmin", handleCheckActive);
    };
  }, [socket]);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    sethLogin(false);
    window.location.href = "/";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}>
      <Button
        component={Link}
        to='/'
        variant='outlined'
        style={{ margin: "16px" }}>
        Home
      </Button>
      <Button
        onClick={handleLogout}
        variant='outlined'
        style={{ margin: "16px" }}>
        Logout
      </Button>
      <Typography variant='h5' style={{ margin: "16px" }}>
        Waiting for acceptance from admin. Please check your email.
      </Typography>
      <Typography variant='h5' style={{ margin: "16px" }}>
      We will reply as soon as possible.
      </Typography>
      <CircularProgress />
    </div>
  );
};

export default WaitingAccepted;
