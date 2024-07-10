import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import { Navigate, Outlet } from "react-router-dom";

const CheckRole = ({ roles }) => {
  const { login, userLogin } = useContext(AuthContext);
  const userRoleID = userLogin?.user?.roleID;
  const userActive = userLogin?.user?.isActive;

  if (!login) {
    return <Navigate to='/login' />;
  }

  if (roles.includes(userRoleID)) {
    if (userActive === true) {
      return <Outlet />;
    } else {
      return <Navigate to='/waiting-accepted' />;
    }
  } else {
    return <Navigate to='/login' />; // or a different fallback route
  }
};

export default React.memo(CheckRole);
