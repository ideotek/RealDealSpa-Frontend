/* eslint-disable react/prop-types */
import { memo } from "react"; 
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
const CalendarIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
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

const Card = memo(({ title, schedule, shortDescription, image, id }) => {
  const serviceUrl = `/services/${id}`;
  const navigate = useNavigate();
  
  return (
    <div className="group bg-white rounded shadow-md overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      {/* Image section */}
      <div className="w-full h-52 sm:h-64 md:h-80 relative overflow-hidden">
        <img
          src={image?.mainImageUrl}
          alt={title}
          className="w-full h-full object-cover object-center bg-no-repeat transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div 
          className="absolute bottom-4 right-4 bg-red-400 p-2.5 rounded-full cursor-pointer hover:bg-red-500 transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          <CalendarIcon onClick={() => navigate(serviceUrl)} />
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content section */}
      <div className="p-5 sm:p-6 space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300">
            {title}
          </h3>
          <p className="text-sm sm:text-base text-gray-600 font-medium">
            Duration: {schedule?.duration}
            <span className="text-xs">{schedule?.durationType}</span>
          </p>
        </div>

        {/* Description */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm sm:text-base text-gray-600 line-clamp-2 leading-relaxed">
              {shortDescription}
            </p>
          </div>
        </div>

        {/* View More button */}
        <div className="pt-2">
          <button 
            onClick={() => navigate(serviceUrl)} 
            className="inline-flex items-center text-sm sm:text-base text-red-600 hover:text-red-700 font-medium transition-colors duration-300 group"
          >
            View More
            <svg 
              className="w-4 h-4 ml-1 mt-1 transform" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

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
