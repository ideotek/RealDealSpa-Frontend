
import {useServices} from "../../hooks/useServices"; 

const ServicesSection = () => {
  const { services } = useServices();
  console.log(services, "services");
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h3 className="text-red-500 text-sm font-semibold uppercase">
          Our Services
        </h3>
        <h2 className="text-gray-800 text-3xl font-bold mt-2">
          What We Are Offering
        </h2>
      </div>

      {services?.length === 0 ? (
        <div className="text-center">
          <p>No services available for this location.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          {services.map((service, index) => (
            <div
              key={service._id || index}
              className={`flex flex-col items-center text-center p-6 rounded transition-all duration-300 bg-white text-gray-800 hover:bg-red-500 hover:text-white shadow-md`}
            >
              <div className="rounded-full flex items-center justify-center mb-4">
                <img
                  src={service.imageUrl?.mainImageUrl}
                  alt={service.title}
                  className="w-12 h-12 object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/50";
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
