import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterPage from "../recruiter/pages/RecruiterPage";
import Layout from "../recruiter/components/layout/Layout";
import RecruiterProtectedRoute from "./RecruiterProtectedRoute";

export default function RecruiterRoutes() {
  return {
    path: "/recruiter",
    element: <RecruiterProtectedRoute />,
    children: [{ index: true, element: <RecruiterPage /> }],
  };
}
