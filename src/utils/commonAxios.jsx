/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import axios from "axios";
import Swal from "sweetalert2";
import React from 'react';
// Create axios instance with base configuration
const commonAxios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  // baseURL:"/api/",
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
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Session has expired. Please login again.",
        confirmButtonText: "Ok",
      }).then(() => window.location.href = "/login");
    } else if (error.response?.status === 500) {
      Swal.fire({
        icon: "error",
        title: "Server Error",
        text: "An unexpected error occurred. Please try again later.",
        confirmButtonText: "Ok",
      });
    }
    return Promise.reject(error);
  }
);

export default commonAxios;
