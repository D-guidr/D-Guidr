import React from 'react';
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProductOverview from './components/ProductOverview';
import FeaturesShowcase from "./components/FeaturesShowcase";
import DSuiteSection from "./components/DSuiteSection";
import CommunitySection from "./components/CommunitySection";
import CTASection from "./components/CTASection";
import Footer from "./components/Footer";
import './index.css';


function Landing() {
  return (
      <div className="landing-page">
        <Navbar />
        <HeroSection />
        <ProductOverview />
        <FeaturesShowcase />
        <DSuiteSection />
        <CommunitySection />
        <CTASection />
        <Footer />
      </div>
  );
}

export default Landing;

