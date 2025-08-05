import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';
import HelpContact from './HelpContact';

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('');

  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'Help Center', link: '/help' },
    { label: 'Track Order', active: true }
  ];

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      // Handle tracking logic here
      console.log('Tracking:', trackingNumber);
    }
  };

  const deliveryData = [
    {
      region: 'LAGOS',
      bgColor: 'bg-secondary',
      textColor: 'text-white'
    },
    {
      region: 'EASTERN',
      bgColor: 'bg-secondary',
      textColor: 'text-white'
    },
    {
      region: 'WESTERN',
      bgColor: 'bg-secondary',
      textColor: 'text-white'
    },
    {
      region: 'NORTHERN',
      bgColor: 'bg-secondary',
      textColor: 'text-white'
    }
  ];

  const shippingTypes = [
    'EXPRESS',
    'STANDARD SHIPPING',
    'SHIPPED FROM OVERSEAS',
    'POSTAL SERVICE'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Track Order"
        containerStyle="shadow"
        titleSize="medium"
      />
      
      <div className="l mx-auto px-4 md:px-6 lg:px-10 py-8">
        {/* Track Package Section */}
        <div className=" p-8 mb-12">
         <div className='py-32'>
           <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-12">
            TRACK A PACKAGE
          </h2>
          
          {/* Tracking Input */}
          <div className="max-w-lg mx-auto mb-16">
            <div className="flex gap-3 relative bg-background rounded-lg py-2 px-6 shadow-lg">
              <input
                type="text"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
                placeholder="Your Tracking Number/ ID"
                className="flex-1 px-4 py-3  rounded-lg focus:outline-none focus:border-transparent text-gray-700 placeholder-gray-400"
              />
              <button
                onClick={handleTrack}
                className="bg-secondary hover:bg-secondary-light absolute right-6 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap"
              >
                Track
              </button>
            </div>
          </div>
         </div>

          {/* Delivery Time Table */}
          <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
            <table className="w-full border-collapse ">
              <thead>
                <tr>
                  <th className="border-r border-gray-300 p-0 w-60">
                    {/* Empty header cell for regions */}
                  </th>
                  {shippingTypes.map((type, index) => (
                    <th key={index} className="border-l border-gray-300 px-4 py-3 text-center text-sm font-bold text-primary">
                      {type}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {deliveryData.map((region, regionIndex) => (
                  <tr key={regionIndex}>
                    <td className={`border-r border-t border-gray-300 px-5`}>
                      <div className={`bg-secondary px-6 md:px-4 py-6 rounded-lg text-center text-background font-semibold text-sm h-full flex items-center justify-center`}>
                        <div className="flex items-center gap-4 px-3">
                          <img src="/icons/shipping-filled.svg" alt="Truck" className="w-5 h-5 filter brightness-0 invert" />
                          {region.region}
                        </div>
                      </div>
                    </td>
                    {shippingTypes.map((_, typeIndex) => (
                      <td key={typeIndex} className="border-t border-l border-gray-300 px-4 py-6 text-center">
                        <div className="text-lg font-semibold text-gray-800 mb-1">2 - 4</div>
                        <div className="text-sm text-gray-600">Business Days</div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
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

export default TrackOrder;