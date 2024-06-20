import React from "react";
import ManageAccount from "../adminPage/Admin/ManageAccount";

export default function AdminRoute() {
  return {
    path: "/admin",
    element: <ManageAccount />,
    children: [{ index: true, element: <ManageAccount /> }],
  };
}
