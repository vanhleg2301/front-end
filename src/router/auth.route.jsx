import React from "react";
import Login from "../components/login/Login";
import Register from "../components/register/Register";
import AuthRouteCheck from "./AuthRouteCheck";
// import RecuiterRegister from "../recuiter/components/recuiterregister/RecuiterRegister";

export default function authRoute() {
  return {
    path: "/",
    element: <AuthRouteCheck />,
    children: [
      { path: "/login", element: <Login /> },
      {
        path: "/register",
        element: <Register />,
      }
      // ,{ path: "/register/recruiter", element: <RecuiterRegister /> }
    ],
  };
}
