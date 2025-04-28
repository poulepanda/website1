import React, { useState, useEffect } from 'react';
import { Clock, AlertCircle, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const UrgencySection: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const { t } = useLanguage();
  const totalSpots = 2000;
  const remainingSpots = 262;
  
  useEffect(() => {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 7);
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const padZero = (num: number): string => {
    return num.toString().padStart(2, '0');
  };

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-red-600 to-orange-500 text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-red-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center mb-6 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
            <AlertCircle size={20} className="mr-2 animate-pulse" />
            <span className="font-medium">{t('urgency.tag')}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            {t('urgency.title')}
          </h2>
          
          <p className="text-xl md:text-2xl mb-10 text-white/90">
            {t('urgency.subtitle')}
          </p>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-16">
              <div>
                <div className="flex justify-center items-center mb-4">
                  <Clock size={24} className="mr-2" />
                  <span className="text-lg font-medium">{t('urgency.countdown.title')}</span>
                </div>
                
                <div className="flex justify-center space-x-4 md:space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-red-600 w-16 h-16 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold mb-2">
                      {padZero(timeLeft.days)}
                    </div>
                    <span className="text-sm">{t('urgency.countdown.days')}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-red-600 w-16 h-16 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold mb-2">
                      {padZero(timeLeft.hours)}
                    </div>
                    <span className="text-sm">{t('urgency.countdown.hours')}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-red-600 w-16 h-16 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold mb-2">
                      {padZero(timeLeft.minutes)}
                    </div>
                    <span className="text-sm">{t('urgency.countdown.minutes')}</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="bg-white text-red-600 w-16 h-16 rounded-lg flex items-center justify-center text-2xl md:text-3xl font-bold mb-2 animate-pulse">
                      {padZero(timeLeft.seconds)}
                    </div>
                    <span className="text-sm">{t('urgency.countdown.seconds')}</span>
                  </div>
                </div>
              </div>

              <div className="h-px md:h-32 w-full md:w-px bg-white/20"></div>

              <div>
                <div className="flex justify-center items-center mb-4">
                  <Users size={24} className="mr-2" />
                  <span className="text-lg font-medium">{t('urgency.spots.title')}</span>
                </div>
                <div className="bg-white text-red-600 px-6 py-4 rounded-lg text-center">
                  <div className="text-3xl font-bold mb-1">{remainingSpots}</div>
                  <div className="text-sm">{t('urgency.spots.remaining', { total: totalSpots })}</div>
                </div>
              </div>
            </div>
          </div>
          
          <button 
            onClick={scrollToContact}
            className="bg-white text-red-600 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl animate-bounce animation-delay-1000"
          >
            {t('urgency.cta')}
          </button>
        </div>
      </div>
    </section>
  );
};

export default UrgencySection;