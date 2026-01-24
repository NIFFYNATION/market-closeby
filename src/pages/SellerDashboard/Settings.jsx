import React, { useState } from 'react';
import { TextInput, SelectInput, TextareaInput } from '../../components/forms/FormFields';
import { statesAndCities } from '../../components/common/locationsData';
import { categories } from '../../components/common/categoryData';
import { useDashboardTheme } from './DashboardLayout';
import { 
  FiUser, 
  FiShoppingBag, 
  FiCreditCard, 
  FiLock, 
  FiSave, 
  FiCamera,
  FiCheck,
  FiAlertCircle,
  FiArrowLeft,
  FiChevronRight
} from 'react-icons/fi';

const Settings = () => {
  const { theme } = useDashboardTheme();
  const [activeTab, setActiveTab] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    country: '',
    // Store Information fields
    storeName: "",
    storeDescription: '',
    state: '',
    lga: '',
    category: '',
    address: '',
    // Bank Settings fields
    bankName: '',
    accountNumber: '',
    accountHolderName: '',
    // Security fields
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState('');
  const [saveMessageType, setSaveMessageType] = useState('');

  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });

  const tabs = [
    { 
      id: 'Personal Information', 
      label: 'Personal Information', 
      icon: FiUser,
      description: 'Update your profile photo and personal details.' 
    },
    { 
      id: 'Store Information', 
      label: 'Store Information', 
      icon: FiShoppingBag,
      description: 'Manage your store profile, location, and category.'
    },
    { 
      id: 'Bank Settings', 
      label: 'Bank Settings', 
      icon: FiCreditCard,
      description: 'Configure your payout bank account and details.'
    },
    { 
      id: 'Security', 
      label: 'Security', 
      icon: FiLock,
      description: 'Update your password and security preferences.'
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentTab = () => {
    const newErrors = {};

    if (activeTab === 'Personal Information') {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address.';
      }
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required.';
      if (!formData.country.trim()) newErrors.country = 'Country is required.';
    }

    if (activeTab === 'Store Information') {
      if (!formData.storeName.trim()) newErrors.storeName = 'Store name is required.';
      if (!formData.state.trim()) newErrors.state = 'State is required.';
      if (!formData.lga.trim()) newErrors.lga = 'LGA is required.';
      if (!formData.category.trim()) newErrors.category = 'Category is required.';
      if (!formData.address.trim()) newErrors.address = 'Address is required.';
    }

    if (activeTab === 'Bank Settings') {
      if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required.';
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required.';
      } else if (!/^\d{10}$/.test(formData.accountNumber)) {
        newErrors.accountNumber = 'Account number must be 10 digits.';
      }
      if (!formData.accountHolderName.trim()) newErrors.accountHolderName = 'Account holder name is required.';
    }

    if (activeTab === 'Security') {
      if (!formData.currentPassword.trim()) newErrors.currentPassword = 'Current password is required.';
      if (!formData.newPassword.trim()) {
        newErrors.newPassword = 'New password is required.';
      } else if (formData.newPassword.length < 8) {
        newErrors.newPassword = 'New password must be at least 8 characters.';
      }
      if (!formData.confirmPassword.trim()) {
        newErrors.confirmPassword = 'Please re-type your new password.';
      } else if (formData.confirmPassword !== formData.newPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    }

    return newErrors;
  };

  const handleSave = () => {
    const validationErrors = validateCurrentTab();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setSaveMessage('Please fix the highlighted fields.');
      setSaveMessageType('error');
      
      // Auto clear message after 3 seconds
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setSaveMessage('Settings saved successfully.');
    setSaveMessageType('success');
    console.log('Saving form data:', formData);
    
    // Auto clear message after 3 seconds
    setTimeout(() => setSaveMessage(''), 3000);
  };

  // Get states for dropdown
  const stateOptions = statesAndCities.map(state => state.name);
  
  // Get cities based on selected state
  const selectedStateData = statesAndCities.find(state => state.name === formData.state);
  const lgaOptions = selectedStateData ? selectedStateData.cities : [];
  
  // Get category options
  const categoryOptions = categories.map(category => category.name);

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const inputThemeClass = `rounded-xl border transition-all duration-200 ${
    theme === 'dark'
      ? 'bg-[#111827] border-gray-700 text-slate-100 placeholder-slate-500 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
      : 'bg-white border-gray-200 text-slate-900 placeholder-slate-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500'
  }`;

  const labelThemeClass = theme === 'dark' ? 'text-slate-300' : 'text-slate-700';
  const cardBgClass = theme === 'dark' ? 'bg-[#1e1e1e] border-white/5' : 'bg-white border-slate-100';
  const headingClass = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const subHeadingClass = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';

  const renderTabContent = () => {
    return (
      <div className={`rounded-3xl p-6 md:p-10 shadow-lg border ${cardBgClass} animate-fadeIn`}>
        {activeTab === 'Personal Information' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="relative group cursor-pointer flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 dark:bg-gray-800 ring-4 ring-white dark:ring-[#1e1e1e] shadow-xl">
                  <img 
                    src="/icons/profile-avatar.svg" 
                    alt="Profile" 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiCamera className="w-10 h-10 text-white" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform ring-4 ring-white dark:ring-[#1e1e1e]">
                   <FiCamera className="w-5 h-5" />
                </div>
              </div>
              <div className="text-center md:text-left flex-1">
                <h3 className={`text-2xl font-bold mb-2 ${headingClass}`}>Profile Picture</h3>
                <p className={`text-sm mb-4 ${subHeadingClass}`}>
                  Upload a high-quality profile picture to help customers recognize you.
                  <br />Supported formats: PNG, JPG up to 5MB.
                </p>
                <div className="flex gap-3 justify-center md:justify-start">
                  <button className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-50 text-amber-600 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-500 dark:hover:bg-amber-500/20 transition-colors">
                    Upload New
                  </button>
                  <button className="px-4 py-2 text-sm font-medium rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
                    Remove
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <TextInput
                id="fullName"
                name="fullName"
                label="Full Name"
                placeholder="John Fortune"
                value={formData.fullName}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.fullName}
                theme={theme}
              />
              <TextInput
                id="email"
                name="email"
                label="Email Address"
                placeholder="Johnfortune@gmail.com"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.email}
                theme={theme}
              />
              <TextInput
                id="phoneNumber"
                name="phoneNumber"
                label="Phone Number"
                placeholder="07044567654"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.phoneNumber}
                theme={theme}
              />
              <TextInput
                id="country"
                name="country"
                label="Country"
                placeholder="Nigeria"
                value={formData.country}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.country}
                theme={theme}
              />
            </div>
          </div>
        )}

        {activeTab === 'Store Information' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <TextInput
                id="storeName"
                name="storeName"
                label="Store Name"
                placeholder='Fortune Store'
                value={formData.storeName}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.storeName}
                theme={theme}
              />
              <SelectInput
                id="category"
                name="category"
                label="Category"
                value={formData.category}
                onChange={handleInputChange}
                options={categoryOptions}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.category}
                theme={theme}
              />
            </div>
            
            <TextareaInput
              id="storeDescription"
              name="storeDescription"
              label="Store Description"
              value={formData.storeDescription}
              onChange={handleInputChange}
              rows={4}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
              helperText="Tell customers what your store is about."
              theme={theme}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <SelectInput
                id="state"
                name="state"
                label="State"
                value={formData.state}
                onChange={handleInputChange}
                options={stateOptions}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.state}
                theme={theme}
              />
              <SelectInput
                id="lga"
                name="lga"
                label="LGA"
                value={formData.lga}
                onChange={handleInputChange}
                options={lgaOptions}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.lga}
                theme={theme}
              />
            </div>
            
            <TextInput
              id="address"
              name="address"
              label="Full Address"
              value={formData.address}
              onChange={handleInputChange}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
              required
              error={errors.address}
              theme={theme}
            />
          </div>
        )}

        {activeTab === 'Bank Settings' && (
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/50 flex items-start gap-3">
              <FiAlertCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-800 dark:text-blue-200 mb-1">Important Note</h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                  Please ensure your bank details are 100% correct. All payouts will be processed to this account. 
                  Changes to bank details may require a 24-hour verification period.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <TextInput
                id="bankName"
                name="bankName"
                label="Bank Name"
                placeholder='Guaranty Trust Bank'
                value={formData.bankName}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.bankName}
                theme={theme}
              />
              <TextInput
                id="accountNumber"
                name="accountNumber"
                label="Account Number"
                placeholder='0154993028'
                value={formData.accountNumber}
                onChange={handleInputChange}
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                required
                error={errors.accountNumber}
                theme={theme}
              />
            </div>
            
            <TextInput
              id="accountHolderName"
              name="accountHolderName"
              label="Account Holder Name"
              placeholder='John Fortune'
              value={formData.accountHolderName}
              onChange={handleInputChange}
              inputClassName={inputThemeClass}
              labelClassName={labelThemeClass}
              required
              error={errors.accountHolderName}
              theme={theme}
            />
          </div>
        )}

        {activeTab === 'Security' && (
          <div className="space-y-8 max-w-2xl mx-auto">
            <div className="relative">
              <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 pr-12 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${inputThemeClass}`}
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                >
                  <img src="/icons/eye-hidden.svg" alt="Toggle" className="w-5 h-5 opacity-70" />
                </button>
              </div>
              {errors.currentPassword && <p className="mt-1 text-xs text-red-500">{errors.currentPassword}</p>}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <div className="relative">
                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>New Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${inputThemeClass}`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <img src="/icons/eye-hidden.svg" alt="Toggle" className="w-5 h-5 opacity-70" />
                  </button>
                </div>
                {errors.newPassword && <p className="mt-1 text-xs text-red-500">{errors.newPassword}</p>}
              </div>

              <div className="relative">
                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 pr-12 outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 ${inputThemeClass}`}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    <img src="/icons/eye-hidden.svg" alt="Toggle" className="w-5 h-5 opacity-70" />
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1 text-xs text-red-500">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="pt-2 flex justify-between items-center">
               <button className="text-sm text-amber-500 hover:text-amber-600 font-medium transition-colors">
                  Forgot your password?
               </button>
               <span className={`text-xs ${subHeadingClass}`}>
                 Last changed 3 months ago
               </span>
            </div>
          </div>
        )}

        <div className="mt-10 pt-8 border-t border-gray-100 dark:border-white/5 flex justify-end">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] font-semibold py-3.5 px-10 rounded-xl transition-all duration-200 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/30 active:scale-95"
          >
            <FiSave className="w-5 h-5" />
            Save Changes
          </button>
        </div>
      </div>
    );
  };

  // Get header info
  const activeTabInfo = tabs.find(t => t.id === activeTab);

  return (
    <div className="min-h-screen p-4 lg:p-8 pb-24">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-8">
          {activeTab ? (
             <button 
               onClick={() => setActiveTab(null)}
               className={`group flex items-center gap-2 mb-4 text-sm font-medium transition-colors ${
                 theme === 'dark' ? 'text-slate-400 hover:text-white' : 'text-slate-500 hover:text-slate-900'
               }`}
             >
               <div className={`p-1.5 rounded-full transition-colors ${
                 theme === 'dark' ? 'group-hover:bg-white/10' : 'group-hover:bg-slate-100'
               }`}>
                  <FiArrowLeft className="w-4 h-4" />
               </div>
               Back to Settings
             </button>
          ) : (
            <>
              <h1 className={`text-2xl lg:text-3xl font-bold mb-2 ${headingClass}`}>Settings</h1>
              <p className={`${subHeadingClass}`}>Manage your account settings and preferences.</p>
            </>
          )}
        </div>

        {/* Content */}
        {activeTab ? (
           <div className="animate-fadeIn">
              <div className="mb-6">
                <h2 className={`text-xl font-bold ${headingClass}`}>{activeTabInfo?.label}</h2>
                <p className={`text-sm ${subHeadingClass}`}>{activeTabInfo?.description}</p>
              </div>

              {/* Toast Notification */}
              {saveMessage && (
                <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 animate-slideDown ${
                  saveMessageType === 'success' 
                    ? 'bg-green-500/10 text-green-500 border border-green-500/20' 
                    : 'bg-red-500/10 text-red-500 border border-red-500/20'
                }`}>
                  {saveMessageType === 'success' ? <FiCheck className="w-5 h-5" /> : <FiAlertCircle className="w-5 h-5" />}
                  <span className="font-medium">{saveMessage}</span>
                </div>
              )}
              
              {renderTabContent()}
           </div>
        ) : (
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
             {tabs.map((tab) => {
               const Icon = tab.icon;
               return (
                 <button
                   key={tab.id}
                   onClick={() => setActiveTab(tab.id)}
                   className={`text-left p-6 rounded-2xl border transition-all duration-300 group hover:-translate-y-1 hover:shadow-lg ${
                     theme === 'dark' 
                       ? 'bg-[#1e1e1e] border-white/5 hover:border-amber-500/50 hover:shadow-amber-500/10' 
                       : 'bg-white border-slate-100 hover:border-amber-200 hover:shadow-amber-500/10'
                   }`}
                 >
                   <div className="flex justify-between items-start mb-4">
                     <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                       theme === 'dark' ? 'bg-amber-500/10 text-amber-500' : 'bg-amber-50 text-amber-600'
                     }`}>
                       <Icon className="w-6 h-6" />
                     </div>
                     <FiChevronRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 ${
                       theme === 'dark' ? 'text-slate-600' : 'text-slate-300'
                     }`} />
                   </div>
                   
                   <h3 className={`text-lg font-bold mb-2 ${headingClass}`}>{tab.label}</h3>
                   <p className={`text-sm ${subHeadingClass}`}>{tab.description}</p>
                 </button>
               );
             })}
           </div>
        )}
      </div>
    </div>
  );
};

export default Settings;
