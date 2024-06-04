import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

export default function Info() {
  return (
    <Box>
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Your Information
          </Typography>
          <TextField
            required
            fullWidth
            label="Full name"
            defaultValue="Hoang Cao Viet Anh (K16_HL)"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Phone number"
            placeholder="Phone number"
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue="anhhcvhe161142@fpt.edu.vn"
            margin="normal"
          />
        </CardContent>
        <CardActions>
          <Button variant="contained" sx={{ ml: 2, mb: 2 }}>
            Save
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
