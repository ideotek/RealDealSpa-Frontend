import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/Common/ResuableFields/TextField";
import SelectField from "../Components/Common/ResuableFields/SelectField";
import PhoneInput from "../Components/Common/ResuableFields/PhoneField";
import "react-phone-number-input/style.css";
import { countries, timezones } from "../utils/data";
import { useEffect, useState } from "react";
import commonAxios from "../utils/commonAxios";
import { Link, useNavigate } from "react-router-dom";
import { showToast } from "../utils/toast";

const formFields = [
  {
    label: "Location",
    placeholder: "Select Location",
    type: "select",
    name: "locationID",
    required: true,
    options: [],
  },
  {
    label: "First Name",
    placeholder: "Enter your First Name",
    type: "text",
    name: "firstName",
    required: true,
  },
  {
    label: "Last Name",
    placeholder: "Enter your Last Name",
    type: "text",
    name: "lastName",
    required: true,
  },
  {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    name: "email",
    required: true,
  },
  {
    label: "Mobile Number",
    placeholder: "Enter your mobile number",
    type: "tel",
    name: "phone",
    required: true,
  },
  {
    label: "Gender",
    placeholder: "Select your gender",
    type: "select",
    name: "gender",
    options: [
      { value: "male", label: "Male" },
      { value: "female", label: "Female" },
    ],
    required: true,
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    name: "password",
    required: true,
  },
  {
    label: "Confirm Password",
    placeholder: "Confirm your password",
    type: "password",
    name: "confirmPassword",
    required: true,
  },
  { label: "City", placeholder: "Enter your city", type: "text", name: "city" },
  {
    label: "State",
    placeholder: "Enter your state",
    type: "text",
    name: "state",
  },
  {
    label: "Postal Code",
    placeholder: "Enter your postal code",
    type: "text",
    name: "postalCode",
  },
  {
    label: "Address",
    placeholder: "Enter your address",
    type: "text",
    name: "address",
  },
  {
    label: "Date of Birth",
    placeholder: "Enter your date of birth",
    type: "date",
    name: "dateOfBirth",
  },
  {
    label: "Country",
    placeholder: "Select your country",
    type: "select",
    name: "country",
    options: countries,
    required: true,
  },
  {
    label: "Timezone",
    placeholder: "Select your timezone",
    type: "select",
    name: "timezone",
    options: timezones,
    required: true,
  },
  {
    label: "Referral Code",
    placeholder: "Enter your referral code",
    type: "text",
    name: "referralCode",
  },
];

const SignupPage = () => {
  const [locations, setLocations] = useState([]);
  const [initialValues, setInitialValues] = useState({
    locationID: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    gender: '',
    password: '',
    confirmPassword: '',
    city: '',
    state: '',
    postalCode: '',
    address: '',
    dateOfBirth: '',
    country: '',
    timezone: '',
    referralCode: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await commonAxios.get("/locations");
        const locationOptions = res?.data?.data?.map(location => ({
          value: location.locationID,
          label: location.name,
          data: location,
        }));

        if (locationOptions?.length > 0) {
          setLocations(locationOptions);
          setInitialValues(prev => ({
            ...prev,
            locationID: locationOptions[0].value,
            country: locationOptions[0].data?.address?.country?.code,
            timezone: locationOptions[0].data?.timezone,
          }));
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
        showToast.error("Failed to fetch locations");
      }
    };

    fetchLocations();
  }, []);

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .min(2, "First Name must be at least 2 characters")
      .required("First Name is required"),
    lastName: Yup.string()
      .min(1, "Last Name must be at least 1 characters")
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
      .matches(
        /^\+?\d{1,4}[-\s]?\(?\d{1,4}\)?[-\s]?\d{1,4}[-\s]?\d{1,4}$/,
        "Please enter a valid phone number with country code"
      )
      .required("Mobile number is required"),
    gender: Yup.string().required("Gender is required"),
    country: Yup.string().required("Country is required"),
    timezone: Yup.string().required("Timezone is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await commonAxios.post("/customer/register", values);
      if (response.data) {
        showToast.success("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2000);
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Registration failed. Please try again.";
      showToast.error(errorMessage);
    }
  };

  const renderField = ({ label, type, name, options, required, placeholder }, formikProps) => {
    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formikProps;
    
    const commonProps = {
      name,
      onChange: handleChange,
      onBlur: handleBlur,
      className: "w-full p-2.5 border border-gray-300 rounded focus:ring-2 focus:ring-red-500 focus:border-red-500",
      error: touched[name] && errors[name] ? errors[name] : null,
    };

    return (
      <div key={name} className="flex flex-col">
        <label className="mb-1 sm:mb-2 text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>

        {type === "select" ? (
          <SelectField
            {...commonProps}
            options={name === "locationID" ? locations : options}
            value={values[name]}
            placeholder={placeholder}
          />
        ) : name === "phone" ? (
          <PhoneInput
            international
            countryCallingCodeEditable={false}
            value={values.phone}
            onChange={(value) => setFieldValue("phone", value)}
            className={commonProps.className}
          />
        ) : (
          <TextField
            {...commonProps}
            type={type}
            placeholder={placeholder}
          />
        )}

        {touched[name] && errors[name] && (
          <p className="mt-1 text-sm text-red-500">{errors[name]}</p>
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-cover bg-center py-5 px-2 sm:px-4"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="max-w-6xl mx-auto flex justify-center items-center">
        <div className="bg-white/80 backdrop-blur-sm rounded shadow-xl p-4 sm:p-8">
          <div className="text-center mb-6 sm:mb-10">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Welcome to our portal</h1>
            <p className="text-gray-600 text-base sm:text-lg">Create your own account</p>
          </div>

          <Formik
            initialValues={initialValues}
            enableReinitialize={true}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {(formikProps) => (
              <Form>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-3">
                  {formFields.map((field) => renderField(field, formikProps))}
                </div>

                <div className="mt-6 sm:mt-8">
                  <button type="submit" 
                          className="w-full py-2.5 sm:py-3 px-4 text-white bg-red-500 hover:bg-red-600 rounded transition-colors duration-200 font-medium text-sm">
                    SIGNUP
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-4 sm:mt-6 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login">
              <div className="text-red-500 hover:text-red-600 font-medium">
                Login Here
              </div>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
