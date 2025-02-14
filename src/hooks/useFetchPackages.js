import { useEffect, useState } from "react";
import commonAxios from "../utils/commonAxios";
import { toast } from "react-toastify";

const useFetchPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      console.log("Fetching services...");
      try { 
        const currentLocation = JSON.parse(
          localStorage.getItem("currentLocation")
        );
        console.log("Current Location:", currentLocation);
        if (!currentLocation?.locationID) {
          throw new Error("Location not found");
        }

        const response = await commonAxios.get(
          `/products/${currentLocation.locationID}`
        );

        if (response.data.status === 200) {
          setPackages(response?.data?.data?.products);
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

  return { packages, loading, error };
};

export default useFetchPackages;
