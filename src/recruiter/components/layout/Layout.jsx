import React from "react";
import Header from "../header/Header";
import { Outlet } from "react-router-dom";
import Dashboard from "./Dashboard";

export default function Layout() {
  return (
    <>
      <Dashboard />
      <Outlet />
    </>
  );
}
