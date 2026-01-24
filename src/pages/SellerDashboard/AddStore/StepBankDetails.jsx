import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { TextInput } from '../../../components/forms/FormFields';
import { FiCreditCard, FiLock } from 'react-icons/fi';

const StepBankDetails = ({ formData, updateFormData, onNext, onBack }) => {
  const { theme } = useDashboardTheme();
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.bankName?.trim()) newErrors.bankName = 'Bank Name is required';
    if (!formData.accountNumber?.trim()) newErrors.accountNumber = 'Account Number is required';
    if (!formData.accountHolderName?.trim()) newErrors.accountHolderName = 'Account Holder Name is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  // Theme classes
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const inputThemeClass = theme === 'dark'
    ? 'bg-[#111827] border-gray-700 text-slate-100 placeholder-slate-500'
    : 'border-gray-300 bg-white text-slate-900';
  const labelThemeClass = theme === 'dark' ? 'text-slate-300' : 'text-gray-700';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Bank Account Details</h2>
        <p className={`mt-1 ${textSecondary}`}>Where should we send your payouts?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center text-green-500">
              <FiCreditCard className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${textPrimary}`}>Payout Information</h3>
              <p className={`text-sm ${textSecondary}`}>Ensure these details match your bank account</p>
            </div>
          </div>

          <div className="space-y-4">
            <TextInput
              id="bankName"
              name="bankName"
              label="Bank Name"
              placeholder="e.g. GTBank, Access Bank"
              value={formData.bankName || ''}
              onChange={handleInputChange}
              required
              error={errors.bankName}
              theme={theme}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
            />

            <TextInput
              id="accountNumber"
              name="accountNumber"
              label="Account Number"
              placeholder="0123456789"
              value={formData.accountNumber || ''}
              onChange={handleInputChange}
              required
              error={errors.accountNumber}
              theme={theme}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
            />

            <TextInput
              id="accountHolderName"
              name="accountHolderName"
              label="Account Holder Name"
              placeholder="As it appears on your bank card"
              value={formData.accountHolderName || ''}
              onChange={handleInputChange}
              required
              error={errors.accountHolderName}
              theme={theme}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
            />
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 justify-center">
          <FiLock className="w-3 h-3" />
          <span>Your banking information is encrypted and secure.</span>
        </div>

        <div className="flex justify-between pt-6">
          <button
            type="button"
            onClick={onBack}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              theme === 'dark' 
                ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/20"
          >
            Complete Setup
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepBankDetails;
