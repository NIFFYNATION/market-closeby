import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';
import HelpContact from './HelpContact';
import HelpSearchSection from '../../components/helpCenter/HelpSearchSection';
import { helpCenterData } from '../../components/data/helpCenterData';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);

  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'Help Center', link: '/help' },
    { label: 'FAQs', active: true }
  ];

  const { faqCategories } = helpCenterData;

  const handleSearch = (query) => {
    console.log('Searching for:', query);
  };

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Frequently Asked Questions (FAQ)"
        containerStyle="shadow"
        titleSize="medium"
      />
      
      <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-10 py-8">
        {/* Main Content */}
        <HelpSearchSection
          title="Frequently Asked Questions (FAQ)"
          description="Find answers to common questions about orders, payments, shipping, returns, and more."
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={handleSearch}
          descriptionClassName="text-center text-gray-600 mb-12 max-w-2xl mx-auto"
        />

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqCategories.map((category) => (
            <div key={category.id} className="">
              {/* Category Title */}
              <h3 className="text-xl text-center font-semibold text-gray-800 mb-6">
                {category.title}
              </h3>
              
              {/* FAQ Items */}
              <div className="space-y-6">
                {category.faqs.map((faq) => (
                  <div 
                    key={faq.id} 
                    className="bg-background rounded-lg shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 md:px-10 py-4 text-left flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors duration-200"
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
                        className="bg-background px-6 md:px-10 py-4 border-t border-gray-100 bg-gray-50"
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
          ))}
        </div>

        {/* Contact Section */}
        <HelpContact />
      </div>

      {/* Market Closeby Description */}
      <MarketClosebyDescription />
    </div>
  );
};

export default FAQ;