import React, { useState, useEffect } from 'react';
import { Menu, X, TrendingUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface NavLink {
  title: string;
  href: string;
}

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const navLinks: NavLink[] = [
    { title: t('nav.home'), href: '#accueil' },
    { title: t('nav.features'), href: '#fonctionnalites' },
    { title: t('nav.reviews'), href: '#avis' },
    { title: t('nav.faq'), href: '#faq' },
    { title: t('nav.contact'), href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        <div className="flex items-center">
          <TrendingUp size={32} className={`${isScrolled ? 'text-blue-600' : 'text-white'} mr-2 transition-colors duration-300`} />
          <span className={`text-xl font-bold ${isScrolled ? 'text-gray-800' : 'text-white'} transition-colors duration-300`}>InvestinMaster</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a 
                  href={link.href} 
                  className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-blue-400 transition-colors duration-300 font-medium`}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={toggleLanguage}
            className={`${isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/10 text-white'} hover:bg-blue-600 hover:text-white rounded-full px-4 py-2 transition-colors duration-300`}
          >
            <span className="font-medium">{language.toUpperCase()}</span>
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleLanguage}
            className={`${isScrolled ? 'bg-gray-100 text-gray-800' : 'bg-white/10 text-white'} hover:bg-blue-600 hover:text-white rounded-full px-3 py-1 transition-colors duration-300`}
          >
            <span className="font-medium">{language.toUpperCase()}</span>
          </button>
          <button 
            className={isScrolled ? 'text-gray-800' : 'text-white'}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-sm w-full">
          <ul className="py-4 px-4 space-y-4">
            {navLinks.map((link) => (
              <li key={link.title}>
                <a 
                  href={link.href}
                  className="text-gray-800 hover:text-blue-600 block py-2 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;