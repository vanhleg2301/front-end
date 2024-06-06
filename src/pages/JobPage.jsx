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
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Outlet />
      </Container>
    </>
  );
}
