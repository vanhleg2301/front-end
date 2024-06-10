import React from "react";
import Layout from "../components/layout/Layout";
import { Outlet } from "react-router-dom";
import ProfilePage from "../pages/ProfilePage";
import Info from "../components/profile/Info";
import ManagerCv from "../components/profile/ManagerCv";
import UploadCv from "../components/profile/UploadCv";

export default function LoggedRoute() {
  return {
    path: "/",
    element: (
      <Layout>
        <Outlet />
      </Layout>
    ),
    children: [
      {
        path: "profile",
        element: <ProfilePage />,
        children: [
          { index: true, element: <Info /> },
          { path: "manager", element: <ManagerCv /> },
          { path: "upload", element: <UploadCv /> },
        ],
      },
    ],
  };
}
