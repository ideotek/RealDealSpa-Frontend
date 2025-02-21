import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/Common/ResuableFields/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

// Move constants outside component
const formFields = [
  {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    name: "email",
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    name: "password",
  },
];

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [loading, handleSubmit] = useLogin(navigate);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded shadow-xl p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Welcome Back</h1>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-6">
            Login into your account
          </p>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, setTouched }) => (
              <Form className="space-y-6">
                <div className="space-y-5">
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
                      error={
                        touched[name] && errors[name] ? errors[name] : null
                      }
                    />
                  ))}
                </div>
                <div>
                  <button
                    type="submit"
                    className="w-full px-4 py-3 text-sm sm:text-base text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                    disabled={loading}
                  >
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    ) : (
                      "LOGIN"
                    )}
                  </button>
                </div>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-sm sm:text-base text-center">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
