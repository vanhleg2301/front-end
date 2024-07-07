import React, { useContext, useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";

const CheckRole13 = ({ roles }) => {
  const { login, userLogin } = useContext(AuthContext);
  const userRoleID = userLogin?.user?.roleID;
  const navigate = useNavigate();

  useEffect(() => {
    if (roles.includes(userRoleID)) {
      if (userRoleID === 1) {
        navigate("/");
        window.location.reload();
      }
      if (userRoleID === 3) {
        navigate("/admin");
        window.location.reload();
      }
    }
  }, [roles, userRoleID, navigate]);

  return <Outlet />;
};

export default React.memo(CheckRole13);
