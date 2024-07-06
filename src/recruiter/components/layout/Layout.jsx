import React from "react";
import Dashboard from "./Dashboard";
import { SocketProvider } from "../../../context/socket";

export default function Layout() {
  return (
    <>
      <SocketProvider>
        <Dashboard />
      </SocketProvider>
    </>
  );
}
