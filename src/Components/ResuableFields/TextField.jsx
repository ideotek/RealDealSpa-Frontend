import React, { useState } from "react";

const TextField = ({icon, type, name, value, onChange, placeholder}) => {
  const [email, setEmail] = useState("");

  return (
    <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-lg shadow-sm w-full max-w-sm">
      <span className="text-gray-400">
       {icon && icon}
      </span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="flex-grow bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none"
      />
    </div>
  );
};

export default TextField;
