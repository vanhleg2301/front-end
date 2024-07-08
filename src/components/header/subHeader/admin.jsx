import React from "react";
import "../header.css";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Cookies from "js-cookie";
import { AuthContext } from "../../../context/AuthProvider";

export default function Admin() {
  const { sethLogin } = React.useContext(AuthContext);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    sethLogin(false); // Đặt state logged về false sau khi đăng xuất
    window.location.href = "/";
  };
  return (
    <Box
      className='dropdown-content'
      sx={{
        top: "100%",
        left: "50%",
        transform: "translateX(-85%)",
      }}>
      <Link to='/admin' className='dropdown-item'>
        <IconButton>
          <MailOutlineIcon />
        </IconButton>
        DashBoard
      </Link>
      <Link to='/forgot' className='dropdown-item'>
        <IconButton>
          <QuestionMarkIcon />
        </IconButton>
        Forgot password
      </Link>
      <Box className='dropdown-item' onClick={handleLogout}>
        <IconButton>
          <LogoutIcon />
        </IconButton>
        Logout
      </Box>
    </Box>
  );
}
