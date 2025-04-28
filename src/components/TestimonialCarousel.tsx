import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface Testimonial {
  id: number;
  nameKey: string;
  positionKey: string;
  commentKey: string;
  rating: number;
  amount: string;
}

const TestimonialCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  const testimonials: Testimonial[] = [
    {
      id: 1,
      nameKey: 'testimonials.1.name',
      positionKey: 'testimonials.1.position',
      commentKey: 'testimonials.1.comment',
      rating: 5,
      amount: '$15,000'
    },
    {
      id: 2,
      nameKey: 'testimonials.2.name',
      positionKey: 'testimonials.2.position',
      commentKey: 'testimonials.2.comment',
      rating: 4,
      amount: '$8,500'
    },
    {
      id: 3,
      nameKey: 'testimonials.3.name',
      positionKey: 'testimonials.3.position',
      commentKey: 'testimonials.3.comment',
      rating: 5,
      amount: '$20,000'
    },
    {
      id: 4,
      nameKey: 'testimonials.4.name',
      positionKey: 'testimonials.4.position',
      commentKey: 'testimonials.4.comment',
      rating: 5,
      amount: '$12,800'
    },
    {
      id: 5,
      nameKey: 'testimonials.5.name',
      positionKey: 'testimonials.5.position',
      commentKey: 'testimonials.5.comment',
      rating: 4,
      amount: '$9,300'
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current && !isDragging) {
        const index = Math.round(containerRef.current.scrollLeft / containerRef.current.offsetWidth);
        setActiveIndex(index);
      }
    };

    containerRef.current?.addEventListener('scroll', handleScroll);
    return () => containerRef.current?.removeEventListener('scroll', handleScroll);
  }, [isDragging]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.pageX - (containerRef.current?.offsetLeft || 0));
    setScrollLeft(containerRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - (containerRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    if (containerRef.current) {
      containerRef.current.scrollLeft = scrollLeft - walk;
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      const index = Math.round(containerRef.current.scrollLeft / containerRef.current.offsetWidth);
      setActiveIndex(index);
      scrollToTestimonial(index);
    }
  };

  const scrollToTestimonial = (index: number) => {
    if (containerRef.current) {
      const scrollAmount = index * containerRef.current.offsetWidth;
      containerRef.current.scrollTo({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const nextTestimonial = () => {
    const newIndex = Math.min(activeIndex + 1, testimonials.length - 1);
    setActiveIndex(newIndex);
    scrollToTestimonial(newIndex);
  };

  const prevTestimonial = () => {
    const newIndex = Math.max(activeIndex - 1, 0);
    setActiveIndex(newIndex);
    scrollToTestimonial(newIndex);
  };

  const renderStars = (rating: number) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
      />
    ));
  };

  return (
    <section id="avis" className="py-20 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </div>
        
        <div className="relative">
          <div 
            ref={containerRef}
            className="flex overflow-x-hidden scroll-smooth"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
          >
            {testimonials.map((testimonial) => (
              <div 
                key={testimonial.id}
                className="min-w-full p-4"
              >
                <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100 h-full flex flex-col">
                  <div className="mb-6">
                    <h3 className="text-lg font-bold text-gray-900">{t(testimonial.nameKey)}</h3>
                    <p className="text-gray-600">{t(testimonial.positionKey)}</p>
                  </div>
                  
                  <p className="text-gray-700 mb-6 flex-grow">"{t(testimonial.commentKey)}"</p>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex">
                      {renderStars(testimonial.rating)}
                    </div>
                    <div className="font-bold text-blue-600">
                      {testimonial.amount}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button 
            onClick={prevTestimonial}
            disabled={activeIndex === 0}
            className={`absolute top-1/2 left-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 transition-opacity duration-300 ${activeIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-100'}`}
          >
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <button 
            onClick={nextTestimonial}
            disabled={activeIndex === testimonials.length - 1}
            className={`absolute top-1/2 right-2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md z-10 transition-opacity duration-300 ${activeIndex === testimonials.length - 1 ? 'opacity-50 cursor-not-allowed' : 'opacity-100 hover:bg-gray-100'}`}
          >
            <ChevronRight size={24} className="text-gray-600" />
          </button>
          
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button 
                key={index}
                onClick={() => {
                  setActiveIndex(index);
                  scrollToTestimonial(index);
                }}
                className={`w-3 h-3 mx-1 rounded-full transition-all duration-300 ${activeIndex === index ? 'bg-blue-600 w-6' : 'bg-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;