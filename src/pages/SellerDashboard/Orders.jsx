import React, { useState, useMemo } from 'react';
import { Button } from '../../components/common/Button';
import { ordersData } from '../../components/productsData';
import SearchAndActionsDashboard from '../../components/common/SearchAndActionsDashBoard';

import PaginationDashboard from '../../components/common/PaginationDashboard';

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const itemsPerPage = 8;

  // Filter orders based on search term
  const filteredOrders = useMemo(() => {
    return ordersData.filter(order =>
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentOrders = filteredOrders.slice(startIndex, endIndex);

  // Reset to first page when search changes
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  // Checkbox handlers
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedOrders(currentOrders.map(order => order.id));
    } else {
      setSelectedOrders([]);
    }
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders(prev => {
      if (prev.includes(orderId)) {
        return prev.filter(id => id !== orderId);
      } else {
        return [...prev, orderId];
      }
    });
  };

  // Status badge styling
  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium';
    switch (status) {
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'Pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Cancelled':
        return `${baseClasses} bg-red-100 text-red-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className="p-0 md:p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-text-primary mb-6">Orders</h1>
      <div className='bg-background p-5 rounded-lg shadow-lg'>
        {/* Search and Actions Bar */}
        <SearchAndActionsDashboard
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          searchPlaceholder="Search by order number"
          primaryAction={{
            label: 'Add New Product',
            onClick: () => console.log('Add new product'),
            variant: 'secondary'
          }}
        />

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm overflow-x-auto">
          <div className="w-full ">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Orders</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Date</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Customer</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center    gap-3">
                        <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <img 
                            src={order.image} 
                            alt="Product" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span className="text-sm font-medium text-text-grey">{order.orderNumber}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{order.date}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{order.customer}</td>
                    <td className="px-6 py-4 text-sm font-medium text-text-secondary">{order.price}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-sm text-gray-500 hover:text-gray-700 transition-colors">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <PaginationDashboard
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageClick}
        onPreviousPage={handlePreviousPage}
        onNextPage={handleNextPage}
        className="mt-8"
      />

      {/* Empty State */}
      {filteredOrders.length === 0 && (
        <div className="text-center py-12 bg-white rounded-2xl">
          <img src="/icons/orders.svg" alt="No orders" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3 className="text-lg font-semibold text-text-primary mb-2">No orders found</h3>
          <p className="text-gray-600 mb-4">Try adjusting your search criteria</p>
        </div>
      )}
    </div>
  );
};

export default Orders;