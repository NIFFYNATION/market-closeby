import React from 'react';
import PageHeader from '../common/PageHeader';
import MarketClosebyDescription from '../MarketClosebyDescription';
import HelpContact from '../../pages/HelpCenter/HelpContact';

const HelpCategoryPage = ({ categoryData }) => {
  const { title, description, breadcrumbs, sections } = categoryData;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title={title}
        containerStyle="shadow"
        titleSize="medium"
      />
      
      <div className="max-w-4xl mx-auto px-0 md:px-6 lg:px-10 py-8">
        {/* Main Content */}
        <div className=" p-8 mb-12">
          {/* Section Title */}
          <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">
            {description.title}
          </h2>
          
          {/* Section Description */}
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            {description.subtitle}
          </p>

          {/* Help Sections */}
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.id} className="">
                {/* Section Header */}
                <div className={`bg-primary text-white px-6 py-4 rounded-t-lg`}>
                  <h3 className="text-lg font-semibold">{section.title}</h3>
                </div>
                
                {/* Section Content */}
                <div className="bg-gray-50 px-6 py-6 rounded-b-lg shadow-lg">
                  <div className="space-y-4">
                    {section.steps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        {/* Numbered Bullet Point */}
                        <div className="flex-shrink-0 mt-1">
                          <div className="w-5 h-5 bg-secondary rounded-xs flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">{index + 1}</span>
                          </div>
                        </div>
                        {/* Step Text */}
                        <p className="text-gray-700 leading-relaxed">{step}</p>
                      </div>
                    ))}
                  </div>
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

export default HelpCategoryPage;