import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DashboardHome = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
  
  // Seller verification status - you can modify this based on your authentication logic
  const [isVerified, setIsVerified] = useState(false);

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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length && isVerified) {
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
          <div className="font-semibold">₦{payload[0].value * 10}</div>
          <div className="text-xs text-gray-300">July 18, 2025</div>
        </div>
      );
    }
    return null;
  };

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
        <h2 className="text-3xl font-semibold text-gray-900">Welcome, Fortune 👋</h2>
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
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
            <h3 className="text-sm font-medium text-gray-600 mb-2">{stat.title}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{stat.period}</span>
              <div className="w-24 h-16">
                <img src="./icons/graph.svg" alt="Graph" className='w-24 h-16'/>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart and Customer List */}
      <div className="flex flex-col xl:flex-row gap-8 mt-15">

        {/* Revenue Chart */}
        <div className="space-y-8 w-full">
          <div className="bg-background p-6 rounded-lg shadow-sm w-full">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-text-grey">Total Revenue</h3>
                <div className="text-2xl font-bold text-gray-900 mb-2 text-primary">{isVerified ? '₦890,270.00' : '₦0'}</div>
              </div>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="text-sm bg-[#F5F6FA] border border-[#DEE5ED] rounded-sm px-5 py-3 focus:outline-none focus:ring-2"
              >
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="flex items-center justify-end space-x-2 mb-6">
              <span className="w-3 h-3 bg-danger rounded-full"></span>
              <span className="text-sm text-gray-600">Total Profit: {isVerified ? '₦2,000' : '₦0'}</span>
            </div>
            
            {/* Recharts Implementation */}
            <div className="h-100 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={isVerified ? chartData : emptyChartData}
                  margin={{
                    top: 20,
                    right: 30,
                    left: 0,
                    bottom: 20,
                  }}
                >
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  
                  <CartesianGrid 
                    strokeDasharray="0" 
                    stroke="#f3f4f6" 
                    horizontal={true}
                    vertical={true}
                  />
                  
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 15, fill: '#6b7280' }}
                    dy={10}
                  />
                  
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 15, fill: '#6b7280' }}
                    domain={[0, 50]}
                    ticks={[0, 10, 20, 30, 40, 50]}
                  />
                  
                  <Tooltip 
                    content={<CustomTooltip />}
                    cursor={false}
                  />
                  
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    strokeWidth={3}
                    fill="url(#colorGradient)"
                    dot={{ fill: '#ef4444', strokeWidth: 0, r: 8 }}
                    activeDot={{ r: 6, fill: '#ef4444', strokeWidth: 0 }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-sm text-text-grey mt-4 justify-self-center">
              <span className='font-bold text-gray-600'>{isVerified ? '₦2000' : '₦0'}</span> earned in booking fee over the <span className="font-bold text-gray-600">past 7 days</span>
            </div>
          </div>

          {/* Transaction History */}
          <div className="bg-background p-6 rounded-xl shadow-sm w-full">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Transaction history</h3>
              <select className="text-sm border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#130C76] focus:border-[#130C76] bg-white">
                <option>Last 7 days</option>
                <option>Last 30 days</option>
                <option>Last 90 days</option>
              </select>
            </div>
            <div className="max-w-[900px] overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Quantity sold
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-background divide-y divide-gray-200">
                  {!isVerified ? (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-gray-500">
                        No transaction yet
                      </td>
                    </tr>
                  ) : (
                    transactions.map((transaction, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {transaction.product}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-semibold">
                          {transaction.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.quantity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {transaction.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
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

        {/* Customer List */}
        <div className=" lg:w-2/4">
         <div className='bg-background p-6 rounded-lg shadow-sm w-full'>
           <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer</h3>
          <div className="space-y-4 max-h-80 overflow-y-scroll sidebar-scrollbar">
            {isVerified ? (
              customers.map((customer, index) => (
                <div key={index} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors duration-200">
                  <span className="text-sm font-medium text-gray-600 w-6">{customer.id}</span>
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
                  <span className="text-sm font-medium text-gray-900">{customer.name}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No customer yet</p>
              </div>
            )}
          </div>
         </div>

             {/* Setup Storefront Card - Only shown for unverified sellers */}
      {!isVerified && (
        <div className="mt-8">
          <div className="bg-[url('/imgs/mask.png')] bg-cover p-6 rounded-xl  shadow-sm relative overflow-hidden">

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Setup your storefront</h3>
                <p className="text-gray-600 mb-4">Complete this process</p>
                <Button
                  variant="primary"
                  onClick={() => navigate('/store-setup')}
                  className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Complete this process →
                </Button>
              </div>
              <div className="relative">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">10%</span>
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