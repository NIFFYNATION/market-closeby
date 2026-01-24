import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import RevenueChart from '../../components/common/RevenueChart';
import { useDashboardTheme } from './DashboardLayout';
import { useSellerStore } from '../../store/sellerStore';

const DashboardHome = () => {
  const navigate = useNavigate();
  const { theme } = useDashboardTheme();
  const { getCurrentStore } = useSellerStore();
  const currentStore = getCurrentStore();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
  const [isVerified] = useState(true);

  // Chart data
  const chartData = [
    { name: 'Mon', value: 25 },
    { name: 'Tue', value: 45 },
    { name: 'Wed', value: 35 },
    { name: 'Thu', value: 28 },
    { name: 'Fri', value: 40 },
    { name: 'Sat', value: 30 },
    { name: 'Sun', value: 22 }
  ];

  // Empty chart data for unverified users
  const emptyChartData = [
    { name: 'Mon', value: 0 },
    { name: 'Tue', value: 0 },
    { name: 'Wed', value: 0 },
    { name: 'Thu', value: 0 },
    { name: 'Fri', value: 0 },
    { name: 'Sat', value: 0 },
    { name: 'Sun', value: 0 }
  ];

  const statsCards = [
    { title: 'Total Products', value: isVerified ? '15' : '0', period: 'Past 30 days', trend: 'up' },
    { title: 'Completed Orders', value: isVerified ? '15' : '0', period: 'Past 30 days', trend: 'up' },
    { title: 'Pending Orders', value: isVerified ? '15' : '0', period: 'Past 30 days', trend: 'up' },
  ];

  const transactions = [
    { product: isVerified ? 'Kenwood' : '***', amount: isVerified ? '₦100,000' : '₦***', quantity: isVerified ? 1 : '***', date: isVerified ? '19th July 2025' : '***', status: isVerified ? 'Pending' : '***' },
    { product: isVerified ? 'SilverCrest' : '***', amount: isVerified ? '₦240,000' : '₦***', quantity: isVerified ? 2 : '***', date: isVerified ? '19th July 2025' : '***', status: isVerified ? 'Success' : '***' },
    { product: isVerified ? 'SilverCrest' : '***', amount: isVerified ? '₦240,000' : '₦***', quantity: isVerified ? 2 : '***', date: isVerified ? '19th July 2025' : '***', status: isVerified ? 'Success' : '***' },
    { product: isVerified ? 'SilverCrest' : '***', amount: isVerified ? '₦240,000' : '₦***', quantity: isVerified ? 2 : '***', date: isVerified ? '19th July 2025' : '***', status: isVerified ? 'Success' : '***' },
    { product: isVerified ? 'SilverCrest' : '***', amount: isVerified ? '₦240,000' : '₦***', quantity: isVerified ? 2 : '***', date: isVerified ? '19th July 2025' : '***', status: isVerified ? 'Success' : '***' },
    { product: isVerified ? 'SilverCrest' : '***', amount: isVerified ? '₦240,000' : '₦***', quantity: isVerified ? 2 : '***', date: isVerified ? '19th July 2025' : '***', status: isVerified ? 'Success' : '***' },
  ];

  const customers = [
    { id: '01', name: 'Janet Ibrahim', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-purple-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
  ];

  return (
    <>
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row items-start justify-between gap-4 pb-6">
        <h2
          className={`text-3xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          Welcome, {currentStore?.name || 'Seller'} 👋
        </h2>
        <Button
          variant="secondary"
          onClick={() => navigate(isVerified ? '/seller-dashboard/add-product' : '/store-setup')}
        >
          {isVerified ? 'Add New Product +' : 'Complete setup'}
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Wallet Balance Card */}
        <div className="bg-gray-800 text-white p-6 rounded-xl relative overflow-hidden">
          <div className="flex items-center justify-end mb-4">
            <img src="./icons/options.svg" alt="options" className='justify-self-center'/>
          </div>
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-300">Wallet Balance</h3>
            <img src="/icons/eye-hidden.svg" alt="Edit" className="w-4 h-4 text-gray-400" />
          </div>
          <div className="text-2xl font-bold mb-2">{isVerified ? '₦******' : '₦******'}</div>
        </div>

        {/* Stats Cards */}
        {statsCards.map((stat, index) => (
          <div
            key={index}
            className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200 ${
              theme === 'dark'
                ? 'bg-[#1e1e1e] border-white/10'
                : 'bg-white border-gray-100'
            }`}
          >
            <h3
              className={`text-sm font-medium mb-2 ${
                theme === 'dark' ? 'text-slate-300' : 'text-gray-600'
              }`}
            >
              {stat.title}
            </h3>
            <div
              className={`text-3xl font-bold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {stat.value}
            </div>
            <div className="flex items-center justify-between">
              <span
                className={`text-sm ${
                  theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                }`}
              >
                {stat.period}
              </span>
              <div className="w-24 h-16">
                <img src="./icons/graph.svg" alt="Graph" className="w-24 h-16" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart and Customer List */}
      <div className="flex flex-col xl:flex-row gap-8 mt-15">

        {/* Revenue Chart */}
        <div className="space-y-8 w-full xl:w-2/3">
          <RevenueChart
            data={isVerified ? chartData : emptyChartData}
            title="Total Revenue"
            revenue={isVerified ? '₦890,270.00' : '₦0'}
            profit={isVerified ? '₦2,000' : '₦0'}
            selectedPeriod={selectedPeriod}
            onPeriodChange={setSelectedPeriod}
            isVerified={isVerified}
            theme={theme}
          />

          {/* Transaction History */}
          <div
            className={`p-6 rounded-xl shadow-sm w-full ${
              theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-background'
            }`}
          >
            <div
              className={`flex items-center justify-between p-6 border-b ${
                theme === 'dark' ? 'border-white/10' : 'border-gray-200'
              }`}
            >
              <h3
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Transaction history
              </h3>
              <select
                className={`text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#130C76] focus:border-[#130C76] ${
                  theme === 'dark'
                    ? 'bg-[#1e1e1e] border border-white/10 text-slate-200'
                    : 'bg-white border border-gray-300 text-gray-700'
                }`}
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            <div className="mt-4 space-y-3 md:hidden max-w-[90vw] mx-auto">
              {!isVerified ? (
                <div
                  className={`py-6 px-4 rounded-lg text-center ${
                    theme === 'dark'
                      ? 'bg-[#1e1e1e] text-slate-400'
                      : 'bg-white text-gray-500'
                  }`}
                >
                  No transaction yet
                </div>
              ) : (
                transactions.map((transaction, index) => (
                  <div
                    key={index}
                    className={`rounded-lg p-4 border ${
                      theme === 'dark'
                        ? 'bg-[#1e1e1e] border-white/10'
                        : 'bg-white border-gray-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p
                          className={`text-[11px] font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                          }`}
                        >
                          Product name
                        </p>
                        <p
                          className={`mt-1 text-sm font-medium ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {transaction.product}
                        </p>
                      </div>
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                          transaction.status === 'Success'
                            ? ' text-success'
                            : ' text-danger'
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <p
                          className={`font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                          }`}
                        >
                          Amount
                        </p>
                        <p
                          className={`mt-1 ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}
                        >
                          {transaction.amount}
                        </p>
                      </div>
                      <div>
                        <p
                          className={`font-medium uppercase tracking-wide ${
                            theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                          }`}
                        >
                          Quantity sold
                        </p>
                        <p
                          className={`mt-1 ${
                            theme === 'dark' ? 'text-slate-200' : 'text-gray-900'
                          }`}
                        >
                          {transaction.quantity}
                        </p>
                      </div>
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
                            theme === 'dark' ? 'text-slate-200' : 'text-gray-900'
                          }`}
                        >
                          {transaction.date}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="relative max-w-[90vw] md:max-w-full mx-auto overflow-x-auto hidden md:block">
              <div className="max-h-80 overflow-y-auto">
                <table className="min-w-[640px] w-full">
                  <thead
                    className={`sticky top-0 z-10 ${
                      theme === 'dark' ? 'bg-[#111827]' : 'bg-gray-50'
                    }`}
                  >
                    <tr>
                      <th
                        className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase tracking-wider ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Product name
                      </th>
                      <th
                        className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase tracking-wider ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Amount
                      </th>
                      <th
                        className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase tracking-wider ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Quantity sold
                      </th>
                      <th
                        className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase tracking-wider ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Date
                      </th>
                      <th
                        className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase tracking-wider ${
                          theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                        }`}
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y ${
                      theme === 'dark'
                        ? 'bg-[#1e1e1e] divide-gray-700'
                        : 'bg-background divide-gray-200'
                    }`}
                  >
                    {!isVerified ? (
                      <tr>
                        <td
                          colSpan="5"
                          className={`px-6 py-8 text-center ${
                            theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                          }`}
                        >
                          No transaction yet
                        </td>
                      </tr>
                    ) : (
                      transactions.map((transaction, index) => (
                        <tr
                          key={index}
                          className={`transition-colors duration-200 ${
                            theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                          }`}
                        >
                          <td
                            className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {transaction.product}
                          </td>
                          <td
                            className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-semibold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {transaction.amount}
                          </td>
                          <td
                            className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm ${
                              theme === 'dark' ? 'text-slate-200' : 'text-gray-900'
                            }`}
                          >
                            {transaction.quantity}
                          </td>
                          <td
                            className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm ${
                              theme === 'dark' ? 'text-slate-200' : 'text-gray-900'
                            }`}
                          >
                            {transaction.date}
                          </td>
                          <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                            <span
                              className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${
                                transaction.status === 'Success'
                                  ? ' text-success'
                                  : ' text-danger'
                              }`}
                            >
                              {transaction.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Customer List */}
        <div className="w-full xl:w-1/3">
         <div
           className={`p-6 rounded-lg shadow-sm w-full ${
             theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-background'
           }`}
         >
           <h3
             className={`text-lg font-semibold mb-6 ${
               theme === 'dark' ? 'text-white' : 'text-gray-900'
             }`}
           >
             Customer
           </h3>
          <div className="space-y-4 max-h-80 overflow-y-scroll sidebar-scrollbar">
            {isVerified ? (
              customers.map((customer, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-2 rounded-lg transition-colors duration-200 ${
                    theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`text-sm font-medium w-6 ${
                      theme === 'dark' ? 'text-slate-400' : 'text-gray-600'
                    }`}
                  >
                    {customer.id}
                  </span>
                  <div className={`w-8 h-8 ${customer.bgColor} rounded-full flex items-center justify-center overflow-hidden`}>
                    <img 
                      src={customer.avatar} 
                      alt={customer.name} 
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                      }}
                    />
                    <div className="w-5 h-5 hidden">
                      <img src="/icons/user.svg" alt={customer.name} className="w-full h-full" />
                    </div>
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  >
                    {customer.name}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p
                  className={theme === 'dark' ? 'text-slate-400' : 'text-gray-500'}
                >
                  No customer yet
                </p>
              </div>
            )}
          </div>
         </div>

       {/* Setup Storefront Card - Only shown for unverified sellers */}
{!isVerified && (
  <div className="mt-8">
    <div className="bg-[url('/imgs/mask.png')] bg-cover p-6 rounded-xl shadow-sm relative overflow-hidden">

      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Setup your</h3>
          <h3 className="text-xl font-bold text-gray-900 mb-3">storefront</h3>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => navigate('/store-setup')}
              className="flex items-center space-x-2 text-gray-700 font-medium hover:text-gray-900 transition-colors duration-200 cursor-pointer"
            >
              <span>Complete this process</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </div>
        </div>
        <div className="relative flex items-center justify-center">
          {/* Circular Progress Background */}
          <div className="w-20 h-20 relative">
            {/* Background Circle */}
            <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="white"
                strokeWidth="6"
                fill="none"
                opacity="0.6"
              />
              {/* Progress Circle */}
              <circle
                cx="40"
                cy="40"
                r="32"
                stroke="#1e40af"
                strokeWidth="6"
                fill="none"
                strokeDasharray={`${2 * Math.PI * 32}`}
                strokeDashoffset={`${2 * Math.PI * 32 * (1 - 0.1)}`}
                strokeLinecap="round"
                className="transition-all duration-300"
              />
            </svg>
            {/* Percentage Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-900">10%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </>
  );
};

export default DashboardHome;
