/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import React, { useEffect, useMemo, useState } from "react";
import { useServices } from "../hooks/useServices";
import Loader from "../Components/Common/Loader";
import { Link, useNavigate } from "react-router-dom";
import commonAxios from "../utils/commonAxios";
import Swal from "sweetalert2";

const CalendarIcon = ({ onClick }) => (
  <svg
    onClick={onClick}
    height="24"
    viewBox="0 0 512 512"
    width="24"
    xmlns="http://www.w3.org/2000/svg"
    fill="white"
  >
    <g>
      <path d="m437 392.019h15v15h-15z" />
      <path d="m489.5 17.021h-467c-12.407 0-22.5 10.094-22.5 22.5v74.999h15v-22.499h482v292.498c0 4.136-3.365 7.5-7.5 7.5h-22.5v15h22.5c12.407 0 22.5-10.094 22.5-22.5v-344.998c0-12.406-10.093-22.5-22.5-22.5zm-474.5 60v-37.5c0-4.136 3.365-7.5 7.5-7.5h467c4.135 0 7.5 3.364 7.5 7.5v37.5z" />
      <path d="m320.435 379.251-120.302-26.733 8.778 39.501h-186.411c-4.135 0-7.5-3.364-7.5-7.5v-254.999h-15v254.999c0 12.406 10.093 22.5 22.5 22.5h189.745l14.623 65.8 20.267-20.267 42.427 42.427 53.033-53.033-34.927-34.927h114.332v-15h-114.332zm-30.873 94.515-42.427-42.427-11.552 11.552-15.692-70.617 70.617 15.692-11.552 11.553 42.426 42.427 42.427z" />
      <path d="m112.499 47.021h15v15h-15z" />
      <path d="m74.999 47.021h15v15h-15z" />
      <path d="m37.5 47.021h15v15h-15z" />
      <path d="m467 107.02h15v15.001h-15z" />
      <path d="m467 137.021h15v15h-15z" />
      <path d="m107.229 321.684h15v-46.58l28.68 45.642h14.319v-75.034h-15v45.757l-28.678-45.64-14.321-.005z" />
      <path d="m354.807 147.356v75.972h15v-25.015l27.308 28.12 10.76-10.45-30.967-31.889 28.804-28.393-10.53-10.683-25.375 25.013v-22.675z" />
      <path d="m132.44 147.356h-25.21v75.971h28.304c13.185 0 23.912-10.759 23.912-23.983 0-7.546-3.513-14.286-8.989-18.672 2.222-3.389 3.514-7.439 3.514-11.786-.001-11.872-9.659-21.53-21.531-21.53zm-10.211 15h10.21c3.601 0 6.53 2.929 6.53 6.529 0 3.609-2.929 6.546-6.529 6.546h-10.211zm13.304 45.971h-13.304v-17.896h13.304c4.914 0 8.912 3.998 8.912 8.912 0 4.953-3.998 8.984-8.912 8.984z" />
      <path d="m210.851 147.356c-20.945 0-37.986 17.04-37.986 37.985s17.041 37.985 37.986 37.985 37.986-17.04 37.986-37.985-17.041-37.985-37.986-37.985zm0 60.971c-12.674 0-22.986-10.312-22.986-22.985s10.312-22.985 22.986-22.985 22.986 10.312 22.986 22.985-10.312 22.985-22.986 22.985z" />
      <path d="m301.822 147.356c-20.945 0-37.986 17.04-37.986 37.985s17.041 37.985 37.986 37.985 37.986-17.04 37.986-37.985-17.041-37.985-37.986-37.985zm0 60.971c-12.674 0-22.986-10.312-22.986-22.985s10.312-22.985 22.986-22.985 22.986 10.312 22.986 22.985-10.312 22.985-22.986 22.985z" />
      <path d="m180.755 283.699c0 20.945 17.041 37.985 37.986 37.985s37.986-17.04 37.986-37.985-17.041-37.986-37.986-37.986-37.986 17.04-37.986 37.986zm60.972 0c0 12.674-10.312 22.985-22.986 22.985s-22.986-10.312-22.986-22.985c0-12.675 10.312-22.986 22.986-22.986s22.986 10.311 22.986 22.986z" />
      <path d="m311.613 248.977-13.75-.017-10.308 35.642-7.404-37.433-14.715 2.911 13.624 68.875 14.202-.092 11.462-39.635 11.454 39.724 14.195-.093 13.665-68.665-14.712-2.928-7.434 37.359z" />
    </g>
  </svg>
);

