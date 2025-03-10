/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const WalletModal = ({ isOpen, onClose, walletData }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const transactionsPerPage = 2;
  
  if (!isOpen) return null;

  // Calculate pagination
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = walletData.transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(walletData.transactions.length / transactionsPerPage);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-red-50 to-white rounded w-full max-w-xl p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-red-800 uppercase">
            Wallet Details
          </h2>
          <button
            onClick={onClose}
            className="text-red-500 hover:text-red-700 transition-colors text-xl"
          >
            &times;
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-700">
            Available Balance
          </h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            ${walletData.balance.toFixed(2)}
          </p>
        </div>

        <div className="border-t border-red-100 pt-4">
          <div className="mb-4">
            <h3 className="text-lg font-medium mb-2 text-gray-700 flex justify-between items-center">
              Recent Transactions
              <Link to="/booking-history" className="text-xs cursor-pointer text-red-600">
                view more
              </Link>
            </h3>
            {walletData.transactions.length > 0 ? (
              <>
                <div className="space-y-2">
                  {currentTransactions.map((transaction) => (
                    <div
                      key={transaction._id}
                      className="p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="flex justify-between">
                        <span className="text-gray-700">
                          {transaction.userName}
                        </span>
                        <span
                          className={`font-medium ${
                            transaction.amount > 0
                              ? "text-green-500"
                              : "text-red-500"
                          }`}
                        >
                          {transaction.amount > 0 ? "+" : ""}
                          {transaction.amount.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">
                        {new Date(transaction.transactionDate).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </p>
                    </div>
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex justify-center gap-2 mt-2 text-sm">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="text-red-600 disabled:text-gray-400"
                    >
                      ←
                    </button>
                    <span className="text-gray-600">
                      {currentPage}/{totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="text-red-600 disabled:text-gray-400"
                    >
                      →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <p className="text-gray-400">No transaction history available</p>
            )}
          </div>
        </div>
        
        <div className="border-t border-red-100 pt-4">
          <h3 className="text-lg font-medium mb-2 text-red-800">
            Referral Program
          </h3>
          <p className="text-gray-600 mb-4">
            Earn rewards by inviting others to join. Share your unique referral
            code below.
          </p>
          <div className="bg-white p-4 rounded shadow-inner mb-4">
            <p className="text-center font-medium text-gray-700">
              Your Referral Code:
              <span className="text-red-600 font-bold ml-1">
                {walletData.referralCode || "G3PSR2"}
              </span>
            </p>
          </div>
          <button
            onClick={() => {
              const referralLink = `https://book.realdealwellness.net/signup?ref=${
                walletData.referralCode || "G3PSR2"
              }`;
              navigator.clipboard
                .writeText(referralLink)
                .then(() => {
                  toast.success("Referral link copied to clipboard");
                })
                .catch((err) => {
                  console.error("Clipboard operation failed:", err);
                  toast.error("Unable to copy referral link");
                });
            }}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy Referral Link
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal;
