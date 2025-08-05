import React, { useState } from 'react';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';
import HelpContact from './HelpContact';
import TrackingResults from './TrackingResults';
import TrackPackageSection from '../../components/helpCenter/TrackPackageSection';

const TrackOrder = () => {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [trackingData, setTrackingData] = useState(null);

  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'Help Center', link: '/help' },
    { label: 'Track Order', active: true }
  ];

  // Mock tracking data
  const mockTrackingData = {
    trackingNumber: 'MC-700-RrTZZX',
    delivery: {
      timeframe: '6 -14 Business Days',
      dates: '(Mar 19 - Apr 2)'
    },
    guarantees: [
      { icon: '/icons/check.svg', text: 'Lost Package Protection' },
      { icon: '/icons/check.svg', text: 'Free Return for Damaged Items' },
      { icon: '/icons/check.svg', text: 'Late Delivery Compensation' },
      { icon: '/icons/check.svg', text: 'Wrong Item Replacement' }
    ],
    packageInfo: [
      { image: '/imgs/gadgets.svg', alt: 'Speaker' },
      { image: '/imgs/blender.svg', alt: 'Blender' },
      { image: '/imgs/gas-cooker.svg', alt: 'Gas Cooker' },
      { image: '/imgs/cream.svg', alt: 'Products' }
    ],
    shipTo: '123 Market Street, Victoria Island, Lagos, Nigeria.',
    email: 'example@email.com',
    shippingStatus: [
      {
        status: 'Order Submitted',
        date: 'March 13, 2012, 12:38 am',
        completed: true
      },
      {
        status: 'Order Paid Successfully',
        date: 'March 13, 2012, 12:38 am',
        completed: true
      },
      {
        status: 'Order is being packed',
        date: 'March 13, 2012, 12:38 am',
        completed: true
      },
      {
        status: 'Awaiting Shipment',
        date: 'March 13, 2012, 12:38 am',
        completed: false
      },
      {
        status: 'Order Shipped',
        date: 'March 13, 2012, 12:38 am',
        completed: false
      }
    ]
  };

  const handleTrack = () => {
    if (trackingNumber.trim()) {
      setTrackingData(mockTrackingData);
      setShowResults(true);
    }
  };

  const handleNewSearch = () => {
    setShowResults(false);
    setTrackingNumber('');
    setTrackingData(null);
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

  if (showResults && trackingData) {
    return (
      <TrackingResults
        breadcrumbs={breadcrumbs}
        trackingData={trackingData}
        deliveryData={deliveryData}
        shippingTypes={shippingTypes}
        onNewSearch={handleNewSearch}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page Header */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Track Order"
        containerStyle="shadow"
        titleSize="medium"
      />
      
      <div className="mx-auto px-4 md:px-6 lg:px-10 py-8">
        {/* Track Package Section */}
        <div className="mb-12">
          <TrackPackageSection
            trackingNumber={trackingNumber}
            onTrackingNumberChange={(e) => setTrackingNumber(e.target.value)}
            onTrack={handleTrack}
            deliveryData={deliveryData}
            shippingTypes={shippingTypes}
            placeholder="Your Tracking Number/ ID"
            buttonText="Track"
          />
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