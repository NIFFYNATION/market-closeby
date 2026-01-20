import React, { useState, useEffect } from 'react';
import { useLocation, useParams, Link } from 'react-router-dom';
import { productsData } from '../components/productsData';
import ProductsCard from '../components/cards/ProductsCard';
import FilterSidebar from '../components/common/FilterSidebar';
import { getCategoryForSearch } from '../utils/getCategoryForSearch';
import { categories } from '../components/common/categoryData';
import GridSkeleton from '../components/common/GridSkeleton';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

// Helper: normalize strings for comparison (handles & -> and, spaces, case)
const normalize = (str = '') => str.toLowerCase().replace(/&/g, 'and').replace(/\s+/g, ' ').trim();

// Helper: create slug from category name
const createSlug = (name = '') => normalize(name).replace(/\s+/g, '-');

// Helper: get actual product category name that exists in productsData
// This handles cases where categoryData has "Home & Kitchen" but productsData has "Home and Kitchen"
const getProductCategoryName = (categoryName, productsData) => {
  const normalizedInput = normalize(categoryName);
  // Get unique categories from productsData
  const productCategories = [...new Set(productsData.map(p => p.category))];
  // Find matching category in productsData (normalized comparison)
  const match = productCategories.find(pc => normalize(pc) === normalizedInput);
  return match || categoryName; // Return matched name or original if not found
};

const SearchResultsPage = () => {
  const query = useQuery();
  const { slug } = useParams();
  const searchTerm = query.get('q') || '';
  const categoryFromQuery = query.get('category') || '';

  // State for category information
  const [categoryInfo, setCategoryInfo] = useState({
    categoryFromSlug: '',
    displayCategoryName: '',
    effectiveCategory: categoryFromQuery,
  });

  const [filters, setFilters] = useState({
    price: {},
    brand: "",
    condition: "",
    discount: "",
    category: categoryFromQuery,
  });

  // Sort dropdown state
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState('Popularity');
  const [isLoading, setIsLoading] = useState(true);

  const sortOptions = [
    'Popularity',
    'Newest Arrival',
    'Price: Low to High',
    'Price: High to Low',
    'Product Rating'
  ];

  // Update filters and category info when URL parameters change (slug or query params)
  useEffect(() => {
    // Recompute effective category when slug or query changes
    let newCategoryFromSlug = '';
    let newDisplayCategoryName = '';
    
    if (slug) {
      // Find category in categoryData that matches the slug
      const matchedCategory = categories.find(c => {
        if (!c || !c.name) return false;
        return createSlug(c.name) === slug.toLowerCase();
      });
      
      if (matchedCategory) {
        newCategoryFromSlug = matchedCategory.name;
        // Get the actual category name that exists in productsData
        newDisplayCategoryName = getProductCategoryName(matchedCategory.name, productsData);
      } else {
        // Fallback: try to construct category name from slug
        newCategoryFromSlug = slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
        newDisplayCategoryName = getProductCategoryName(newCategoryFromSlug, productsData);
      }
    }
    
    const newEffectiveCategory = newDisplayCategoryName || newCategoryFromSlug || categoryFromQuery;
    
    // Update category info state
    setCategoryInfo({
      categoryFromSlug: newCategoryFromSlug,
      displayCategoryName: newDisplayCategoryName,
      effectiveCategory: newEffectiveCategory,
    });
    
    // Update filters
    setFilters(prev => ({
      ...prev,
      category: newEffectiveCategory,
    }));
  }, [slug, categoryFromQuery]);

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

  useEffect(() => {
    const t = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(t);
  }, [slug, searchTerm, categoryFromQuery]);

  // Filter products by search term and category
  const filteredProducts = productsData.filter(product => {
    const matchesSearch = !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || normalize(product.category) === normalize(filters.category);
    return matchesSearch && matchesCategory;
  });

  // Get the display category name (use categoryData name for display, but filter by product category)
  const category = categoryInfo.effectiveCategory || getCategoryForSearch(searchTerm);
  
  // For display purposes, prefer the categoryData name if we have a slug match
  const displayCategory = categoryInfo.categoryFromSlug || category;

  const handleSortSelect = (option) => {
    setSelectedSort(option);
    setIsDropdownOpen(false);
  };

  return (
    <div className="pt-18 md:pt-40  min-h-screen py-8 ">
      {/* Breadcrumb */}
    <div className='bg-background shadow-lg py-8 px-0 md:px-6 lg:px-10'>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-text-grey px-6 pt- pb-6 gap-4">
        <div>
          <Link to="/" className="hover:underline">Market CloseBy</Link>
          {" / "}
          {displayCategory ? (
            <>
              <Link to={`/category/${createSlug(displayCategory)}`} className="hover:underline">
                {displayCategory}
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
          {displayCategory ? `${displayCategory}` : ''}
          {searchTerm && (displayCategory ? ` – ${searchTerm}` : `Search results – ${searchTerm}`)}
          {!searchTerm && !displayCategory && 'All Products'}
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
          <FilterSidebar filters={filters} setFilters={setFilters} currentCategory={displayCategory} />
        </div>
        
        {/* Product Grid */}
        <main className="flex-1">
          {isLoading ? (
            <GridSkeleton count={12} />
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.length === 0 ? (
                <div className="col-span-full text-center text-text-grey py-20">
                  {searchTerm ? (
                    <>No products found for <span className="font-semibold">{searchTerm}</span></>
                  ) : displayCategory ? (
                    <>No products found in <span className="font-semibold">{displayCategory}</span></>
                  ) : (
                    <>No products found</>
                  )}
                </div>
              ) : (
                filteredProducts.map(product => (
                  <ProductsCard key={product.id} product={product} />
                ))
              )}
            </div>
          )}
        </main>
      </div>
    </div>
    </div>
  );
};

export default SearchResultsPage;
