import React, { useState } from 'react';
import { TextInput, SelectInput, TextareaInput } from '../../components/forms/FormFields';
import { statesAndCities } from '../../components/common/locationsData';
import { categories } from '../../components/common/categoryData';
import { useDashboardTheme } from './DashboardLayout';

const Settings = () => {
  const { theme } = useDashboardTheme();
  const [activeTab, setActiveTab] = useState('Personal Information');
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
    'Personal Information',
    'Store Information', 
    'Bank Settings',
    'Security'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const validateCurrentTab = () => {
    const newErrors = {};

    if (activeTab === 'Personal Information') {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Full name is required.';
      }
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Enter a valid email address.';
      }
      if (!formData.phoneNumber.trim()) {
        newErrors.phoneNumber = 'Phone number is required.';
      }
      if (!formData.country.trim()) {
        newErrors.country = 'Country is required.';
      }
    }

    if (activeTab === 'Store Information') {
      if (!formData.storeName.trim()) {
        newErrors.storeName = 'Store name is required.';
      }
      if (!formData.state.trim()) {
        newErrors.state = 'State is required.';
      }
      if (!formData.lga.trim()) {
        newErrors.lga = 'LGA is required.';
      }
      if (!formData.category.trim()) {
        newErrors.category = 'Category is required.';
      }
      if (!formData.address.trim()) {
        newErrors.address = 'Address is required.';
      }
    }

    if (activeTab === 'Bank Settings') {
      if (!formData.bankName.trim()) {
        newErrors.bankName = 'Bank name is required.';
      }
      if (!formData.accountNumber.trim()) {
        newErrors.accountNumber = 'Account number is required.';
      } else if (!/^\d{10}$/.test(formData.accountNumber)) {
        newErrors.accountNumber = 'Account number must be 10 digits.';
      }
      if (!formData.accountHolderName.trim()) {
        newErrors.accountHolderName = 'Account holder name is required.';
      }
    }

    if (activeTab === 'Security') {
      if (!formData.currentPassword.trim()) {
        newErrors.currentPassword = 'Current password is required.';
      }
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
      return;
    }

    setSaveMessage('Settings saved successfully.');
    setSaveMessageType('success');
    console.log('Saving form data:', formData);
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

  const inputThemeClass = `rounded-lg border ${
    theme === 'dark'
      ? 'bg-[#111827] border-gray-700 text-slate-100 placeholder-slate-500'
      : 'border-gray-300'
  }`;

  const labelThemeClass = theme === 'dark' ? 'text-slate-300' : 'text-gray-700';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Personal Information':
        return (
          <div
            className={`rounded-2xl p-4 md:p-8 shadow-sm border ${
              theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-background border-gray-100'
            }`}
          >

            {/* Profile Picture Section */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <img 
                    src="/icons/profile-avatar.svg" 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-background hover:bg-primary-light transition-colors">
                  <img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />
                </button>
              </div>
            </div>

            <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>Personal Information</h3>
            
            <div className="space-y-6">
              <TextInput
                id="fullName"
                name="fullName"
                label="Full Name"
                placeholder="John Fortune"
                value={formData.fullName}
                onChange={handleInputChange}
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
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
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
                labelClassName={labelThemeClass}
                required
                error={errors.email}
                theme={theme}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  label="Phone Number"
                  placeholder="07044567654"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  className=""
                  inputClassName={`${inputThemeClass} relative pr-12`}
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
                  className=""
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  required
                  error={errors.country}
                  theme={theme}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSave}
                className="bg-secondary hover:bg-secondary-light text-background font-medium py-3 px-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        );
      
      case 'Store Information':
        return (
          <div
            className={`rounded-2xl p-4 md:p-8 shadow-sm border ${
              theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-background border-gray-100'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>Store Information</h3>
            
            <div className="space-y-6">
              <TextInput
                id="storeName"
                name="storeName"
                label="Store Name"
                placeholder='Fortune Store'
                value={formData.storeName}
                onChange={handleInputChange}
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
                labelClassName={labelThemeClass}
                required
                error={errors.storeName}
                theme={theme}
              />
              
              <TextareaInput
                id="storeDescription"
                name="storeDescription"
                label="Store Description"
                placeholder=""
                value={formData.storeDescription}
                onChange={handleInputChange}
                rows={4}
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
                labelClassName={labelThemeClass}
                helperText="Tell customers what your store is about."
                theme={theme}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput
                  id="state"
                  name="state"
                  label="State"
                  value={formData.state}
                  onChange={handleInputChange}
                  options={stateOptions}
                  className=""
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
                  className=""
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  required
                  error={errors.lga}
                  theme={theme}
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput
                  id="category"
                  name="category"
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categoryOptions}
                  className=""
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  required
                  error={errors.category}
                  theme={theme}
                />
                
                <TextInput
                  id="address"
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className=""
                  inputClassName={`${inputThemeClass} relative pr-12`}
                  labelClassName={labelThemeClass}
                  required
                  error={errors.address}
                  theme={theme}
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSave}
                className="bg-secondary hover:bg-secondary-light text-background font-medium py-3 px-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        );
      
      case 'Bank Settings':
        return (
          <div
            className={`rounded-2xl p-4 md:p-8 shadow-sm border ${
              theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-background border-gray-100'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>Bank Information</h3>
            
            <div className="space-y-6">
              <TextInput
                id="bankName"
                name="bankName"
                label="Bank Name"
                placeholder='Guaranty Trust Bank'
                value={formData.bankName}
                onChange={handleInputChange}
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
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
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
                labelClassName={labelThemeClass}
                required
                error={errors.accountNumber}
                theme={theme}
              />
              
              <TextInput
                id="accountHolderName"
                name="accountHolderName"
                label="Account Holder Name"
                placeholder='John Fortune'
                value={formData.accountHolderName}
                onChange={handleInputChange}
                className=""
                inputClassName={`${inputThemeClass} relative pr-12`}
                labelClassName={labelThemeClass}
                required
                error={errors.accountHolderName}
                theme={theme}
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSave}
                className="bg-secondary hover:bg-secondary-light text-background font-medium py-3 px-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                Save
              </button>
            </div>
          </div>
        );
      
      case 'Security':
        return (
          <div
            className={`rounded-2xl p-4 md:p-8 shadow-sm border ${
              theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-background border-gray-100'
            }`}
          >
            <h3 className={`text-lg font-semibold mb-6 ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>Security Information</h3>
            
            <div className="space-y-6">
              <div className="relative">
                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>
                  Enter Your Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 pr-12 ${inputThemeClass}`}
                    aria-invalid={!!errors.currentPassword}
                    aria-describedby={errors.currentPassword ? 'currentPassword-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <img 
                      src={showPasswords.current ? "/icons/eye-hidden.svg" : "/icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                {errors.currentPassword && (
                  <p id="currentPassword-error" className="mt-2 text-sm text-red-500">
                    {errors.currentPassword}
                  </p>
                )}
              </div>
              
              <div className="relative">
                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 pr-12 ${inputThemeClass}`}
                    aria-invalid={!!errors.newPassword}
                    aria-describedby={errors.newPassword ? 'newPassword-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className={`absolute  right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <img 
                      src={showPasswords.new ? "/icons/eye-hidden.svg" : "/icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                {errors.newPassword && (
                  <p id="newPassword-error" className="mt-2 text-sm text-red-500">
                    {errors.newPassword}
                  </p>
                )}
              </div>
              
              <div className="relative">
                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>
                  Re-type New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 pr-12 ${inputThemeClass}`}
                    aria-invalid={!!errors.confirmPassword}
                    aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-colors ${
                      theme === 'dark'
                        ? 'text-slate-400 hover:text-slate-200'
                        : 'text-gray-400 hover:text-gray-600'
                    }`}
                  >
                    <img 
                      src={showPasswords.confirm ? "/icons/eye-hidden.svg" : "/icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p id="confirmPassword-error" className="mt-2 text-sm text-red-500">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            </div>

            {/* Change Button */}
            <div className="flex justify-center mt-8">
              <button
                onClick={handleSave}
                className="bg-secondary hover:bg-secondary-light text-background font-medium py-3 px-8 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-opacity-50"
              >
                Change
              </button>
            </div>
            
            {/* Forgot Password Link */}
            <div className="flex justify-center mt-4">
              <button className="text-text-grey hover:text-primary transition-colors duration-200 text-sm">
                Forgot Password?
              </button>
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  // Update header text based on active tab
  const getHeaderText = () => {
    switch (activeTab) {
      case 'Store Information':
        return {
          title: 'Store Information',
          subtitle: 'Setup and edit Store information'
        };
      case 'Bank Settings':
        return {
          title: 'Bank Settings',
          subtitle: 'Add or update your payment details to receive funds.'
        };
      case 'Security':
        return {
          title: 'Security',
          subtitle: 'Manage your login and security settings.'
        };
      default:
        return {
          title: 'Personal Information',
          subtitle: 'Edit your personal details to keep your profile up-to-date'
        };
    }
  };

  const headerText = getHeaderText();

  return (
    <div className="min-h-screen p-0 md:p-6">
      <div className="mx-auto max-w-5xl space-y-8">
        {/* Header */}
        <div>
          <h1 className={`text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-text-primary'}`}>{headerText.title}</h1>
          <p className={`text-text-grey ${theme === 'dark' ? 'text-slate-400' : ''}`}>{headerText.subtitle}</p>
        </div>

        {/* Tabs */}
        <div>
          <div
            className={`flex gap-6 border-b overflow-x-auto ${
              theme === 'dark' ? 'border-white/10' : 'border-gray-200'
            }`}
          >
            <div className='min-w-fit flex gap-6'>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm transition-colors duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? theme === 'dark'
                        ? 'text-secondary border-secondary'
                        : 'text-primary border-primary'
                      : theme === 'dark'
                        ? 'text-slate-400 border-transparent hover:text-slate-200 hover:border-white/10'
                        : 'text-text-grey border-transparent hover:text-text-primary hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {saveMessage && (
          <div
            className={`rounded-lg px-4 py-3 text-sm ${
              saveMessageType === 'success'
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {saveMessage}
          </div>
        )}

        {/* Tab Content */}
        <div className="animate-fadeIn">
          {renderTabContent()}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Settings;
