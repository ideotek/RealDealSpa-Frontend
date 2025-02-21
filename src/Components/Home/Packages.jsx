import { FaBolt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import useFetchPackages from "../../hooks/useFetchPackages";
import Loader from "../Common/Loader";
import useUserDetails from "../../hooks/userHook";
import PropTypes from "prop-types";
import React, { useCallback } from "react";

const PricingCard = React.memo(
  ({ title, description, price, period, features, paymentLink, user }) => {
    const handlePackageClick = useCallback(() => {
      const url = user
        ? `${paymentLink}?firstName=${user.firstName}&email=${user.email}&lastName=${user.lastName}`
        : paymentLink;
      window.open(url, "_blank");
    }, [paymentLink, user]);

    return (
      <div className="group relative bg-white border-2 border-gray-100 rounded p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              {title}
            </h3>
            <p className="text-sm text-gray-600">{description}</p>
          </div>
          <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center group-hover:bg-red-500 transition-colors duration-300">
            <FaBolt
              className="text-red-500 group-hover:text-white transition-colors duration-300"
              size={20}
            />
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-baseline mb-2">
            <span className="text-4xl sm:text-5xl font-bold text-gray-900">
              ${price}
            </span>
            <span className="text-gray-500 ml-2">/{period}</span>
          </div>
        </div>

        <ul className="space-y-4 mb-8">
          {features.map((feature, idx) => (
            <li key={idx} className="flex items-center space-x-3">
              <div className="flex-shrink-0 w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-500 text-sm">✓</span>
              </div>
              <span className="text-gray-700">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          onClick={handlePackageClick}
          className="w-full py-2 px-6 bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold rounded 
                 hover:from-red-600 hover:to-red-700 transform transition-all duration-300 
                 focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 focus:outline-none
                 shadow-md hover:shadow-lg active:scale-95"
        >
          Get Started
          <HiArrowRight className="inline-block ml-2 transform -rotate-45" />
        </button>
      </div>
    );
  }
);

PricingCard.displayName = "PricingCard";

// Add prop types validation
PricingCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  period: PropTypes.string.isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  paymentLink: PropTypes.string.isRequired,
  user: PropTypes.shape({
    firstName: PropTypes.string,
    email: PropTypes.string,
    lastName: PropTypes.string,
  }),
};

const PricingSection = () => {
  const { packages, loading, error } = useFetchPackages();
  const { user } = useUserDetails();

  if (loading) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="text-center p-8 bg-red-50 rounded">
          <p className="text-red-500 font-medium mb-2">
            Oops! Something went wrong
          </p>
          <p className="text-gray-600 text-sm">
            Failed to load packages. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h3 className="inline-block px-4 py-1 bg-red-100 text-red-600 text-sm font-semibold rounded-full mb-4">
            Our Packages
          </h3>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-gray-600 text-lg">
            Select the perfect package that suits your needs and start your
            journey with us today.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {packages.map((pkg, index) => (
            <PricingCard
              key={pkg.id || index}
              title={pkg.name}
              description={pkg.description}
              price={pkg.price}
              period={pkg.expiration.expirationType}
              features={pkg.servicesIncluded.map((service) => service.name)}
              paymentLink={pkg.paymentLink}
              user={user?.basicDetials}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PricingSection;
