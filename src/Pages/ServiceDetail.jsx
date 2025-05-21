import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import commonAxios from "../utils/commonAxios";
import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion, AnimatePresence } from "framer-motion";

const TabButton = ({ label, isActive, onClick }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full text-left px-6 py-4 transition-all duration-300 ${
      isActive
        ? "bg-red-500 text-white shadow-md rounded-lg"
        : "text-gray-700 hover:bg-gray-100 rounded-lg"
    } font-medium text-sm tracking-wide`}
  >
    {label}
  </motion.button>
);

const ImageGallery = ({ images }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
  >
    {images?.map((image, index) => (
      <motion.div
        key={image?._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="relative group rounded-xl overflow-hidden shadow-lg"
      >
        <img
          src={image.url}
          alt={image.name || `Gallery ${index + 1}`}
          className="w-full h-64 object-cover transform transition-transform duration-700 group-hover:scale-110 "
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      </motion.div>
    ))}
  </motion.div>
);

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div 
      className="border-b border-gray-100 py-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <button
        className="flex justify-between items-center w-full text-left hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-red-500 text-xl"
        >
          ↓
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-gray-600 leading-relaxed px-2">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

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
      className="max-w-7xl mx-auto bg-white mt-4 md:mt-20 rounded-2xl shadow-sm"
    >
      <div className="flex flex-col md:px-12  md:py-6 md:flex-row gap-8 relative   ">
        {/* Left side - Image */}
        <div className="md:w-[40%] relative">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            src={serviceData.imageUrl.mainImageUrl}
            alt={serviceData.name}
            className="w-full h-[300px] md:h-[400px] object-cover rounded-tl-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute bottom-8 right-8 bg-red-500 text-white font-medium py-3 px-6 rounded-lg shadow-xl hover:bg-red-600 transition duration-300"
            onClick={handleBooking}
          >
            Book Now
          </motion.button>
        </div>

        {/* Right side - Tabs */}
        <div className="md:w-1/2 p-6 bg-gray-50 rounded-tr-2xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold mb-6 text-gray-900"
          >
            {serviceData.name}
          </motion.h1>

          <div className="space-y-2">
            {["About", "Benefits", "Package", "Gallery", "FAQ"].map((tab) => (
              <TabButton
                key={tab}
                label={tab}
                isActive={activeTab === tab}
                onClick={() => setActiveTab(tab)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content area below */}
      <div className="p-6 md:px-4 ">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl p-6"
          >
            {activeTab === "About" && (
              <div>
                <div className="prose max-w-none space-y-4">
                  {serviceData.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="text-gray-700">
                      {paragraph.trim()}
                    </p>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "Benefits" && (
              <div>
                <div className="prose max-w-none">
                {serviceData.benefits?.length > 0 && (
                  <ul className="list-disc list-inside text-gray-700">
                    {serviceData.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                )}
                </div>
              </div>
            )}
            {activeTab === "Package" && (
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
            {activeTab === "Gallery" && (
              <ImageGallery 
                images={serviceData.imageUrl.otherImageUrls?.sort((a, b) => 
                  a.name.localeCompare(b.name)
                ) || []} 
              />
            )}
            {activeTab === "FAQ" && (
              <div className="space-y-2">
                {serviceData.FAQ?.length > 0 ? (
                  serviceData.FAQ.map((faq) => (
                    <FAQItem
                      key={faq._id}
                      question={faq.question}
                      answer={faq.answer}
                    />
                  ))
                ) : (
                  <p className="text-gray-600">No FAQ available for this service.</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default ServiceDetail;
