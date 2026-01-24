import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { TextInput } from '../../../components/forms/FormFields';
import { useToast } from '../../../context/ToastContext';
import { FiUserCheck, FiUploadCloud, FiFileText, FiX } from 'react-icons/fi';

const StepKyc = ({ formData, updateFormData, onNext, onBack }) => {
  const { theme } = useDashboardTheme();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // In a real app, we would upload this file to a server/storage
    // Here we'll just simulate it by storing the file object or a fake URL
    updateFormData({ idDocument: file });
    if (errors.idDocument) {
      setErrors({ ...errors, idDocument: null });
    }
  };

  const removeFile = () => {
    updateFormData({ idDocument: null });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName?.trim()) newErrors.fullName = 'Full Name is required';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.idDocument) newErrors.idDocument = 'ID Document is required';
    
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
        <h2 className={`text-2xl font-bold ${textPrimary}`}>KYC Verification</h2>
        <p className={`mt-1 ${textSecondary}`}>We need to verify your identity to ensure a safe marketplace.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          id="fullName"
          name="fullName"
          label="Full Legal Name"
          placeholder="As it appears on your ID"
          value={formData.fullName || ''}
          onChange={handleInputChange}
          required
          error={errors.fullName}
          theme={theme}
          inputClassName={inputThemeClass}
          labelClassName={labelThemeClass}
        />

        <TextInput
          id="dateOfBirth"
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          value={formData.dateOfBirth || ''}
          onChange={handleInputChange}
          required
          error={errors.dateOfBirth}
          theme={theme}
          inputClassName={inputThemeClass}
          labelClassName={labelThemeClass}
        />

        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelThemeClass}`}>
            Upload ID Document (National ID, Driver's License, or Passport) <span className="text-red-500">*</span>
          </label>
          
          {!formData.idDocument ? (
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-amber-500 bg-amber-500/10' 
                  : errors.idDocument
                    ? 'border-red-500 bg-red-500/5'
                    : theme === 'dark' ? 'border-gray-700 hover:border-gray-600 bg-[#111827]' : 'border-gray-300 hover:border-gray-400 bg-slate-50'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <input 
                type="file" 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleChange}
                accept="image/*,.pdf"
              />
              <div className="flex flex-col items-center justify-center pointer-events-none">
                <div className={`w-12 h-12 rounded-full mb-3 flex items-center justify-center ${
                  theme === 'dark' ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  <FiUploadCloud className="w-6 h-6" />
                </div>
                <p className={`font-medium ${textPrimary}`}>Click to upload or drag and drop</p>
                <p className={`text-xs mt-1 ${textSecondary}`}>SVG, PNG, JPG or PDF (max. 5MB)</p>
              </div>
            </div>
          ) : (
            <div className={`flex items-center justify-between p-4 rounded-xl border ${
              theme === 'dark' ? 'bg-[#111827] border-gray-700' : 'bg-slate-50 border-gray-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <FiFileText className="w-5 h-5" />
                </div>
                <div>
                  <p className={`text-sm font-medium ${textPrimary}`}>
                    {formData.idDocument.name || 'ID Document Uploaded'}
                  </p>
                  <p className={`text-xs ${textSecondary}`}>
                    {formData.idDocument.size ? `${(formData.idDocument.size / 1024 / 1024).toFixed(2)} MB` : 'File ready'}
                  </p>
                </div>
              </div>
              <button 
                type="button"
                onClick={removeFile}
                className={`p-2 rounded-lg hover:bg-slate-200 dark:hover:bg-white/10 ${textSecondary}`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
          )}
          {errors.idDocument && <p className="text-red-500 text-xs mt-1">{errors.idDocument}</p>}
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

export default StepKyc;
