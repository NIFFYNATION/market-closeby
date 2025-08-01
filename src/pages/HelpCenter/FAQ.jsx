import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';
import HelpContact from './HelpContact';
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

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
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
        <div className="p-8 mb-12">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">
            Frequently Asked Questions (FAQ)
          </h2>
          
          {/* Section Description */}
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Find answers to common questions about orders, payments, shipping, returns, and more.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for answer..."
                className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent text-gray-700 placeholder-gray-400"
              />
              <button
                type="submit"
                className="bg-secondary absolute right-0 hover:bg-secondary-light px-8 py-[19px] rounded-r-lg transition-colors duration-200 flex items-center justify-center"
              >
                <img src="/icons/search.svg" alt="Search" className="w-5 h-5" />
              </button>
            </div>
          </form>

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
                          <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
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