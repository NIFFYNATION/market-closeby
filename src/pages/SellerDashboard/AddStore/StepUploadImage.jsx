import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { FiUploadCloud, FiImage, FiTrash2 } from 'react-icons/fi';
import { useToast } from '../../../context/ToastContext';

const StepUploadImage = ({ formData, updateFormData, onNext, onBack, isSubmitting }) => {
  const { theme } = useDashboardTheme();
  const { showToast } = useToast();
  const [dragActive, setDragActive] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(formData.image || null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
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
    // Check file type
    if (!file.type.match('image.*')) {
      showToast('Please upload an image file', 'error');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showToast('File size should not exceed 5MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target.result);
      updateFormData({ image: e.target.result });
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    updateFormData({ image: null });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onNext();
  };

  // Theme classes
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-8">
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Store Logo</h2>
        <p className={`mt-1 ${textSecondary}`}>Upload a logo to make your store stand out.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div 
          className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all ${
            dragActive 
              ? 'border-amber-500 bg-amber-500/10' 
              : theme === 'dark' ? 'border-gray-700 hover:border-amber-500/50' : 'border-gray-300 hover:border-amber-500/50'
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={handleChange}
          />
          
          {previewUrl ? (
            <div className="relative inline-block">
              <img 
                src={previewUrl} 
                alt="Store Logo Preview" 
                className="w-48 h-48 object-cover rounded-xl shadow-lg"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
              >
                <FiTrash2 className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-8">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
                theme === 'dark' ? 'bg-white/5 text-slate-400' : 'bg-slate-100 text-slate-500'
              }`}>
                <FiImage className="w-10 h-10" />
              </div>
              <div>
                <p className={`text-lg font-medium ${textPrimary}`}>Drag & Drop your logo here</p>
                <p className={`text-sm mt-1 ${textSecondary}`}>or</p>
              </div>
              <label 
                htmlFor="file-upload"
                className="inline-block px-6 py-2 bg-white/10 border border-white/10 rounded-lg cursor-pointer hover:bg-white/20 transition-colors text-amber-500 font-medium"
              >
                Browse Files
              </label>
              <p className={`text-xs ${textSecondary}`}>
                Supports: JPG, PNG, GIF (Max 5MB)
              </p>
            </div>
          )}
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
            disabled={isSubmitting}
            className={`px-8 py-3 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/20 ${
              isSubmitting ? 'opacity-70 cursor-wait' : ''
            }`}
          >
            {isSubmitting ? 'Creating Store...' : 'Create Store'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StepUploadImage;
