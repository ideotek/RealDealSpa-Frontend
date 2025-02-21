/* eslint-disable react/prop-types */
import React from 'react';
import { toast } from 'react-toastify';

const WalletModal = ({ isOpen, onClose, walletData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-gradient-to-br from-red-50 to-white rounded w-full max-w-md p-6 shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-red-800">Wallet Details</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700 transition-colors">
            &times;
          </button>
        </div>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-700">Current Balance</h3>
          <p className="text-2xl font-bold bg-gradient-to-r from-red-600 to-red-400 bg-clip-text text-transparent">
            ${walletData.balance}
          </p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-700">Transaction History</h3>
          {walletData.transactions.length > 0 ? (
            <div className="space-y-2">
              {walletData.transactions.map((transaction) => (
                <div key={transaction._id} className="p-3 bg-white rounded shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between">
                    <span className="text-gray-700">{transaction.userName}</span>
                    <span className={`font-medium ${transaction.amount > 0 ? 'text-green-500' : 'text-red-500'}`}>
                      ${transaction.amount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    {new Date(transaction.transactionDate).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-400">No transactions yet</p>
          )}
        </div>

        <div className="border-t border-red-100 pt-6">
          <h3 className="text-lg font-medium mb-4 text-red-800">Invite Friends</h3>
          <p className="text-gray-600 mb-4">
            Share your referral code and earn rewards when your friends sign up!
          </p>
          <div className="bg-white p-4 rounded shadow-inner mb-4">
            <p className="text-center font-medium text-gray-700">Your Referral Code: 
              <span className="text-red-600 font-bold ml-1">{walletData.referralCode || 'G3PSR2'}</span>
            </p>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(`https://book.realdealwellness.net/signup?ref=${walletData.referralCode || 'G3PSR2'}`)
                .then(() => {
                  toast('Referral code copied!');
                })
                .catch((err) => {
                  console.error('Failed to copy:', err);
                  alert('Failed to copy referral code');
                });
            }}
            className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-red-700 transition-colors flex items-center justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
              <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
            </svg>
            Copy Code
          </button>
        </div>
      </div>
    </div>
  );
};

export default WalletModal; 