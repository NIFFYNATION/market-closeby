import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDashboardTheme } from './DashboardLayout';
import { FiArrowLeft, FiCheckCircle, FiClock, FiAlertCircle, FiFileText, FiUploadCloud } from 'react-icons/fi';
import { useSellerStore } from '../../store/sellerStore';

const VerificationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useDashboardTheme();
  const { stores } = useSellerStore();
  const [store, setStore] = useState(null);

  useEffect(() => {
    // Find store by ID (handle string vs number comparison)
    const foundStore = stores.find(s => s.id.toString() === id);
    if (foundStore) {
      setStore(foundStore);
    }
  }, [id, stores]);

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const cardBg = theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-200';
  const sectionBg = theme === 'dark' ? 'bg-white/5' : 'bg-slate-50';

  if (!store) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-orange-500 mb-4"></div>
        <p className={textSecondary}>Loading verification details...</p>
      </div>
    );
  }

  // Mock detailed steps based on store status
  const getSteps = () => {
    const status = store.verificationStatus || 'not_started';
    
    // Base steps
    const steps = [
      {
        id: 'identity',
        title: 'Identity Verification',
        desc: 'Government issued ID card or Passport',
        status: 'verified',
        date: '2024-01-15'
      },
      {
        id: 'address',
        title: 'Address Verification',
        desc: 'Utility bill or Bank statement',
        status: 'verified',
        date: '2024-01-16'
      },
      {
        id: 'business',
        title: 'Business Registration',
        desc: 'Certificate of Incorporation',
        status: 'pending',
        date: '2024-01-20'
      },
      {
        id: 'bank',
        title: 'Bank Account',
        desc: 'Bank account details for payouts',
        status: 'not_started',
        date: null
      }
    ];

    // Adjust steps based on overall status
    if (status === 'verified') {
      return steps.map(s => ({ ...s, status: 'verified', date: '2024-01-15' }));
    } else if (status === 'rejected') {
      steps[2].status = 'rejected';
      steps[2].reason = 'Document blurry, please re-upload.';
    } else if (status === 'not_started') {
      return steps.map(s => ({ ...s, status: 'not_started', date: null }));
    }

    return steps;
  };

  const steps = getSteps();

  const getStatusIcon = (status) => {
    switch (status) {
      case 'verified': return <FiCheckCircle className="w-5 h-5 text-green-500" />;
      case 'pending': return <FiClock className="w-5 h-5 text-amber-500" />;
      case 'rejected': return <FiAlertCircle className="w-5 h-5 text-red-500" />;
      default: return <div className={`w-5 h-5 rounded-full border-2 ${theme === 'dark' ? 'border-slate-600' : 'border-slate-300'}`}></div>;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-green-500';
      case 'pending': return 'text-amber-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <button 
        onClick={() => navigate('/seller-dashboard/verification-status')}
        className={`flex items-center gap-2 mb-6 text-sm font-medium transition-colors ${
          theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
        }`}
      >
        <FiArrowLeft className="w-4 h-4" />
        Back to Status
      </button>

      <div className="mb-8">
        <div className="flex items-center gap-4 mb-2">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold ${
            theme === 'dark' ? 'bg-white/5 text-white' : 'bg-slate-100 text-slate-600'
          }`}>
            {store.name.charAt(0)}
          </div>
          <div>
            <h1 className={`text-2xl font-bold ${textPrimary}`}>{store.name}</h1>
            <p className={textSecondary}>Verification ID: #{store.id.toString().padStart(6, '0')}</p>
          </div>
        </div>
      </div>

      <div className={`rounded-xl border overflow-hidden ${cardBg}`}>
        <div className={`p-6 border-b ${theme === 'dark' ? 'border-white/10' : 'border-slate-200'}`}>
          <h2 className={`text-lg font-bold ${textPrimary}`}>Verification Progress</h2>
          <p className={`text-sm ${textSecondary}`}>Complete all steps to activate your store.</p>
        </div>

        <div className="divide-y divide-white/10">
          {steps.map((step, index) => (
            <div key={step.id} className={`p-6 flex gap-4 ${step.status === 'not_started' ? 'opacity-60' : ''}`}>
              <div className="mt-1">
                {getStatusIcon(step.status)}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className={`font-bold ${textPrimary}`}>{step.title}</h3>
                  <span className={`text-xs font-bold uppercase ${getStatusColor(step.status)}`}>
                    {step.status.replace('_', ' ')}
                  </span>
                </div>
                <p className={`text-sm mb-2 ${textSecondary}`}>{step.desc}</p>
                
                {step.date && (
                  <p className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>
                    Updated on {step.date}
                  </p>
                )}

                {step.status === 'rejected' && (
                  <div className="mt-3 p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                    <p className="text-sm text-red-500 flex items-center gap-2">
                      <FiAlertCircle className="w-4 h-4" />
                      {step.reason}
                    </p>
                    <button className="mt-2 text-xs font-bold text-red-500 hover:text-red-400 underline">
                      Re-upload Document
                    </button>
                  </div>
                )}

                {step.status === 'not_started' && (
                  <button className={`mt-3 px-4 py-2 rounded-lg text-sm font-medium border flex items-center gap-2 transition-colors ${
                    theme === 'dark' 
                      ? 'border-white/10 hover:bg-white/5 text-slate-300' 
                      : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                  }`}>
                    <FiUploadCloud className="w-4 h-4" />
                    Upload Document
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VerificationDetails;
