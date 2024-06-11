import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

export default function RecruiterProtectedRoute() {
  const { userLogin } = useContext(AuthContext);

  if (userLogin && userLogin.user.roleID === 2) {
    return <Outlet />;
  }

  return <Navigate to="/login" />; // Redirect to login or any other appropriate page
}
