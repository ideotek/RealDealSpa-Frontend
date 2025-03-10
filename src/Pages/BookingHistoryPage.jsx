import React, { useEffect, useState, useMemo } from "react";
import commonAxios from "../utils/commonAxios";
import { showToast } from "../utils/toast";

// Extracted components
const ViewModeToggle = ({ viewMode, onToggle }) => (
  <button 
    onClick={onToggle}
    className="p-2 rounded hover:bg-gray-100 transition-colors"
    title="Toggle view mode"
  >
    {viewMode === 'grid' ? (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
      </svg>
    ) : (
      <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
      </svg>
    )}
  </button>
);

const FilterTabs = ({ activeFilter, onFilterChange }) => (
  <div className="flex overflow-x-auto space-x-4 mb-6 border-b scrollbar-hide">
    {['upcoming', 'past', 'cancelled'].map((filter) => (
      <button
        key={filter}
        onClick={() => onFilterChange(filter)}
        className={`pb-2 px-4 text-xs sm:text-sm font-medium capitalize whitespace-nowrap transition-colors ${
          activeFilter === filter
            ? "border-b-2 border-red-500 text-red-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        {filter}
      </button>
    ))}
  </div>
);

const BookingCard = React.memo(({ booking, viewMode }) => (
  <div 
    className={`${
      viewMode === 'grid' 
        ? "p-3 sm:p-4 bg-white hover:shadow rounded-lg border border-gray-200" 
        : "p-3 bg-white hover:shadow rounded-lg border border-gray-200"
    }`}
  >
    <div className={viewMode === 'grid' ? "flex flex-col space-y-2" : "flex items-center justify-between"}>
      <div className="flex-1 min-w-0"> {/* Added min-w-0 for text truncation */}
        <h4 className="font-medium text-sm sm:text-base text-gray-800 truncate">{booking.serviceName}</h4>
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {booking.date}
          </div>
          <div className="flex items-center">
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {booking.time}
          </div>
        </div>
        <div className={`mt-2 ${viewMode === 'grid' ? "" : "ml-3"}`}>
          <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
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
  </div>
));

const BookingHistoryPage = () => {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
  const [activeFilter, setActiveFilter] = useState("upcoming"); // Add this new state
  const [currentPage, setCurrentPage] = useState(1); // Add this new state
  const bookingsPerPage = 12;

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const [futureBookings, pastBookings] = await Promise.all([
          commonAxios.get("/customer/appointments?type=future"),
          commonAxios.get("/customer/appointments?type=past"),
        ]);

        const combinedBookings = [
          ...futureBookings.data.data.events.map((booking) => ({
            id: booking.id,
            serviceName: booking.title,
            date: new Date(booking.startTime).toLocaleDateString(),
            time: new Date(booking.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status:
              booking.appointmentStatus.charAt(0).toUpperCase() +
              booking.appointmentStatus.slice(1),
          })),
          ...pastBookings.data.data.events.map((booking) => ({
            id: booking.id,
            serviceName: booking.title,
            date: new Date(booking.startTime).toLocaleDateString(),
            time: new Date(booking.startTime).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status:
              booking.appointmentStatus.charAt(0).toUpperCase() +
              booking.appointmentStatus.slice(1),
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
    setViewMode((prevMode) => (prevMode === "grid" ? "list" : "grid"));
  };

  const filteredBookings = useMemo(() => {
    return bookingHistory.filter(booking => {
      const today = new Date();
      const bookingDate = new Date(booking.date);
      
      switch (activeFilter) {
        case 'upcoming':
          return bookingDate >= today && booking.status !== 'Cancelled';
        case 'past':
          return bookingDate < today && booking.status !== 'Cancelled';
        case 'cancelled':
          return booking.status === 'Cancelled';
        default:
          return true;
      }
    });
  }, [bookingHistory, activeFilter]);

  const { currentBookings, totalPages } = useMemo(() => {
    const indexOfLastBooking = currentPage * bookingsPerPage;
    const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
    return {
      currentBookings: filteredBookings.slice(indexOfFirstBooking, indexOfLastBooking),
      totalPages: Math.ceil(filteredBookings.length / bookingsPerPage)
    };
  }, [filteredBookings, currentPage]);

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow w-full">
        <div className="w-full px-3 sm:px-6 lg:px-8 py-6">
          <div className="mx-auto space-y-6 sm:space-y-8">
            <div className="bg-white p-4 sm:p-6 rounded shadow-sm min-h-[calc(100vh-4rem)] flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800">Booking History</h2>
                <ViewModeToggle viewMode={viewMode} onToggle={toggleViewMode} />
              </div>

              <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

              {filteredBookings.length > 0 ? (
                <>
                  <div className={`${
                    viewMode === 'grid' 
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" 
                      : "space-y-3"
                  } overflow-y-auto flex-grow`}>
                    {currentBookings.map((booking) => (
                      <BookingCard key={booking.id} booking={booking} viewMode={viewMode} />
                    ))}
                  </div>
                  
                  {/* Pagination controls */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center mt-4 space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className={`px-2 py-1 text-xs sm:text-sm rounded ${
                          currentPage === 1
                            ? 'bg-gray-50 text-gray-400'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        Previous
                      </button>
                      <span className="px-2 text-xs sm:text-sm text-gray-600">
                        {currentPage}/{totalPages}
                      </span>
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className={`px-2 py-1 text-xs sm:text-sm rounded ${
                          currentPage === totalPages
                            ? 'bg-gray-50 text-gray-400'
                            : 'bg-red-50 text-red-600 hover:bg-red-100'
                        }`}
                      >
                        Next
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="max-w-md mx-auto">
                    <svg className="mx-auto h-8 w-8 sm:h-12 sm:w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                    <h3 className="mt-2 text-base sm:text-lg font-medium text-gray-900">No bookings yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Your booking history will appear here once you make appointments.</p>
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
