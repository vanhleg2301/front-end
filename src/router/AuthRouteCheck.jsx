import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

export default function AuthRouteCheck() {
  const accessToken = Cookies.get("accessToken");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  if (accessToken) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}
