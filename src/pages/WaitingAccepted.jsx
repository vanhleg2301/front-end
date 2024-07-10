import React from "react";
import { Button, CircularProgress, Typography } from "@mui/material";
import Cookies from "js-cookie";
import { AuthContext } from "../context/AuthProvider";
import { RequestGet } from "../util/request";
import { APIUSER } from "../util/apiEndpoint";
import { useNavigate } from "react-router-dom";

const WaitingAccepted = () => {
  const { sethLogin, userLogin } = React.useContext(AuthContext);
const navigate = useNavigate();

  React.useEffect(() => {
    const getActive = async () => {
      const response = await RequestGet(
        `${APIUSER}/active/check/${userLogin.user._id}`
      );
      const userData = JSON.stringify(response);
      Cookies.set("user", userData);
      console.log(response.user.isActive);  

      if(userLogin.user.isActive || response.user.isActive) {
        navigate("/recruiter");
        window.location.reload();
      }

    };
    getActive();
  }, []);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    sethLogin(false); // Đặt state logged về false sau khi đăng xuất
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
        logout
      </Button>
      <Typography variant='h5' style={{ margin: "16px" }}>
        Waiting for acceptance from admin...
      </Typography>
      <CircularProgress />
    </div>
  );
};

export default WaitingAccepted;
