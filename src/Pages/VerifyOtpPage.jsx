import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/Common/ResuableFields/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import commonAxios from "../utils/commonAxios";
import { showToast } from "../utils/toast";

const validationSchema = Yup.object({
  otp: Yup.string()
    .matches(/^\d{6}$/, "OTP must be 6 digits")
    .required("OTP is required"),
});

const VerifyOtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { txid, email } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!txid) {
      navigate("/forgot-password", { replace: true });
    }
  }, [txid, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await commonAxios.post("/verify-otp", {
        otp: values.otp,
        txid,
      });
      const token = response.data?.data?.token;

      if (!token) {
        throw new Error("OTP verification failed. Please try again.");
      }

      showToast.success(response.data?.message || "OTP verified successfully");
      navigate("/reset-password", {
        replace: true,
        state: { token, email },
      });
    } catch (error) {
      showToast.error(
        error.response?.data?.message ||
          error.message ||
          "Invalid OTP. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!txid) return null;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded shadow-xl p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Verify OTP
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-6">
            Enter the 6-digit OTP sent to your registered mobile number
            {email ? ` for ${email}` : ""}
          </p>

          <Formik
            initialValues={{ otp: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="space-y-6">
                <div className="flex flex-col">
                  <label className="mb-1 text-sm font-medium text-gray-700">
                    OTP
                  </label>
                  <TextField
                    type="text"
                    name="otp"
                    value={values.otp}
                    placeholder="Enter 6-digit OTP"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.otp && errors.otp ? errors.otp : null}
                    touched={touched.otp}
                  />
                  {touched.otp && errors.otp && (
                    <p className="mt-1 text-sm text-red-500">{errors.otp}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full px-4 py-3 text-sm sm:text-base text-white bg-red-500 rounded hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                  disabled={loading}
                >
                  {loading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    "VERIFY OTP"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-sm sm:text-base text-center">
            Didn&apos;t receive OTP?{" "}
            <Link
              to="/forgot-password"
              className="text-red-500 hover:text-red-600 font-medium transition-colors duration-200"
            >
              Resend
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtpPage;
