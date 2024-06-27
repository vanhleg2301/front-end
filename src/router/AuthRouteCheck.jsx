import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

function AuthRouteCheck() {
  const accessToken = Cookies.get("accessToken");
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  if (accessToken) {
    return <Navigate to={from} replace />;
  }

  return <Outlet />;
}

export default React.memo(AuthRouteCheck)
