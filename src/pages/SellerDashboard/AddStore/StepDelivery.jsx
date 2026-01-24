import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { SelectInput } from '../../../components/forms/FormFields';
import { FiTruck } from 'react-icons/fi';

const StepDelivery = ({ formData, updateFormData, onNext, onBack }) => {
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
    if (!formData.pickupAvailable) newErrors.pickupAvailable = 'Please select if pickup is available';
    if (!formData.preferredCourier) newErrors.preferredCourier = 'Please select a preferred courier';
    
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

  const pickupOptions = ['Yes', 'No'];
  const courierOptions = ['DHL', 'FedEx', 'GIG Logistics', 'Local Riders', 'Self Delivery', 'None'];

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Delivery Options</h2>
        <p className={`mt-1 ${textSecondary}`}>How will your customers get their products?</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className={`p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center text-amber-500">
              <FiTruck className="w-6 h-6" />
            </div>
            <div>
              <h3 className={`text-lg font-bold ${textPrimary}`}>Logistics Preferences</h3>
              <p className={`text-sm ${textSecondary}`}>Set up your delivery and pickup preferences</p>
            </div>
          </div>

          <div className="space-y-4">
            <SelectInput
              id="pickupAvailable"
              name="pickupAvailable"
              label="Is Pickup Available?"
              value={formData.pickupAvailable || ''}
              onChange={handleInputChange}
              options={pickupOptions}
              required
              error={errors.pickupAvailable}
              theme={theme}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
            />

            <SelectInput
              id="preferredCourier"
              name="preferredCourier"
              label="Preferred Courier Service"
              value={formData.preferredCourier || ''}
              onChange={handleInputChange}
              options={courierOptions}
              required
              error={errors.preferredCourier}
              theme={theme}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
            />
          </div>
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
            Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepDelivery;
