import { Box, Container } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function JobPage() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
