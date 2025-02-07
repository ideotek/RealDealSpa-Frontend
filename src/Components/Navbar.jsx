import Logo from "../assets/Logo.png";
import CalenderVector from "../assets/CalenderVector.png";
import MaleAvatar from "../assets/svg/MaleAvatar.svg";
import FemaleAvatar from "../assets/svg/FemaleAvatar.svg";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

function Sidebar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [gender, setGender] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('AccessToken');
    const customerDetails = localStorage.getItem('customerDetails');
    
    if (accessToken && customerDetails) {
      try {
        const parsedDetails = JSON.parse(customerDetails);
        const firstName = parsedDetails.basicDetials.firstName || '';
        const lastName = parsedDetails.basicDetials.lastName || '';
        const fullName = `${firstName} ${lastName}`.trim();
        const userGender = parsedDetails.basicDetials.gender || 'male';
        
        setIsLoggedIn(true);
        setUsername(fullName || 'User');
        setGender(userGender.toLowerCase());
      } catch (error) {
        console.error('Error parsing customer details:', error);
        setUsername('User');
      }
    }
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('AccessToken');
    localStorage.removeItem('customerDetails');
    setIsLoggedIn(false);
    setUsername("");
    setIsDropdownOpen(false);
    navigate('/login');
  };

  return (
    <header className={`w-full fixed top-0 z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/">
              <img src={Logo} alt="logo" className="h-8 w-auto" />
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <nav className="hidden md:flex space-x-8">
              <Link 
                to="/" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  isScrolled ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                  HOME
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link 
                to="/services" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  isScrolled ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                SERVICES
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link 
                to="/packages" 
                className={`px-3 py-2 text-sm font-medium transition-colors duration-200 relative group ${
                  isScrolled ? 'text-red-600' : 'text-gray-600'
                }`}
              >
                PACKAGES
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </nav>

            <div ref={dropdownRef} className="relative ml-4">
              {isLoggedIn ? (
                <>
                  <div 
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`flex items-center gap-3 border-b rounded-lg px-4 py-2 cursor-pointer `}
                  >
                    <img 
                      src={gender === 'female' ? FemaleAvatar : MaleAvatar} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full border-2 border-gray-200"
                    />
                    <div className="flex flex-col">
                      <span className={`text-xs font-medium ${
                        isScrolled ? 'text-gray-500' : 'text-red-600'
                      }`}>Welcome,</span>
                      <span className={`text-sm font-semibold uppercase ${
                        isScrolled ? 'text-gray-900' : 'text-gray-600'
                      }`}>{username}</span>
                    </div>
                    <svg 
                      className={`w-4 h-4 ${
                        isScrolled ? 'text-gray-500' : 'text-white'
                      } transition-transform duration-200 ${
                        isDropdownOpen ? 'transform rotate-180' : ''
                      }`} 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>

                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100 transform transition-all duration-200">
                      <Link 
                        to="/profile" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        My Profile
                      </Link>
                      <Link 
                        to="/settings" 
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </Link>
                      <hr className="my-1 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                localStorage.getItem('AccessToken') ? null : (
                  <Link 
                    to="/login" 
                    className={`px-6 py-2 rounded-lg text-sm font-medium flex items-center transition-colors duration-200 shadow-sm bg-red-600 text-white hover:bg-red-700`}
                  >
                    <span className="mr-2">
                      <img src={CalenderVector} alt="CalenderVector" className="w-4 h-4" />
                    </span>
                    Login to your portal
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Sidebar;
