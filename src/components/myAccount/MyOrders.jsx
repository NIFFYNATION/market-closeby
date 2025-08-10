import React, { useState } from 'react';
import { Button } from '../common/Button';

const MyOrders = () => {
  const [activeTab, setActiveTab] = useState('active');

  return (
    <div className="w-full">
      {/* Order History Header */}
      <div className="mb-6">
        
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('active')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ${
              activeTab === 'active'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-gray-500 hover:text-text-primary'
            }`}
          >
            ACTIVE / COMPLETED ORDERS (0)
          </button>
          <button
            onClick={() => setActiveTab('cancelled')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors duration-200 ml-8 ${
              activeTab === 'cancelled'
                ? 'border-secondary text-secondary'
                : 'border-transparent text-gray-500 hover:text-text-primary'
            }`}
          >
            CANCELLED ORDERS
          </button>
        </div>
      </div>

      {/* Empty State */}
      <div className="flex flex-col items-center justify-center py-16 px-4">
        {/* Order Now Image */}
        <div className="mb-8">
          <div className="w-32 h-32 bg-blue-50 border-2 border-dashed border-blue-200 rounded-full flex items-center justify-center">
            <img 
              src="/imgs/order-now.svg" 
              alt="Order Now" 
              className="w-20 h-20"
            />
          </div>
        </div>

        {/* No Order History Text */}
        <div className="text-center mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">NO ORDER HISTORY</h3>
          <p className="text-gray-600 text-base max-w-md">
            Easily keep track of all your orders and their current status right here.
          </p>
        </div>

        {/* Continue Shopping Button */}
        <Button
          variant="secondary"
          size="md"
          shape="rounded"
          className="px-8 py-3"
        >
          Continue Shopping
        </Button>
      </div>
    </div>
  );
};

export default MyOrders;