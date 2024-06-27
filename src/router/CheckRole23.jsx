import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const CheckRole23 = ({ roles }) => {
  const { login, userLogin } = useContext(AuthContext);
  const userRoleID = userLogin?.user?.roleID;
  const navigate = useNavigate();

  useEffect(() => {
    if (roles.includes(userRoleID)) {
      if (userRoleID === 2) {
        navigate("/recruiter");
      }
      if (userRoleID === 3) {
        navigate("/admin");
      }
    }
  }, [roles, userRoleID, navigate]);

  return <Outlet />;
};

export default React.memo(CheckRole23);
