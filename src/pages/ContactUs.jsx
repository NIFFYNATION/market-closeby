import React, { useState } from 'react';
import PageHeader from '../components/common/PageHeader';
import MarketClosebyDescription from '../components/MarketClosebyDescription';
import { Button } from '../components/common/Button';
import { TextInput, SelectInput, TextareaInput } from '../components/forms/FormFields';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    subject: 'Returns & Refunds',
    message: ''
  });

  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'Help Center', link: '/help' },
    { label: 'Contact Us', active: true }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const contactSections = [
    {
      id: 'call-center',
      icon: '/icons/phone.svg',
      title: 'Call Center',
      items: [
        { label: 'Customer Support', value: '+234 800 000 0000' },
        { label: 'Whatsapp', value: '+234 900 000 0000' },
        { label: 'Business Hours', value: 'Monday – Friday | 9 AM – 6 PM (WAT)' }
      ]
    },
    {
      id: 'location',
      icon: '/icons/map-area.svg',
      title: 'Our location',
      items: [
        { label: '', value: '123 Market Street, Victoria Island, Lagos, Nigeria.' }
      ]
    },
    {
      id: 'email',
      icon: '/icons/email-blue.svg',
      title: 'Email',
      items: [
        { label: 'General Inquiries', value: 'support@domain.com' },
        { label: 'Orders & Payments', value: 'orders@domain.com' },
        { label: 'Returns & Refunds', value: 'returns@domain.com' }
      ]
    },
    {
      id: 'social',
      icon: '/icons/share-social.svg',
      title: 'Social Networks',
      items: [
        { type: 'social', platforms: [
          { icon: '/icons/facebook-white.svg', alt: 'Facebook' },
          { icon: '/icons/twitter-white.svg', alt: 'Twitter' },
          { icon: '/icons/youtube-white.svg', alt: 'YouTube' },
          { icon: '/icons/instagram-white.svg', alt: 'Instagram' }
        ]}
      ]
    }
  ];

  const subjectOptions = [
    'Returns & Refunds',
    'Orders & Payments',
    'Shipping & Delivery',
    'Account Settings',
    'Technical Support',
    'General Inquiry'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Contact Us"
        containerStyle="shadow"
        titleSize="medium"
      />
      
      <div className="mx-auto px-4 md:px-6 lg:px-10 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Side - Contact Information */}
          <div className="space-y-8">
            {/* Get in touch section */}
            <div>
              <p className="text-primary text-sm font-medium mb-2">Get in touch</p>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                We are always ready to help & answer your questions.
              </h1>
              <p className="text-text-grey leading-relaxed">
                We're here to help! Get in touch with us through any of the options below.
              </p>
            </div>

            {/* Contact Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-20">
              {contactSections.map((section) => (
                <div key={section.id} className="">
                  {/* Section Header */}
                  <div className="flex items-center space-x-2 mb-4">
                    <img src={section.icon} alt={section.title} className="w-5 h-5" />
                    <h3 className="text-md font-semibold text-primary">{section.title}</h3>
                  </div>
                  
                  {/* Section Content */}
                  <div className="w-full space-y-3">
                    {section.items.map((item, index) => (
                      <div key={index}>
                        {item.type === 'social' ? (
                          <div className="flex space-x-3">
                            {item.platforms.map((platform, platformIndex) => (
                              <div key={platformIndex} className="w-10 h-10 bg-primary rounded-full flex items-center justify-center hover:bg-primary-light transition-colors duration-200 cursor-pointer">
                                <img src={platform.icon} alt={platform.alt} className="w-5 h-5" />
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-700">
                            {item.label && (
                              <span className="font-medium">{item.label}: </span>
                            )}
                            <span>{item.value}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Contact Form */}
          <div className="w-full lg:w-[80%] justify-self-end bg-background rounded-lg shadow-lg p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-primary mb-2">Send Us a Message</h2>
              <p className="text-text-grey text-sm">
                Fill out the form below, and we'll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <TextInput
                id="fullName"
                name="fullName"
                label="Full Name"
                value={formData.fullName}
                onChange={handleInputChange}
                placeholder="Enter full name"
                required
              />

              {/* Email Address */}
              <TextInput
                id="email"
                name="email"
                label="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                type="email"
                required
              />

              {/* Subject */}
              <SelectInput
                id="subject"
                name="subject"
                label="Subject"
                value={formData.subject}
                onChange={handleInputChange}
                options={subjectOptions}
                required
              />

              {/* Message */}
              <TextareaInput
                id="message"
                name="message"
                label="Message"
                value={formData.message}
                onChange={handleInputChange}
                placeholder="Write message..."
                rows={5}
                required
              />

              {/* Submit Button */}
              <Button
                variant='secondary'
                type="submit"
              >
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="py-12">
        <div className="mx-auto px-4 md:px-6 lg:px-10">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Find us on the map</h2>
          
          {/* Map Container */}
          <div className="w-full h-96  overflow-hidden relative">
            {/* Embedded Google Map */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3964.7471839141845!2d3.4205!3d6.4474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103bf4c7e6c7e6c7%3A0x1234567890abcdef!2sVictoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2sng!4v1234567890123!5m2!1sen!2sng"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Market CloseBy Location"
              className="w-full h-full"
            ></iframe>
            
            {/* Location Marker Overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <div className="w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>
          
          {/* Address Information */}
          <div className="mt-6 text-center">
            <p className="text-gray-700 font-medium">123 Market Street, Victoria Island</p>
            <p className="text-gray-600">Lagos, Nigeria</p>
          </div>
        </div>
      </div>

      {/* Market Closeby Description */}
      <MarketClosebyDescription />
    </div>
  );
};

export default ContactUs;