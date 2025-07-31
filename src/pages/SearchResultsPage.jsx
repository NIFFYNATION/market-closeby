import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productsData } from '../components/productsData';
import ProductsCard from '../components/cards/ProductsCard';
import FilterSidebar from '../components/common/FilterSidebar';
import { getCategoryForSearch } from '../utils/getCategoryForSearch';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || '';
  const categoryParam = query.get('category') || '';

  const [filters, setFilters] = useState({
    price: {},
    brand: "",
    condition: "",
    discount: "",
    category: categoryParam,
  });

  // Sort dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Popularity');

  const sortOptions = [
    'Popularity',
    'Newest Arrival',
    'Price: Low to High',
    'Price: High to Low',
    'Product Rating'
  ];

  // Update filters when URL parameters change
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      category: categoryParam,
    }));
  }, [categoryParam]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.sort-dropdown')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter products by search term and category
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || product.category === filters.category;
    return matchesSearch && matchesCategory;
  });

  // Get the category for the first matching product if no category filter is applied
  const category = filters.category || getCategoryForSearch(searchTerm);

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="pt-40 md:pt-48  min-h-screen py-8 ">
      {/* Breadcrumb */}
    <div className='bg-background shadow-xl py-8 px-0 md:px-6 lg:px-10'>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-text-grey px-6 pt- pb-6 gap-4">
        <div>
          <Link to="/" className="hover:underline">Market CloseBy</Link>
          {" / "}
          {category ? (
            <>
              <Link to={`/search?category=${encodeURIComponent(category)}`} className="hover:underline">
                {category}
              </Link>
            </>
          ) : null}
          {searchTerm && <span className="text-primary font-bold"> /  {searchTerm}</span>}
        </div>
        <span className="text-xs px-0 md:px-7">1–30 of {filteredProducts.length} results</span>
      </div>
      
      {/* Heading and sort */}
      <div className="flex flex-col lg:flex-row lg:items-center md:justify-between gap-2 px-6">
        <h2 className="text-xl md:text-2xl font-bold text-primary mb-2 md:mb-0">
          {filters.category ? `${filters.category}` : ''}
          {searchTerm && (filters.category ? ` – ${searchTerm}` : `Search results – ${searchTerm}`)}
          {!searchTerm && !filters.category && 'All Products'}
        </h2>
        
        <div className="relative sort-dropdown">
          <button 
            className={`px-7 py-2 text-sm font-medium flex items-center gap-2 transition-all duration-200 ${
              isDropdownOpen 
                ? 'bg-secondary text-background shadow-md' 
                : 'bg- text-gray-700 hover:border-[#FF8A24]'
            }`}
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <span className="font-bold">Sort by:</span>
            <span>{selectedSort}</span>
            <svg 
              className={`w-4 h-4 transition-transform duration-200 ${
                isDropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute top-full left-0 md:right-0 mt-2 bg-background  shadow-lg z-10 max-w-[205px] py-2">
              {sortOptions.map((option) => (
                <label 
                  key={option}
                  className="flex items-center px-6 py-2 hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                >
                  <input
                    type="radio"
                    name="sort"
                    value={option}
                    checked={selectedSort === option}
                    onChange={() => handleSortSelect(option)}
                    className="w-4 h-4 text-[#FF8A24] border-gray-300 focus:ring-[#FF8A24] focus:ring-2 mr-3"
                  />
                  <span className="text-sm text-gray-700">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
     
    <div className=" min-h-screen py-8 px-0 md:px-6 lg:px-10">
      
      <div className="flex px-6 py-6 gap-6">
        {/* Sidebar Filters */}
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} currentCategory={category} />
        </div>
        
        {/* Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center text-text-grey py-20">
                No products found for <span className="font-semibold">{searchTerm}</span>
              </div>
            ) : (
              filteredProducts.map(product => (
                <ProductsCard key={product.id} product={product} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
    </div>
  );
};

export default SearchResultsPage;