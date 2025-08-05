import React from 'react';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';
import HelpContact from './HelpContact';
import TrackPackageSection from '../../components/helpCenter/TrackPackageSection';


const TrackingResults = ({ 
  breadcrumbs, 
  trackingData, 
  deliveryData, 
  shippingTypes, 
  onNewSearch 
}) => {
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Track Package */}
          <TrackPackageSection
            trackingNumber={trackingData.trackingNumber}
            onNewSearch={onNewSearch}
            deliveryData={deliveryData}
            shippingTypes={shippingTypes}
            isReadOnly={true}
          />

          {/* Right Side - Tracking Results */}
          <div className="space-y-4">
            {/* Main Tracking Card */}
            <div className="bg-background rounded-lg shadow-lg px-6">
              {/* Tracking Number Header */}
              <div className="border-b border-gray-200 p-4">
                <div className="flex items-center gap-4 justify-between md:justify-start">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">Tracking Number:</span>
                    <span className="font- text-gray-700">{trackingData.trackingNumber}</span>
                  </div>
                  <button className="bg-gray-100 hover:bg-gray-200 px-6 py-1.5 rounded-full border text-sm font-medium transition-colors">
                    Copy
                  </button>
                </div>
              </div>

              {/* Delivery Section */}
              <div className="p-4 border-b border-gray-200">
                <div className="mb-3">
                  <span className="text-sm text-gray-600">Delivery:</span>
                </div>
                <div className="mb-4">
                  <span className="text-xl font-bold text-primary">
                    {trackingData.delivery.timeframe} {trackingData.delivery.dates}
                  </span>
                </div>

                {/* Delivery Guarantee */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="">
                    <img src="/icons/shipping-green.svg" alt="Arrow" className="w-5 h-5" />
                    </div>
                    <span className="text-green-600 font-medium text-sm">Delivery Guarantee</span>
                    <img src="/icons/right-green.svg" alt="Arrow" className="w-4 h-4" />
                  </div>
                </div>

                {/* Guarantee Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {trackingData.guarantees.map((guarantee, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <img src="/icons/check-fill.svg" alt="Check" className="w-4 h-4" />
                      <span className="text-xs text-gray-700">{guarantee.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Package Info */}
              <div className="p-4 ">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-medium text-gray-900">Package info:</span>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Order details</button>
                </div>
                
                <div className="flex gap-3 mb-4">
                  {trackingData.packageInfo.map((item, index) => (
                    <div key={index} className="w-14 h-14 bg-gray-100 rounded flex items-center justify-center">
                      <img src={item.image} alt={item.alt} className="w-8 h-8 object-contain" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Ship To */}
              <div className="p-4 border-b border-gray-200">
                <div className="mb-2">
                  <span className="font-medium text-gray-900">Ship to:</span>
                </div>
                <p className="text-sm text-gray-600">{trackingData.shipTo}</p>
              </div>

              {/* Email Updates */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <div className=''>
                    <div className="text-sm font-medium text-gray-900 mb-1">Shipment updates will be sent to</div>
                    <div className="flex items-center gap-2 ">
                      <img src="/icons/email-grey.svg" alt="Email" className="w-4 h-4" />
                      <span className="text-sm text-gray-600">{trackingData.email}</span>
                    </div>
                  </div>
                  <button className="text-sm text-gray-500 hover:text-gray-700">Cancel</button>
                </div>
              </div>
                 {/* Shipping Details Card */}
            <div className="p-4">
              <h3 className="font-medium text-gray-900 mb-4">Shipping details</h3>
              
              <div className="space-y-4">
                {trackingData.shippingStatus.map((status, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex flex-col items-center">
                      <div className={`w-2.5 h-2.5 rounded-full ${
                        status.completed ? 'bg-primary' : 'bg-gray-300'
                      }`}></div>
                      {index < trackingData.shippingStatus.length - 1 && (
                        <div className={`w-0.5 h-9 ${
                          status.completed ? 'bg-primary' : 'bg-gray-300'
                        }`}></div>
                      )}
                    </div>
                    <div>
                      <h4 className={`font-medium ${
                        status.completed ? 'text-primary' : 'text-gray-500'
                      }`}>
                        {status.status}
                      </h4>
                      <p className="text-sm text-gray-500">{status.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            </div>

         
          </div>
        </div>

        {/* Contact Section */}
        <div className="mt-12">
          <HelpContact />
        </div>
      </div>

      {/* Market Closeby Description */}
      <MarketClosebyDescription />
    </div>
  );
};

export default TrackingResults;