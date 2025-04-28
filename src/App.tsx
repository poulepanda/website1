import React from 'react';
import Header from './components/Header';
import Introduction from './components/Introduction';
import ContactForm from './components/ContactForm';
import TextSection from './components/TextSection';
import FeatureCards from './components/FeatureCards';
import PerformanceGraphs from './components/PerformanceGraphs';
import TestimonialCarousel from './components/TestimonialCarousel';
import UrgencySection from './components/UrgencySection';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <div className="font-['Montserrat'] text-gray-900 bg-white">
        <Header />
        <Introduction />
        <ContactForm />
        <TextSection />
        <FeatureCards />
        <PerformanceGraphs />
        <TestimonialCarousel />
        <UrgencySection />
        <FAQ />
        <Footer />
      </div>
    </LanguageProvider>
  );
}

export default App;