const ServiceCard = React.memo(({ service }) => {
  const [serviceData, setServiceData] = useState(null);
  const [isBookingLoading, setIsBookingLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const { name, duration, shortDescription, imageUrl, _id } = service;
  const serviceUrl = `/services/${_id}`;

  useEffect(() => {
    const fetchServiceData = async () => {
      try {
        const { data } = await commonAxios.get(`/services/${_id}`);
        setServiceData(data.data);
      } catch (error) {
        setError(error.message);
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServiceData();
  }, [_id]);

  const handleBooking = async () => {
    setIsBookingLoading(true);
    try {
      const basicInfo = JSON.parse(localStorage.getItem("customerDetails"));
      const { email, phone, contactName, firstName, lastName } = basicInfo.basicDetials;
      const fullName = contactName || `${firstName} ${lastName}`;

      const { data } = await commonAxios.get('/validatePlan');
      const isPlanValid = data.data.valid;

      if (isPlanValid) {
        const queryParams = new URLSearchParams();
        if (email) queryParams.append('email', email);
        if (phone) queryParams.append('phone', phone);
        if (fullName) queryParams.append('full_name', fullName);

        window.location.href = `${serviceData.calendarUrl}${queryParams.toString() ? `/?${queryParams.toString()}` : ''}`;
      } else {
        showPackageRequiredAlert();
      }
    } catch (err) {
      const isPlanValid = err.response?.data?.data?.valid;
      if (isPlanValid) {
        const queryParams = new URLSearchParams();
        if (email) queryParams.append('email', email);
        if (phone) queryParams.append('phone', phone);
        if (fullName) queryParams.append('full_name', fullName);

        window.location.href = `${serviceData.calendarUrl}${queryParams.toString() ? `/?${queryParams.toString()}` : ''}`;
      } else {
        showPackageRequiredAlert();
      }
    } finally {
      setIsBookingLoading(false);
    }
  };

  const showPackageRequiredAlert = () => {
    Swal.fire({
      icon: "error",
      title: "Package Required",
      text: "Please purchase a valid package to book this service",
      confirmButtonText: "View Packages",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/packages");
      }
    });
  };

  return (
    <div className="group bg-white rounded shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out">
      {/* Image section */}
      <div className="w-full h-48 sm:h-96 relative overflow-hidden rounded-t">
        <img
          src={imageUrl?.mainImageUrl}
          alt={name}
          className="w-full h-full object-cover object-center bg-no-repeat transform   transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute bottom-6 right-6  bg-red-500 p-2 rounded-full cursor-pointer hover:bg-red-600 transform scale-150 hover:scale-[2] transition-all duration-300 shadow-lg hover:shadow-xl z-10">
          {isBookingLoading ? (
            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <CalendarIcon onClick={handleBooking} />
          )}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content section */}
      <div className="p-4 space-y-3">
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-red-600 transition-colors duration-300 line-clamp-1">
           <Link to={serviceUrl}>{name}</Link>
          </h3>
          <p className="text-sm text-gray-600 flex items-center gap-1">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            {duration?.duration}
            <span className="text-xs text-gray-500">
              {duration?.durationType}
            </span>
          </p>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
          {shortDescription}
        </p>

        {/* View More button */}
        <div className="pt-1">
          <button
            // onClick={handleBooking}
            onClick={() => navigate(serviceUrl)}
            className="inline-flex items-center text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-300 group"
          >
            View Details
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
});

const ServicePage = () => {
  const { services, loading, error } = useServices();
  const [searchTerm, setSearchTerm] = useState("");


  const filteredServices = useMemo(
    () =>
      searchTerm
        ? services.filter((service) =>
            service.name?.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : services,
    [services, searchTerm]
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
      {loading ? (
        <Loader />
      ) : (
        <div className="container mx-auto px-4 py-8 mt-28">
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
            <h2 className="text-2xl font-bold mb-4 text-red-700">
              Recent Search Results
            </h2>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map((service) => ( 
              <ServiceCard key={service._id} service={service} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(ServicePage);
