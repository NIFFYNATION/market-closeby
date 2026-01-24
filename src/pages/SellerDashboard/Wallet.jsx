import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import RevenueChart from '../../components/common/RevenueChart';
import { useDashboardTheme } from './DashboardLayout';

const Wallet = () => {
  const { theme } = useDashboardTheme();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
  const [selectedTransactionPeriod, setSelectedTransactionPeriod] = useState('Last 7 days');

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

  // Transaction data
  const transactions = [
    { type: 'Withdrawal', amount: '₦100,000', date: '18th July 2025', status: 'Paid' },
    { type: 'Withdrawal', amount: '₦100,000', date: '18th July 2025', status: 'Paid' },
    { type: 'Withdrawal', amount: '₦100,000', date: '18th July 2025', status: 'Paid' },
  ];

  return (
    <div
      className={`p-0 md:p-6 min-h-screen font-sans ${
        theme === 'dark' ? 'bg-[#121212]' : 'bg-gray-50'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 pb-6">
        <h1
          className={`text-2xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-text-primary'
          }`}
        >
          Wallet Balance
        </h1>
        <Button variant="secondary">
          Withdraw Now
        </Button>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        {/* Wallet Balance */}
        <div
          className={`p-8 rounded-2xl ${
            theme === 'dark'
              ? 'bg-teal-900/30'
              : 'bg-teal-100'
          }`}
        >
          <h3
            className={`text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-teal-200' : 'text-gray-600'
            }`}
          >
            Wallet Balance
          </h3>
          <div
            className={`text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            ₦120,000.00
          </div>
        </div>

        {/* Available For Withdraw */}
        <div
          className={`p-8 rounded-2xl ${
            theme === 'dark'
              ? 'bg-orange-900/30'
              : 'bg-orange-100'
          }`}
        >
          <h3
            className={`text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-orange-200' : 'text-gray-600'
            }`}
          >
            Available For Withdraw
          </h3>
          <div
            className={`text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            ₦80,000.00
          </div>
        </div>

        {/* Pending Earnings */}
        <div
          className={`p-8 rounded-2xl ${
            theme === 'dark'
              ? 'bg-purple-900/30'
              : 'bg-purple-100'
          }`}
        >
          <h3
            className={`text-sm font-medium mb-2 ${
              theme === 'dark' ? 'text-purple-200' : 'text-gray-600'
            }`}
          >
            Pending Earnings
          </h3>
          <div
            className={`text-3xl font-bold mb-4 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            ₦30,000.00
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <RevenueChart
        data={chartData}
        title="Total Revenue"
        revenue="₦890,270.00"
        profit="₦2000"
        selectedPeriod={selectedPeriod}
        onPeriodChange={setSelectedPeriod}
        isVerified={true}
        className="mb-8"
        theme={theme}
      />

      {/* Transaction History */}
      <div
        className={`p-6 rounded-xl shadow-sm border ${
          theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-background border-gray-100'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <h3
            className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-primary'
            }`}
          >
            Transaction history
          </h3>
          <select 
            value={selectedTransactionPeriod}
            onChange={(e) => setSelectedTransactionPeriod(e.target.value)}
            className={`text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#130C76] focus:border-[#130C76] ${
              theme === 'dark'
                ? 'bg-[#111827] border border-white/10 text-slate-200'
                : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        <div className="mt-4 space-y-3 md:hidden max-w-[90vw] mx-auto">
          {transactions.map((transaction, index) => (
            <div
              key={index}
              className={`rounded-lg p-4 border ${
                theme === 'dark'
                  ? 'bg-[#020617] border-gray-700'
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
                    Transaction Type
                  </p>
                  <p
                    className={`mt-1 text-sm font-medium ${
                      theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
                    }`}
                  >
                    {transaction.type}
                  </p>
                </div>
                <span
                  className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full text-success ${
                    theme === 'dark' ? 'bg-green-900/30 text-green-300' : ''
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
                      theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
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
                    Date
                  </p>
                  <p
                    className={`mt-1 ${
                      theme === 'dark' ? 'text-slate-300' : 'text-gray-900'
                    }`}
                  >
                    {transaction.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative max-w-[90vw] md:max-w-full mx-auto overflow-x-auto hidden md:block">
          <div className="max-h-80 overflow-y-auto">
            <table className="min-w-[640px] w-full">
              <thead
                className={`sticky top-0 z-10 ${
                  theme === 'dark' ? 'bg-[#020617]' : 'bg-gray-100'
                }`}
              >
                <tr className=''>
                  <th
                    className={`px-4 sm:px-6 py-2 sm:py-3 text-left text-[11px] sm:text-xs font-medium uppercase tracking-wider ${
                      theme === 'dark' ? 'text-slate-400' : 'text-gray-500'
                    }`}
                  >
                    Transaction Type
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
                  theme === 'dark' ? 'bg-[#020617] divide-gray-700' : 'bg-gray-50 divide-gray-200'
                }`}
              >
                {transactions.map((transaction, index) => (
                  <tr
                    key={index}
                    className={`transition-colors duration-200 ${
                      theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-gray-50'
                    }`}
                  >
                    <td
                      className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-medium ${
                        theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
                      }`}
                    >
                      {transaction.type}
                    </td>
                    <td
                      className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm font-semibold ${
                        theme === 'dark' ? 'text-slate-100' : 'text-gray-900'
                      }`}
                    >
                      {transaction.amount}
                    </td>
                    <td
                      className={`px-4 sm:px-6 py-3 whitespace-nowrap text-xs sm:text-sm ${
                        theme === 'dark' ? 'text-slate-300' : 'text-gray-900'
                      }`}
                    >
                      {transaction.date}
                    </td>
                    <td className="px-4 sm:px-6 py-3 whitespace-nowrap">
                      <span
                        className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full text-success ${
                          theme === 'dark' ? 'bg-green-900/30 text-green-300' : ''
                        }`}
                      >
                        {transaction.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
