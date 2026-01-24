import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDashboardTheme } from './DashboardLayout';
import { FiCheckCircle, FiClock, FiAlertCircle, FiChevronRight } from 'react-icons/fi';
import { useSellerStore } from '../../store/sellerStore';

const VerificationStatus = () => {
  const { theme } = useDashboardTheme();
  const { stores } = useSellerStore();
  const navigate = useNavigate();

  // Mock verification statuses for demonstration
  // In a real app, this would come from the backend/store data
  const getVerificationStatus = (storeId) => {
    const statuses = ['verified', 'pending', 'rejected', 'not_started'];
    // Deterministic random based on ID
    return statuses[storeId % statuses.length];
  };

  const getStatusDetails = (status) => {
    switch (status) {
      case 'verified':
        return {
          icon: <FiCheckCircle className="w-6 h-6 text-green-500" />,
          color: 'text-green-500',
          bg: 'bg-green-500/10',
          label: 'Verified',
          desc: 'Your store is fully verified and visible to customers.'
        };
      case 'pending':
        return {
          icon: <FiClock className="w-6 h-6 text-amber-500" />,
          color: 'text-amber-500',
          bg: 'bg-amber-500/10',
          label: 'Pending Review',
          desc: 'We are currently reviewing your documents. This usually takes 24-48 hours.'
        };
      case 'rejected':
        return {
          icon: <FiAlertCircle className="w-6 h-6 text-red-500" />,
          color: 'text-red-500',
          bg: 'bg-red-500/10',
          label: 'Action Required',
          desc: 'Some documents were rejected. Please check your email for details and re-upload.'
        };
      default:
        return {
          icon: <FiAlertCircle className="w-6 h-6 text-slate-400" />,
          color: 'text-slate-400',
          bg: 'bg-slate-400/10',
          label: 'Not Started',
          desc: 'Please complete the verification process to activate your store.'
        };
    }
  };

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const cardBg = theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-200';

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className={`text-2xl font-bold ${textPrimary}`}>Verification Status</h1>
        <p className={`mt-1 ${textSecondary}`}>Track the verification status of your stores.</p>
      </div>

      <div className="space-y-4">
        {stores.map((store) => {
          const status = getVerificationStatus(store);
          const details = getStatusDetails(status);

          return (
            <div 
              key={store.id} 
              className={`rounded-xl border p-6 flex flex-col md:flex-row md:items-center gap-6 ${cardBg}`}
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-16 h-16 rounded-xl flex items-center justify-center text-2xl font-bold ${
                  theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-600'
                }`}>
                  {store.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>{store.name}</h3>
                  <p className={`text-sm ${textSecondary}`}>ID: {store.id}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  {details.icon}
                  <span className={`font-bold ${details.color}`}>{details.label}</span>
                </div>
                <p className={`text-sm ${textSecondary}`}>{details.desc}</p>
              </div>

              <div className="flex items-center justify-end">
                {status === 'not_started' || status === 'rejected' ? (
                  <button 
                    onClick={() => navigate(`/seller-dashboard/verification-details/${store.id}`)}
                    className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/20 text-sm"
                  >
                    Start Verification
                  </button>
                ) : (
                  <button 
                    onClick={() => navigate(`/seller-dashboard/verification-details/${store.id}`)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors flex items-center gap-2 ${
                    theme === 'dark' 
                      ? 'border-white/10 hover:bg-white/5 text-slate-300' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}>
                    View Details
                    <FiChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {stores.length === 0 && (
          <div className={`text-center py-12 rounded-xl border border-dashed ${
            theme === 'dark' ? 'border-white/10 text-slate-500' : 'border-slate-300 text-slate-400'
          }`}>
            <p>You haven't added any stores yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VerificationStatus;
