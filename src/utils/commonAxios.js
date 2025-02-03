import axios from "axios";
import Swal from "sweetalert2";

const commonAxios = axios.create({
  baseURL: import.meta.env.VITE_BASEURL,
  // baseURL:"/api/",
  withCredentials: true,
});

// Request intereptors
commonAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) { 
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response intereptors
commonAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token");
      Swal.fire({
        icon: "error",
        title: "Session Expired",
        text: "Session has expired. Please login again.",
        confirmButtonText: "Ok",
      }).then(() => {
        window.location.href = "/login";
      });
    }
    return Promise.reject(error);
  }
);
export default commonAxios;
