import { useState, useEffect } from "react";
import commonAxios from "../utils/commonAxios";
import { toast } from "react-toastify";

export const useServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Get locationID from localStorage
        const currentLocation = JSON.parse(
          localStorage.getItem("currentLocation")
        );
        if (!currentLocation?.locationID) {
          throw new Error("Location not found");
        }

        const response = await commonAxios.get(
          `/services?locationID=${currentLocation.locationID}`
        );

        if (response.data.status === 200) {
          setServices(response?.data?.data?.services);
        }
      } catch (err) {
        const errorMessage =
          err.message === "Location not found"
            ? "Please select a location first"
            : err.response?.data?.message ||
              "Failed to fetch services, please try again later";

        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

