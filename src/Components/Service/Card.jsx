/* eslint-disable react/prop-types */
import React, { memo } from "react";
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
  console.log(serviceUrl);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Image section */}
      <div className="w-full h-80 relative">
        <img
          src={image?.mainImageUrl}
          alt={title}
          className="w-full h-full object-cover object-center bg-no-repeat"
          loading="lazy"
        />
        <div  className="absolute bottom-4 right-4 bg-orange-400 p-2 rounded-full cursor-pointer">
          <CalendarIcon  onClick={() => navigate(serviceUrl)} />
        </div>
      </div>

      {/* Content section */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">
          Duration: {schedule?.duration}
          {schedule?.durationType}
        </p>

        {/* Description and price row */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-600 line-clamp-2">{shortDescription}</p>
          </div>
        </div>

        {/* View More link */}
        <div>
          <button onClick={() => navigate(serviceUrl)} className="text-xs text-red-700">
            View More
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
  price: PropTypes.number,
  image: PropTypes.shape({
    mainImageUrl: PropTypes.string,
    otherImageUrls: PropTypes.array,
  }),
};

Card.displayName = "Card";

export default Card;
