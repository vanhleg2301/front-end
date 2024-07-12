import React, { useEffect, useContext } from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthProvider";
import { RequestGet } from "../util/request";
import { APIUSER } from "../util/apiEndpoint";
import { Navigate, useNavigate } from "react-router-dom";
import { useSocket } from "../context/socket";

const WaitingAccepted = () => {
  const socket = useSocket();
  const { sethLogin, userLogin, setUserLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [active, setActive] = React.useState();

  useEffect(() => {
    const checkActiveStatus = async () => {
      try {
        console.log("user before updated:", userLogin);
        
        const response = await RequestGet(
          `${APIUSER}/active/check/${userLogin.user._id}`
        );
        const userData = JSON.stringify(response.user);
        Cookies.set("user", userData);
        
        console.log("user updated:", userData);
        console.log("response:", response);
        setActive(response.isActive);

        // Update userLogin context
        setUserLogin((prev) => ({
          ...prev,
          user: { ...prev.user, isActive: response.isActive }
        }));
      } catch (error) {
        console.error("Error checking user active status:", error);
      }
    };

    checkActiveStatus();
  }, [userLogin.user._id, setUserLogin]);

  useEffect(() => {
    if (userLogin.user.isActive) {
      navigate("/recruiter");
    }
  }, [userLogin.user.isActive, navigate]);

  useEffect(() => {
    if (!socket) return;

    const handleCheckActive = (data) => {
      console.log("Active Recruiter:", data);
      if (data.isActive) {
        <Navigate to="/recruiter"/>
        // navigate();
      }
    };

    socket.on("activeFromAdmin", handleCheckActive);

    return () => {
      socket.off("activeFromAdmin", handleCheckActive);
    };
  }, [socket, navigate]);

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
        onClick={handleLogout}
        variant='outlined'
        style={{ margin: "16px" }}>
        Logout
      </Button>
      <Typography variant='h5' style={{ margin: "16px" }}>
        Waiting for acceptance from admin...
      </Typography>
      <CircularProgress />
    </div>
  );
};

export default WaitingAccepted;
