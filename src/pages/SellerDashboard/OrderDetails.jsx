import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboardTheme } from './DashboardLayout';
import { FiArrowLeft, FiPrinter, FiUser, FiMapPin, FiCreditCard, FiPackage, FiClock, FiCheckCircle, FiXCircle, FiTruck } from 'react-icons/fi';
import { ordersData } from '../../components/productsData';

const OrderDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useDashboardTheme();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    // Simulate fetching order details
    const foundOrder = ordersData.find(o => o.id.toString() === id);
    
    if (foundOrder) {
      // Enrich basic order data with mock details
      setOrder({
        ...foundOrder,
        email: 'customer@example.com',
        phone: '+234 801 234 5678',
        shippingAddress: {
          street: '123 Market Street',
          city: 'Lagos',
          state: 'Lagos State',
          country: 'Nigeria',
          zip: '100001'
        },
        billingAddress: {
          street: '123 Market Street',
          city: 'Lagos',
          state: 'Lagos State',
          country: 'Nigeria',
          zip: '100001'
        },
        paymentMethod: 'Credit Card (ending in 4242)',
        items: [
          {
            id: 1,
            name: 'Product Name Mock', // In real app, fetch actual product name
            image: foundOrder.image,
            price: foundOrder.price,
            quantity: 1,
            variant: 'Standard'
          }
        ],
        subtotal: foundOrder.price,
        shippingFee: '₦1,500',
        tax: '₦500',
        total: foundOrder.price // Simplified for mock
      });
    }
  }, [id]);

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const cardBg = theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-200';
  const sectionBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-50';

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className={textSecondary}>Loading order details...</p>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const baseClasses = 'px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1';
    switch (status) {
      case 'Completed':
        return <span className={`${baseClasses} bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400`}><FiCheckCircle /> Completed</span>;
      case 'Pending':
        return <span className={`${baseClasses} bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400`}><FiClock /> Pending</span>;
      case 'Cancelled':
        return <span className={`${baseClasses} bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400`}><FiXCircle /> Cancelled</span>;
      default:
        return <span className={`${baseClasses} bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-400`}>{status}</span>;
    }
  };

  return (
    <div className="max-w-6xl mx-auto pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/seller-dashboard/orders')}
            className={`p-2 rounded-lg border transition-colors ${
              theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
            }`}
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>Order {order.orderNumber}</h1>
            <p className={`text-sm ${textSecondary}`}>{order.date} • {order.items.length} Items</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {getStatusBadge(order.status)}
          <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
            theme === 'dark' ? 'border-white/10 hover:bg-white/5 text-white' : 'border-slate-200 hover:bg-slate-50 text-slate-700'
          }`}>
            <FiPrinter className="w-4 h-4" /> Print Invoice
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content - Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Items */}
          <div className={`rounded-xl border p-6 ${cardBg}`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${textPrimary}`}>
              <FiPackage className="w-5 h-5 text-orange-500" /> Order Items
            </h3>
            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div key={idx} className={`flex items-start gap-4 p-4 rounded-lg ${sectionBg}`}>
                  <div className="w-16 h-16 rounded-lg bg-white overflow-hidden flex-shrink-0 border border-slate-200 dark:border-white/10">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className={`font-medium ${textPrimary}`}>{item.name}</h4>
                        <p className={`text-sm ${textSecondary}`}>Variant: {item.variant}</p>
                      </div>
                      <span className={`font-bold ${textPrimary}`}>{item.price}</span>
                    </div>
                    <div className="mt-2 flex items-center justify-between text-sm">
                      <span className={textSecondary}>Qty: {item.quantity}</span>
                      <span className={`font-medium ${textPrimary}`}>Total: {item.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Details */}
          <div className={`rounded-xl border p-6 ${cardBg}`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${textPrimary}`}>
              <FiCreditCard className="w-5 h-5 text-orange-500" /> Payment Details
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200 dark:border-white/10">
                <span className={textSecondary}>Subtotal</span>
                <span className={`font-medium ${textPrimary}`}>{order.subtotal}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200 dark:border-white/10">
                <span className={textSecondary}>Shipping Fee</span>
                <span className={`font-medium ${textPrimary}`}>{order.shippingFee}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-dashed border-slate-200 dark:border-white/10">
                <span className={textSecondary}>Tax (VAT)</span>
                <span className={`font-medium ${textPrimary}`}>{order.tax}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className={`font-bold ${textPrimary}`}>Total</span>
                <span className="text-xl font-bold text-orange-500">{order.total}</span>
              </div>
            </div>
            <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${sectionBg}`}>
              <div className="w-10 h-6 bg-slate-200 dark:bg-white/10 rounded flex items-center justify-center text-xs font-bold">VISA</div>
              <div>
                <p className={`text-sm font-medium ${textPrimary}`}>{order.paymentMethod}</p>
                <p className={`text-xs ${textSecondary}`}>Paid on {order.date}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar - Right Column */}
        <div className="space-y-6">
          {/* Customer Info */}
          <div className={`rounded-xl border p-6 ${cardBg}`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${textPrimary}`}>
              <FiUser className="w-5 h-5 text-orange-500" /> Customer
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 flex items-center justify-center font-bold text-lg">
                {order.customer.charAt(0)}
              </div>
              <div>
                <h4 className={`font-bold ${textPrimary}`}>{order.customer}</h4>
                <p className={`text-sm ${textSecondary}`}>Verified Customer</p>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sectionBg} ${textSecondary}`}>
                  <FiPackage className="w-4 h-4" />
                </div>
                <div>
                  <p className={textSecondary}>Email</p>
                  <p className={`font-medium ${textPrimary}`}>{order.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${sectionBg} ${textSecondary}`}>
                  <FiUser className="w-4 h-4" />
                </div>
                <div>
                  <p className={textSecondary}>Phone</p>
                  <p className={`font-medium ${textPrimary}`}>{order.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address */}
          <div className={`rounded-xl border p-6 ${cardBg}`}>
            <h3 className={`font-bold mb-4 flex items-center gap-2 ${textPrimary}`}>
              <FiMapPin className="w-5 h-5 text-orange-500" /> Shipping Address
            </h3>
            <p className={`text-sm leading-relaxed ${textSecondary}`}>
              {order.shippingAddress.street}<br />
              {order.shippingAddress.city}, {order.shippingAddress.state}<br />
              {order.shippingAddress.country}, {order.shippingAddress.zip}
            </p>
            
            <div className={`mt-4 pt-4 border-t border-dashed border-slate-200 dark:border-white/10`}>
                <h4 className={`font-medium mb-2 ${textPrimary} flex items-center gap-2 text-sm`}>
                    <FiTruck className="w-4 h-4" /> Billing Address
                </h4>
                <p className={`text-xs leading-relaxed ${textSecondary}`}>
                    Same as shipping address
                </p>
            </div>
          </div>
          
          {/* Order Note */}
           <div className={`rounded-xl border p-6 ${cardBg}`}>
            <h3 className={`font-bold mb-2 ${textPrimary}`}>Order Note</h3>
            <p className={`text-sm italic ${textSecondary}`}>
              "Please call before delivery. Leave at the front desk if I am not around."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
