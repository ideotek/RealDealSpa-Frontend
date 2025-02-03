/* eslint-disable react/prop-types */

const TextField = ({icon, type, name, value, onChange, placeholder, error, touched, Class}) => { 

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
        className={`flex-grow bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none ${
          error && touched ? "border-red-500" : Class
        }`} 
      />
      {error && touched && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default TextField;
