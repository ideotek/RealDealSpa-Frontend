/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import { toast } from 'react-toastify';
import React from 'react';
// Create axios instance with base configuration
const commonAxios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  withCredentials: true,
});

// Create loading context
export const LoadingContext = React.createContext();

// Simple loading provider component
export const LoadingProvider = ({ children }) => {
  const [loading, setLoading] = React.useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

// Create a loading state handler
let loadingStateHandler = null;
export const setLoadingStateHandler = (handler) => {
  loadingStateHandler = handler;
};

// Handle request interceptor
commonAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("AccessToken");
    if (token) config.headers["Authorization"] = `Bearer ${token}`;
    if (loadingStateHandler) loadingStateHandler(true);
    return config;
  },
  (error) => {
    if (loadingStateHandler) loadingStateHandler(false);
    return Promise.reject(error);
  }
);

// Handle response interceptor
commonAxios.interceptors.response.use(
  (response) => {
    if (loadingStateHandler) loadingStateHandler(false);
    return response;
  },
  (error) => {
    if (loadingStateHandler) loadingStateHandler(false);
    
    if (error.response?.status === 401) {
      localStorage.removeItem("AccessToken");
      toast.error("Session has expired. Please login again.", {
        onClose: () => window.location.href = "/login"
      });
    } else if (error.response?.status === 500) {
      toast.error("An unexpected error occurred. Please try again later.");
    }
    return Promise.reject(error);
  }
);

export default commonAxios;
