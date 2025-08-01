import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HelpMain = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqId, setOpenFaqId] = useState(null);

  const helpCategories = [
    {
      id: 1,
      title: 'ORDERS & PAYMENTS',
      description: 'Learn how to place orders, make secure payments, and manage your purchases.',
      icon: '/icons/payment-help.svg',
      link: '/help/orders-payments'
    },
    {
      id: 2,
      title: 'SHIPPING & DELIVERY',
      description: 'Get information on delivery times, shipping costs, and order tracking.',
      icon: '/icons/shipping-outline-help.svg',
      link: '/help/shipping-delivery'
    },
    {
      id: 3,
      title: 'RETURN & REFUNDS',
      description: 'Understand our return policy, refund process, and how to request an exchange.',
      icon: '/icons/truck-return-help.svg',
      link: '/help/returns-refunds'
    },
    {
      id: 4,
      title: 'ACCOUNT SETTINGS',
      description: 'Manage your account details, passwords, and preferences.',
      icon: '/icons/settings-help.svg',
      link: '/help/account-settings'
    },
    {
      id: 5,
      title: 'BUYERS & SELLERS SUPPORT',
      description: 'Get assistance with buying, selling, and marketplace transactions.',
      icon: '/icons/person-support-help.svg',
      link: '/help/buyers-sellers'
    },
    {
      id: 6,
      title: 'CUSTOMERS SUPPORT',
      description: 'Reach out for help with orders, complaints, or general inquiries.',
      icon: '/icons/customer-support-help.svg',
      link: '/help/customer-support'
    }
  ];

  const faqItems = [
    {
      id: 1,
      question: 'How do I place an order?',
      answer: 'To place an order, browse our products, select the items you want, add them to your cart, and proceed to checkout. Follow the instructions to enter your shipping and payment information to complete your purchase.'
    },
    {
      id: 2,
      question: 'What payment options are available?',
      answer: 'We accept various payment methods including credit/debit cards, bank transfers, mobile money, and payment on delivery for eligible locations.'
    },
    {
      id: 3,
      question: 'How long does delivery take?',
      answer: 'Delivery times vary depending on your location and the seller. Typically, local deliveries take 1-3 business days, while nationwide deliveries may take 3-7 business days.'
    },
    {
      id: 4,
      question: 'Can I return or exchange a product?',
      answer: 'Yes, most products can be returned or exchanged within 7 days of delivery. Please check our return policy or the specific product page for eligibility details.'
    },
    {
      id: 5,
      question: 'How do I track my order?',
      answer: 'You can track your order by logging into your account, navigating to "My Orders" section, and clicking on the specific order you want to track.'
    },
    {
      id: 6,
      question: 'How do I contact customer support?',
      answer: 'You can contact our customer support team through the "Contact Us" section on our website, via email at support@marketcloseby.com, or by calling our customer service line at +234-800-MARKET.'
    }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };

  const toggleFaq = (id) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-8">
        {/* Help Section */}
        <div className="p-8 md:p-12 mb-12">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">
            How can we help you?
          </h2>
          
          {/* Section Description */}
          <p className="text-center text-text-grey mb-8 max-w-2xl mx-auto">
            Welcome to Market CloseBy Help Center! Find answers to your questions or reach out to us for support.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12 md:mb-20">
            <div className="relative flex ">
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
            {faqItems.map((faq) => (
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
                    <p className="text-text-grey">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

       
        
      </div>
    </div>
  );
};

export default HelpMain;
