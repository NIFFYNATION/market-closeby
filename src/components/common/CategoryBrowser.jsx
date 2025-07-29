import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { categories } from './categoryData'
import ScrollControlButtons from '../common/ScrollControlButtons';

const CategoryBrowser = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const scrollRef = useRef(null);

  // Handle window resize to detect mobile view
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const [activeBtn, setActiveBtn] = useState(null);

  // Scroll handlers
  const scrollByAmount = (amount) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: amount, behavior: 'smooth' });
    }
  };

  // Helper for icon color (SVG filter for white/primary)
  const iconFilter = (direction) =>
    activeBtn === direction ? 'invert brightness-200' : 'filter-none';

  return (
    <div className="bg-primary py-4 sm:py-6 md:py-8 px-3 sm:px-4 md:px-6 lg:px-10 w-full">
      <div className="mx-auto">
        {/* Header with view options */}
        <div className="block md:flex sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 space-y-2 sm:space-y-0">
          <div className="flex justify-between items-center gap-4">
            <div>
              <h2 className="text-white text-lg sm:text-xl font-medium">Browse Category</h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#D0D0D0] text-xs sm:text-sm">All Categories</span>
              <img src='/icons/arrow-right.svg' />
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
        {/* Category grid */}
        <div
          ref={scrollRef}
          className="flex justify-between py-4 gap-6 sm:gap-3 md:gap-4 overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          {categories.slice(0, 5).map((category) => (
            <Link 
              key={category.name} 
              to={`/category/${category.name.toLowerCase()}`}
              className="bg-white rounded-lg p-2 sm:p-3 md:p-4 flex flex-col items-center justify-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="w-30 h-20 sm:w-20 sm:h-20 md:w-54 md:h-24 flex items-center justify-center mb-2 sm:mb-3 md:mb-4">
                <img 
                  src={category.image || `/imgs/${category.name.toLowerCase()}.svg`} 
                  alt={category.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <h3 className="text-center text-xs sm:text-sm md:text-base font-medium text-text-primary">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CategoryBrowser