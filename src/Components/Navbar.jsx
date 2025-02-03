import Logo from "../assets/Logo.png";
import CalenderVector from "../assets/CalenderVector.png";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <header className="w-full bg-transparent flex justify-between items-center px-4 py-4">
      <div className="flex items-center space-x-2">
       <img src={Logo} alt="logo" />
      </div>

      <div className="flex gap-10 justify-center items-center">
      <nav className="flex space-x-6 text-gray-600 text-sm">
        <a href="#services" className="hover:text-red-600">
          SERVICES
        </a>
        <a href="#packages" className="hover:text-red-600">
          PACKAGES
        </a>
      </nav>

      <div>
        <Link to="/login" className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm flex items-center" >
        <span className="mr-2">
            <img src={CalenderVector} alt="CalenderVector" />
          </span>
          Login to your portal
        </Link> 
      </div>
      </div>
    </header>
  );
}

export default Sidebar;
