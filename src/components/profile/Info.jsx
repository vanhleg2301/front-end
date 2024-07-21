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
import { RequestPatch } from "../../util/request";
import { ENDPOINT } from "../../util/constants";
import { APIUSER } from "../../util/apiEndpoint";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export default function Info() {
  const { userLogin, setUserLogin } = useContext(AuthContext);
  const [fullName, setFullName] = useState(userLogin?.user?.fullName || "");
  const [phone, setPhone] = useState(userLogin?.user?.phoneNumber || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const id = userLogin.user._id;
  const phoneNumber = phone;

  // fix lỗi chưa sửa được profile vì front-end lấy dữ liệu từ cookies nến khi 
  // Nên khi sửa thông tin phải update vào cookies 

  const handlePhone = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await RequestPatch(`${APIUSER}/${id}`, {
        fullName: fullName,
        phoneNumber: phone,
      });
      setLoading(false);
      console.log("response", response.message);
      if (response && response.message === "Profile updated successfully") {
        toast.success("Saved successfully");
        const updatedUser = {
          ...userLogin,
          user: {
            ...userLogin.user,
            fullName,
            phoneNumber,
          },
        };
        setUserLogin(updatedUser);
        Cookies.set("user", JSON.stringify(updatedUser));
        window.location.reload();
      } else {
        toast.error("Failed to save profile");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Error updating profile");
      setError("An error occurred while saving your profile");
    }
  };

  return (
    <Box>
    <ToastContainer/>
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
            defaultValue={userLogin?.user?.email}
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
