import React from "react";

export default function AdminProtectRoute() {
  const { userLogin } = useContext(AuthContext);

  if (userLogin && userLogin.user.roleID === 3) {
    return <Outlet />;
  }

  return <Navigate to="/login" />; // Redirect to login or any other appropriate page
}
