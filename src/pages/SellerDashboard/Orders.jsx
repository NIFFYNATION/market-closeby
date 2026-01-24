import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { ordersData } from '../../components/productsData';
import SearchAndActionsDashboard from '../../components/common/SearchAndActionsDashBoard';
import PaginationDashboard from '../../components/common/PaginationDashboard';
import { useDashboardTheme } from './DashboardLayout';
import { FiShoppingBag, FiClock, FiCheckCircle, FiXCircle, FiTrendingUp, FiCpu } from 'react-icons/fi';

const Orders = () => {
  const { theme } = useDashboardTheme();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showAiAnalysis, setShowAiAnalysis] = useState(false);
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
        return `${baseClasses} ${
          theme === 'dark'
            ? 'bg-green-900/30 text-green-300'
            : 'bg-green-100 text-green-800'
        }`;
      case 'Pending':
        return `${baseClasses} ${
          theme === 'dark'
            ? 'bg-yellow-900/30 text-yellow-300'
            : 'bg-yellow-100 text-yellow-800'
        }`;
      case 'Cancelled':
        return `${baseClasses} ${
          theme === 'dark'
            ? 'bg-red-900/30 text-red-300'
            : 'bg-red-100 text-red-800'
        }`;
      default:
        return `${baseClasses} ${
          theme === 'dark'
            ? 'bg-gray-700 text-gray-200'
            : 'bg-gray-100 text-gray-800'
        }`;
    }
  };

  return (
    <div
      className={`p-0 md:p-6 min-h-screen ${
        theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-50'
      }`}
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h1
          className={`text-2xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-text-primary'
          }`}
        >
          Orders
        </h1>
        <button
          onClick={() => setShowAiAnalysis(!showAiAnalysis)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            theme === 'dark' 
              ? showAiAnalysis ? 'bg-amber-500 text-[#1a1a4b]' : 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20' 
              : showAiAnalysis ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'
          }`}
        >
          <FiCpu className="w-4 h-4" />
          <span>{showAiAnalysis ? 'Hide AI Analysis' : 'AI Order Analysis'}</span>
        </button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total Orders', value: ordersData.length, icon: <FiShoppingBag />, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Pending', value: ordersData.filter(o => o.status === 'Pending').length, icon: <FiClock />, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
          { label: 'Completed', value: ordersData.filter(o => o.status === 'Completed').length, icon: <FiCheckCircle />, color: 'text-green-500', bg: 'bg-green-500/10' },
          { label: 'Cancelled', value: ordersData.filter(o => o.status === 'Cancelled').length, icon: <FiXCircle />, color: 'text-red-500', bg: 'bg-red-500/10' },
        ].map((stat, index) => (
          <div key={index} className={`p-4 rounded-xl border flex items-center gap-4 ${
            theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-200'
          }`}>
            <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className={`text-xs ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
              <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* AI Analysis Section */}
      {showAiAnalysis && (
        <div className={`mb-6 p-6 rounded-xl border animate-in fade-in slide-in-from-top-4 ${
          theme === 'dark' ? 'bg-gradient-to-r from-[#1e1e1e] to-[#252525] border-amber-500/30' : 'bg-gradient-to-r from-amber-50 to-white border-amber-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500 rounded-lg text-[#1a1a4b]">
              <FiCpu className="w-5 h-5" />
            </div>
            <h3 className={`text-lg font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI Order Insights</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className={`text-sm font-bold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                <FiTrendingUp className="text-green-500" /> Sales Trend
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Order volume is up <strong>15%</strong> compared to last week. Peak ordering time is <strong>12:00 PM - 2:00 PM</strong>.
              </p>
            </div>
            <div>
              <h4 className={`text-sm font-bold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                <FiClock className="text-blue-500" /> Processing Time
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Average processing time is <strong>1.2 days</strong>. Consider expediting "Pending" orders to improve customer satisfaction.
              </p>
            </div>
            <div>
              <h4 className={`text-sm font-bold mb-2 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-200' : 'text-slate-700'}`}>
                <FiShoppingBag className="text-purple-500" /> Top Products
              </h4>
              <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                Most ordered item: <strong>Leather Crossbody Bag</strong>. Recommendation: Restock soon.
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`p-5 rounded-lg shadow-lg border ${
          theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-background border-gray-100'
        }`}
      >
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

        <div
          className={`rounded-2xl shadow-sm overflow-x-auto border max-w-[90vw] md:max-w-full mx-auto ${
            theme === 'dark' ? 'bg-[#111827] border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <div className="w-full md:hidden">
            <div className="flex items-center justify-between px-4 pt-4">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                />
                <span
                  className={`text-sm ${
                    theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                  }`}
                >
                  Select all
                </span>
              </div>
            </div>
            <div className="px-4 pb-4 space-y-3">
              {currentOrders.map((order) => (
                <div
                  key={order.id}
                  onClick={() => navigate(`/seller-dashboard/order-details/${order.id}`)}
                  className={`mt-2 rounded-xl p-4 space-y-3 border cursor-pointer ${
                    theme === 'dark'
                      ? 'bg-[#020617] border-gray-700'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                        }`}
                      >
                        <img
                          src={order.image}
                          alt="Product"
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <span
                        className={`text-sm font-medium ${
                          theme === 'dark' ? 'text-slate-100' : 'text-text-grey'
                        }`}
                      >
                        {order.orderNumber}
                      </span>
                    </div>
                    <span className={getStatusBadge(order.status)}>
                      {order.status}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <p
                        className={`font-medium uppercase tracking-wide ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Date
                      </p>
                      <p
                        className={`mt-1 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-text-secondary'
                        }`}
                      >
                        {order.date}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`font-medium uppercase tracking-wide ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Customer
                      </p>
                      <p
                        className={`mt-1 ${
                          theme === 'dark' ? 'text-slate-300' : 'text-text-secondary'
                        }`}
                      >
                        {order.customer}
                      </p>
                    </div>
                    <div>
                      <p
                        className={`font-medium uppercase tracking-wide ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Price
                      </p>
                      <p
                        className={`mt-1 font-medium ${
                          theme === 'dark' ? 'text-slate-100' : 'text-text-secondary'
                        }`}
                      >
                        {order.price}
                      </p>
                    </div>
                  </div>
                  <div>
                    <button
                      onClick={() => navigate(`/seller-dashboard/order-details/${order.id}`)}
                      className={`text-sm mt-2 transition-colors ${
                        theme === 'dark'
                          ? 'text-slate-400 hover:text-slate-200'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-full hidden md:block">
            <table className="w-full">
              <thead
                className={`border-b ${
                  theme === 'dark' ? 'bg-[#020617] border-gray-700' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <tr>
                  <th className="px-6 py-4 text-left">
                    <input
                      type="checkbox"
                      checked={selectedOrders.length === currentOrders.length && currentOrders.length > 0}
                      onChange={handleSelectAll}
                      className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    Orders
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    Date
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    Customer
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    Price
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    Status
                  </th>
                  <th
                    className={`px-6 py-4 text-left text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-700'
                    }`}
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody
                className={`divide-y ${
                  theme === 'dark' ? 'divide-gray-700' : 'divide-gray-200'
                }`}
              >
                {currentOrders.map((order) => (
                  <tr
                    key={order.id}
                    onClick={() => navigate(`/seller-dashboard/order-details/${order.id}`)}
                    className={`transition-colors cursor-pointer ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onClick={(e) => e.stopPropagation()}
                        onChange={() => handleSelectOrder(order.id)}
                        className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                          }`}
                        >
                          <img 
                            src={order.image} 
                            alt="Product" 
                            className="w-8 h-8 object-contain"
                          />
                        </div>
                        <span
                          className={`text-sm font-medium ${
                            theme === 'dark' ? 'text-slate-100' : 'text-text-grey'
                          }`}
                        >
                          {order.orderNumber}
                        </span>
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        theme === 'dark' ? 'text-slate-300' : 'text-text-secondary'
                      }`}
                    >
                      {order.date}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm ${
                        theme === 'dark' ? 'text-slate-300' : 'text-text-secondary'
                      }`}
                    >
                      {order.customer}
                    </td>
                    <td
                      className={`px-6 py-4 text-sm font-medium ${
                        theme === 'dark' ? 'text-slate-100' : 'text-text-secondary'
                      }`}
                    >
                      {order.price}
                    </td>
                    <td className="px-6 py-4">
                      <span className={getStatusBadge(order.status)}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/seller-dashboard/order-details/${order.id}`)}
                        className={`text-sm transition-colors ${
                          theme === 'dark'
                            ? 'text-slate-400 hover:text-slate-200'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                      >
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
        <div
          className={`text-center py-12 rounded-2xl ${
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}
        >
          <img src="/icons/orders.svg" alt="No orders" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-text-primary'
            }`}
          >
            No orders found
          </h3>
          <p
            className={`mb-4 ${
              theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
            }`}
          >
            Try adjusting your search criteria
          </p>
        </div>
      )}
    </div>
  );
};

export default Orders;
