import { useEffect, useState } from "react";
import commonAxios from "../../utils/commonAxios";
import Loader from '../Common/Loader';

const ServicesSection = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Get locationID from localStorage
        const currentLocation = JSON.parse(localStorage.getItem("currentLocation"));
        if (!currentLocation?.locationID) {
          throw new Error("Location not found");
        }

        const response = await commonAxios.get(`/services?locationID=${currentLocation.locationID}`);
        

        if (response.data.status === 200) {
          console.log("Setting services with:", response.data.data);
          setServices(response?.data?.data?.services);
          console.log(services);
        }
      } catch (err) {
        const errorMessage = err.message === "Location not found" 
          ? "Please select a location first"
          : err.response?.data?.message || "Failed to fetch services";
        
        setError(errorMessage);
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="py-12 text-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-12 text-center text-red-500">
        <p>{error}</p>
      </div>
    );
  }

  
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h3 className="text-red-500 text-sm font-semibold uppercase">Our Services</h3>
        <h2 className="text-gray-800 text-3xl font-bold mt-2">What We Are Offering</h2>
      </div>

      {services?.length === 0 ? (
        <div className="text-center">
          <p>No services available for this location.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          {services.map((service, index) => (
            <div
              key={service.calendarId || index}
              className={`flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 bg-white text-gray-800 hover:bg-red-500 hover:text-white shadow-md`}
              >
            <div className="rounded-full flex items-center justify-center mb-4">
            <img 
                  src={service.imageUrl?.mainImageUrl} 
                  alt={service.name} 
                  className="w-10 h-10 object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/50';
                  }}
                />
              </div>
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-sm mt-2 line-clamp-3 overflow-hidden">
                {service.shortDescription || service.description}
              </p>
             
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ServicesSection;
