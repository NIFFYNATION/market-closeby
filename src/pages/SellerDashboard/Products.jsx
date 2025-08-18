import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../../components/productsData';
import SearchAndActionsDashboard from '../../components/common/SearchAndActionsDashBoard';
import PaginationDashboard from '../../components/common/PaginationDashboard';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
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
    <div className="p-0 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 md:mb-6">All Products</h1>
        
        {/* Search and Actions Bar */}
        <SearchAndActionsDashboard
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search by product name"
          primaryAction={{
            label: 'Add New Product',
            onClick: () => navigate('/seller-dashboard/add-product'),
            variant: 'secondary'
          }}
        />
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {currentProducts.map((product) => (
          <div key={product.id} className="bg-background rounded-2xl shadow-sm overflow-hidden hover:shadow-md transition-shadow">
            {/* Stock Status Badge */}
            <div className="relative">
              <div className="aspect-square bg-background flex items-center justify-center p-3 md:p-4">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className={`absolute top-2 left-2 px-2 py-1 rounded text-xs font-medium ${
                product.status === 'In Stock' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {product.status}
              </div>
              
              {/* Options Button with Dropdown */}
              <div className="absolute top-2 right-2" ref={openDropdown === product.id ? dropdownRef : null}>
                <button 
                  onClick={() => toggleDropdown(product.id)}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <img src="/icons/options-bold.svg" alt="Options" className="w-6 h-6 md:w-8 md:h-8" />
                </button>
                
                {/* Dropdown Menu */}
                {openDropdown === product.id && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-10">
                    <button
                      onClick={() => handleEditProduct(product.id)}
                      className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                    >
                      <img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4 mr-3" />
                      Edit product details
                    </button>
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center"
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
              <h3 className="font-medium text-text-grey text-sm mb-1 truncate">{product.name}</h3>
              
              {/* Price and Stock */}
              <div className="space-y-1 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-grey">Price</span>
                  <span className="text-sm font-semibold text-text-grey">{product.price}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-grey">Stock</span>
                  <span className="text-sm text-text-grey">{product.stock}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-text-grey">Date</span>
                  <span className="text-sm text-text-grey">{product.date}</span>
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
        <div className="text-center mt-4 text-sm text-gray-500">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProducts.length)} of {filteredProducts.length} products
        </div>
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <img src="/icons/shop.svg" alt="No products" className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No products found</h3>
          <p className="text-gray-600 mb-4 px-4">Try adjusting your search criteria</p>
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