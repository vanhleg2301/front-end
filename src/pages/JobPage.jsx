import { Box, Container } from "@mui/material";
import React from "react";
import Act from "../components/action/Act";
import JobDetail from "../components/jobs/JobDetail";
import JobList from "../components/jobs/JobList";
import { Outlet } from "react-router-dom";

export default function JobPage() {
  return (
    <Box
      sx={(theme) => ({
        width: "100%",
        backgroundImage:
          theme.palette.mode === "light"
            ? "linear-gradient(180deg, #CEE5FD, #FFF)"
            : `linear-gradient(#02294F, ${alpha("#090E10", 0.0)})`,
        backgroundSize: "100% 20%",
        backgroundRepeat: "no-repeat",
      })}
    >
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Box sx={{ width: "100%" }}>
          <Act />
        </Box>
      </Container>
      <Outlet />
    </Box>
  );
}
