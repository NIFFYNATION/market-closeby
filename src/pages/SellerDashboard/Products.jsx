import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { productsData } from '../../components/productsData';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = productsData.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-0 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-4 md:mb-6">
        <h1 className="text-xl md:text-2xl font-semibold text-text-primary mb-4 md:mb-6">All Products</h1>
        
        {/* Search and Actions Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 md:gap-4 mb-4 md:mb-6 font-sans">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 md:gap-4 flex-1">
            <div className="relative flex-1 max-w-full sm:max-w-md">
              <img 
                src="/icons/search-bold.svg" 
                alt="Search" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 text-gray-400"
              />
              <input
                type="text"
                placeholder="Search by product name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2 md:py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 text-sm"
              />
            </div>
       
          </div>
               <Button 
              size="md" 
              shape="roundedLg"
              className="border !border-text-grey text-text-secondary !font-bold !bg-background !hover:bg-gray-50 px-4 py-2 md:py-2.5 whitespace-nowrap"
            >
              Filter
              <img src="/icons/filter.svg" alt="Filter" className="w-5 h-5 md:w-6 md:h-6 ml-2 md:ml-3" />
            </Button>
          <Button
            variant="secondary"
            onClick={() => navigate('/seller-dashboard/add-product')}
            className="!font-semibold whitespace-nowrap mt-2 sm:mt-0"
          >
            Add New Product
          </Button>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
        {filteredProducts.map((product) => (
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
              <button className="absolute top-2 right-2 p-1 hover:bg-text-grey-light rounded-full">
                <img src="/icons/options-bold.svg" alt="Options" className="w-6 h-6 md:w-8 md:h-8" />
              </button>
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
      <div className="flex flex-col sm:flex-row items-center justify-between mt-6 md:mt-8 gap-4 sm:gap-2">
        <button className="flex items-center p-2 bg-background ring ring-text-grey rounded-lg text-gray-400 hover:text-gray-600 order-2 sm:order-1">
          <img src="/icons/arrow-left.svg" alt="Previous" className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm text-text-grey mx-2">Previous</span>
        </button>
        
        <div className="flex space-x-1 order-1 sm:order-2">
          <button className="w-8 h-8 rounded text-sm text-gray-400 bg-background ring ring-secondary font-medium">
            4
          </button>
        </div>
        
        <button className="flex items-center bg-background ring ring-text-grey rounded-lg p-2 text-gray-600 hover:text-gray-800 order-3">
          <span className="text-sm text-text-grey mx-2">Next</span>
          <img src="/icons/arrow-right-bold.svg" alt="Next" className="w-4 h-4 md:w-5 md:h-5" />
        </button>
      </div>

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