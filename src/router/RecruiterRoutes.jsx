import React from "react";
import { Outlet } from "react-router-dom";
import RecruiterPage from "../recruiter/pages/RecruiterPage";
import Layout from "../recruiter/components/layout/Layout";

export default function RecruiterRoutes() {
  return {
    path: "/recruiter",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [{ index: true, element: <RecruiterPage /> }],
  };
}
