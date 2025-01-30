import React from 'react';
import HeroSection from '../components/HeroSection/HeroSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import ProcessSection from '../components/ProcessSection/ProcessSection';
import ContactSection from '../components/ContactSection/ContactSection';
import AboutSection from '../components/AboutSection/AboutSection';
import BlogsSection from '../components/BlogsSection/BlogsSection';
import PricingSection from '../components/PricingSection/PricingSection';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <PricingSection />
      <AboutSection />
      <BlogsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Home;