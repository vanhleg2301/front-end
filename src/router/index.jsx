import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.route";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Public from "./Public";
import authRoute from "./auth.route";
import LoggedRoute from "./LoggedRoute";
import ManageAccount from "../adminPage/Admin/ManageAccount";
import RecruiterRoutes from "./RecruiterRoutes";

const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export default createBrowserRouter([
  {
    element: <AuthLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/admin", element: <ManageAccount /> },
          RecruiterRoutes(),
          LoggedRoute(),
        ],
      },
      authRoute(),
      Public(),
      publicRoutes(),
    ],
  },
]);
