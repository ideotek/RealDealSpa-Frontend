import Logo from "../assets/Logo.png";
import Playstore from "../assets/svg/Playstore.svg";
import Appstore from "../assets/svg/Appstore.svg";
const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo Section */}
        <div className="flex flex-col items-start">
          <img
            src={Logo}
            alt="Logo"
            className="w-[10rem] mb-2"
          />
        </div>

        {/* Services Section */}
        <div>
          <h3 className="text-red-600 font-semibold mb-4">SERVICES</h3>
          <ul className="space-y-2 text-gray-600">
            <li>Cryotherapy</li>
            <li>Red Light Therapy</li>
            <li>Halotherapy</li>
            <li>Infrared Sauna</li>
            <li>Compression Therapy</li>
            <li>Massage Chairs</li>
          </ul>
        </div>

        {/* Help Center Section */}
        <div>
          <h3 className="text-red-600 font-semibold mb-4">HELP CENTER</h3>
          <ul className="space-y-2 text-gray-600">
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Pricing</li>
          </ul>
        </div>

        {/* Download Section */}
        <div>
          <h3 className="text-red-600 font-semibold mb-4">Download</h3>
          <p className="text-gray-600 mb-4">Your Health at Your Fingertips: Download Our App</p>
          <div className="flex space-x-4">
            <img
              src={Playstore}
              alt="Download on the App Store"
              className="h-10"
            />
            <img
              src={Appstore}
              alt="Get it on Google Play"
              className="h-10"
            />
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 mt-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm text-center md:text-left">
            Copyright ©2024 REAL DEAL WELLNESS. All Rights Reserved. Designed and Developed by IDEOTEK INNOVATIONS
          </p>
          <div className="flex space-x-4 text-gray-600 text-sm mt-4 md:mt-0">
            <a href="#" className="hover:text-gray-800">Terms & Conditions</a>
            <a href="#" className="hover:text-gray-800">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
