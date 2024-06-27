import { Box, Container, Grid } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";

export default function MeetingPage() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        pt: { xs: 14, sm: 20, md: 10 },
        pb: { xs: 8, sm: 12, md: 10 },
      }}>
      <Outlet />
    </Container>
  );
}
