import React, { useState, useEffect, useRef } from 'react'

import { productsData } from './productsData';
import ProductsCard from './cards/ProductsCard';
import { Link } from 'react-router-dom';
import ScrollControlButtons from './common/ScrollControlButtons';

const SameDayDelivery = () => {
  const scrollRef = useRef(null);

  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-8 px-3 sm:px-4 md:px-6 lg:px-10 w-full bg-[#fafafa]">
      <div className="mx-auto">
        {/* Header with view options */}
        <div className="block md:flex sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h2 className="text-lg sm:text-xl font-medium">Same Day Delivery</h2>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/" className="text-xs sm:text-sm text-text-grey hover:text-primary flex items-center">
                See All
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="ml-1">
                  <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
          {/* View toggle buttons */}
          <div className="hidden md:flex items-center ml-4">
            <ScrollControlButtons
              onLeft={() => scrollByAmount(-350)}
              onRight={() => scrollByAmount(350)}
            />
          </div>
        </div>
        {/* Product grid */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {productsData.map((product) => (
            <div key={product.id} className="min-w-[270px] max-w-[300px] flex-shrink-0">
              <ProductsCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SameDayDelivery;