import React, { createContext, useState, useEffect } from "react";
import { getProfile } from "../services/authService";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Fetch user profile on mount or when token changes
  useEffect(() => {
    const fetchUser = async () => {
      if (token) {
        try {
          const res = await getProfile(token);
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user:", error);
          // Token is invalid, clear it
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    fetchUser();
  }, [token]);

  // Login: store token and fetch user
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };

  // Logout: clear token and user
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  // Update user data
  const updateUser = (userData) => {
    setUser(userData);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = React.useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within UserProvider");
  }
  return context;
};
