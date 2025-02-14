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
          const transformedServices = response.data.data.services.map(
            (service) => ({
              id: service._id,
              title: service.name,
              schedule: service.duration,
              shortDescription: service.shortDescription,
              price: service.pricing,
              image: service.imageUrl,
            })
          );
          setServices(transformedServices);
        }
      } catch (err) {
        const errorMessage =
          err.message === "Location not found"
            ? "Please select a location first"
            : err.response?.data?.message || "Failed to fetch services, please try again later";

        setError(errorMessage);
        console.error("Error fetching services:", err);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};
