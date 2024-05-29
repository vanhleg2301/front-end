import { Box, Container, Typography } from "@mui/material";
import React from "react";

export default function Company() {
  return (
    <Container>
      <Box
        sx={{
          width: { sm: "left", md: "left" },
          textAlign: { sm: "left", md: "left" },
        }}
      >
        <Typography component="h2" variant="h4" color="text.primary">
          Top Companies
        </Typography>
      </Box>
    </Container>
  );
}
