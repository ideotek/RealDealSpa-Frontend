import { useState } from "react";
import commonAxios from "../utils/commonAxios";
import { toast } from "react-toastify";

export const useLogin = (navigate) => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await commonAxios.post("/customer/login", values);
      const { status, customer, token, currentLocation } = response.data.data; 
      if (status) {
        localStorage.setItem("AccessToken", token);
        localStorage.setItem("customerDetails", JSON.stringify(customer)); 
        localStorage.setItem("currentLocation", JSON.stringify(currentLocation)); 
        toast.success("Login successful!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      toast.error("An error occurred during login.");
      if (error.response) {
        const { status, message } = error.response.data; 
        if (status === 403) {
          toast.error(`Login failed: ${message}`);
        } else {
          toast.error(`Error: ${message}`);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return [loading, handleSubmit];
};