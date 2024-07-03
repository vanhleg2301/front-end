import React from "react";
import "../header.css";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { IconButton } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import Cookies from "js-cookie";
import { AuthContext } from "../../../context/AuthProvider";

export default function Recruiter() {
  const { sethLogin } = React.useContext(AuthContext);

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("user");
    sethLogin(false); // Đặt state logged về false sau khi đăng xuất
    window.location.href = "/";
  };
  return (
    <Box
      className="dropdown-content"
      sx={{
        top: "100%",
        left: "50%",
        transform: "translateX(-85%)",
      }}>
      <Link to="/recruiter" className="dropdown-item">
        <IconButton disabled>
          <ManageAccountsIcon />
        </IconButton>
        Information
      </Link>
      <Link to="/" className="dropdown-item">
        <IconButton disabled>
          <MailOutlineIcon />
        </IconButton>
        Setting notification
      </Link>
      <Link to="/forgot" className="dropdown-item">
        <IconButton disabled>
          <QuestionMarkIcon />
        </IconButton>
        Forgot password
      </Link>
      <Box className="dropdown-item" onClick={handleLogout}>
        <IconButton disabled>
          <LogoutIcon />
        </IconButton>
        Logout
      </Box>
    </Box>
  );
}
