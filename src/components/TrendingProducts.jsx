import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Mock data for trending products
const trendingProducts = [
  {
    id: 1,
    name: 'Apple iPhone 16 256 GB Ultramarine',
    price: '₦1,400,000',
    image: '/imgs/iphone.svg',
    location: 'Lagos, Nigeria',
    rating: 1,
    reviews: 1,
    verified: true
  },
  {
    id: 2,
    name: 'LG Thick Table Top Glass Gas Cooker with Two Hobs',
    price: '₦34,000',
    image: '/imgs/gas-cooker.svg', 
    location: 'Oyo, Nigeria',
    rating: 2,
    reviews: 0,
    verified: false
  },
  {
    id: 3,
    name: 'New Age 50000 MAh FC50P POWER BANK FAST CHARGE',
    price: '₦8,500',
    image: '/imgs/power-bank.svg', 
    location: 'Lagos, Nigeria',
    rating: 5,
    reviews: 100,
    verified: true
  },
  {
    id: 4,
    name: 'Yam Pounder - 8L - 2500w',
    price: '₦4,000,000',
    image: '/imgs/yam-pounder.svg',
    location: 'Lagos, Nigeria',
    rating: 1,
    reviews: 1,
    verified: false
  },
  {
    id: 5,
    name: 'Apple iPhone 16 256 GB Ultramarine',
    price: '₦1,400,000',
    image: '/icons/iphone.svg',
    location: 'Lagos, Nigeria',
    rating: 1,
    reviews: 1,
    verified: true
  },
  {
    id: 6,
    name: 'LG Thick Table Top Glass Gas Cooker with Two Hobs',
    price: '₦34,000',
    image: '/imgs/blender.svg', // Using existing image as placeholder
    location: 'Oyo, Nigeria',
    rating: 2,
    reviews: 0,
    verified: false
  },
  {
    id: 7,
    name: 'New Age 50000 MAh FC50P POWER BANK FAST CHARGE',
    price: '₦8,500',
    image: '/imgs/gadgets.svg', // Using existing image as placeholder
    location: 'Lagos, Nigeria',
    rating: 5,
    reviews: 100,
    verified: true
  },
  {
    id: 8,
    name: 'Yam Pounder - 8L - 2500w',
    price: '₦4,000,000',
    image: '/imgs/blender.svg', // Using existing image as placeholder
    location: 'Lagos, Nigeria',
    rating: 1,
    reviews: 1,
    verified: false
  }
];

// Star rating component
const StarRating = ({ rating, reviews }) => {
  return (
    <div className="hidden md:flex items-center">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${i < rating ? 'text-secondary' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="text-xs text-gray-500 ml-1">({reviews} Reviews)</span>
    </div>
  );
};

// Product card component
const ProductCard = ({ product }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          {product.verified && (
            <div className="absolute top-2 right-2 z-10">
              <div className="bg-secondary rounded-full w-6 h-6 flex items-center justify-center">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>
          )}
          <div className="p-4">
            <img src={product.image} alt={product.name} className="w-full h-40 object-contain" />
          </div>
        </div>
        <div className="p-4">
          <div className="font-bold text-primary text-lg mb-2">{product.price}</div>
          <h3 className="text-sm font-medium text-text-grey mb-3">{product.name}</h3>
          <div className="flex items-center mb-2 gap-1 text-text-primary">
            <img src="/icons/location.svg" alt="Location" className='w-4 h-4' />
            <span className="text-sm">{product.location}</span>
          </div>
          <StarRating rating={product.rating} reviews={product.reviews} />
        </div>
      </Link>
    </div>
  );
};

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
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-2 sm:space-y-0">
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
          {trendingProducts.slice(0, isMobile ? 4 : 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;