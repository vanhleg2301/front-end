import React, { createContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

// export function useAuth() {
//   return useContext(AuthContext);
// }

export default function AuthProvider({ children }) {
  const accessToken = Cookies.get("accessToken");
  const userObject = Cookies.get("user");

  const [login, sethLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({});

  // const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      const logged = () => {
        if (accessToken) {
          sethLogin(true);
          const currentUser = JSON.parse(userObject);
          setUserLogin(currentUser);
          setIsLoading(false);

          // set timeout to logout after 30s
          const timer = setTimeout(() => {
            Cookies.remove("accessToken"); 
            Cookies.remove("user"); 
            sethLogin(false); 
            navigate("/"); 
            window.location.reload(); 
          }, 30000); 

          return () => clearTimeout(timer);
        }
        setIsLoading(false);
      };
      return () => {
        logged();
      };
    }
  }, [accessToken, login, userObject]);

  return (
    <AuthContext.Provider
      value={{
        login,
        userLogin,
        sethLogin,
        setUserLogin,
      }}>
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
