import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commonAxios from "../utils/commonAxios";

const ServiceDetail = () => {
  const { serviceID } = useParams();
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("about");

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

  return (
    <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
      <div className="relative mb-4">
        <img
          src={serviceData.imageUrl.mainImageUrl}
          alt={serviceData.name}
          className="w-full h-80 object-cover rounded-lg"
        />
        <button className="absolute w-40 bottom-4 left-[85%] bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200">
          Book
        </button>
      </div>
      <h1 className="text-2xl font-bold mb-2">{serviceData.name}</h1>
      <p className="text-gray-600 mb-2">{serviceData.locationID}</p>
      <div className="text-yellow-500 mb-4">
        <span>
          {"★".repeat(5)}
          {"☆".repeat(0)}
        </span>{" "}
        (0 Reviews)
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("about")}
          className={`font-semibold ${
            activeTab === "about" ? "text-red-500" : "text-gray-400"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("howToUse")}
          className={`font-semibold ${
            activeTab === "howToUse" ? "text-red-500" : "text-gray-400"
          }`}
        >
          How to use
        </button>
        <button
          onClick={() => setActiveTab("package")}
          className={`font-semibold ${
            activeTab === "package" ? "text-red-500" : "text-gray-400"
          }`}
        >
          Package
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`font-semibold ${
            activeTab === "gallery" ? "text-red-500" : "text-gray-400"
          }`}
        >
          Gallery
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "about" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">About</h2>
          <p className="text-gray-700 mb-2">{serviceData.description}</p>
          <ul className="list-disc list-inside text-gray-700">
            {serviceData.benefits.map((benefit, index) => (
              <li key={index}>{benefit}</li>
            ))}
          </ul>
        </div>
      )}
      {activeTab === "howToUse" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">How to Use</h2>
          <p className="text-gray-700 mb-2">
            Here you can describe how to use the service.
          </p>
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
