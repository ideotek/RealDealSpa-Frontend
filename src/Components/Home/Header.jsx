import HomeHeader from "../../assets/HomeHeader.png";
import CalenderVector from "../../assets/CalenderVector.png";
import Navbar from "../../Components/Navbar";

const Header = () => {
  return (
    <div className="w-full bg-gradient-to-r from-white via-red-100 to-white flex flex-col items-center justify-center">
        <Navbar/>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:flex-row items-center">
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Highly Professional SPA
          </p>
          <h1 className="mt-4 text-4xl lg:text-6xl font-bold text-gray-800 leading-tight">
            Rejuvenate <span className="text-red-500">YOUR</span> <br />
            <span className="text-red-500">BODY AND MIND</span>
          </h1>
          <p className="mt-4 text-gray-600 text-lg">
            Rejuvenate your mind and body by embracing mindful practices,
            regular exercise, and nourishing self-care to restore energy and
            vitality.
          </p>
          <button className="mt-6 px-6 py-3 bg-red-500 text-white text-sm font-medium rounded-md flex items-center hover:bg-red-600 transition duration-300">
            Login to your portal
            <img src={CalenderVector} alt="Calendar Icon" className="ml-3 w-5 h-5" />
          </button>
        </div>

        <div className="lg:w-1/2 mt-10 lg:mt-0 flex justify-center">
          <img
            src={HomeHeader}
            alt="Helping Elderly"
            className="w-full max-w-md lg:max-w-lg"
          />
        </div>
      </div>
      <div className="w-full h-5 bg-red-500">

      </div>
    </div>
  );
};

export default Header;
