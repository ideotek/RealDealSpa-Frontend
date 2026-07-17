import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/Common/ResuableFields/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import commonAxios from "../utils/commonAxios";
import { showToast } from "../utils/toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
});

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await commonAxios.post("/send-otp", {
        email: values.email,
      });
      const txid = response.data?.data?.txid;

      if (!txid) {
        throw new Error("Unable to start password reset. Please try again.");
      }

      showToast.success(
        response.data?.message || "OTP sent to your registered mobile number"
      );
      navigate("/verify-otp", {
        replace: true,
        state: { txid, email: values.email },
      });
    } catch (error) {
      showToast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to send OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded shadow-xl p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Forgot Password
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-6">
            Enter your email and we&apos;ll send an OTP to your registered mobile
            number
          </p>

          <Formik
            initialValues={{ email: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <TextField
                      type="email"
                      name="email"
                      value={values.email}
                      placeholder="Enter your email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && errors.email ? errors.email : null}
                      touched={touched.email}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 text-sm sm:text-base text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    "SEND OTP"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-sm sm:text-base text-center">
            Remember your password?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
