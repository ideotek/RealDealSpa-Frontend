import React, { Suspense, lazy } from "react";
import Header from "../Components/Home/Header";
import PackageSection from "../Components/Home/Packages";
import FAQ from "../Components/Home/FAQ";
import Footer from "../Components/Footer";

const Services = lazy(() => import("../Components/Home/Services"));

const Home = () => {
  return (
    <div>
      <Header />
      <Services />
      <PackageSection />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Home;
