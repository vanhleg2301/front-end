import React, { useContext, useEffect, useState } from "react";
import { RequestGet, RequestPatch } from "../../util/request";
import { APIUSER } from "../../util/apiEndpoint";
import { AuthContext } from "../../context/AuthProvider";
import { Button, TextField, Typography, Box } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Cookies from "js-cookie";

export default function ProfileAdmin() {
  const { userLogin, setUserLogin } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState({});
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userId = userLogin?.user?._id;
        const response = await RequestGet(`${APIUSER}/${userId}`);
        setUserProfile(response);
        setFullName(response.fullName);
        setPhoneNumber(response.phoneNumber);
        console.log("User profile: ", response);
      } catch (error) {
        console.log("Failed to fetch user profile: ", error);
      }
    };
    getUserProfile();
  }, [userLogin?.user?._id]);

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const userId = userLogin?.user?._id;
      const updatedProfile = {
        fullName,
        phoneNumber,
      };
      const response = await RequestPatch(
        `${APIUSER}/${userId}`,
        updatedProfile
      );
      if (response && response.message === "Profile updated successfully") {
        toast.success("Profile updated successfully");
        const updatedUser = {
          ...userLogin,
          user: {
            ...userLogin?.user,
            fullName,
            phoneNumber,
          },
        };
        setUserLogin(updatedUser);
        Cookies.set("user", JSON.stringify(updatedUser));
        setUserProfile(updatedProfile);
        window.location.reload();
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile: ", error);
      toast.error("Error updating profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <ToastContainer />
      <div>
        <h2>User Profile</h2>
        <Box component='form' noValidate autoComplete='off'>
          <TextField
            label='Full Name'
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Phone Number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            fullWidth
            margin='normal'
          />
          <TextField
            label='Email'
            defaultValue={userLogin?.user?.email}
            fullWidth
            margin='normal'
            InputProps={{
              readOnly: true,
            }}
          />
          <Button
            variant='contained'
            color='primary'
            onClick={handleUpdateProfile}
            disabled={loading}>
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </Box>
      </div>
    </div>
  );
}
