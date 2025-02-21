import { useState } from 'react';

const useUserDetails = () => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('customerDetails');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const updateUserDetails = (userDetails) => {
    setUser(userDetails);
    localStorage.setItem('customerDetails', JSON.stringify(userDetails));  
  };

  return { user, updateUserDetails };
};

export default useUserDetails;