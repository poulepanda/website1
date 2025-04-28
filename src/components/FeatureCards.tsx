import React from 'react';
import { BarChart2, ShieldCheck, Zap, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FeatureCard {
  icon: React.ReactNode;
  titleKey: string;
  descriptionKey: string;
}

const FeatureCards: React.FC = () => {
  const { t } = useLanguage();

  const features: FeatureCard[] = [
    {
      icon: <BarChart2 size={36} className="text-blue-600 group-hover:text-white transition-colors duration-300" />,
      titleKey: 'features.analysis.title',
      descriptionKey: 'features.analysis.description'
    },
    {
      icon: <ShieldCheck size={36} className="text-blue-600 group-hover:text-white transition-colors duration-300" />,
      titleKey: 'features.security.title',
      descriptionKey: 'features.security.description'
    },
    {
      icon: <Zap size={36} className="text-blue-600 group-hover:text-white transition-colors duration-300" />,
      titleKey: 'features.performance.title',
      descriptionKey: 'features.performance.description'
    },
    {
      icon: <Users size={36} className="text-blue-600 group-hover:text-white transition-colors duration-300" />,
      titleKey: 'features.collaboration.title',
      descriptionKey: 'features.collaboration.description'
    },
  ];

  return (
    <section id="fonctionnalites" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('features.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('features.subtitle')}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white border border-gray-200 rounded-xl shadow-md p-6 transition-all duration-500 hover:bg-blue-600 hover:border-blue-700 hover:shadow-xl hover:-translate-y-2"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-white transition-colors duration-300">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600 group-hover:text-blue-50 transition-colors duration-300">
                {t(feature.descriptionKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;