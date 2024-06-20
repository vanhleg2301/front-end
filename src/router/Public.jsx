import React from "react";
import { Outlet } from "react-router-dom";
import ForgotPassword from "../components/forgotPassword/ForgotPassword";
import RulePage from "../pages/RulePage";

export default function Public() {
  return {
    element: <Outlet />, // Render the Outlet component to render nested routes
    children: [
      { path: "/forgot", element: <ForgotPassword /> },
      { path: "/rules", element: <RulePage /> },
      // Define more child routes as needed
    ],
  };
}
