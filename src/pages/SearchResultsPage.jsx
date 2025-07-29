import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { productsData } from '../components/productsData'; // Use your real data source
import ProductsCard from '../components/cards/ProductsCard';
import FilterSidebar from '../components/common/FilterSidebar';

// Utility to get category for search
function getCategoryForSearch(searchTerm) {
  const product = productsData.find(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return product ? product.category : null;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const SearchResultsPage = () => {
  const query = useQuery();
  const searchTerm = query.get('q') || '';

  const [filters, setFilters] = useState({
    price: {},
    brand: "",
    condition: "",
    discount: "",
  });

  // Filter products by search term (case-insensitive, simple match)
  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get the category for the first matching product
  const category = getCategoryForSearch(searchTerm);

  return (
    <div className="pt-40 md:pt-48 min-h-screen py-8 px-0 md:px-6 lg:px-10">
      {/* Breadcrumb */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between text-xs text-text-grey px-6 pt-6 pb-2 gap-4">
        <div>
          <Link to="/" className="hover:underline">Market CloseBy</Link>
          {" / "}
          {category ? (
            <>
              <Link to={`/category/${category.toLowerCase().replace(/ /g, "-")}`} className="hover:underline">
                {category}
              </Link>
              {" / "}
            </>
          ) : null}
          <span className="text-primary font-semibold">{searchTerm}</span>
        </div>
        <span className="text-xs text-text-grey">1–30 of {filteredProducts.length} results</span>
      </div>
      {/* Title and sort */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between px-6">
        <h2 className="text-2xl font-bold text-primary mb-2 md:mb-0">
          Search results – {searchTerm}
        </h2>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold">Sort by:</span>
            <button className="text-xs font-semibold text-primary flex items-center">
              Popularity
              <img src="/icons/arrow-down.svg" alt="Sort" className="ml-1 w-3 h-3" />
            </button>
          </div>
      </div>
      <div className="flex px-6 py-6 gap-6">
        {/* Sidebar Filters */}
        <div className="hidden lg:block">
    <FilterSidebar filters={filters} setFilters={setFilters} />
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
  );
};

export default SearchResultsPage;