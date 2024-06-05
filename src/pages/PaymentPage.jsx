import React from "react";
import { Box, Typography, TextField, Button, Container } from "@mui/material";

export default function PaymentPage() {
  return (
    <Box sx={{ maxWidth: "80%", mx: "auto", p: 2 }}>
      <Container maxWidth={"lg"} sx={{ mt: 20, mb: 20 }}>
        <Box>
          <Typography variant="h4" gutterBottom textAlign={"center"}>
            Payment
          </Typography>
          <TextField
            label="Card Number"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Expiration Date"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField label="CVV" variant="outlined" fullWidth margin="normal" />
          <TextField
            label="Name on Card"
            variant="outlined"
            fullWidth
            margin="normal"
          />
        </Box>
        <Button variant="contained" color="primary" fullWidth>
          Pay Now
        </Button>
      </Container>
    </Box>
  );
}
