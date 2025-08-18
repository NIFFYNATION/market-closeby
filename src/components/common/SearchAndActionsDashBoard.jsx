import React from 'react';
import { Button } from './Button';

const SearchAndActionsDashboard = ({
  searchTerm = '',
  onSearchChange = () => {},
  searchPlaceholder = 'Search...',
  showFilter = true,
  onFilterClick = () => {},
  primaryAction = null, // { label: 'Add New', onClick: () => {}, variant: 'secondary' }
  className = ''
}) => {
  return (
    <div className={`flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6 font-sans ${className}`}>
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 flex-1">
        <div className="relative flex-1 max-w-full sm:max-w-md">
          <img 
            src="/icons/search-bold.svg" 
            alt="Search" 
            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
          />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-4 pr-10 py-2 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring focus:ring-secondary focus:border-secondary text-sm"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        {showFilter && (
          <Button 
            size="md" 
            shape="roundedLg"
            onClick={onFilterClick}
            className="border !border-text-grey text-text-secondary !font-bold !bg-background !hover:bg-gray-50 px-4 py-2 md:py-2.5 whitespace-nowrap"
          >
            Filter
            <img src="/icons/filter.svg" alt="Filter" className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
          </Button>
        )}
        
        {primaryAction && (
          <Button
            variant={primaryAction.variant || 'secondary'}
            onClick={primaryAction.onClick}
            className="!font-semibold whitespace-nowrap mt-2 sm:mt-0"
          >
            {primaryAction.label}
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchAndActionsDashboard;