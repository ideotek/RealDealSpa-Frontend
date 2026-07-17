import { Formik, Form } from "formik";
import * as Yup from "yup";
import backgroundImage from "../assets/BackgroundImage.png";
import TextField from "../Components/Common/ResuableFields/TextField";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import commonAxios from "../utils/commonAxios";
import { showToast } from "../utils/toast";

const validationSchema = Yup.object({
  newPassword: Yup.string()
    .min(4, "Password must be at least 4 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { token } = location.state || {};
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/forgot-password", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      await commonAxios.post(
        "/change-password",
        { newPassword: values.newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      showToast.success("Password updated successfully. Please login.");
      navigate("/login", { replace: true });
    } catch (error) {
      showToast.error(
        error.response?.data?.message ||
          "Failed to update password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!token) return null;

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat px-4 sm:px-6 lg:px-8"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="flex min-h-screen items-center justify-center py-8">
        <div className="w-full max-w-sm sm:max-w-md bg-white rounded shadow-xl p-6 sm:p-8 md:p-10">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">
            Reset Password
          </h1>
          <p className="text-sm sm:text-base text-center text-gray-600 mb-6">
            Enter your new password
          </p>

          <Formik
            initialValues={{ newPassword: "", confirmPassword: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, handleChange, handleBlur, values }) => (
              <Form className="space-y-6">
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">
                      New Password
                    </label>
                    <TextField
                      type="password"
                      name="newPassword"
                      value={values.newPassword}
                      placeholder="Enter new password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.newPassword && errors.newPassword
                          ? errors.newPassword
                          : null
                      }
                      touched={touched.newPassword}
                    />
                    {touched.newPassword && errors.newPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.newPassword}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <label className="mb-1 text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <TextField
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      placeholder="Confirm new password"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={
                        touched.confirmPassword && errors.confirmPassword
                          ? errors.confirmPassword
                          : null
                      }
                      touched={touched.confirmPassword}
                    />
                    {touched.confirmPassword && errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors.confirmPassword}
                      </p>
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
                    "RESET PASSWORD"
                  )}
                </button>
              </Form>
            )}
          </Formik>

          <p className="mt-8 text-sm sm:text-base text-center">
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

export default ResetPasswordPage;
