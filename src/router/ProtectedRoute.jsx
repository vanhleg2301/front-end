import React, { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function ProtectedRoute() {
  const accessToken = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("accessToken="));

  const { login } = useContext(AuthContext);
  // kiểm tra login có sai ko
  if (!login) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
