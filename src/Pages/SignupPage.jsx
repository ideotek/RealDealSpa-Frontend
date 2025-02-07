import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/resuableFields/textField";
import SelectField from "../Components/resuableFields/selectField";  
import PhoneInput from "../Components/resuableFields/phoneField";  
import 'react-phone-number-input/style.css';  
import { countries, timezones } from "../utils/data";
 

const formFields = [
  { label: "First Name", placeholder: "Enter your First Name", type: "text", name: "firstName", required: true },
  { label: "Last Name", placeholder: "Enter your Last Name", type: "text", name: "lastName", required: true },
  { label: "Email", placeholder: "Enter your email", type: "email", name: "email", required: true },
  { label: "Mobile Number", placeholder: "Enter your mobile number", type: "tel", name: "phone", required: true },
  { label: "Gender", placeholder: "Select your gender", type: "select", name: "gender", options: [{ value: "male", label: "Male" }, { value: "female", label: "Female" }], required: true },
  { label: "Password", placeholder: "Enter your password", type: "password", name: "password", required: true },
  { label: "Confirm Password", placeholder: "Confirm your password", type: "password", name: "confirmPassword", required: true },
  { label: "City", placeholder: "Enter your city", type: "text", name: "city" },
  { label: "State", placeholder: "Enter your state", type: "text", name: "state" },
  { label: "Postal Code", placeholder: "Enter your postal code", type: "text", name: "postalCode" },
  { label: "Address", placeholder: "Enter your address", type: "text", name: "address" },
  { label: "Date of Birth", placeholder: "Enter your date of birth", type: "date", name: "dateOfBirth" },
  { label: "Country", placeholder: "Select your country", type: "select", name: "country", options: countries, required: true },
  { label: "Timezone", placeholder: "Select your timezone", type: "select", name: "timezone", options: timezones, required: true },
  { label: "Referral Code", placeholder: "Enter your referral code", type: "text", name: "referralCode" },
];

const SignupPage = () => {
  
  // Validation schema using Yup
  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(3, "First Name must be at least 3 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(3, "Last Name must be at least 3 characters")
      .required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    phone: Yup.string()
      .matches(/^\+?\d{1,4}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}$/, "Please enter a valid phone number with country code")
      .required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    timezone: Yup.string().required("Timezone is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form data", values);
    // Handle form submission logic here
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center py-5 px-2 sm:px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-xl p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome to our portal</h1>
            <p className="text-gray-600 text-base sm:text-lg">
              Create your own account
            </p>
          </div>
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
              phone: "",
              gender: "",
              password: "",
              confirmPassword: "",
              city: "",
              state: "",
              postalCode: "",
              address: "",
              dateOfBirth: "",
              country: "",
              timezone: "",
              referralCode: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, setFieldValue, values }) => (
              <Form>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                  {formFields.map(({ label, placeholder, type, name, options, required }) => (
                    <div key={label} className="flex flex-col">
                      <label 
                        htmlFor={name} 
                        className="mb-1 sm:mb-2 text-sm font-medium text-gray-700"
                      >
                        {label} {required && <span className="text-red-500">*</span>}
                      </label>
                      
                      {type === "select" ? (
                        <SelectField
                          name={name}
                          options={options}  
                          value={values[name]}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched[name] && errors[name] ? errors[name] : null}
                          placeholder={placeholder || `Select ${label}`}
                          required={required}
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      ) : name === "phone" ? (
                        <PhoneInput
                          international
                          countryCallingCodeEditable={false}
                          value={values.phone}
                          onChange={(value) => setFieldValue("phone", value)}
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        />
                      ) : (
                        <TextField
                          placeholder={placeholder}
                          type={type}
                          name={name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-full p-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          error={touched[name] && errors[name] ? errors[name] : null}
                        />
                      )}
                      {touched[name] && errors[name] && (
                        <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-8">
                  <button
                    type="submit"
                    className="w-full py-2.5 sm:py-3 px-4 text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors duration-200 font-medium text-sm"
                  >
                    SIGNUP
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-4 sm:mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-red-500 hover:text-red-600 font-medium">
              Login Here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
