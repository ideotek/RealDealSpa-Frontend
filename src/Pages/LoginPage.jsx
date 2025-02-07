import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/resuableFields/textField";
import commonAxios from "../utils/commonAxios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => { 
  const navigate = useNavigate()
  const formFields = [
    { label: "Email", placeholder: "Enter your email", type: "email", name: "email" },
    { label: "Password", placeholder: "Enter your password", type: "password", name: "password" },
  ];

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await commonAxios.post("/customer/login", values);
  
      const { status, customer, token, currentLocation } = response.data.data; 
      if (status) {
        localStorage.setItem("AccessToken", token);
        localStorage.setItem("customerDetails", JSON.stringify(customer)); 
        localStorage.setItem("currentLocation", JSON.stringify(currentLocation)); 
        toast.success("Login successful!");
        navigate("/", { replace: true });
      }
    } catch (error) {
      if (error.response) {
        const { status, message } = error.response.data; 
        if (status === 403) {
          toast.error(`Login failed: ${message}`);
        } else {
          toast.error(`Error: ${message}`);
        }
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    }
  };
  

  return (
    <div
      className="w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center">Welcome Back</h1>
          <p className="text-sm text-center text-gray-600">
            Login into your account
          </p> 

          <div className="relative my-6 text-center"> 
          </div>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur,setTouched }) => (
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
                      touched={setTouched}
                      error={touched[name] && errors[name] ? errors[name] : null}
                    />
                  ))}
                </div> 
                <div className="mt-10">
                  <button
                    type="submit"
                    className="w-full px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  >
                    LOGIN
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-6 text-sm text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 hover:text-red-600 font-medium">
              Sign up!
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
