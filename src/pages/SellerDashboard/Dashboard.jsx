import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/common/Button';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedPeriod, setSelectedPeriod] = useState('Last 7 days');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm shadow-lg">
          <div className="font-semibold">₦{payload[0].value * 10}</div>
          <div className="text-xs text-gray-300">July 18, 2025</div>
        </div>
      );
    }
    return null;
  };

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '/icons/home.svg', path: '/dashboard', active: true },
    { id: 'products', label: 'All Products', icon: '/icons/shop.svg', path: '/products' },
    { id: 'orders', label: 'Orders', icon: '/icons/orders-white.svg', path: '/orders' },
    { id: 'wallet', label: 'Wallet', icon: '/icons/wallet-bold.svg', path: '/wallet' },
    { id: 'settings', label: 'Settings', icon: '/icons/settings-white.svg', path: '/settings' },
  ];

  const statsCards = [
    { title: 'Total Products', value: '15', period: 'Past 30 days', trend: 'up' },
    { title: 'Completed Orders', value: '15', period: 'Past 30 days', trend: 'up' },
    { title: 'Pending Orders', value: '15', period: 'Past 30 days', trend: 'up' },
  ];

  const transactions = [
    { product: 'Kenwood', amount: '₦100,000', quantity: 1, date: '19th July 2025', status: 'Pending' },
    { product: 'SilverCrest', amount: '₦240,000', quantity: 2, date: '19th July 2025', status: 'Success' },
    { product: 'SilverCrest', amount: '₦240,000', quantity: 2, date: '19th July 2025', status: 'Success' },
    { product: 'SilverCrest', amount: '₦240,000', quantity: 2, date: '19th July 2025', status: 'Success' },
    { product: 'SilverCrest', amount: '₦240,000', quantity: 2, date: '19th July 2025', status: 'Success' },
    { product: 'SilverCrest', amount: '₦240,000', quantity: 2, date: '19th July 2025', status: 'Success' },
  ];

  const customers = [
    { id: '01', name: 'Janet Ibrahim', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-purple-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
    { id: '02', name: 'Olajide Samuel', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face&auto=format', bgColor: 'bg-orange-100' },
  ];

  const handleLogout = () => {
    navigate('/auth');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50  font-['Poppins']">
          {/* Header */}
        <div className="bg-primary fixed w-full z-10 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <img src="./icons/Logo.svg" alt="" /> 
              <button 
                onClick={toggleSidebar}
                className="w-6 h-6 block lg:hidden"
              >
                <img src="./icons/menu-white.svg" alt="Menu" className="w-6 h-6" /> 
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img src="/icons/bell.svg" alt="Notifications" className="w-6 h-6 text-gray-400" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
              </div>
              <img src="/icons/help.svg" alt="Help" className="w-6 h-6 text-gray-400" />
              <div className="w-10 h-10 rounded-full flex items-center justify-center">
                <img src="/icons/profile-avatar.svg" alt="Profile" className="w-10 h-10 text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 backdrop-blur-sm bg-black/40 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-50 mt-0 lg:mt-19 bg-primary text-white flex flex-col transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0
      `}>
        {/* Navigation */}
        <nav className="flex-1 mt-16 lg:mt-0">
          {sidebarItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`grid items-center px-6 py-5 gap-3 text-sm font-medium transition-all duration-200 ${
                item.active
                  ? 'bg-background text-primary'
                  : 'text-background hover:text-background hover:bg-[#2c2678]'
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <img src={item.icon} alt={item.label} className="w-5 h-5 justify-self-center" />
              <span className="justify-self-center">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-6 ">
          <button
            onClick={handleLogout}
            className="grid gap-3 items-center justify-self-center  text-gray-300 hover:text-white transition-colors duration-200"
          >
            <img src="/icons/logout-white.svg" alt="Logout" className="w-5 h-5 justify-self-center" />
            <span className="text-sm font-medium ">Logout</span>
          </button>
        </div>
      </div>
      

      {/* Main Content */}
      <div className="max-w-[100%] lg:ml-50">
    
        
        {/* Content */}
        <div className="p-8 space-y-8 overflow-y-auto h-full w-full">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row items-start justify-between mt-20 gap-4">
            <h2 className="text-3xl font-semibold text-gray-900">Welcome, Fortune 👋</h2>
            <Button variant="secondary">
              Add New Product +
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
              <div className="text-2xl font-bold mb-2">₦******</div>
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
          <div className="flex flex-col xl:flex-row gap-8">
            {/* Revenue Chart */}
            <div className="space-y-8 w-full">
              <div className="bg-background p-6 rounded-lg shadow-sm w-full">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-semibold text-text-grey">Total Revenue</h3>
                    <div className="text-2xl font-bold text-gray-900 mb-2 text-primary">₦890,270.00</div>
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
                  <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                  <span className="text-sm text-gray-600">Total Profit: ₦2,000</span>
                </div>
                
                {/* Recharts Implementation */}
                <div className="h-100 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={chartData}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
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
                  <span className='font-bold text-gray-600'>₦2000</span> earned in booking fee over the <span className="font-bold text-gray-600">past 7 days</span>
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
                      {transactions.map((transaction, index) => (
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
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Customer List */}
            <div className="bg-background p-6 rounded-lg shadow-sm w-full lg:w-2/4">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Customer</h3>
              <div className="space-y-4 max-h-80 overflow-y-scroll sidebar-scrollbar">
                {customers.map((customer, index) => (
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
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;