// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";
import { useGoogleLogin, googleLogout } from "@react-oauth/google";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const { access_token } = tokenResponse;
        const response = await fetch(
          "https://www.googleapis.com/oauth2/v3/userinfo",
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );
        const userData = await response.json();
        setUserEmail(userData.email);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    onError: (errorResponse) => {
      console.error("Google login error:", errorResponse);
    },
  });

  function logout() {
    try {
      googleLogout();
      setIsLoggedIn(false);
      setUserEmail(""); // Clear the email on logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
