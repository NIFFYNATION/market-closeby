import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { helpCenterData } from '../data/helpCenterData';
import HelpSearchSection from './HelpSearchSection';

const HelpMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);

  const { helpCategories, mainFaqItems } = helpCenterData;

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8">
        {/* Help Section */}
        <HelpSearchSection
          title="How can we help you?"
          description="Welcome to Market CloseBy Help Center! Find answers to your questions or reach out to us for support."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          descriptionClassName="text-center text-text-grey mb-8 max-w-2xl mx-auto"
          searchContainerClassName="max-w-2xl mx-auto mb-12 md:mb-20"
        />

        {/* Help Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {helpCategories.map((category) => (
            <Link
              key={category.id}
              to={category.link}
              className="group bg-white rounded-lg p-6 shadow-lg hover:shadow-md hover:border-primary transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-opacity-10 rounded-lg flex items-center justify-center  group-hover:bg-opacity-100 transition-colors duration-300">
                    <img 
                      src={category.icon} 
                      alt={category.title} 
                      className="w-8 h-8  transition-all duration-300"
                    />
                  </div>
                </div>
                
                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-primary-light transition-colors duration-300">
                    {category.title}
                  </h3>
                  <p className="text-text-grey text-sm leading-relaxed group-hover:text-text-secondary transition-colors duration-300">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-4xl mx-auto mb-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-10">
          Frequently Asked Questions (FAQs)
        </h2>
        
        <div className="space-y-4">
          {mainFaqItems.map((faq) => (
            <div 
              key={faq.id} 
              className="bg-white rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(faq.id)}
                className="w-full px-6 py-4 text-left flex justify-between items-center focus:outline-none"
                aria-expanded={openFaqId === faq.id}
                aria-controls={`faq-content-${faq.id}`}
              >
                <span className="font-medium text-gray-800">{faq.question}</span>
                <img 
                  src="/icons/arrow-down.svg" 
                  alt="Toggle" 
                  className={`w-5 h-5 transition-transform duration-300 ${openFaqId === faq.id ? 'transform rotate-180' : ''}`}
                />
              </button>
              
              {openFaqId === faq.id && (
                <div 
                  id={`faq-content-${faq.id}`}
                  className="px-6 py-4 border-t border-gray-100"
                >
                 {typeof faq.answer === 'object' && faq.answer.contactMethods ? (
                          <div>
                            <div className="">
                              {faq.answer.contactMethods.map((method, index) => (
                                <div key={index} className="flex gap-4 py-2">
                                    <img src={method.icon} alt={method.title} className="w-4 h-6" />
                                  <p className="text-sm text-gray-600">{method.title}: {method.details}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                        )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HelpMain;
