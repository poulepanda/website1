import React, { useState } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

interface FormData {
  fname: string;
  lname: string;
  phonePrefix: string;
  phoneNumber: string;
  email: string;
}

interface FormErrors {
  fname?: string;
  lname?: string;
  phoneNumber?: string;
  email?: string;
}

const ContactForm: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    fname: '',
    lname: '',
    phonePrefix: '+1',
    phoneNumber: '',
    email: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPrefixes, setShowPrefixes] = useState(false);

  const phonePrefixes = [
    { code: '+1', label: 'USA/Canada (+1)' },
    { code: '+33', label: 'France (+33)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+49', label: 'Germany (+49)' },
    { code: '+34', label: 'Spain (+34)' },
    { code: '+39', label: 'Italy (+39)' },
    { code: '+81', label: 'Japan (+81)' },
    { code: '+86', label: 'China (+86)' },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.fname.trim()) {
      newErrors.fname = t('contact.error.required');
    }
    
    if (!formData.lname.trim()) {
      newErrors.lname = t('contact.error.required');
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = t('contact.error.required');
    } else if (!/^\d{6,}$/.test(formData.phoneNumber.replace(/\s/g, ''))) {
      newErrors.phoneNumber = t('contact.error.phone');
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.error.required');
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.error.email');
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsLoading(true);
      
      try {
        const { error } = await supabase
          .from('Master_users_form')
          .insert([
            {
              fname: formData.fname,
              lname: formData.lname,
              phone: `${formData.phonePrefix}${formData.phoneNumber}`,
              email: formData.email,
              created_at: new Date().toISOString()
            }
          ]);

        if (error) throw error;
        
        setIsSubmitted(true);
      } catch (error) {
        console.error('Error submitting form:', error);
        alert('An error occurred while submitting the form. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePrefixSelect = (prefix: string) => {
    setFormData(prev => ({ ...prev, phonePrefix: prefix }));
    setShowPrefixes(false);
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800">
              {t('contact.title')}
            </h2>
            <p className="text-gray-600">
              {t('contact.subtitle')}
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="bg-white border-2 border-green-500 rounded-2xl p-8 text-center animate-fadeIn shadow-2xl">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {t('contact.success.title')}
              </h3>
              <p className="text-gray-600 mb-6">
                {t('contact.success.message')}
              </p>
              <button 
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ fname: '', lname: '', phonePrefix: '+1', phoneNumber: '', email: '' });
                }}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {t('contact.success.newMessage')}
              </button>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300 border border-gray-100 hover:shadow-3xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label htmlFor="fname" className="block text-gray-700 font-medium mb-2">
                    {t('contact.firstName')}
                  </label>
                  <input
                    type="text"
                    id="fname"
                    name="fname"
                    value={formData.fname}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.fname ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                    placeholder={t('contact.firstName')}
                  />
                  {errors.fname && <p className="text-red-500 text-sm mt-1">{errors.fname}</p>}
                </div>
                
                <div>
                  <label htmlFor="lname" className="block text-gray-700 font-medium mb-2">
                    {t('contact.lastName')}
                  </label>
                  <input
                    type="text"
                    id="lname"
                    name="lname"
                    value={formData.lname}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl border-2 ${errors.lname ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                    placeholder={t('contact.lastName')}
                  />
                  {errors.lname && <p className="text-red-500 text-sm mt-1">{errors.lname}</p>}
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="phoneNumber" className="block text-gray-700 font-medium mb-2">
                  {t('contact.phone')}
                </label>
                <div className="flex">
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setShowPrefixes(!showPrefixes)}
                      className="flex items-center justify-between w-32 px-4 py-3 border-2 border-gray-200 rounded-l-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300"
                    >
                      <span>{formData.phonePrefix}</span>
                      <ChevronDown size={16} className={`transition-transform duration-300 ${showPrefixes ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {showPrefixes && (
                      <div className="absolute top-full left-0 mt-1 w-48 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-10 max-h-48 overflow-y-auto">
                        {phonePrefixes.map((prefix) => (
                          <button
                            key={prefix.code}
                            type="button"
                            onClick={() => handlePrefixSelect(prefix.code)}
                            className="w-full text-left px-4 py-2 hover:bg-blue-50 transition-colors duration-300"
                          >
                            {prefix.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className={`flex-1 px-4 py-3 rounded-r-xl border-2 ${errors.phoneNumber ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                    placeholder="123456789"
                  />
                </div>
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              
              <div className="mb-8">
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl border-2 ${errors.email ? 'border-red-500' : 'border-gray-200'} focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300`}
                  placeholder={t('contact.email')}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
              </div>
              
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-2"></div>
                    {t('contact.sending')}
                  </div>
                ) : (
                  t('contact.submit')
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;