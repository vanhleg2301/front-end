import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";
import Cookies from "js-cookie";

function ProtectedRoute() {
  const accessToken = Cookies.get("accessToken");
  const { login } = useContext(AuthContext);

  if (!login) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}

export default React.memo(ProtectedRoute);