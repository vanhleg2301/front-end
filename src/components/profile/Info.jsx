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
import { RequestPut } from "../../util/request";
import { ENDPOINT } from "../../util/constants";
import { APIUSER } from "../../util/apiEndpoint";

export default function Info() {
  const { userLogin, setUserLogin } = useContext(AuthContext);
  const [fullName, setFullName] = useState(userLogin.user.fullName || "");
  const [phone, setPhone] = useState(userLogin.user.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const userId = userLogin.user._id;
  const phoneNumber = phone;

  // fix lỗi chưa sửa được profile vì front-end lấy dữ liệu từ cookies nến khi 
  // Nên khi sửa thông tin phải update vào cookies 

  const handlePhone = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await RequestPut(`$/${APIUSER}/${userId}`, {
        fullName,
        phoneNumber,
      });
      setLoading(false);
      console.log("response", response.message);
      if (response && response.message === "Profile updated successfully") {
        alert("phoneNumber saved successfully");
        // Update the user context with new data
        setUserLogin({
          ...userLogin,
          user: {
            ...userLogin.user,
            fullName,
            phoneNumber,
          },
        });
      } else {
        alert("Failed to save phone number");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error updating phone number:", error);
      setError("An error occurred while saving the phone number");
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
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            margin="normal"
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
          {error && <Typography color="error">{error}</Typography>}
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            sx={{ ml: 2, mb: 2 }}
            onClick={handlePhone}
            disabled={loading}>
            {loading ? "Saving..." : "Save"}
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
}
