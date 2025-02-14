import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import commonAxios from '../utils/commonAxios';
import Swal from 'sweetalert2';

const ServiceDetail = () => {
    const { serviceID } = useParams(); // Get serviceID from route parameters
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeTab, setActiveTab] = useState('about'); // State to manage active tab
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

        const basicInfo = JSON.parse(localStorage.getItem('customerDetails'));
        const email = basicInfo.basicDetials.email; 
        const name = basicInfo.basicDetials.contactName || basicInfo.basicDetials.firstName + " " + basicInfo.basicDetials.lastName;
        const phone = basicInfo.basicDetials.phone;
         
        commonAxios.get(`/validatePlan`).then((resp)=>{
            const plan = resp.data.data.valid;

            if(plan){
                const queryParams = [];
                if (email) queryParams.push(`email=${email}`);
                if (phone) queryParams.push(`phone=${phone}`);
                if (name) queryParams.push(`full_name=${name}`);
                const queryString = queryParams.length > 0 ? `/?${queryParams.join('&')}` : '';
                window.location.href = `${serviceData.calendarUrl}${queryString}`;
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Package Required',
                    text: 'Please purchase a valid package to book this service',
                    confirmButtonText: 'View Packages',
                  }).then((result) => {
                    if (result.isConfirmed) {
                      navigate('/packages')
                    }
                  });
            }
        }).catch((err)=>{
            console.log(err.response.data.data.valid,"err");
            if(err.response.data.data.valid){
                const queryParams = [];
                if (email) queryParams.push(`email=${email}`);
                if (phone) queryParams.push(`phone=${phone}`);
                if (name) queryParams.push(`full_name=${name}`);
                const queryString = queryParams.length > 0 ? `/?${queryParams.join('&')}` : '';
                window.location.href = `${serviceData.calendarUrl}${queryString}`;
            }else{
                Swal.fire({
                    icon: 'error',
                    title: 'Package Required',
                    text: 'Please purchase a valid package to book this service',
                    confirmButtonText: 'View Packages',
                  }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/packages')
                    }
                  });
            }
        })
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!serviceData) return <p>No service data available.</p>;

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
            <div className="relative mb-4">
                <img src={serviceData.imageUrl.mainImageUrl} alt={serviceData.name} className="w-full h-80 object-cover rounded-lg" />
                <button className="absolute w-40 bottom-4 left-[85%] bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200" onClick={handleBooking}>
                    Book
                </button>
            </div>
            <h1 className="text-2xl font-bold mb-2">{serviceData.name}</h1>
            <p className="text-gray-600 mb-2">{serviceData.locationID}</p>
            <div className="text-yellow-500 mb-4">
                <span>{'★'.repeat(5)}{'☆'.repeat(0)}</span> (0 Reviews)
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
