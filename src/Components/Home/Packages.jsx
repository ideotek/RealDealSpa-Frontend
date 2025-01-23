import React from "react";
import { FaBolt } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi";

const packages = [
  {
    title: "Monthly Package",
    description:
      "We denounce with righteous indignation dislike beguiled and demoralize",
    price: "499.9",
    period: "per year",
    features: [
      "Cryotherapy",
      "Red Light Therapy",
      "Halotherapy",
      "Infrared Sauna",
      "Compression Therapy",
      "Massage Chairs",
    ],
  },
  {
    title: "UNLIMITED ACCESS",
    description:
      "We denounce with righteous indignation dislike beguiled and demoralize",
    price: "99",
    period: "per month",
    features: [
      "Cryotherapy",
      "Red Light Therapy",
      "Halotherapy",
      "Infrared Sauna",
      "Compression Therapy",
      "Massage Chairs",
    ],
  },
  {
    title: "Yearly Package",
    description:
      "We denounce with righteous indignation dislike beguiled and demoralize",
    price: "499.9",
    period: "per year",
    features: [
      "Cryotherapy",
      "Red Light Therapy",
      "Halotherapy",
      "Infrared Sauna",
      "Compression Therapy",
      "Massage Chairs",
    ],
  },
];

const PricingCard = ({ title, description, price, period, features }) => (
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
    <button className="mt-6 px-6 py-2 bg-red-500 text-white font-medium rounded-md flex items-center hover:bg-red-600 transition duration-300">
      Choose Package <HiArrowRight className="ml-2 -rotate-45" />
    </button>
  </div>
);

const PricingSection = () => (
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
        <PricingCard key={index} {...pkg} />
      ))}
    </div>
  </div>
);

export default PricingSection;
