/* eslint-disable react/prop-types */

const DropdownField = ({
  label,
  name,
  options,
  value = "",
  onChange,
  readOnly,
  placeholder,
  required,
  error,
  touched,
}) => { 
 

  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <div className="mb-2 w-full max-w-sm">
      <label className="block text-gray-700 text-sm font-semibold uppercase mb-1">
        {label} 
      </label>
      <div className="flex items-center   bg-gray-100 p-2 rounded-lg shadow-sm w-full">
        <select
          name={name}
          value={value}
          onChange={handleChange} 
          className={`w-full bg-transparent text-gray-600 placeholder-gray-400 focus:outline-none ${error && touched ? "border-red-500" : "border-gray-300"} p-2 rounded-lg`}
        >
          <option value="" disabled>{placeholder || "Select an option"}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      {error && touched && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default DropdownField;
