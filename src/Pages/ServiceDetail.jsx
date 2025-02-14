import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import commonAxios from '../utils/commonAxios';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

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

    if (loading) return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
            <Skeleton height={320} className="mb-4" />
            <Skeleton width={200} height={30} className="mb-2" />
            <Skeleton width={150} height={20} className="mb-4" />
            <div className="flex space-x-4 mb-4">
                <Skeleton width={60} height={30} />
                <Skeleton width={100} height={30} />
                <Skeleton width={80} height={30} />
                <Skeleton width={80} height={30} />
            </div>
            <Skeleton count={3} />
        </div>
    );

    if (error) return <p className="text-red-500 text-center mt-20">Error: {error}</p>;
    if (!serviceData) return <p className="text-center mt-20">No service data available.</p>;

    return (
        <div className="w-full mx-auto p-4 md:p-6 bg-white rounded-lg shadow-md mt-4 md:mt-20">
            <div className="relative mb-4">
                <img src={serviceData.imageUrl.mainImageUrl} alt={serviceData.name} className="w-full h-48 md:h-80 object-cover rounded-lg" />
                <button className="absolute w-32 md:w-40 bottom-4 left-[50%] md:left-[85%] transform -translate-x-1/2 md:translate-x-0 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200" onClick={handleBooking}>
                    Book
                </button>
            </div>
            <h1 className="text-xl md:text-2xl font-bold mb-2">{serviceData.name}</h1>
            <p className="text-gray-600 mb-2 text-sm md:text-base">{serviceData.locationID}</p>
            <div className="text-yellow-500 mb-4 text-sm md:text-base">
                <span>{'★'.repeat(5)}{'☆'.repeat(0)}</span> (0 Reviews)
            </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 md:space-x-4 mb-4">
        <button
          onClick={() => setActiveTab("about")}
          className={`text-sm md:text-base font-semibold ${
            activeTab === "about" ? "text-red-500" : "text-gray-400"
          }`}
        >
          About
        </button>
        <button
          onClick={() => setActiveTab("howToUse")}
          className={`text-sm md:text-base font-semibold ${
            activeTab === "howToUse" ? "text-red-500" : "text-gray-400"
          }`}
        >
          How to use
        </button>
        <button
          onClick={() => setActiveTab("package")}
          className={`text-sm md:text-base font-semibold ${
            activeTab === "package" ? "text-red-500" : "text-gray-400"
          }`}
        >
          Package
        </button>
        <button
          onClick={() => setActiveTab("gallery")}
          className={`text-sm md:text-base font-semibold ${
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
          {serviceData.benefits?.length > 0 && (
            <ul className="list-disc list-inside text-gray-700">
              {serviceData.benefits.map((benefit, index) => (
                <li key={index}>{benefit}</li>
              ))}
            </ul>
          )}
        </div>
      )}
      {activeTab === "howToUse" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">How to Use</h2>
          <div className="prose max-w-none">
            {serviceData.howToUse || "No instructions available."}
          </div>
        </div>
      )}
      {activeTab === "package" && (
        <div>
          <h2 className="text-lg font-semibold mb-2">Packages</h2>
          {serviceData.packages?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {serviceData.packages.map((pkg, index) => (
                <div key={index} className="border p-4 rounded-lg">
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
        <div>
          <h2 className="text-lg font-semibold mb-4">Gallery</h2>
          {serviceData.imageUrl.otherImageUrls?.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-4">
              {[...serviceData.imageUrl.otherImageUrls]
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((image, index) => (
                  <div key={image._id} className="relative group overflow-hidden rounded-lg shadow-lg">
                    <img 
                      src={image.url} 
                      alt={image.name || `Gallery ${index + 1}`}
                      className="w-full h-32 md:h-48 object-cover transform transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300"></div>
                  </div>
                ))}
            </div>
          ) : (
            <p className="text-gray-500">No gallery images available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ServiceDetail;
