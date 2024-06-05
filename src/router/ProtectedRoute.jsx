import React from "react";
import { Outlet, Navigate } from "react-router-dom";

export default function ProtectedRoute() {
  const accessToken = document.cookie
    .split(";")
    .some((item) => item.trim().startsWith("accessToken="));

  if (!accessToken) {
    return <Navigate to="/login" />;
  }

  return <Outlet />;
}
