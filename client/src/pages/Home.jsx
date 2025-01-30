import React from 'react';
import Header from '../components/Header/Header';
import HeroSection from '../components/HeroSection/HeroSection';
import ServicesSection from '../components/ServicesSection/ServicesSection';
import ProcessSection from '../components/ProcessSection/ProcessSection';
import AboutSection from '../components/AboutSection/AboutSection';
import PricingSection from '../components/PricingSection/PricingSection';
import BlogsSection from '../components/BlogsSection/BlogsSection';
import ContactSection from '../components/ContactSection/ContactSection';
import Footer from '../components/Footer/Footer';

const Home = () => {
  return (
    <>
      <Header />
      <HeroSection />
      <ServicesSection />
      <ProcessSection />
      <AboutSection />
      <PricingSection />
      <BlogsSection />
      <ContactSection />
      <Footer />
    </>
  );
};

export default Home; 