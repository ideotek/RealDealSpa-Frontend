/* eslint-disable react/prop-types */
import PhoneInput from "react-phone-number-input"; // Ensure to import the PhoneInput

const PhoneField = ({ icon, value, onChange, error, touched }) => {
  return (
    <div className="mb-4 w-full max-w-sm"> 
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded shadow-sm w-full">
        {icon && <span className="text-gray-400">{icon}</span>}
        <PhoneInput
          international
          countryCallingCodeEditable={false}
          value={value}
          onChange={onChange}
          defaultCountry="US"
          className={`flex-grow bg-transparent text-gray-600 placeholder-gray-400 focus:ring-none focus:outline-none [&>*]:bg-transparent ${
            error && touched ? "border-red-500" : ""
          }`}
        />
      </div>
    </div>
  );
};

export default PhoneField;