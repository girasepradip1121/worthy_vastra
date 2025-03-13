import React from "react";
import HeroSection from "../components/HeroSection";
import Features from "../components/Features";
import StartExploring from "../components/StartExploring";
import Recommendations from "../components/Recommendations";
import BestSellers from "../components/BestSellers";
import BannerSection from "../components/BannerSection";
// import Footer from "../components/Footer";
import Fivetype from "../components/Fivetype";


const Home = () => {
  return (
    <div>
      <HeroSection />
      <Fivetype/>
      <Features />
      <StartExploring />
      <Recommendations />
      <BannerSection /><br/>
      <BestSellers /> 
    </div>
  );
};

export default Home;
