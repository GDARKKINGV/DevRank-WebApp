import { createContext, useContext, useState, useEffect } from "react";
import {
  registerRequest,
  loginRequest,
  verifyRequest,
  logoutRequest,
} from "@/api/auth";

import { updateProfileRequest } from "@/api/profile";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error.response.data.error);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      localStorage.setItem("token", res.data.token);
      setUser(res.data);
      setIsAuthenticated(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setErrors(error.response.data.error);
    }
  };

  const logout = async () => {
    try {
      await logoutRequest();
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem("token");
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };

  const updateProfile = async (data) => {
    try {
      const res = await updateProfileRequest(data);
      setUser(res.data);
    } catch (error) {
      setErrors(error.response.data.error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      verifyRequest()
        .then((res) => {
          setUser(res.data);
          setIsAuthenticated(true);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          localStorage.removeItem("token");
          setErrors(error.response.data.error);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        user,
        updateProfile,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
