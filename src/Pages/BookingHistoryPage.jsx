import React, { useEffect, useState } from "react";
import commonAxios from "../utils/commonAxios";
import { showToast } from "../utils/toast";

const BookingHistoryPage = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const [futureBookings, pastBookings] = await Promise.all([
          commonAxios.get("/customer/appointments?type=future"),
          commonAxios.get("/customer/appointments?type=past"),
        ]);

        const combinedBookings = [
          ...futureBookings.data.data.events.map(booking => ({
            id: booking.id,
            serviceName: booking.title,
            date: new Date(booking.startTime).toLocaleDateString(),
            time: new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: booking.appointmentStatus.charAt(0).toUpperCase() + booking.appointmentStatus.slice(1),
          })),
          ...pastBookings.data.data.events.map(booking => ({
            id: booking.id,
            serviceName: booking.title,
            date: new Date(booking.startTime).toLocaleDateString(),
            time: new Date(booking.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            status: booking.appointmentStatus.charAt(0).toUpperCase() + booking.appointmentStatus.slice(1),
          })),
        ];

        setBookingHistory(combinedBookings);
      } catch (error) {
        console.error("Error fetching booking history:", error);
        showToast.error("Failed to load booking history.");
      } finally {
        setLoading(false);
      }
    };

    fetchBookingHistory();
  }, []);

  const toggleViewMode = () => {
    setViewMode(prevMode => prevMode === 'grid' ? 'list' : 'grid');
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow pt-20 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Booking History</h2>
                <button 
                  onClick={toggleViewMode}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  title="Toggle view mode"
                >
                  {viewMode === 'grid' ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  )}
                </button>
              </div>
              {bookingHistory.length > 0 ? (
                <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  {bookingHistory.map((booking) => (
                    <div 
                      key={booking.id} 
                      className={viewMode === 'grid' ? 
                        "p-6 bg-white hover:shadow-lg rounded-xl transition-all border border-gray-100 transform hover:-translate-y-1" : 
                        "p-5 bg-white hover:shadow-md rounded-lg transition-all border border-gray-100"
                      }
                    >
                      <div className={viewMode === 'grid' ? "flex flex-col h-full justify-between" : "flex items-center justify-between"}>
                        <div>
                          <h4 className="font-semibold text-xl text-gray-800 mb-2">{booking.serviceName}</h4>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              <span>{booking.date}</span>
                            </p>
                            <p className="flex items-center">
                              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span>{booking.time}</span>
                            </p>
                          </div>
                        </div>
                        <div className={viewMode === 'grid' ? "mt-4" : "ml-4"}>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "Confirmed"
                              ? "bg-green-50 text-green-700"
                              : booking.status === "Pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="max-w-md mx-auto">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No bookings yet</h3>
                    <p className="mt-1 text-gray-500">Your booking history will appear here once you make appointments.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookingHistoryPage; 