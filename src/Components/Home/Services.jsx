import React from "react";

const services = [
  {
    title: "Cryotherapy",
    description: "Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint.",
    icon: "https://via.placeholder.com/50", // Replace with actual icon URL
  },
  {
    title: "Red Light Therapy",
    description: "Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint.",
    icon: "https://via.placeholder.com/50", // Replace with actual icon URL
  },
  {
    title: "Halotherapy",
    description: "Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint.",
    icon: "https://via.placeholder.com/50", // Replace with actual icon URL
  },
  {
    title: "Infrared Sauna",
    description: "Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint.",
    icon: "https://via.placeholder.com/50", // Replace with actual icon URL
  },
  {
    title: "Compression Therapy",
    description: "Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint.",
    icon: "https://via.placeholder.com/50", // Replace with actual icon URL
  },
  {
    title: "Massage Chairs",
    description: "Amet Minim Mollit Non Deserunt Ullamco Est Sit Aliqua Dolor Do Amet Sint.",
    icon: "https://via.placeholder.com/50", // Replace with actual icon URL
  },
];

const ServicesSection = () => {
  return (
    <div className="py-12">
      <div className="text-center mb-12">
        <h3 className="text-red-500 text-sm font-semibold uppercase">Our Services</h3>
        <h2 className="text-gray-800 text-3xl font-bold mt-2">What We Are Offering</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
        {services.map((service, index) => (
          <div
            key={index}
            className={`flex flex-col items-center text-center p-6 rounded-lg transition-all duration-300 bg-white text-gray-800 hover:bg-red-500 hover:text-white shadow-md`}
          >
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4">
              <img src={service.icon} alt={service.title} className="w-10 h-10" />
            </div>
            <h3 className="text-lg font-semibold">{service.title}</h3>
            <p className="text-sm mt-2">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
