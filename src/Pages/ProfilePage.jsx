import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import commonAxios from "../utils/commonAxios";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../Components/Common/ResuableFields/TextField";
import { showToast } from "../utils/toast";
import useUserDetails from "../hooks/userHook";
import ChangePasswordModal from '../components/Common/ChangePasswordModal';
import WalletModal from '../components/Common/WalletModal';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const { updateUserDetails } = useUserDetails();
//   const [purchaseHistory, setPurchaseHistory] = useState([]);
  const [bookingHistory, setBookingHistory] = useState([]);
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [walletData, setWalletData] = useState({ balance: 0, transactions: [], referralCode: '' });
  const [searchParams] = useSearchParams();
  const tab = searchParams.get('wallet');
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(Boolean(tab)||false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await commonAxios.get("/customer");
        setUserData(response.data.data.customer);
      } catch (error) {
        console.error("Error fetching user data:", error);
        showToast.error("Failed to load user data.");
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const bookings = await commonAxios.get("/customer/appointments?type=future");
        const confirmedBookings = bookings?.data?.data?.events
          ?.filter(booking => booking.appointmentStatus.toLowerCase() === 'confirmed')
          ?.map(booking => ({
            id: booking.id,
            serviceName: booking.title,
            date: new Date(booking.startTime).toLocaleDateString(),
            time: new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: booking.appointmentStatus.charAt(0).toUpperCase() + booking.appointmentStatus.slice(1)
          })) || [];
        setBookingHistory(confirmedBookings);
      } catch (error) {
        console.error("Error fetching history:", error);
        showToast.error("Failed to load confirmed bookings.");
      }
    };

    if (userData) {
      fetchHistory();
    }
  }, [userData]); 

  useEffect(() => {
    const fetchWalletData = async () => {
      try {
        const response = await commonAxios.get("/getPersonalWallet");

        setWalletData({
          balance: response.data.data.wallet.walletBalance,
          transactions: response.data.data.wallet.transactions,
          referralCode: response.data.data.referralInfo.referralCode
        });
      } catch (error) {
        console.error("Error fetching wallet data:", error);
        showToast.error("Failed to load wallet data.");
      }
    };

    if (userData) {
      fetchWalletData();
    }
  }, [userData]);

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
  });

  const handleSubmit = async (values) => { 
    try {
      const response = await commonAxios.put("/customer/"+userData._id, values) // Adjust the endpoint as necessary
      if(response.status === 200){
        showToast.success("Profile updated successfully!");
        updateUserDetails(response.data.data.customer);
        window.location.reload();
      }
      else{
        showToast.error("Failed to update profile. Please try again.");
      }
      console.log(response);
      
    } catch (error) {
      showToast.error("Failed to update profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  const paginatedBookings = bookingHistory.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // if (!userData) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <main className="flex-grow w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
          <div className="max-w-7xl mx-auto space-y-8">

            {/* Quick Actions */}
            <div className="bg-white rounded shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <button 
                  className="flex flex-col items-center p-4 bg-gray-50 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsModalOpen(true)}
                >
                  <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center text-xl mb-2">
                    🔒
                  </div>
                  <span>Change Password</span>
                </button>
                <button 
                  className="flex flex-col items-center p-4 bg-gray-50 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => setIsWalletModalOpen(true)}
                >
                  <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center text-xl mb-2">
                    💳
                  </div>
                  <span>Wallet ({walletData.balance} pts)</span>
                </button>
                <button 
                  className="flex flex-col items-center p-4 bg-gray-50 rounded text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                  onClick={() => navigate('/booking-history')}
                >
                  <div className="w-10 h-10 bg-red-50 rounded flex items-center justify-center text-xl mb-2">
                    📅
                  </div>
                  <span>Booking History</span>
                </button>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-4xl">
              {/* Left Column */}
              <div className="lg:col-span-1 space-y-8">
                {/* Profile Card */}
                <div className="bg-white rounded shadow-sm border border-gray-100 p-6">
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-red-50 flex items-center justify-center text-2xl font-semibold text-red-600">
                        {userData?.basicDetails?.avatar ? (
                          <img
                            src={userData?.basicDetails?.avatar}
                            alt="Profile"
                            className="w-full h-full rounded-full object-cover"
                          />
                        ) : (
                          `${userData?.basicDetails?.firstName?.[0] || ""}${
                            userData?.basicDetails?.lastName?.[0] || ""
                          }`
                        )}
                      </div> 
                    </div>
                    <div className="mt-4 text-center">
                      <h2 className="text-xl font-bold text-gray-900">
                        {userData?.basicDetails?.firstName} {userData?.basicDetails?.lastName}
                      </h2>
                      <p className="text-gray-500 mt-1">{userData?.basicDetails?.email}</p>
                    </div>
                    <div className="mt-6 w-full space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Phone</span>
                        <span className="text-gray-900">
                          {userData?.basicDetails?.phone || "Not provided"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Location</span>
                        <span className="text-gray-900">New York, USA</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Member Since</span>
                        <span className="text-gray-900">2022</span>
                      </div>
                    </div>
                  </div>
                </div> 
              </div>

              {/* Right Column */}
              <div className="lg:col-span-2">
                {/* Edit Profile Form */}
                <div className="bg-white rounded shadow-sm border border-gray-100 px-4 py-4 h-full flex flex-col justify-center">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4 uppercase">
                    Edit Profile
                  </h2>
                  <Formik
                    initialValues={{
                      firstName: userData?.basicDetails?.firstName || "",
                      lastName: userData?.basicDetails?.lastName || "",
                      email: userData?.basicDetails?.email || "",
                      phone: userData?.basicDetails?.phone || "",
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                    enableReinitialize
                  >
                    {({
                      handleChange,
                      handleBlur,
                      values,
                      errors,
                      touched,
                    }) => (
                      <Form className="space-y-6">
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                          <TextField
                            label="First Name"
                            name="firstName"
                            type="text"
                            className="w-full"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.firstName}
                            error={touched.firstName && errors.firstName}
                          />
                          <TextField
                            label="Last Name"
                            name="lastName"
                            type="text"
                            className="w-full"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.lastName}
                            error={touched.lastName && errors.lastName}
                          />
                        </div>
                        <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                          <TextField
                            label="Email"
                            name="email"
                            type="email"
                            className="w-full"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            error={touched.email && errors.email}
                          />
                          <TextField
                            label="Phone"
                            name="phone"
                            type="tel"
                            className="w-full"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone}
                            error={touched.phone && errors.phone}
                          />
                        </div>
                        <div className="pt-6 border-t border-gray-200">
                          <div className="flex justify-between items-center">
                            <button
                              type="submit"
                              className="inline-flex justify-center py-2.5 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                            >
                              Update Profile
                            </button>
                            <button
                              type="button"
                              onClick={() => navigate('/account/termination')}
                              className="text-red-600 hover:text-red-800 text-sm font-medium"
                            >
                              Terminate Account
                            </button>
                          </div>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>

                {/* Activity Section */}
              </div>
            </div>
            <div className="bg-white rounded shadow-sm border border-gray-100 p-6 w-full">
              {/* <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Recent Activity
              </h2> */}
              <div className="space-y-6  ">
                {/* Purchase History */}
                {/* <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Purchases
                  </h3>
                  {purchaseHistory.length > 0 ? (
                    <div className="space-y-3">
                      {purchaseHistory.map((purchase) => (
                        <div
                          key={purchase.id}
                          className="p-4 hover:bg-red-50 rounded transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-medium text-gray-900">
                                {purchase.productName}
                              </h4>
                              <p className="text-sm text-gray-500">
                                {purchase.date}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-gray-900">
                                ${purchase.amount}
                              </p>
                              <span
                                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                  purchase.status === "Completed"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-red-100 text-red-800"
                                }`}
                              >
                                {purchase.status}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-gray-500">No purchases yet</p>
                    </div>
                  )}
                </div> */}

                {/* Booking History */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 uppercase">
                  Future Bookings
                  </h3>
                  {bookingHistory.length > 0 ? (
                    <>
                      <div className="space-y-3">
                        {paginatedBookings.map((booking) => (
                          <div
                            key={booking.id}
                            className="p-4 hover:bg-red-50 rounded transition-colors"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-medium text-gray-900">
                                  {booking.serviceName}
                                </h4>
                                <p className="text-sm text-gray-500">
                                  {booking.date} at {booking.time}
                                </p>
                              </div>
                              <div className="text-right">
                                
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                                    booking.status === "Confirmed"
                                      ? "bg-green-100 text-green-800"
                                      : booking.status === "Pending"
                                      ? "bg-yellow-100 text-yellow-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {booking.status}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-2 mt-2 justify-center">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className={`px-2 py-0.5 text-sm rounded ${
                            currentPage === 1 ? 'bg-gray-100 text-gray-400' : 'bg-red-600 text-white'
                          }`}
                        >
                          Prev
                        </button>
                        <span className="text-sm text-gray-600">
                          {currentPage}/{Math.ceil(bookingHistory.length / itemsPerPage)}
                        </span>
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, Math.ceil(bookingHistory.length / itemsPerPage)))}
                          disabled={currentPage >= Math.ceil(bookingHistory.length / itemsPerPage)}
                          className={`px-2 py-0.5 text-sm rounded ${
                            currentPage >= Math.ceil(bookingHistory.length / itemsPerPage)
                              ? 'bg-gray-100 text-gray-400'
                              : 'bg-red-600 text-white'
                          }`}
                        >
                          Next
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="text-center">
                      <div className="flex flex-col items-center">
                        <p className="text-gray-600 font-medium mb-2">No Bookings Yet</p>
                        <p className="text-gray-400 text-sm">
                          Your upcoming appointments will appear here
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="bg-white shadow mt-8 border-t border-gray-100">
        {/* <div className="container mx-auto px-4 py-4 text-center text-gray-600">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </div> */}
      </div>

      {/* Add the ChangePasswordModal */}
      <ChangePasswordModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
      />

      {/* Add the WalletModal */}
      <WalletModal 
        isOpen={isWalletModalOpen} 
        onClose={() => setIsWalletModalOpen(false)}
        walletData={walletData}
      />
    </div>
  );
};

export default ProfilePage;
