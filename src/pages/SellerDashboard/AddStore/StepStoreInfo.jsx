import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { TextInput, TextareaInput, SelectInput } from '../../../components/forms/FormFields';
import { FiCpu, FiX, FiCheck } from 'react-icons/fi';
import { useToast } from '../../../context/ToastContext';

const StepStoreInfo = ({ formData, updateFormData, onNext }) => {
  const { theme } = useDashboardTheme();
  const { showToast } = useToast();
  const [errors, setErrors] = useState({});
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const categories = [
    'Electronics',
    'Fashion & Clothing',
    'Home & Garden',
    'Sports & Outdoors',
    'Books & Media',
    'Automotive',
    'Health & Beauty',
    'Toys & Games',
    'Food & Beverages',
    'Services',
    'Other'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name?.trim()) newErrors.name = 'Store name is required';
    if (!formData.description?.trim()) newErrors.description = 'Description is required';
    if (!formData.category) newErrors.category = 'Category is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onNext();
    }
  };

  const handleGenerateDescription = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedDesc = `Welcome to ${formData.name || 'our store'}! We specialize in providing high-quality products tailored to your needs. Based on your prompt "${aiPrompt}", we ensure the best service and customer satisfaction. Explore our collection today!`;
      updateFormData({ description: generatedDesc });
      setIsGenerating(false);
      setIsAiModalOpen(false);
      showToast('Description generated successfully!', 'success');
    }, 1500);
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
        <h2 className={`text-2xl font-bold ${textPrimary}`}>Store Information</h2>
        <p className={`mt-1 ${textSecondary}`}>Let's start by gathering some basic details about your store.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextInput
          id="name"
          name="name"
          label="Store Name"
          placeholder="e.g. My Awesome Store"
          value={formData.name || ''}
          onChange={handleInputChange}
          required
          error={errors.name}
          theme={theme}
          inputClassName={inputThemeClass}
          labelClassName={labelThemeClass}
        />

        <SelectInput
          id="category"
          name="category"
          label="Category"
          value={formData.category || ''}
          onChange={handleInputChange}
          options={categories}
          required
          error={errors.category}
          theme={theme}
          inputClassName={inputThemeClass}
          labelClassName={labelThemeClass}
        />

        <div className="relative">
          <div className="flex justify-between items-center mb-1">
            <label className={`block text-sm font-medium ${labelThemeClass}`}>
              Store Description
            </label>
            <button
              type="button"
              onClick={() => setIsAiModalOpen(true)}
              className="flex items-center gap-1 text-xs font-medium text-amber-500 hover:text-amber-400 transition-colors"
            >
              <FiCpu className="w-3 h-3" />
              Generate with AI
            </button>
          </div>
          <TextareaInput
            id="description"
            name="description"
            // Label handled above for custom layout
            placeholder="Describe your store..."
            value={formData.description || ''}
            onChange={handleInputChange}
            rows={4}
            required
            error={errors.description}
            theme={theme}
            inputClassName={inputThemeClass}
            labelClassName="hidden"
          />
        </div>

        <TextInput
          id="socialPlatform"
          name="socialPlatform"
          label="Social Platform (Optional)"
          placeholder="Paste link to your social media page"
          value={formData.socialPlatform || ''}
          onChange={handleInputChange}
          theme={theme}
          inputClassName={inputThemeClass}
          labelClassName={labelThemeClass}
        />

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-8 py-3 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] font-bold rounded-lg transition-colors shadow-lg shadow-amber-500/20"
          >
            Continue
          </button>
        </div>
      </form>

      {/* AI Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${
            theme === 'dark' ? 'bg-[#1e1e1e] border border-white/10' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-500/20 flex items-center justify-center text-amber-500">
                  <FiCpu className="w-5 h-5" />
                </div>
                <h3 className={`text-lg font-bold ${textPrimary}`}>AI Description Generator</h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 ${textSecondary}`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <p className={`text-sm mb-4 ${textSecondary}`}>
              Tell us a bit about your business, and our AI will write a professional description for you.
            </p>

            <textarea
              className={`w-full p-3 rounded-lg text-sm mb-4 outline-none focus:ring-2 focus:ring-amber-500/50 ${
                theme === 'dark' 
                  ? 'bg-[#111827] text-slate-200 border border-gray-700' 
                  : 'bg-slate-50 text-slate-900 border border-gray-200'
              }`}
              rows={4}
              placeholder="e.g. We sell handmade leather bags sourced from local artisans..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsAiModalOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleGenerateDescription}
                disabled={!aiPrompt.trim() || isGenerating}
                className={`px-4 py-2 rounded-lg text-sm font-bold bg-amber-500 text-[#1a1a4b] hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20 flex items-center gap-2 ${
                  (!aiPrompt.trim() || isGenerating) ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isGenerating ? 'Generating...' : 'Generate'}
                {!isGenerating && <FiCpu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StepStoreInfo;
