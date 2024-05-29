import React from "react";
import { Box, Divider } from "@mui/material";
import FAQ from "../components/FAQ/FAQ";
import Job from "../components/jobs/Job";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Divider />
      <Job />
      <Divider />
      <FAQ />
      <Divider />
    </Box>
  );
}
