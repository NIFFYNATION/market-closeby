import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { TextInput, SelectInput } from '../../../components/forms/FormFields';
import { statesAndCities } from '../../../components/common/locationsData';

const StepLocationInfo = ({ formData, updateFormData, onNext, onBack }) => {
  const { theme } = useDashboardTheme();
  const [errors, setErrors] = useState({});

  const stateOptions = statesAndCities.map(s => s.name);
  const selectedStateData = statesAndCities.find(s => s.name === formData.state);
  const lgaOptions = selectedStateData ? selectedStateData.cities : [];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    
    // Clear LGA if state changes
    if (name === 'state') {
      updateFormData({ lga: '' });
    }

    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.address?.trim()) newErrors.address = 'Address is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.lga) newErrors.lga = 'LGA is required';
    
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
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Location Information</h2>
        <p className={`mt-1 ${textSecondary}`}>Where is your store located? This helps customers find you.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          id="address"
          name="address"
          label="Street Address"
          placeholder="e.g. 123 Market Street"
          value={formData.address || ''}
          onChange={handleInputChange}
          required
          error={errors.address}
          theme={theme}
          inputClassName={inputThemeClass}
          labelClassName={labelThemeClass}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SelectInput
            id="state"
            name="state"
            label="State"
            value={formData.state || ''}
            onChange={handleInputChange}
            options={stateOptions}
            required
            error={errors.state}
            theme={theme}
            inputClassName={inputThemeClass}
            labelClassName={labelThemeClass}
          />

          <SelectInput
            id="lga"
            name="lga"
            label="LGA"
            value={formData.lga || ''}
            onChange={handleInputChange}
            options={lgaOptions}
            required
            error={errors.lga}
            disabled={!formData.state}
            theme={theme}
            inputClassName={inputThemeClass}
            labelClassName={labelThemeClass}
          />
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

export default StepLocationInfo;
