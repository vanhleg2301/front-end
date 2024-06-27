import React from "react";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function CompanyPage() {
  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: { xs: 14, sm: 20, md: 2},
          pb: { xs: 8, sm: 12 , md: 4},
        }}
      >
      </Container>
      <Outlet />
    </>
  );
}
