import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../../components/productsData';
import SearchAndActionsDashboard from '../../components/common/SearchAndActionsDashBoard';
import PaginationDashboard from '../../components/common/PaginationDashboard';
import { useDashboardTheme } from './DashboardLayout';
import { FiCpu, FiTrendingUp, FiX, FiCheckCircle } from 'react-icons/fi';

const Products = () => {
  const navigate = useNavigate();
  const { theme } = useDashboardTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [showAiInsights, setShowAiInsights] = useState(false);
  const dropdownRef = useRef(null);
  const itemsPerPage = 10;

  // Filter products based on search term
  const filteredProducts = useMemo(() => {
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination values
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Pagination handlers
  const handlePreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Dropdown handlers
  const toggleDropdown = (productId) => {
    setOpenDropdown(openDropdown === productId ? null : productId);
  };

  const handleEditProduct = (productId) => {
    console.log('Edit product:', productId);
    navigate(`/seller-dashboard/edit-product/${productId}`);
    setOpenDropdown(null);
  };

  const handleDeleteProduct = (productId) => {
    console.log('Delete product:', productId);
    if (window.confirm('Are you sure you want to delete this product?')) {
      // Delete logic here
    }
    setOpenDropdown(null);
  };

  return (
    <div
      className={`p-0 md:p-6 min-h-screen ${
        theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-50'
      }`}
    >
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1
          className={`text-xl md:text-2xl font-semibold mb-4 md:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-text-primary'
          }`}
        >
          All Products
        </h1>
        
        {/* Search and Actions Bar */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center mb-6">
          <SearchAndActionsDashboard
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Search by product name"
            className="flex-1 w-full"
            primaryAction={{
              label: 'Add New Product',
              onClick: () => navigate('/seller-dashboard/add-product'),
              variant: 'secondary'
            }}
          />
          <button
            onClick={() => setShowAiInsights(true)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              theme === 'dark' 
                ? 'bg-purple-500/10 text-purple-400 hover:bg-purple-500/20 border border-purple-500/20' 
                : 'bg-purple-50 text-purple-600 hover:bg-purple-100 border border-purple-100'
            }`}
          >
            <FiCpu className="w-4 h-4" />
            <span>AI Insights</span>
          </button>
        </div>
      </div>

      {/* AI Insights Modal */}
      {showAiInsights && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-[#1e1e1e] border border-white/10' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-500/10 rounded-lg">
                  <FiCpu className="w-6 h-6 text-purple-500" />
                </div>
                <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  Product Performance Insights
                </h3>
              </div>
              <button 
                onClick={() => setShowAiInsights(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <FiTrendingUp className="text-green-500" />
                  <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Top Performers</h4>
                </div>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Based on recent views and sales, these products are trending:
                </p>
                <ul className="space-y-2">
                  {[productsData[0]?.name, productsData[1]?.name].filter(Boolean).map((name, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm font-medium text-green-500">
                      <FiCheckCircle className="w-4 h-4" /> {name}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-2 mb-3">
                  <FiCpu className="text-amber-500" />
                  <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Recommendations</h4>
                </div>
                <p className={`text-sm mb-3 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  AI suggests these actions to improve sales:
                </p>
                <ul className={`space-y-2 text-sm ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  <li className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    Add more images to "Leather Crossbody Bag"
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    Consider a 10% discount on "Summer Floral Dress"
                  </li>
                  <li className="flex gap-2">
                    <span className="text-amber-500">•</span>
                    Update keywords for "Denim Jacket"
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="p-6 border-t border-white/10 bg-opacity-50 flex justify-end">
              <button
                onClick={() => setShowAiInsights(false)}
                className="px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-lg transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {currentProducts.map((product) => (
          <div
            key={product.id}
            className={`rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border ${
              theme === 'dark'
                ? 'bg-[#1e1e1e] border-white/10'
                : 'bg-background border-gray-100'
            }`}
          >
            {/* Stock Status Badge */}
            <div className="relative">
              <div
                className={`aspect-square flex items-center justify-center p-3 md:p-4 ${
                  theme === 'dark' ? 'bg-[#111827]' : 'bg-background'
                }`}
              >
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div
                className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                  product.status === 'In Stock'
                    ? theme === 'dark'
                      ? 'bg-green-900/40 text-green-300'
                      : 'bg-green-100 text-green-800'
                    : theme === 'dark'
                      ? 'bg-red-900/40 text-red-300'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {product.status}
              </div>
              
              {/* Options Button with Dropdown */}
              <div className="absolute top-2 right-2" ref={openDropdown === product.id ? dropdownRef : null}>
                <button
                  onClick={() => toggleDropdown(product.id)}
                  className={`p-1 rounded-full transition-colors ${
                    theme === 'dark'
                      ? 'hover:bg-white/10'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <img src="/icons/options-bold.svg" alt="Options" className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                {/* Dropdown Menu */}
                {openDropdown === product.id && (
                  <div
                    className={`absolute right-0 top-full mt-1 w-48 rounded-lg shadow-lg border py-2 z-10 ${
                      theme === 'dark'
                        ? 'bg-[#111827] border-gray-700'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center ${
                        theme === 'dark'
                          ? 'text-slate-200 hover:bg-white/5'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4 mr-3" />
                      Edit product details
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className={`w-full px-4 py-2 text-left text-sm transition-colors flex items-center ${
                        theme === 'dark'
                          ? 'text-red-400 hover:bg-red-900/20'
                          : 'text-red-600 hover:bg-red-50'
                      }`}
                    >
                      <img src="/icons/trash-bold.svg" alt="Delete" className="w-4 h-4 mr-3" />
                      Delete product
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-4 md:p-5">
              <h3
                className={`font-medium text-sm mb-1 truncate ${
                  theme === 'dark' ? 'text-slate-100' : 'text-text-grey'
                }`}
              >
                {product.name}
              </h3>
              
              {/* Price and Stock */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      theme === 'dark' ? 'text-slate-400' : 'text-text-grey'
                    }`}
                  >
                    Price
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      theme === 'dark' ? 'text-slate-100' : 'text-text-grey'
                    }`}
                  >
                    {product.price}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      theme === 'dark' ? 'text-slate-400' : 'text-text-grey'
                    }`}
                  >
                    Stock
                  </span>
                  <span
                    className={`text-sm ${
                      theme === 'dark' ? 'text-slate-200' : 'text-text-grey'
                    }`}
                  >
                    {product.stock}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span
                    className={`text-xs ${
                      theme === 'dark' ? 'text-slate-400' : 'text-text-grey'
                    }`}
                  >
                    Date
                  </span>
                  <span
                    className={`text-sm ${
                      theme === 'dark' ? 'text-slate-200' : 'text-text-grey'
                    }`}
                  >
                    {product.date}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <PaginationDashboard
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        className="mt-20"
      />

      {/* Results Info */}
      {filteredProducts.length > 0 && (
        <div
          className={`text-center mt-4 text-sm ${
            theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
          }`}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <img src="/icons/shop.svg" alt="No products" className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-text-primary'
            }`}
          >
            No products found
          </h3>
          <p
            className={`mb-4 px-4 ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Try adjusting your search criteria
          </p>
          <Button 
            variant="primary" 
            onClick={() => navigate('/seller-dashboard/add-product')}
            className="bg-orange-500 hover:bg-orange-600"
          >
            Add Your First Product
          </Button>
        </div>
      )}
    </div>
  );
};

export default Products;
