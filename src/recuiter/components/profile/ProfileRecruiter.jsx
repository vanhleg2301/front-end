import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";
import { RequestGet } from "../../../util/request";
import { APIUSER } from "../../../util/apiEndpoint";

export default function ProfileRecruiter() {
  const { userLogin } = useContext(AuthContext);
const [userProfile, setUserProfile] = useState({});

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userId = userLogin.user._id;
        const response = await RequestGet(`${APIUSER}/${userId}`);
        setUserProfile(response)
        console.log("User profile: ", response);
      } catch (error) {
        console.log("Failed to fetch user profile: ", error);
      }
    }
    getUserProfile()
  }, [userLogin.user._id]);

  return (
    <div>
      <div>
        <h2>User Profile</h2>
        <p>Name: {userProfile.fullName}</p>
        <p>Email: {userProfile.email}</p>
        <p>PhoneNumber: {userProfile.phoneNumber}</p>
        <p>Your level: {userProfile.recruiterLevel}</p>
        <p>Allow post: {userProfile.jobPostingLimit}</p>
        {/* Thêm các trường thông tin khác tùy theo dữ liệu trả về từ API */}
      </div>
    </div>
  );
}
