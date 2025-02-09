import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import commonAxios from '../utils/commonAxios';
const ServiceDetail = () => {
    const { serviceID } = useParams(); // Get serviceID from route parameters
    const [serviceData, setServiceData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log(serviceID);

    useEffect(() => {
        const fetchServiceData = async () => {
            try {
                const response = await commonAxios.get(`/services/${serviceID}`);
                console.log(response.data.data,"responses");
                setServiceData(response.data.data);
            } catch (error) {
                console.error('Fetch error:', error);
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchServiceData();
    }, [serviceID]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!serviceData) return <p>No service data available.</p>;

    return (
        <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md mt-20">
            <div className="mb-4">
                <img src={serviceData.imageUrl.mainImageUrl} alt={serviceData.name} className="w-full h-72 object-cover rounded-lg" />
            </div>
            <h1 className="text-2xl font-bold mb-2">{serviceData.name}</h1>
            <p className="text-gray-600 mb-2">{serviceData.locationID}</p>
            <div className="text-yellow-500 mb-4">
                <span>{'★'.repeat(5)}{'☆'.repeat(0)}</span> (0 Reviews)
            </div>
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">About</h2>
                <p className="text-gray-700 mb-2">{serviceData.description}</p>
                <ul className="list-disc list-inside text-gray-700">
                    {serviceData.benefits.map((benefit, index) => (
                        <li key={index}>{benefit}</li>
                    ))}
                </ul>
            </div>
            <button className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200">
                Book
            </button>
        </div>
    );
};

export default ServiceDetail;
