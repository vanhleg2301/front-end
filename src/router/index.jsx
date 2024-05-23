import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import publicRoutes from "./public.route";

const AuthLayout = () => {};

export default createBrowserRouter([
  { element: <Home />, path: "/" },
  publicRoutes(),
]);
