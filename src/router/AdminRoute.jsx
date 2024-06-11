import React from "react";
import ManageAccount from "../adminPage/Admin/ManageAccount";
import AdminProtectRoute from "./AdminProtectRoute";

export default function AdminRoute() {
  return {
    path: "/admin",
    element: <AdminProtectRoute />,
    children: [{ index: true, element: <ManageAccount /> }],
  };
}
