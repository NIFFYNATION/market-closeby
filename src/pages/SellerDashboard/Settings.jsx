import React, { useState } from 'react';
import { TextInput, SelectInput, TextareaInput } from '../../components/forms/FormFields';
import { statesAndCities } from '../../components/common/locationsData';
import { categories } from '../../components/common/categoryData';

const Settings = () => {
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

  const handleSave = () => {
    console.log('Saving form data:', formData);
    // Add save logic here
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

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Personal Information':
        return (
          <div className=" bg-background rounded-2xl p-4 md:p-8 shadow-sm">

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

            <h3 className="text-lg font-semibold text-text-primary mb-6">Personal Information</h3>
            
            <div className="space-y-6">
              <TextInput
                id="fullName"
                name="fullName"
                label="Full Name"
                placeholder="John Fortune"
                value={formData.fullName}
                onChange={handleInputChange}
                className=""
                inputClassName="relative pr-12"
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
                inputClassName="relative pr-12"
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
                  inputClassName="relative pr-12"
                />
                
                <TextInput
                  id="country"
                  name="country"
                  label="Country"
                  placeholder="Nigeria"
                  value={formData.country}
                  onChange={handleInputChange}
                  className=""
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
          <div className="bg-background rounded-2xl p-4 md:p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Store Information</h3>
            
            <div className="space-y-6">
              <TextInput
                id="storeName"
                name="storeName"
                label="Store Name"
                placeholder='Fortune Store'
                value={formData.storeName}
                onChange={handleInputChange}
                className=""
                inputClassName="relative pr-12"
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
                inputClassName="relative pr-12"
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
                />
                
                <SelectInput
                  id="lga"
                  name="lga"
                  label="LGA"
                  value={formData.lga}
                  onChange={handleInputChange}
                  options={lgaOptions}
                  className=""
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
                />
                
                <TextInput
                  id="address"
                  name="address"
                  label="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className=""
                  inputClassName="relative pr-12"
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
          <div className="bg-background rounded-2xl p-4 md:p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Bank Information</h3>
            
            <div className="space-y-6">
              <TextInput
                id="bankName"
                name="bankName"
                label="Bank Name"
                placeholder='Guaranty Trust Bank'
                value={formData.bankName}
                onChange={handleInputChange}
                className=""
                inputClassName="relative pr-12"
              />
              
              <TextInput
                id="accountNumber"
                name="accountNumber"
                label="Account Number"
                placeholder='0154993028'

                value={formData.accountNumber}
                onChange={handleInputChange}
                className=""
                inputClassName="relative pr-12"
              />
              
              <TextInput
                id="accountHolderName"
                name="accountHolderName"
                label="Account Holder Name"
                placeholder='John Fortune'

                value={formData.accountHolderName}
                onChange={handleInputChange}
                className=""
                inputClassName="relative pr-12"
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
          <div className="bg-background rounded-2xl p-4 md:p-8 shadow-sm">
            <h3 className="text-lg font-semibold text-text-primary mb-6">Security Information</h3>
            
            <div className="space-y-6">
              <div className="relative">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Enter Your Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.current ? 'text' : 'password'}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('current')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <img 
                      src={showPasswords.current ? "/icons/eye-hidden.svg" : "/icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.new ? 'text' : 'password'}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('new')}
                    className="absolute  right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <img 
                      src={showPasswords.new ? "/icons/eye-hidden.svg" : "/icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
              </div>
              
              <div className="relative">
                <label className="block text-sm font-medium text-text-primary mb-2">
                  Re-type New Password
                </label>
                <div className="relative">
                  <input
                    type={showPasswords.confirm ? 'text' : 'password'}
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-colors duration-200 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => togglePasswordVisibility('confirm')}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <img 
                      src={showPasswords.confirm ? "/icons/eye-hidden.svg" : "/icons/eye-hidden.svg"} 
                      alt="Toggle password visibility" 
                      className="w-5 h-5"
                    />
                  </button>
                </div>
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
    <div className="min-h-screen p-6">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-text-primary mb-2">{headerText.title}</h1>
          <p className="text-text-grey">{headerText.subtitle}</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-6 border-b border-gray-200 overflow-x-auto">
            <div className='min-w-fit flex gap-6'>
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 font-medium text-sm transition-colors duration-200 border-b-2 whitespace-nowrap ${
                    activeTab === tab
                      ? 'text-primary border-primary'
                      : 'text-text-grey border-transparent hover:text-text-primary hover:border-gray-300'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

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