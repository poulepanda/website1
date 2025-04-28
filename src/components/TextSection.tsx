import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TextSection: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            {t('why.title')}
          </h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">
            {t('why.paragraph1')}
          </p>
          <p className="text-gray-700 leading-relaxed text-lg">
            {t('why.paragraph2')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default TextSection;