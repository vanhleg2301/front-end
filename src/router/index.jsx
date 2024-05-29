import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import publicRoutes from "./public.route";
import Login from "../components/login/Login";
import Register from "../components/register/Register";

const AuthLayout = () => {};

export default createBrowserRouter([
  { element: <Home />, path: "/" },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
  publicRoutes(),
]);
