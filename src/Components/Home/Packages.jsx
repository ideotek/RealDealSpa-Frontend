import { FaBolt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";
import useFetchPackages from "../../hooks/useFetchPackages";
import Loader from "../Common/Loader";
import useUserDetails from "../../hooks/userHook";
import PropTypes from 'prop-types';

const PricingCard = ({ title, description, price, period, features, paymentLink, user }) => {
  console.log(user, "user");
  return (
  <div className="border border-gray-200 rounded-lg p-8 flex flex-col">
    <div className="flex justify-center items-center gap-5 mb-5">
      <div className="w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center">
        <FaBolt size={18} />
      </div>
      <h3 className="text-xl font-bold text-gray-800">{title}</h3>
    </div>
    <p className="text-sm text-gray-600 mb-4">{description}</p>
    <ul className="text-left mb-6">
      {features.map((feature, idx) => (
        <li key={idx} className="flex items-center text-sm text-gray-800 mb-2">
          <span className="text-red-500 font-bold mr-2">✔</span>
          {feature}
        </li>
      ))}
    </ul>
    <div className="text-4xl font-bold text-gray-800 mb-1">
      ${price} <span className="text-xs font-semibold">/{period}</span>
    </div>
    <button 
      onClick={() => {
        if (user) {
          window.open(`${paymentLink}?firstName=${user?.firstName}&email=${user?.email}&lastName=${user?.lastName}`, "_blank");
        } else {
          window.open(`${paymentLink}`, "_blank");
        }
      }}
      className="mt-6 px-6 py-2 bg-red-500 text-white font-medium rounded-md flex items-center hover:bg-red-600 transition duration-300"
    >
      Choose Package <HiArrowRight className="ml-2 -rotate-45" />
    </button>
  </div>
)}

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
  console.log(packages, "packages");
  if (loading) {
    return <Loader />;
  }
  if (error) {
    return <div>{error}</div>;
  }
  return (
    <div className="py-16">
      <div className="text-center mb-12">
        <h3 className="text-red-500 text-sm font-semibold uppercase">
          Our Packages
        </h3>
        <h2 className="text-gray-800 text-3xl font-bold mt-2">
          Choose Your Best
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto px-4">
        {packages.map((pkg, index) => (
          <PricingCard 
            key={index} 
            title={pkg.name} 
            description={pkg.description} 
            price={pkg.price} 
            period={pkg.expiration.expirationType} 
            features={pkg.servicesIncluded.map(service => service.name)} 
            paymentLink={pkg.paymentLink}
            user={user?.basicDetials}
          />
        ))}
      </div>
    </div>
  );;
};

export default PricingSection;
