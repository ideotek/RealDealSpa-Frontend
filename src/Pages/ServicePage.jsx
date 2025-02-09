/* eslint-disable react/display-name */
import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import Card from '../Components/Service/Card';
import { useServices } from '../hooks/useServices'; // New custom hook
import Loader from '../Components/Common/Loader';

const ServiceCard = React.memo(({ service }) => (
  <Card
    key={service.id}
    title={service.title}
    schedule={service.schedule}
    shortDescription={service.shortDescription}
    price={service.price}
    image={service.image}
    id={service.id}
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
};

const ServicePage = () => {
  const { services, loading, error } = useServices();
  const [loadingState, setLoadingState] = useState(false);

  const renderServices = useMemo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  ), [services]);

  if (loadingState) {
    return (
      <Loader />
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      {loading ? (
        <Loader />
      ) : (
        renderServices
      )}
    </div>
  );
};

export default React.memo(ServicePage);
