// import React, { useContext } from "react";
// import { AuthContext } from "../context/AuthProvider";

// export default function CheckRole(props) {
//   const { roles, children } = props;
//   const { userLogin } = useContext(AuthContext);

//   return <div></div>;
// }
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";
import AdminRoute from "./AdminRoute";
import RecruiterRoutes from "./RecruiterRoutes";
import LoggedRoute from "./LoggedRoute";

export default function CheckRole() {
  const { login, userLogin } = useContext(AuthContext);

  if (!login) {
    return null; // or return a loading spinner / redirect to login
  }

  switch (userLogin.user.roleID) {
    case 3:
      return <AdminRoute />;
    case 2:
      return <RecruiterRoutes />;
    case 1:
      return <LoggedRoute />;
    default:
      return null; // or handle the default case if needed
  }
}
