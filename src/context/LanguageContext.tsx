import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'es';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, params?: Record<string, any>) => string;
}

const translations = {
  en: {
    // Header
    'nav.home': 'Home',
    'nav.features': 'Features',
    'nav.reviews': 'Reviews',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contact',
    
    // Introduction
    'intro.title': 'The AI Trading Tool That Beats 99% of Traders',
    'intro.subtitle': 'Access our exclusive AI-powered trading system that has generated over $2.1M in profits. Limited spots available.',
    'intro.cta': 'Request Access Now',
    
    // Contact Form
    'contact.title': 'Request Exclusive Access',
    'contact.subtitle': 'Fill out the form below to apply for access to our advanced trading system.',
    'contact.firstName': 'First Name',
    'contact.lastName': 'Last Name',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.submit': 'Submit Application',
    'contact.sending': 'Processing...',
    'contact.success.title': 'Application Received!',
    'contact.success.message': 'We\'ll review your application and contact you within 24 hours.',
    'contact.success.newMessage': 'Submit Another Application',
    'contact.error.required': 'This field is required',
    'contact.error.phone': 'Invalid phone format',
    'contact.error.email': 'Invalid email format',
    
    // Text Section
    'why.title': 'Why Access is Restricted',
    'why.paragraph1': 'Our AI trading system has demonstrated such exceptional performance that we had to implement strict access controls. With a 93% accuracy rate in live trading conditions, unrestricted access could impact market dynamics and reduce effectiveness for existing users.',
    'why.paragraph2': 'We carefully review each application to ensure new users meet our criteria and maintain the system\'s performance. This exclusive approach has helped our community achieve consistent profits while protecting the integrity of our trading signals.',
    
    // Feature Cards
    'features.title': 'Advanced Trading Features',
    'features.subtitle': 'Discover the powerful tools that give our traders a significant edge in the market.',
    'features.analysis.title': 'AI Market Analysis',
    'features.analysis.description': 'Real-time market analysis powered by our proprietary AI algorithms.',
    'features.security.title': 'Risk Management',
    'features.security.description': 'Advanced risk management systems to protect your capital.',
    'features.performance.title': '93% Success Rate',
    'features.performance.description': 'Proven track record of successful trades in live market conditions.',
    'features.collaboration.title': 'Expert Support',
    'features.collaboration.description': 'Access to our team of professional traders and analysts.',
    
    // Performance Graphs
    'performance.title': 'Verified Performance',
    'performance.subtitle': 'Our system\'s performance has been independently verified by leading financial institutions.',
    'performance.efficiency': 'Signal Accuracy',
    'performance.productivity': 'Win Rate',
    'performance.satisfaction': 'User Satisfaction',
    'performance.roi': 'Average ROI',
    'performance.accuracy': 'Trade Accuracy',
    'performance.reliability': 'System Reliability',
    'performance.speed': 'Execution Speed',
    
    // Testimonials
    'testimonials.title': 'Success Stories',
    'testimonials.subtitle': 'Hear from traders who have transformed their results using our AI system.',
    'testimonials.1.name': 'James Wilson',
    'testimonials.1.position': 'Professional Trader',
    'testimonials.1.comment': 'The accuracy of the trading signals is unlike anything I\'ve seen before. My win rate has increased dramatically.',
    'testimonials.2.name': 'Sarah Chen',
    'testimonials.2.position': 'Hedge Fund Manager',
    'testimonials.2.comment': 'This AI system has given us a significant edge in the market. The results speak for themselves.',
    'testimonials.3.name': 'Michael Rodriguez',
    'testimonials.3.position': 'Day Trader',
    'testimonials.3.comment': 'I was skeptical at first, but the consistent profits have made me a believer. This is a game-changer.',
    'testimonials.4.name': 'Emma Thompson',
    'testimonials.4.position': 'Investment Advisor',
    'testimonials.4.comment': 'My clients\' portfolios have seen remarkable growth since I started using these AI signals.',
    'testimonials.5.name': 'David Park',
    'testimonials.5.position': 'Retail Trader',
    'testimonials.5.comment': 'Finally found a trading system that actually delivers on its promises. The results are incredible.',
    
    // FAQ
    'faq.title': 'Frequently Asked Questions',
    'faq.subtitle': 'Get answers to common questions about our AI trading system.',
    'faq.questions.how.question': 'How does the AI trading system work?',
    'faq.questions.how.answer': 'Our proprietary AI algorithms analyze millions of data points across multiple markets to identify high-probability trading opportunities. The system has been trained on over 10 years of historical data and continues to learn from live market conditions.',
    'faq.questions.cost.question': 'What are the subscription fees?',
    'faq.questions.cost.answer': 'Access to our AI trading system is available through different membership tiers, starting at $997/month. Enterprise solutions are available for institutional clients.',
    'faq.questions.trial.question': 'Can I test the system before committing?',
    'faq.questions.trial.answer': 'Due to the exclusive nature of our system and limited spots, we don\'t offer free trials. However, we provide a 30-day money-back guarantee for all new members.',
    'faq.questions.data.question': 'What is the minimum capital required?',
    'faq.questions.data.answer': 'We recommend a minimum trading capital of $25,000 to fully utilize our system\'s capabilities. This ensures you can properly manage risk and take advantage of all trading opportunities.',
    'faq.questions.support.question': 'What kind of support is provided?',
    'faq.questions.support.answer': 'Members receive 24/7 access to our trading desk, weekly strategy calls, and personal guidance from our team of professional traders.',
    'faq.questions.cancel.question': 'What is your cancellation policy?',
    'faq.questions.cancel.answer': 'You can cancel your membership at any time. We offer a 30-day money-back guarantee for new members who aren\'t satisfied with our service.',
    
    // Footer
    'footer.description': 'Join the elite group of traders using AI to achieve consistent profits in the financial markets.',
    'footer.navigation': 'Navigation',
    'footer.legal': 'Legal',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms and Conditions',
    'footer.rights': 'All rights reserved.',

    // Urgency Section
    'urgency.tag': 'Limited Availability',
    'urgency.title': 'Only 262 Spots Remaining',
    'urgency.subtitle': 'Due to unprecedented demand and to maintain system performance, we\'re limiting new memberships.',
    'urgency.countdown.title': 'Application window closes in:',
    'urgency.countdown.days': 'Days',
    'urgency.countdown.hours': 'Hours',
    'urgency.countdown.minutes': 'Minutes',
    'urgency.countdown.seconds': 'Seconds',
    'urgency.spots.title': 'Limited Spots',
    'urgency.spots.remaining': 'spots remaining out of ${total}',
    'urgency.cta': 'Apply Now'
  },
  es: {
    // Header
    'nav.home': 'Inicio',
    'nav.features': 'Características',
    'nav.reviews': 'Reseñas',
    'nav.faq': 'FAQ',
    'nav.contact': 'Contacto',
    
    // Introduction
    'intro.title': 'La Herramienta de Trading con IA que Supera al 99% de los Traders',
    'intro.subtitle': 'Accede a nuestro sistema exclusivo de trading impulsado por IA que ha generado más de $2.1M en ganancias. Cupos limitados.',
    'intro.cta': 'Solicitar Acceso',
    
    // Contact Form
    'contact.title': 'Solicitar Acceso Exclusivo',
    'contact.subtitle': 'Complete el formulario para solicitar acceso a nuestro sistema avanzado de trading.',
    'contact.firstName': 'Nombre',
    'contact.lastName': 'Apellido',
    'contact.phone': 'Teléfono',
    'contact.email': 'Correo',
    'contact.submit': 'Enviar Solicitud',
    'contact.sending': 'Procesando...',
    'contact.success.title': '¡Solicitud Recibida!',
    'contact.success.message': 'Revisaremos su solicitud y lo contactaremos dentro de 24 horas.',
    'contact.success.newMessage': 'Enviar Otra Solicitud',
    'contact.error.required': 'Este campo es obligatorio',
    'contact.error.phone': 'Formato de teléfono inválido',
    'contact.error.email': 'Formato de correo inválido',
    
    // Text Section
    'why.title': '¿Por Qué el Acceso es Restringido?',
    'why.paragraph1': 'Nuestro sistema de trading con IA ha demostrado un rendimiento tan excepcional que tuvimos que implementar controles estrictos de acceso. Con una tasa de precisión del 93% en condiciones de trading en vivo, el acceso sin restricciones podría impactar la dinámica del mercado y reducir la efectividad para los usuarios existentes.',
    'why.paragraph2': 'Revisamos cuidadosamente cada solicitud para asegurar que los nuevos usuarios cumplan con nuestros criterios y mantener el rendimiento del sistema. Este enfoque exclusivo ha ayudado a nuestra comunidad a lograr ganancias consistentes mientras protegemos la integridad de nuestras señales de trading.',
    
    // Feature Cards
    'features.title': 'Características Avanzadas de Trading',
    'features.subtitle': 'Descubre las poderosas herramientas que dan a nuestros traders una ventaja significativa en el mercado.',
    'features.analysis.title': 'Análisis de Mercado IA',
    'features.analysis.description': 'Análisis de mercado en tiempo real impulsado por nuestros algoritmos de IA propietarios.',
    'features.security.title': 'Gestión de Riesgos',
    'features.security.description': 'Sistemas avanzados de gestión de riesgos para proteger tu capital.',
    'features.performance.title': '93% de Éxito',
    'features.performance.description': 'Historial probado de operaciones exitosas en condiciones de mercado real.',
    'features.collaboration.title': 'Soporte Experto',
    'features.collaboration.description': 'Acceso a nuestro equipo de traders y analistas profesionales.',
    
    // Performance Graphs
    'performance.title': 'Rendimiento Verificado',
    'performance.subtitle': 'Nuestro sistema ha sido verificado independientemente por instituciones financieras líderes.',
    'performance.efficiency': 'Precisión de Señales',
    'performance.productivity': 'Tasa de Éxito',
    'performance.satisfaction': 'Satisfacción',
    'performance.roi': 'ROI Promedio',
    'performance.accuracy': 'Precisión',
    'performance.reliability': 'Fiabilidad',
    'performance.speed': 'Velocidad',
    
    // Testimonials
    'testimonials.title': 'Historias de Éxito',
    'testimonials.subtitle': 'Escucha a los traders que han transformado sus resultados usando nuestro sistema de IA.',
    'testimonials.1.name': 'Jaime Wilson',
    'testimonials.1.position': 'Trader Profesional',
    'testimonials.1.comment': 'La precisión de las señales de trading es incomparable. Mi tasa de éxito ha aumentado dramáticamente.',
    'testimonials.2.name': 'Sara Chen',
    'testimonials.2.position': 'Gerente de Fondo de Inversión',
    'testimonials.2.comment': 'Este sistema de IA nos ha dado una ventaja significativa en el mercado. Los resultados hablan por sí mismos.',
    'testimonials.3.name': 'Miguel Rodríguez',
    'testimonials.3.position': 'Day Trader',
    'testimonials.3.comment': 'Era escéptico al principio, pero las ganancias consistentes me han convertido en un creyente. Esto es revolucionario.',
    'testimonials.4.name': 'Emma Thompson',
    'testimonials.4.position': 'Asesora de Inversiones',
    'testimonials.4.comment': 'Las carteras de mis clientes han visto un crecimiento notable desde que comencé a usar estas señales de IA.',
    'testimonials.5.name': 'David Park',
    'testimonials.5.position': 'Trader Minorista',
    'testimonials.5.comment': 'Finalmente encontré un sistema de trading que cumple sus promesas. Los resultados son increíbles.',
    
    // FAQ
    'faq.title': 'Preguntas Frecuentes',
    'faq.subtitle': 'Obtén respuestas a las preguntas comunes sobre nuestro sistema de trading con IA.',
    'faq.questions.how.question': '¿Cómo funciona el sistema de trading con IA?',
    'faq.questions.how.answer': 'Nuestros algoritmos de IA analizan millones de datos en múltiples mercados para identificar oportunidades de trading de alta probabilidad. El sistema ha sido entrenado con más de 10 años de datos históricos y continúa aprendiendo de las condiciones del mercado en vivo.',
    'faq.questions.cost.question': '¿Cuáles son las tarifas de suscripción?',
    'faq.questions.cost.answer': 'El acceso a nuestro sistema de trading con IA está disponible a través de diferentes niveles de membresía, comenzando en $997/mes. Soluciones empresariales disponibles para clientes institucionales.',
    'faq.questions.trial.question': '¿Puedo probar el sistema antes de comprometerme?',
    'faq.questions.trial.answer': 'Debido a la naturaleza exclusiva de nuestro sistema y los cupos limitados, no ofrecemos pruebas gratuitas. Sin embargo, proporcionamos una garantía de devolución de dinero de 30 días para todos los nuevos miembros.',
    'faq.questions.data.question': '¿Cuál es el capital mínimo requerido?',
    'faq.questions.data.answer': 'Recomendamos un capital mínimo de trading de $25,000 para utilizar completamente las capacidades de nuestro sistema. Esto asegura que puedas gestionar adecuadamente el riesgo y aprovechar todas las oportunidades de trading.',
    'faq.questions.support.question': '¿Qué tipo de soporte se proporciona?',
    'faq.questions.support.answer': 'Los miembros reciben acceso 24/7 a nuestra mesa de trading, llamadas semanales de estrategia y orientación personal de nuestro equipo de traders profesionales.',
    'faq.questions.cancel.question': '¿Cuál es su política de cancelación?',
    'faq.questions.cancel.answer': 'Puedes cancelar tu membresía en cualquier momento. Ofrecemos una garantía de devolución de dinero de 30 días para nuevos miembros que no estén satisfechos con nuestro servicio.',
    
    // Footer
    'footer.description': 'Únete al grupo élite de traders que utilizan IA para lograr ganancias consistentes en los mercados financieros.',
    'footer.navigation': 'Navegación',
    'footer.legal': 'Legal',
    'footer.privacy': 'Política de Privacidad',
    'footer.terms': 'Términos y Condiciones',
    'footer.rights': 'Todos los derechos reservados.',

    // Urgency Section
    'urgency.tag': 'Disponibilidad Limitada',
    'urgency.title': 'Solo 262 Cupos Restantes',
    'urgency.subtitle': 'Debido a una demanda sin precedentes y para mantener el rendimiento del sistema, estamos limitando las nuevas membresías.',
    'urgency.countdown.title': 'La ventana de solicitud cierra en:',
    'urgency.countdown.days': 'Días',
    'urgency.countdown.hours': 'Horas',
    'urgency.countdown.minutes': 'Minutos',
    'urgency.countdown.seconds': 'Segundos',
    'urgency.spots.title': 'Cupos Limitados',
    'urgency.spots.remaining': 'cupos restantes de ${total}',
    'urgency.cta': 'Solicitar Ahora'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (key: string, params?: Record<string, any>): string => {
    let translation = translations[language][key] || key;
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        translation = translation.replace(`\${${key}}`, value.toString());
      });
    }
    
    return translation;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};