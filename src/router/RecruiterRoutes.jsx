import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterPage from "../recruiter/pages/RecruiterPage";

export default function RecruiterRoutes() {
  return {
    path: "/recruiter",
    element: <RecruiterPage />,
    children: [{ index: true, element: <RecruiterPage /> }],
  };
}
