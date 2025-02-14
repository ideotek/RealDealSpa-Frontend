import { useState, useEffect } from "react";
import commonAxios from "../utils/commonAxios";
import { toast } from "react-toastify";

export const usePackageHome = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Get locationID from localStorage
        const currentLocation = JSON.parse(
          localStorage.getItem("currentLocation")
        );
        if (!currentLocation?.locationID) {
          throw new Error("Location not found");
        }

        const response = await commonAxios.get(
          `/products/${currentLocation.locationID}`
        );
        console.log(response.data.data.products, "response");

        if (response.data.status === 200) {
          setPackages(response?.data?.data?.products);
        }
      } catch (err) {
        const errorMessage =
          err.message === "Location not found"
            ? "Please select a location first"
            : err.response?.data?.message ||
              "Failed to fetch packages, please try again later";

        setError(errorMessage);
        toast.error(errorMessage);
        console.error("Error fetching packages:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
};
