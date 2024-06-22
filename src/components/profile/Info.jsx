import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { RequestPut } from "../../util/request"; // Assuming you have a Request utility for making API calls

export default function Info() {
  const { userLogin } = useContext(AuthContext);
  const [phone, setPhone] = useState(userLogin.user.fullName);

  console.log("From info - userLogin: ", userLogin);

  const handlePhone = async () => {
    try {
      // Assuming you have an endpoint for updating user information
      const response = await RequestPut("user/updatePhone", { phone });

      if (response.success) {
        alert("Phone number saved successfully");
      } else {
        alert("Failed to save phone number");
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
      alert("An error occurred while saving the phone number");
    }
  };

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
            defaultValue={userLogin.user.fullName}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            fullWidth
            label="Phone number"
            placeholder="Phone number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin="normal"
          />
          <TextField
            fullWidth
            label="Email"
            defaultValue={userLogin.user.email}
            margin="normal"
            InputProps={{
              readOnly: true,
            }}
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ ml: 2, mb: 2 }}
            onClick={handlePhone}
          >
            Save
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
