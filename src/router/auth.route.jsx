import React from "react";
import Login from "../components/login/Login";

export default function authRoute() {
  return {
    path: "/",
    children: [
      {
        path: "/login",
        element: <Login />,
      },
    ],
  };
}
