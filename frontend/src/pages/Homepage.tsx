import HeroSection from "../components/HomePage/HeroSection";
import FeaturedJobs from "../components/HomePage/FeaturedJobs";
import PopularCompanies from "../components/HomePage/PopularCompanies";
import HiringSection from "../components/HomePage/HiringSection";

const HomePage = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedJobs />
      <PopularCompanies />
      <HiringSection />
    </div>
  );
};

export default HomePage;
