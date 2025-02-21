import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import commonAxios from "../utils/commonAxios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";

const TabButton = ({ label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`px-4 py-2 uppercase font-bold ${
      isActive
        ? "text-red-500"
        : "text-gray-600 hover:bg-gray-200"
    }`}
  >
    {label}
  </motion.button>
);

const ImageGallery = ({ images }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-2 md:grid-cols-3 gap-4"
  >
    {images?.map((image, index) => (
      <motion.div
        key={image?._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative group overflow-hidden rounded shadow-lg"
      >
        <img
          src={image.url}
          alt={image.name || `Gallery ${index + 1}`}
          className="w-full h-48 md:h-64 object-cover transform transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </motion.div>
    ))}
  </motion.div>
);

const ServiceDetail = () => {
  const { serviceID } = useParams(); // Get serviceID from route parameters
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about"); // State to manage active tab
  const navigate = useNavigate();

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const response = await commonAxios.get(`/services/${serviceID}`);
        console.log(response.data.data, "responses");
        setServiceData(response.data.data);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [serviceID]);

  const handleBooking = async () => {
    const basicInfo = JSON.parse(localStorage.getItem("customerDetails"));
    const email = basicInfo.basicDetials.email;
    const name =
      basicInfo.basicDetials.contactName ||
      basicInfo.basicDetials.firstName + " " + basicInfo.basicDetials.lastName;
    const phone = basicInfo.basicDetials.phone;

    commonAxios
      .get(`/validatePlan`)
      .then((resp) => {
        const plan = resp.data.data.valid;

        if (plan) {
          const queryParams = [];
          if (email) queryParams.push(`email=${email}`);
          if (phone) queryParams.push(`phone=${phone}`);
          if (name) queryParams.push(`full_name=${name}`);
          const queryString =
            queryParams.length > 0 ? `/?${queryParams.join("&")}` : "";
          window.location.href = `${serviceData.calendarUrl}${queryString}`;
        } else {
          Swal.fire({
            icon: "error",
            title: "Package Required",
            text: "Please purchase a valid package to book this service",
            confirmButtonText: "View Packages",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/packages");
            }
          });
        }
      })
      .catch((err) => {
        if (err.response.data.data.valid) {
          const queryParams = [];
          if (email) queryParams.push(`email=${email}`);
          if (phone) queryParams.push(`phone=${phone}`);
          if (name) queryParams.push(`full_name=${name}`);
          const queryString =
            queryParams.length > 0 ? `/?${queryParams.join("&")}` : "";
          window.location.href = `${serviceData.calendarUrl}${queryString}`;
        } else {
          Swal.fire({
            icon: "error",
            title: "Package Required",
            text: "Please purchase a valid package to book this service",
            confirmButtonText: "View Packages",
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/packages");
            }
          });
        }
      });
  };


  const LoadingSkeleton = () => (
    <div className="w-full mx-auto p-6 bg-white rounded shadow-lg mt-20 max-w-7xl">
      <Skeleton height={400} className="mb-6 rounded" />
      <Skeleton width={300} height={40} className="mb-4" />
      <Skeleton width={200} height={24} className="mb-6" />
      <div className="flex space-x-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} width={100} height={40} className="rounded" />
        ))}
      </div>
      <Skeleton count={4} height={24} className="mb-2" />
    </div>
  );

  if (loading) return <LoadingSkeleton />;
  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-red-500 text-center mt-20 p-6 bg-red-50 rounded"
    >
      <h2 className="text-xl font-bold mb-2">Error</h2>
      <p>{error}</p>
    </motion.div>
  );
  if (!serviceData) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center mt-20 p-6"
    >
      No service data available.
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full mx-auto bg-white mt-4 md:mt-20"
    >
      <div className="relative mb-6">
        <motion.img
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          src={serviceData.imageUrl.mainImageUrl}
          alt={serviceData.name}
          className="w-full h-64 md:h-96 object-cover"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute bottom-6 right-6 bg-red-500 text-white font-semibold py-2 px-8 rounded shadow-lg hover:bg-red-600 transition duration-300"
          onClick={handleBooking}
        >
          Book Now
        </motion.button>
      </div>

      <div className="p-6">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          {serviceData.name}
        </motion.h1>

        <div className="flex flex-wrap gap-3 mb-8">
          {["about", "how To Use", "package", "gallery"].map((tab) => (
            <TabButton
              key={tab}
              label={tab.charAt(0).toUpperCase() + tab.slice(1)}
              isActive={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white px-6"
          >
            {activeTab === "about" && (
              <div>
                <p className="text-gray-700 mb-2">{serviceData.description}</p>
                {serviceData.benefits?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700">
                    {serviceData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
              </div>
            )}
            {activeTab === "how To Use" && (
              <div>
                <div className="prose max-w-none">
                  {serviceData.howToUse || "No instructions available."}
                </div>
              </div>
            )}
            {activeTab === "package" && (
              <div>
                {serviceData.packages?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {serviceData.packages.map((pkg, index) => (
                      <div key={index} className="border p-4 rounded">
                        <h3 className="font-semibold">{pkg.name}</h3>
                        <p className="text-gray-600">{pkg.description}</p>
                        <p className="text-green-600 font-bold">${pkg.price}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>No packages available.</p>
                )}
              </div>
            )}
            {activeTab === "gallery" && (
              <ImageGallery 
                images={serviceData.imageUrl.otherImageUrls?.sort((a, b) => 
                  a.name.localeCompare(b.name)
                ) || []} 
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
