import React from "react";
import { Outlet, createBrowserRouter } from "react-router-dom";
import publicRoutes from "./public.route";
import AuthProvider from "../context/AuthProvider";
import ErrorPage from "../pages/ErrorPage";
import ProtectedRoute from "./ProtectedRoute";
import Public from "./Public";
import authRoute from "./auth.route";
import LoggedRoute from "./LoggedRoute";
import RecruiterRoutes from "./RecruiterRoutes";
import AdminRoute from "./AdminRoute";
import CheckRole from "./CheckRole";

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
          {
            element: <CheckRole roles={[1]} />,
            children: [LoggedRoute()],
          },
          {
            element: <CheckRole roles={[2]} />,
            children: [RecruiterRoutes()],
          },
          {
            element: <CheckRole roles={[3]} />,
            children: [AdminRoute()],
          },
        ],
      },
      authRoute(),
      Public(),
      ...publicRoutes(),
    ],
  },
]);
