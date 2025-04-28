import React, { useState } from 'react';
import { BarChart3, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <BarChart3 size={32} className="text-blue-400 mr-2" />
              <span className="text-xl font-bold">InvestinMaster</span>
            </div>
            <p className="text-gray-400 mb-4">
              {t('footer.description')}
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2">
              <li>
                <button 
                  onClick={() => scrollToSection('accueil')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.home')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('fonctionnalites')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.features')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('avis')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.reviews')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('faq')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.faq')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection('contact')} 
                  className="text-gray-400 hover:text-white transition-colors duration-300"
                >
                  {t('nav.contact')}
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-bold mb-4">{t('footer.legal')}</h3>
            <div className="space-y-4">
              <button 
                onClick={() => setShowPrivacyPolicy(true)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors duration-300 w-full text-left"
              >
                {t('footer.privacy')}
              </button>
              <button 
                onClick={() => setShowTerms(true)}
                className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-4 rounded transition-colors duration-300 w-full text-left"
              >
                {t('footer.terms')}
              </button>
            </div>
          </div>
        </div>
        
        <div className="pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} InvestinMaster. {t('footer.rights')}</p>
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacyPolicy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Privacy Policy</h2>
              <button 
                onClick={() => setShowPrivacyPolicy(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-xl font-bold mb-4">Who We Are</h3>
                <p>Our website address is: https://investinmaster.com.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Comments</h3>
                <p>When visitors leave comments on the site, we collect the data shown in the comments form, along with the visitor's IP address and browser user agent string to help with spam detection.</p>
                <p className="mt-2">An anonymized string (also called a hash) created from your email address may be provided to the Gravatar service to check if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After your comment is approved, your profile picture becomes visible to the public in the context of your comment.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Media</h3>
                <p>If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS). Visitors to the website can download and extract any location data from images on the website.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Cookies</h3>
                <p>If you leave a comment on our site, you may opt-in to saving your name, email address, and website in cookies. These are for your convenience, so you don't have to fill in your details again when you leave another comment. These cookies will last for one year.</p>
                <p className="mt-2">If you visit our login page, we will set a temporary cookie to determine if your browser accepts cookies. This cookie contains no personal data and is discarded when you close your browser.</p>
                <p className="mt-2">When you log in, we will also set up several cookies to save your login information and screen display preferences. Login cookies last for two days, and screen options cookies last for one year. If you select "Remember Me", your login will persist for two weeks. If you log out of your account, the login cookies will be removed.</p>
                <p className="mt-2">If you edit or publish an article, an additional cookie will be saved in your browser. This cookie includes no personal data and simply indicates the post ID of the article you just edited. It expires after 1 day.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Embedded Content from Other Websites</h3>
                <p>Articles on this site may include embedded content (e.g. videos, images, articles, etc.). Embedded content from other websites behaves in the exact same way as if the visitor has visited the other website.</p>
                <p className="mt-2">These websites may collect data about you, use cookies, embed additional third-party tracking, and monitor your interaction with that embedded content, including tracking your interaction if you have an account and are logged in to that website.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Who We Share Your Data With</h3>
                <p>If you request a password reset, your IP address will be included in the reset email.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">How Long We Retain Your Data</h3>
                <p>If you leave a comment, the comment and its metadata are retained indefinitely. This is so we can recognize and approve follow-up comments automatically instead of holding them in a moderation queue.</p>
                <p className="mt-2">For users that register on our website (if applicable), we also store the personal information they provide in their user profile. All users can see, edit, or delete their personal information at any time (except they cannot change their username). Website administrators can also view and edit that information.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">What Rights You Have Over Your Data</h3>
                <p>If you have an account on this site, or have left comments, you can request to receive an exported file of the personal data we hold about you, including any data you have provided to us. You can also request that we erase any personal data we hold about you. This does not include any data we are obliged to keep for administrative, legal, or security purposes.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">Where Your Data is Sent</h3>
                <p>Visitor comments may be checked through an automated spam detection service.</p>
              </section>
            </div>
          </div>
        </div>
      )}

      {/* Terms and Conditions Modal */}
      {showTerms && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-gray-900 rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold">Terms and Conditions</h2>
              <button 
                onClick={() => setShowTerms(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <section>
                <h3 className="text-xl font-bold mb-4">1. Introduction</h3>
                <div className="space-y-2">
                  <p>1.1 Welcome to investinmaster.com (the "Site"). Our primary contact email is support@investinmaster.com.</p>
                  <p>1.2 Our Site provides information about third-party trading platforms ("Third-Party Platforms") and related services (the "Services").</p>
                  <p>1.3 The following Terms of Use ("Terms") govern your ("You", "Your", or "User") usage of our Site and Services.</p>
                  <p>1.4 Our Privacy Policy is an integral part of these Terms.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">2. Eligibility</h3>
                <p>You may use the Site and Services if you:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Are at least 18 years of age;</li>
                  <li>Possess the right, authority, and capacity to enter into these Terms and comply with them;</li>
                  <li>Are not legally restricted from using our Site and Services under your local laws.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">3. Restricted Areas</h3>
                <div className="space-y-2">
                  <p>3.1 We may restrict access to our Site and Services in certain territories or to certain users if we deem it necessary for legal, regulatory, or risk management purposes.</p>
                  <p>3.2 Additional requirements or conditions may apply for users from specific countries.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">4. Prohibited Activities</h3>
                <p>4.1 When using our Site and Services, you must not engage in activities that:</p>
                <ul className="list-disc ml-6 mt-2 space-y-2">
                  <li>Violate any rights, including intellectual property rights, privacy rights, or any other rights;</li>
                  <li>Contain harmful, insulting, defamatory, racist, or inappropriate content;</li>
                  <li>Involve the use of viruses or other harmful software;</li>
                  <li>Violate any laws;</li>
                  <li>Infringe on the usage of the Site or Services by other Users.</li>
                </ul>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">5. Intellectual Property Rights</h3>
                <div className="space-y-2">
                  <p>5.1 All content on our Site, including text, graphics, logos, and software, is our property or the property of our licensors and is protected by intellectual property laws.</p>
                  <p>5.2 Your use of our Site and Services grants you no rights in relation to our intellectual property rights or the intellectual property of third parties.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">6. Limitation of Liability</h3>
                <div className="space-y-2">
                  <p>6.1 The Site and Services are provided on an "as is" and "as available" basis.</p>
                  <p>6.2 In no event will we be liable for any loss or damage, including without limitation, indirect or consequential loss or damage, arising out of or in connection with the use of our Site or Services.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">7. Third-Party Services or Content</h3>
                <p>7.1 Our Services may include content or services provided by third parties. We do not control, endorse, or assume responsibility for such content or services.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">8. Links to Other Websites</h3>
                <p>8.1 Our Site may contain links to third-party websites. These links are provided for your convenience. We have no control over the content of those sites or resources, and we are not responsible for them.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">9. Changes to These Terms</h3>
                <div className="space-y-2">
                  <p>9.1 We reserve the right to change these Terms at any time. We will notify you of any changes by posting the new Terms on this page.</p>
                  <p>9.2 You are advised to review these Terms periodically for any changes.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">10. Termination</h3>
                <p>10.1 We may terminate or suspend your access to our Site and Services immediately, without prior notice or liability, for any reason whatsoever, including, without limitation, if you breach these Terms.</p>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">11. Governing Law and Jurisdiction</h3>
                <div className="space-y-2">
                  <p>11.1 These Terms will be governed by and construed in accordance with the laws of the jurisdiction in which our company is located, without regard to its conflict of law provisions.</p>
                  <p>11.2 You agree to submit to the exclusive jurisdiction of the courts located within the jurisdiction of our company.</p>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-bold mb-4">12. Contact Us</h3>
                <p>12.1 If you have any questions about these Terms, please contact us at support@investinmaster.com.</p>
              </section>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;