import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import commonAxios from '../utils/commonAxios';
import useUserDetails from '../hooks/userHook';

const AccountTermination = () => {
  const navigate = useNavigate();
  const [confirmed, setConfirmed] = useState(false);
  const [isDeactivating, setIsDeactivating] = useState(false);
  const { user } = useUserDetails();

  const handleDeactivateAccount = async () => {
    if (!confirmed) {
      toast.error('Please confirm that you understand the consequences');
      return;
    }

    try {
      const result = await Swal.fire({
        title: 'Deactivate Account?',
        text: "You can reactivate your account by contacting support",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#dc2626',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Yes, deactivate my account'
      });

      if (result.isConfirmed) {
        setIsDeactivating(true);

        commonAxios.delete(`customer/delete-account/${user._id}`).then((Response)=>{
          console.log(Response, "Response");
          toast.success('Account successfully deactivated');
          navigate('/login');
        }).catch((err)=>{
          console.log(err, "err");
        })
        
        // Call your account deactivation function here
        // await deactivateAccount();
        
        toast.success('Account successfully deactivated');
        navigate('/');
      }
    } catch (err) {
      toast.error('Failed to deactivate account. Please try again later.');
      console.error('Deactivate account error:', err);
    } finally {
      setIsDeactivating(false);
    }
  };

  return (
    <div className="container mt-20 mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
        Termintate Account
        </h1>

        <div className="space-y-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-yellow-700">
                  Before proceeding with account Termintation, please understand this process.
                </p>
              </div>
            </div>
          </div>

          <div className="prose prose-lg text-gray-700">
            <p className="mb-4">
              When you Termintate your account:
            </p>

            <ul className="list-disc pl-6 space-y-3 mb-6">
              <li>Your account will be immediately deactivated</li>
              <li>{"You'll lose access to all services and feature"}s</li>

              <li>Any active subscriptions will be suspended</li>

            </ul>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={confirmed}
                onChange={(e) => setConfirmed(e.target.checked)}
                className="w-5 h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
              />
              <span className="text-gray-800 text-lg">
                I understand that deactivating my account will remove my access to all services
              </span>
            </label>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              onClick={handleDeactivateAccount}
              disabled={isDeactivating || !confirmed}
              className={`px-6 py-3 rounded-lg font-semibold text-white shadow-sm
                ${isDeactivating || !confirmed 
                  ? 'bg-red-300 cursor-not-allowed' 
                  : 'bg-red-600 hover:bg-red-700'
                } transition-all duration-200`}
            >
              {isDeactivating ? 'Deactivating...' : 'Deactivate My Account'}
            </button>
            
            <button
              onClick={() => navigate('/account')}
              disabled={isDeactivating}
              className={`px-6 py-3 rounded-lg font-semibold border-2 shadow-sm
                ${isDeactivating 
                  ? 'text-gray-400 bg-gray-50 border-gray-200 cursor-not-allowed' 
                  : 'text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                } transition-all duration-200`}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountTermination; 