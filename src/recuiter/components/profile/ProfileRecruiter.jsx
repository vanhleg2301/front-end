import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";

export default function ProfileRecruiter() {
  const { userLogin } = useContext(AuthContext);
  return (
    <div>
      <div>
        <h2>User Profile</h2>
        <p>Name: {userLogin.user.fullName}</p>
        <p>Email: {userLogin.user.email}</p>
        {/* Thêm các trường thông tin khác tùy theo dữ liệu trả về từ API */}
      </div>
    </div>
  );
}
