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
import axios from "axios";
import { ENDPOINT } from "../../util/constants";
import { APIUSER } from "../../util/apiEndpoint";

export default function Info() {
  const { userLogin } = useContext(AuthContext);
  const [phone, setPhone] = useState(userLogin.user.phone);

  console.log("From info - userLogin: ", userLogin.user._id);

  const handlePhone = async () => {
    try {
      // Assuming you have an endpoint for updating user information
      const response = await RequestPut(
        `${ENDPOINT}/${APIUSER}/${userLogin.user._id}`,
        { phone }
      );

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
            onClick={handlePhone}>
            Save
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
