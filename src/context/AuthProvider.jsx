// authContext.js
import React, { createContext, useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [Login, sethLogin] = useState(false);
  const [user, setUser] = useState({});
  const [userLogin, setUserLogin] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = () => {
      if (Login) {
        setUser(userLogin);
        console.log("From AuthProvider: ", userLogin);
        setIsLoading(false);
        return;
      }
      console.log("reset");
      setUser({});
      navigate("/login");
    };

    return () => {
      loggedIn();
    };
  }, [Login, userLogin]);

  const logout = () => {
    // Logic to log out user
    setUser({});
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        Login,
        sethLogin,
        userLogin,
        setUserLogin,
        logout,
      }}
    >
      {isLoading ? <CircularProgress /> : children}
    </AuthContext.Provider>
  );
}
