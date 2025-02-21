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
      
      if (!status) {
        throw new Error('Login failed');
      } 

      localStorage.setItem("AccessToken", token);
      localStorage.setItem("customerDetails", JSON.stringify(customer)); 
      localStorage.setItem("currentLocation", JSON.stringify(currentLocation));  

      toast.success("Login successful!");
      navigate("/", { replace: true });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "An unexpected error occurred. Please try again later.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return [loading, handleSubmit];
};