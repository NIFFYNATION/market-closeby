import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { useToast } from '../../../context/ToastContext';
import { FiShield, FiUploadCloud, FiFileText, FiX } from 'react-icons/fi';

const StepBusinessId = ({ formData, updateFormData, onNext, onBack }) => {
  const { theme } = useDashboardTheme();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState(false);

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
    updateFormData({ cacDocument: file });
  };

  const removeFile = () => {
    updateFormData({ cacDocument: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // CAC document is optional for now or depending on business type, 
    // but let's assume optional for small businesses to start
    onNext();
  };

  // Theme classes
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const labelThemeClass = theme === 'dark' ? 'text-slate-300' : 'text-gray-700';

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Business Registration</h2>
        <p className={`mt-1 ${textSecondary}`}>Upload your CAC documents if you have a registered business. This adds credibility to your store.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className={`block text-sm font-medium ${labelThemeClass}`}>
            Upload CAC Document (Optional)
          </label>
          
          {!formData.cacDocument ? (
            <div 
              className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                dragActive 
                  ? 'border-amber-500 bg-amber-500/10' 
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
                  <FiShield className="w-6 h-6" />
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
                    {formData.cacDocument.name || 'CAC Document Uploaded'}
                  </p>
                  <p className={`text-xs ${textSecondary}`}>
                    {formData.cacDocument.size ? `${(formData.cacDocument.size / 1024 / 1024).toFixed(2)} MB` : 'File ready'}
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
        </div>

        <div className={`p-4 rounded-lg ${
          theme === 'dark' ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'
        }`}>
          <p className="text-sm">
            <strong>Note:</strong> Skipping this step means your store will be marked as "Unregistered Business" which might limit some features or customer trust. You can always upload it later.
          </p>
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
            {formData.cacDocument ? 'Continue' : 'Skip & Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepBusinessId;
