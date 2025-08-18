import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import RevenueChart from '../../components/common/RevenueChart';

const Wallet = () => {
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
    <div className="p-0 md:p-6 bg-gray-50 min-h-screen font-sans">
      {/* Header */}
      <div className="flex  items-center justify-between gap-4 pb-6">
        <h1 className="text-2xl font-semibold text-text-primary">Wallet Balance</h1>
        <Button variant="secondary">
          Withdraw Now
        </Button>
      </div>

      {/* Wallet Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-center">
        {/* Wallet Balance */}
        <div className="bg-teal-100 p-8  rounded-2xl">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Wallet Balance</h3>
          <div className="text-3xl font-bold text-gray-900 mb-4">₦120,000.00</div>
        </div>

        {/* Available For Withdraw */}
        <div className="bg-orange-100 p-8 rounded-2xl">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Available For Withdraw</h3>
          <div className="text-3xl font-bold text-gray-900 mb-4">₦80,000.00</div>
        </div>

        {/* Pending Earnings */}
        <div className="bg-purple-100 p-8 rounded-2xl">
          <h3 className="text-sm font-medium text-gray-600 mb-2">Pending Earnings</h3>
          <div className="text-3xl font-bold text-gray-900 mb-4">₦30,000.00</div>
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
      />

      {/* Transaction History */}
      <div className="bg-background p-6 rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-primary">Transaction history</h3>
          <select 
            value={selectedTransactionPeriod}
            onChange={(e) => setSelectedTransactionPeriod(e.target.value)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#130C76] focus:border-[#130C76] bg-white"
          >
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
          </select>
        </div>

        {/* Transaction Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr className=''>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 divide-y divide-gray-200">
              {transactions.map((transaction, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {transaction.type}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                    {transaction.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {transaction.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex px-3 py-1 text-xs font-semibold rounded-full text-success">
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
  );
};

export default Wallet;