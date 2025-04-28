import React from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Introduction: React.FC = () => {
  const { t } = useLanguage();

  const scrollToNextSection = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="accueil" 
      className="min-h-screen flex flex-col justify-center items-center pt-20 pb-16 relative overflow-hidden bg-gradient-to-br from-blue-900 to-black"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-green-400 rounded-full mix-blend-multiply filter blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <div className="inline-flex items-center bg-green-500/20 backdrop-blur-sm px-4 py-2 rounded-full mb-8">
          <TrendingUp size={20} className="text-green-400 mr-2" />
          <span className="text-green-400 font-medium">93% Success Rate in Live Trading</span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 animate-fadeIn leading-tight">
          {t('intro.title')}
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-12 animate-fadeInDelay">
          {t('intro.subtitle')}
        </p>
        <button 
          onClick={scrollToNextSection}
          className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-lg"
        >
          {t('intro.cta')}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-green-400 mb-2">99%</div>
            <div className="text-gray-300">Accuracy Rate</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-blue-400 mb-2">$2.1M</div>
            <div className="text-gray-300">Profit Generated</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
            <div className="text-4xl font-bold text-purple-400 mb-2">5,000+</div>
            <div className="text-gray-300">Active Users</div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown size={32} className="text-gray-400" />
      </div>
    </section>
  );
};

export default Introduction;