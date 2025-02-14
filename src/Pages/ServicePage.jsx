/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useMemo, useState } from "react";
import PropTypes from "prop-types";
import Card from "../Components/Service/Card";
import { useServices } from "../hooks/useServices";
import Loader from "../Components/Common/Loader";

const ServiceCard = React.memo(({ service, onClick }) => (
  <Card
    key={service.id}
    title={service.title}
    schedule={service.duration}
    shortDescription={service.shortDescription}
    price={service.price}
    image={service.imageUrl.mainImageUrl}
    id={service.id}
    onClick={onClick}
  />
));

ServiceCard.propTypes = {
  service: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    schedule: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

const ServicePage = () => {
  const { services, loading, error } = useServices();
  const [searchTerm, setSearchTerm] = useState("");

  console.log(services, "services");

  const filteredServices = useMemo(
    () => services.filter(service => 
      service.name && service.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
    [services, searchTerm]
  );

  const handleCardClick = (serviceId) => {
    // Implement your click handling logic here
    console.log(`Card with ID ${serviceId} clicked!`);
  };

  const renderServices = useMemo(
    () => (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard 
            key={service.id} 
            service={service} 
            onClick={() => handleCardClick(service.id)}
          />
        ))}
      </div>
    ),
    [filteredServices]
  );

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      {loading ? <Loader /> : 
      <>
        <div className="container mx-auto px-4 py-8">
         <div className="flex justify-end">
         <input 
            type="text" 
            placeholder="Search your favorite service..." 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mb-6 p-2 border rounded focus:outline-none w-1/3"
          />
         </div>
         {searchTerm && filteredServices.length > 0 && (
           <h2 className="text-2xl font-bold mb-4 text-red-700">Recent Search Results</h2>
         )}
          {renderServices}
        </div>
      </>}
    </>
  );
};

export default React.memo(ServicePage);
