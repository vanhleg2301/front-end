import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.route";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "../admin/Admin";
import Public from "./Public";
import PaymentPage from "../pages/PaymentPage";
import authRoute from "./auth.route";
import LoggedRoute from "./LoggedRoute";

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
          { path: "/admin", element: <Admin /> },
          { path: "/payment", element: <PaymentPage /> },
          LoggedRoute(),
        ],
      },
      authRoute(),
      Public(),
      publicRoutes(),
    ],
  },
]);
