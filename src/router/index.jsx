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
import Cookies from 'js-cookie';


const AuthLayout = () => {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
};

export const clearAuthCookies = () => {
  const expiresIn = 30 * 60; // 24 hours in seconds
  // const GMT7 = 7 * 60 * 60 * 1000; // 7 hours in milliseconds
  const expirationDate = new Date(Date.now() + expiresIn * 1000);
  console.log("expirationDate: ", expirationDate);

   const remainingTime = expirationDate.getTime() - Date.now();
  console.log("timeRemaining: ", remainingTime);

  setTimeout(() => {
      Cookies.remove('accessToken');
      Cookies.remove('user');
      window.location.href = '/login';
  }, remainingTime);
};

// clearAuthCookies();
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
