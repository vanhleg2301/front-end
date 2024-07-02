import React from "react";
import ActCompany from "../components/action/ActCompany";
import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";

export default function CompanyPage() {
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
        <Box sx={{ width: "100%" }}>
          <ActCompany />
        </Box>
      </Container>
      <Outlet />
    </>
  );
}
