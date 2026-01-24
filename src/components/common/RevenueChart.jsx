import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const RevenueChart = ({ 
  data, 
  title = "Total Revenue", 
  revenue = "₦890,270.00", 
  profit = "₦2,000", 
  selectedPeriod = "Last 7 days", 
  onPeriodChange,
  isVerified = true,
  className = "",
  theme = "light",
}) => {
  const isDark = theme === 'dark';

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length && isVerified) {
      const containerClass = isDark
        ? 'bg-gray-900 text-white border border-white/10'
        : 'bg-white text-gray-900 border border-gray-200';
      const subtitleClass = isDark ? 'text-gray-400' : 'text-gray-500';
      return (
        <div className={`${containerClass} px-3 py-2 rounded-lg text-sm shadow-lg`}>
          <div className="font-semibold">₦{payload[0].value * 10}</div>
          <div className={`text-xs ${subtitleClass}`}>July 18, 2025</div>
        </div>
      );
    }
    return null;
  };

  return (
    <div
      className={`p-6 rounded-lg shadow-sm w-full border ${
        isDark
          ? 'bg-[#1e1e1e] border-white/10'
          : 'bg-background border-gray-100'
      } ${className}`}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3
            className={`text-lg font-semibold ${
              isDark ? 'text-slate-200' : 'text-text-grey'
            }`}
          >
            {title}
          </h3>
          <div
            className={`text-2xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-primary text-gray-900'
            }`}
          >
            {revenue}
          </div>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => onPeriodChange && onPeriodChange(e.target.value)}
          className={`text-sm rounded-sm px-5 py-3 focus:outline-none focus:ring-2 ${
            isDark
              ? 'bg-[#111827] border border-white/10 text-slate-200 focus:ring-amber-400/40'
              : 'bg-[#F5F6FA] border border-[#DEE5ED] text-gray-700 focus:ring-primary/40'
          }`}
        >
          <option>Last 7 days</option>
          <option>Last 30 days</option>
          <option>Last 90 days</option>
        </select>
      </div>
      <div className="flex items-center justify-end space-x-2 mb-6">
        <span className="w-3 h-3 bg-danger rounded-full" />
        <span
          className={`text-sm ${
            isDark ? 'text-slate-300' : 'text-gray-600'
          }`}
        >
          Total Profit: {profit}
        </span>
      </div>
      
      {/* Recharts Implementation */}
      <div className="h-100 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
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
              stroke={isDark ? '#1f2937' : '#f3f4f6'}
              horizontal
              vertical
            />
            
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
              dy={10}
            />
            
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: isDark ? '#9ca3af' : '#6b7280' }}
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
      
      <div
        className={`text-xs md:text-lg mt-4 justify-self-center ${
          isDark ? 'text-slate-300' : 'text-text-grey'
        }`}
      >
        <span
          className={`font-bold ${
            isDark ? 'text-slate-100' : 'text-gray-600'
          }`}
        >
          {profit}
        </span>{' '}
        earned in booking fee over the{' '}
        <span
          className={`font-bold ${
            isDark ? 'text-slate-100' : 'text-gray-600'
          }`}
        >
          past 7 days
        </span>
      </div>
    </div>
  );
};

export default RevenueChart;
