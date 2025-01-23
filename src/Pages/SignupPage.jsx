import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import Sidebar from "../Components/Navbar";
import TextField from "../Components/resuableFields/textField";

// SVG
import Google from "../assets/svg/Google.svg";

const SignupPage = () => {
  const socialButtons = [
    {
      src: Google,
      alt: "Google",
      text: "Google",
    },
  ];

  const formFields = [
    { label: "Name", placeholder: "Enter your name", type: "text", name: "name" },
    { label: "Email", placeholder: "Enter your email", type: "email", name: "email" },
    { label: "Password", placeholder: "Enter your password", type: "password", name: "password" },
    {
      label: "Confirm Password",
      placeholder: "Confirm your password",
      type: "password",
      name: "confirmPassword",
    },
    {
      label: "Mobile Number",
      placeholder: "Enter your mobile number",
      type: "number",
      name: "mobileNumber",
    },
  ];

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
    mobileNumber: Yup.string()
      .matches(/^\d{10}$/, "Mobile number must be 10 digits")
      .required("Mobile number is required"),
  });

  const handleSubmit = (values) => {
    console.log("Form data", values);
    // Handle form submission logic here
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Sidebar />
      <div className="flex items-center justify-center mt-10">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center">Welcome You</h1>
          <p className="text-sm text-center text-gray-600">
            Create your own account
          </p>

          <div className="flex justify-center mt-6 space-x-4">
            {socialButtons.map(({ src, alt, text }) => (
              <button
                key={text}
                className="flex items-center px-4 py-2 text-sm border rounded-md"
              >
                <img src={src} alt={alt} className="w-5 h-5 mr-2" />
                {text}
              </button>
            ))}
          </div>

          <div className="relative my-6 text-center">
            <span className="px-2 text-sm text-gray-600 bg-white">
              Or continue with
            </span>
          </div>

          <Formik
            initialValues={{
              name: "",
              email: "",
              password: "",
              confirmPassword: "",
              mobileNumber: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form>
                <div className="space-y-4">
                  {formFields.map(({ label, placeholder, type, name }) => (
                    <TextField
                      key={label}
                      label={label}
                      placeholder={placeholder}
                      type={type}
                      name={name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="w-full"
                      error={touched[name] && errors[name] ? errors[name] : null}
                    />
                  ))}
                </div>

                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    SIGNUP
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-sm text-center">
            Already have an account?{" "}
            <a href="#" className="text-red-500">
              Login Here!
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
