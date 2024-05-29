import React from "react";
import { Box, Divider } from "@mui/material";
import FAQ from "../components/FAQ/FAQ";
import Job from "../components/jobs/Job";
import Company from "../components/companies/Company";
import Hero from "../components/hero/Hero";

export default function Home() {
  return (
    <Box sx={{ backgroundColor: "background.default" }}>
      <Hero />
      <Divider />
      <Job />
      <Divider />
      <Company />
      <Divider />
      <FAQ />
      <Divider />
    </Box>
  );
}
