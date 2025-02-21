import Header from "../Components/Home/Header";
import PackageSection from "../Components/Home/Packages";
import FAQ from "../Components/Home/FAQ";
import Services from "../Components/Home/Services";

const Home = () => {
  return (
    <div>
      <Header />
      <Services />
      <PackageSection />
      <FAQ />
    </div>
  );
};

export default Home;
