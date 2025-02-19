import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
} from "react-router-dom";
import PrivateRoute from "./Auth/PrivateRoute";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LoadingProvider, LoadingContext } from "./utils/commonAxios";
import Loader from "./Components/Common/Loader";

import Navbar from "./Components/Navbar";
import LoginPage from "./Pages/LoginPage";
import SignupPage from "./Pages/SignupPage";
import ProfilePage from "./Pages/ProfilePage";

import Home from "./Pages/Home";
import ServicePage from "./Pages/ServicePage"
import ServiceDetail from "./Pages/ServiceDetail";
import Packages from "./Components/Home/Packages";
import BookingHistoryPage from "./Pages/BookingHistoryPage";
import AccountTermination from "./Pages/Termination";

const Layout = () => (
  <div className="app-layout">
    <Navbar />
    <main>
      <Outlet />
    </main>
  </div>
);

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
          <Route path="/account/termination" element={<AccountTermination />} />
        </Route>
      </Routes>
      
      <LoadingContext.Consumer>
        {({ loading }) => loading && <Loader />}
      </LoadingContext.Consumer>
    </Router>
  </LoadingProvider>
);

export default App;
