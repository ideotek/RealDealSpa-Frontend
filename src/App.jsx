import { Suspense, lazy } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  useLocation,
} from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider, LoadingContext } from "./utils/commonAxios";
import Loader from "./Components/Common/Loader";
import Footer from './Components/Footer';
import React from 'react';

// Lazy load components
const Navbar = lazy(() => import("./Components/Navbar"));
const LoginPage = lazy(() => import("./Pages/LoginPage"));
const SignupPage = lazy(() => import("./Pages/SignupPage"));
const ProfilePage = lazy(() => import("./Pages/ProfilePage"));
const Home = lazy(() => import("./Pages/Home"));
const ServicePage = lazy(() => import("./Pages/ServicePage"));
const ServiceDetail = lazy(() => import("./Pages/ServiceDetail"));
const Packages = lazy(() => import("./Components/Home/Packages"));
const BookingHistoryPage = lazy(() => import("./Pages/BookingHistoryPage"));
const TermsandCondition = lazy(() => import("./Pages/TermsandCondition"));
const PrivacyPolicy = lazy(() => import("./Pages/PrivacyPolicy"));
const Contactus = lazy(() => import("./Pages/Contactus"));
const Aboutus = lazy(() => import("./Pages/Aboutus"));

// Add this new component
const ScrollToTop = () => {
  const location = useLocation();
  
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

const Layout = () => {
  const location = useLocation();

  return (
    <div className="app-layout">
      <Suspense fallback={<Loader />}>
        <ScrollToTop />
        <Navbar />
        <main className={location.pathname === '/' ? '' : 'mt-[5rem]'}>
          <Outlet />
        </main>
        <Footer />
      </Suspense>
    </div>
  );
};

const TOAST_CONFIG = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  newestOnTop: true,
  closeOnClick: true,
  rtl: false,
  pauseOnFocusLoss: true,
  draggable: true,
  pauseOnHover: true,
  theme: "light",
};

const App = () => (
  <LoadingProvider>
    <Router>
      <ToastContainer {...TOAST_CONFIG} />
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected routes */}
          <Route
            element={
              <PrivateRoute>
                <Layout />
              </PrivateRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/services" element={<ServicePage />} />
            <Route path="/services/:serviceID" element={<ServiceDetail />} />
            <Route path="/packages" element={<Packages />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/booking-history" element={<BookingHistoryPage />} />

          <Route path="/termsandcondition" element={<TermsandCondition />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/contactus" element={<Contactus />} />
          <Route path="/aboutus" element={<Aboutus />} />
          </Route>
        </Routes>
      </Suspense>
      
      <LoadingContext.Consumer>
        {({ loading }) => loading && <Loader />}
      </LoadingContext.Consumer>
    </Router>
  </LoadingProvider>
);

export default App;
