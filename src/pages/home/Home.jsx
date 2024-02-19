import React from "react";
import TrendingDestination from "../../components/home/TrendingDestination";
import HeroSection from "../../components/home/HeroSection";
import Navbar from "../../components/common/Navbar";
import Footer from "../../components/common/Footer";
import DestinationCategory from "../../components/home/DestinationCategory";
import ArrivalDestination from "../../components/home/ArrivalDestination";
import TrialRoom from "../../components/home/TrialRoom";
import TestomonialContainer from "../../components/home/TestomonialContainer";
import DiscoverPlaces from "../../components/home/DiscoverPlaces";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <TrendingDestination />
      <DestinationCategory />
      <ArrivalDestination />
      <TrialRoom />
      <TestomonialContainer />
      <DiscoverPlaces />
      <Footer />
    </div>
  );
};

export default Home;
