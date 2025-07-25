import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productsData } from './productsData';
import ProductsCard from './cards/ProductsCard';




const TrendingProducts = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  
  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="py-8 px-4 sm:px-6 md:px-8 lg:px-10">
      <div className=" mx-auto">
        {/* Header with view options */}
        <div className="flex items-center justify-between sm:justify-start mb-6 gap-4">
          <h2 className="text-text-primary text-lg sm:text-xl font-medium">Trending Now</h2>
          <Link to="/trending" className="text-xs sm:text-sm text-text-grey hover:text-primary flex items-center">
            See All
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="ml-1">
              <path d="M6 12L10 8L6 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
        
        {/* Product grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {productsData.slice(0, isMobile ? 4 : 8).map((product) => (
            <ProductsCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;