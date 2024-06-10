import React, { createContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const accessToken = Cookies.get("accessToken");
  const [login, sethLogin] = useState(false);
  const [userLogin, setUserLogin] = useState({});

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login) {
      const logged = () => {
        if (accessToken) {
          console.log("From AuthProvider ,login: ", login);
          sethLogin(true);
          console.log("From AuthProvider ,userLogin: ", userLogin);
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
      };

      return () => {
        logged();
      };
    }
  }, [login]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        userLogin,
        sethLogin,
        setUserLogin,
      }}
    >
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
