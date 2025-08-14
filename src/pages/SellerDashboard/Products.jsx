import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Sample products data
  const products = [
    { id: 1, name: 'Kenwood Mixer', category: 'Electronics', price: '₦100,000', stock: 15, status: 'Active', image: '/imgs/blender.svg' },
    { id: 2, name: 'SilverCrest Blender', category: 'Electronics', price: '₦240,000', stock: 8, status: 'Active', image: '/imgs/blender.svg' },
    { id: 3, name: 'Gas Cooker', category: 'Home', price: '₦150,000', stock: 0, status: 'Out of Stock', image: '/imgs/gas-cooker.svg' },
    { id: 4, name: 'iPhone 14', category: 'Electronics', price: '₦800,000', stock: 5, status: 'Active', image: '/imgs/iphone.svg' },
    { id: 5, name: 'Power Bank', category: 'Electronics', price: '₦25,000', stock: 20, status: 'Active', image: '/imgs/power-bank.svg' },
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || product.category.toLowerCase() === filterCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-semibold text-gray-900">All Products</h2>
        <Button
          variant="primary"
          onClick={() => navigate('/seller-dashboard/add-product')}
        >
          Add New Product +
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            />
          </div>
          <div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
            >
              <option value="all">All Categories</option>
              <option value="electronics">Electronics</option>
              <option value="home">Home & Garden</option>
              <option value="clothing">Clothing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="aspect-square bg-gray-100 flex items-center justify-center">
              <img src={product.image} alt={product.name} className="w-20 h-20 object-contain" />
            </div>
            <div className="p-4">
              <h3 className="font-semibold text-gray-900 mb-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{product.category}</p>
              <div className="flex items-center justify-between mb-3">
                <span className="text-lg font-bold text-primary">{product.price}</span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.status === 'Active' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-4">Stock: {product.stock}</p>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  Edit
                </Button>
                <Button variant="danger" size="sm">
                  <img src="/icons/trash-bold.svg" alt="Delete" className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <img src="/icons/shop.svg" alt="No products" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search or filter criteria</p>
          <Button variant="primary" onClick={() => navigate('/seller-dashboard/add-product')}>
            Add Your First Product
          </Button>
        </div>
      )}
    </>
  );
};

export default Products;