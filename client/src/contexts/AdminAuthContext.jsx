import React, { createContext, useContext, useReducer, useEffect } from "react";
import api from "../services/api.js";

// Create Auth Context
const AdminAuthContext = createContext();

// Auth reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        admin: action.payload.admin,
        token: action.payload.token,
        error: null,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        admin: null,
        token: null,
        error: action.payload,
      };
    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        admin: null,
        token: null,
        error: null,
      };
    case "CLEAR_ERROR":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  isAuthenticated: false,
  admin: null,
  token: localStorage.getItem("adminToken"),
  loading: false,
  error: null,
};

// Admin Auth Provider
export const AdminAuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Logout function
  const logout = React.useCallback(() => {
    localStorage.removeItem("adminToken");
    delete api.defaults.headers.common["Authorization"];
    dispatch({ type: "LOGOUT" });
  }, []);

  // Get admin profile
  const getProfile = React.useCallback(async () => {
    try {
      const response = await api.get("/admin/auth/profile");
      const admin = response.data.data;

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { admin, token: state.token },
      });
    } catch {
      // Token might be invalid, logout
      logout();
    }
  }, [state.token, logout]);

  // Configure api defaults
  useEffect(() => {
    if (state.token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;
      // Try to get admin profile on app load
      getProfile();
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  }, [state.token, getProfile]);

  // Login function
  const login = async (credentials) => {
    try {
      dispatch({ type: "LOGIN_START" });

      const response = await api.post("/admin/auth/login", credentials);
      const { admin, token } = response.data.data;

      // Store token in localStorage
      localStorage.setItem("adminToken", token);

      dispatch({
        type: "LOGIN_SUCCESS",
        payload: { admin, token },
      });

      return { success: true };
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      dispatch({
        type: "LOGIN_FAILURE",
        payload: message,
      });
      return { success: false, error: message };
    }
  };

  // Change password
  const changePassword = async (passwordData) => {
    try {
      const response = await api.put(
        "/admin/auth/change-password",
        passwordData
      );
      return { success: true, message: response.data.message };
    } catch (error) {
      const message = error.response?.data?.message || "Password change failed";
      return { success: false, error: message };
    }
  };

  // Clear error
  const clearError = () => {
    dispatch({ type: "CLEAR_ERROR" });
  };

  const value = {
    ...state,
    login,
    logout,
    changePassword,
    clearError,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
