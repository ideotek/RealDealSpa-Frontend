/* eslint-disable react/prop-types */
import { memo } from "react"; 
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CalendarIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-6 w-6 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);

const Card = memo(
  ({ title, schedule, shortDescription, image, id, onClick, price, expiration, features, paymentLink }) => {
    const serviceUrl = `/services/${id}`;

    return (
      <div
        className="card transition-transform duration-300 ease-in-out transform hover:scale-105"
        onClick={onClick}
      >
        {/* Image section */}
        <Link to={serviceUrl}>
          <div className="w-full h-48 relative">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover rounded-t"
              loading="lazy"
            />
            <div className="absolute bottom-4 right-4 bg-orange-400 p-2 rounded-full cursor-pointer">
              <CalendarIcon />
            </div>
          </div>
        </Link>
        {/* Content section */}
        <div className="p-6 rounded-b border-x border-b border-gray-200">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <p className="text-gray-600 mb-4">
            Price: ${price} <br />
            Duration: {expiration.value} {expiration.expirationType}
          </p>
          <p className="text-gray-600 mb-4">{shortDescription}</p>

          {/* Features list */}
          <div className="mb-4">
            <h4 className="font-semibold">Features:</h4>
            <ul className="list-disc list-inside">
              {features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Payment link */}
          <a href={paymentLink} className="text-xs text-red-700">Purchase Now</a>
        </div>
      </div>
    );
  }
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  schedule: PropTypes.shape({
    durationType: PropTypes.string,
    duration: PropTypes.string,
  }),
  shortDescription: PropTypes.string,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  expiration: PropTypes.shape({
    value: PropTypes.number.isRequired,
    expirationType: PropTypes.string.isRequired,
  }).isRequired,
  features: PropTypes.arrayOf(PropTypes.string).isRequired,
  paymentLink: PropTypes.string.isRequired,
};

Card.displayName = "Card";

export default Card;
