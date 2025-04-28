import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface FAQItem {
  questionKey: string;
  answerKey: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { t } = useLanguage();

  const faqItems: FAQItem[] = [
    {
      questionKey: 'faq.questions.how.question',
      answerKey: 'faq.questions.how.answer'
    },
    {
      questionKey: 'faq.questions.cost.question',
      answerKey: 'faq.questions.cost.answer'
    },
    {
      questionKey: 'faq.questions.trial.question',
      answerKey: 'faq.questions.trial.answer'
    },
    {
      questionKey: 'faq.questions.data.question',
      answerKey: 'faq.questions.data.answer'
    },
    {
      questionKey: 'faq.questions.support.question',
      answerKey: 'faq.questions.support.answer'
    },
    {
      questionKey: 'faq.questions.cancel.question',
      answerKey: 'faq.questions.cancel.answer'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-300"
            >
              <button
                className="w-full flex justify-between items-center p-5 text-left"
                onClick={() => toggleAccordion(index)}
              >
                <h3 className="text-lg font-medium text-gray-900">{t(item.questionKey)}</h3>
                <div className="text-gray-500">
                  {openIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
              </button>
              
              <div 
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-5 pt-0 text-gray-700 border-t border-gray-100">
                  {t(item.answerKey)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;