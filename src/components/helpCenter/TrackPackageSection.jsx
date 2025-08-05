import React from 'react';

const TrackPackageSection = ({
  trackingNumber,
  onTrackingNumberChange,
  onTrack,
  onNewSearch,
  deliveryData,
  shippingTypes,
  isReadOnly = false,
  placeholder = "Your Tracking Number/ ID",
  buttonText = "Track"
}) => {
  return (
    <div className="p-0 md:p-8">
      <div className="py-8 md:py-16">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-12">
          TRACK A PACKAGE
        </h2>
        
        {/* Tracking Input */}
        <div className="max-w-xl mx-auto mb-8 md:mb-16">
          <div className="flex gap-3 relative bg-background rounded-lg py-2 px-6 shadow-lg">
            <input
              type="text"
              value={trackingNumber}
              onChange={onTrackingNumberChange}
              placeholder={placeholder}
              readOnly={isReadOnly}
              className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:border-transparent text-gray-700 placeholder-gray-400 bg-transparent"
              onKeyPress={(e) => e.key === 'Enter' && onTrack && onTrack()}
            />
            <button
              onClick={isReadOnly ? onNewSearch : onTrack}
              className="bg-secondary hover:bg-secondary-light absolute right-6 text-white px-6 py-3 rounded-full font-semibold transition-colors duration-200 whitespace-nowrap"
            >
              {isReadOnly ? 'New Search' : buttonText}
            </button>
          </div>
        </div>
      </div>

      {/* Delivery Time Table */}
      <div className="bg-white shadow-lg rounded-lg p-6 overflow-x-auto">
        <table className="w-full border-collapse">
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
  );
};

export default TrackPackageSection;