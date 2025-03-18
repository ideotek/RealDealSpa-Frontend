/* eslint-disable react/prop-types */
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import commonAxios from '../../utils/commonAxios';

const WalletModal = ({ isOpen, onClose, walletData, onRedeemSuccess }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 3;
  const navigate = useNavigate();
  const location = useLocation();
  const [isRedeeming, setIsRedeeming] = React.useState(false);
  
  const handleClose = () => {
    // Remove wallet parameter from URL
    const searchParams = new URLSearchParams(location.search);
    searchParams.delete('wallet');
    const newSearch = searchParams.toString();
    const newPath = `${location.pathname}${newSearch ? `?${newSearch}` : ''}`;
    
    // Navigate to the new URL and call the original onClose
    navigate(newPath, { replace: true });
    onClose();
  };
  
  const handleRedeemCoupon = async () => {
    if (walletData.balance < 1000) {
      toast.error("Need 1000 points");
      return;
    }

    setIsRedeeming(true);
    try {
      const response = await commonAxios.post('/redeem-coupon', {
        planID: "FREE_PLAN_ID"
      });

      if (response.data) {
        toast.success("Pass redeemed successfully!");
        if (onRedeemSuccess) {
          onRedeemSuccess();
        }
        onClose();
        window.location.reload();
      }
    } catch (error) {
      // commonAxios already handles 401 and 500 errors
      // We only need to handle specific error messages from this API
      const errorMessage = error.response?.data?.message || "Failed to redeem pass. Please try again.";
      if (!error.response?.status === 401 && !error.response?.status === 500) {
        toast.error(errorMessage);
      }
    } finally {
      setIsRedeeming(false);
    }
  };
  
  if (!isOpen) return null;

  // Sort transactions by date (newest first) and then calculate pagination
  const sortedTransactions = [...walletData.transactions].sort((a, b) => 
    new Date(b.transactionDate) - new Date(a.transactionDate)
  );

  // Calculate pagination with sorted transactions
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = sortedTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(sortedTransactions.length / transactionsPerPage);

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-2 sm:p-4 z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg w-full max-w-md shadow-xl h-[90vh] sm:h-auto overflow-y-auto transition-all duration-300 ease-in-out">
        {/* Header */}
        <div className="sticky top-0 bg-white/95 backdrop-blur-sm z-10 flex justify-between items-center p-3 sm:p-4 border-b">
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">Points Balance</h2>
          <button 
            onClick={handleClose}
            className="text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-full p-1.5 transition-colors duration-200"
          >
            <span className="text-xl">×</span>
          </button>
        </div>

        {/* Points and Redeem Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 sm:p-4">
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-lg shadow-sm">
            <div className="text-gray-600 text-sm font-medium">Available Points</div>
            <div className="text-xl sm:text-2xl font-bold text-red-500">
              {Math.round(walletData.balance)} pts
            </div>
          </div>
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-lg shadow-sm">
            <div className="text-sm font-semibold">Unlimited Booking Pass</div>
            <div className="text-xs text-gray-600 mb-2">1000 points - 1 month</div>
            <button
              onClick={handleRedeemCoupon}
              disabled={walletData.balance < 1000 || isRedeeming}
              className={`px-3 py-1.5 rounded-md w-full transition-all duration-200 text-sm ${
                walletData.balance >= 1000 && !isRedeeming
                  ? "bg-red-500 hover:bg-red-600 text-white shadow-sm"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isRedeeming ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-4 w-4 mr-2" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Redeeming...
                </span>
              ) : (
                "Redeem"
              )}
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="p-3 sm:p-4 border-t">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-base font-semibold">Recent Transactions</h3>
            {/* <Link to="/booking-history" className="text-xs text-red-500 hover:text-red-600 hover:underline">
              view all
            </Link> */}
          </div>
          <div className="space-y-2 max-h-[35vh] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
            {currentTransactions.map((tx) => (
              <div key={tx._id} className="bg-gray-50 hover:bg-gray-100 transition-colors p-2.5 rounded-lg shadow-sm">
                <div className="flex justify-between items-center">
                  <span className="truncate mr-2 text-sm font-medium">{tx.userName || tx.transactionType}</span>
                  <span className={`whitespace-nowrap text-sm font-semibold ${tx.transactionFlow !== "out" ? "text-green-500" : "text-red-500"}`}>
                    {tx.transactionFlow !== "out" ? "+" : "-"}{Math.round(tx.amount)} pts
                  </span>
                </div>
                <div className="text-xs text-gray-500 mt-0.5">
                  {new Date(tx.transactionDate).toLocaleDateString()}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-3 px-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="text-red-500 hover:bg-red-50 disabled:text-gray-300 disabled:hover:bg-transparent px-3 py-1.5 rounded-md transition-colors text-sm"
              >
                Previous
              </button>
              <span className="text-xs font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="text-red-500 hover:bg-red-50 disabled:text-gray-300 disabled:hover:bg-transparent px-3 py-1.5 rounded-md transition-colors text-sm"
              >
                Next
              </button>
            </div>
          )}
        </div>

        {/* Referral */}
        <div className="p-3 sm:p-4 border-t">
          <div className="text-base font-semibold mb-2">Referral Program</div>
          <div className="bg-gray-50 hover:bg-gray-100 transition-colors p-3 rounded-lg shadow-sm mb-3 text-center">
            <div className="text-xs text-gray-600 font-medium">Your Referral Code</div>
            <div className="font-bold text-red-500 text-base mt-0.5 break-all">{walletData.referralCode || "G3PSR2"}</div>
          </div>
          <button
            onClick={() => {
              const referralLink = `https://book.realdealwellness.net/signup?ref=${
                walletData.referralCode || "G3PSR2"
              }`;
              navigator.clipboard
                .writeText(referralLink)
                .then(() => toast.success("Link copied!"))
                .catch(() => toast.error("Copy failed"));
            }}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center transition-colors shadow-sm text-sm"
          >
            <svg className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
