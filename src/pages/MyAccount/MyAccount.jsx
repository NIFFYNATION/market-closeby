import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { TextInput, SelectInput } from '../../components/forms/FormFields';
import PageHeader from '../../components/common/PageHeader';

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingNewsletter, setIsEditingNewsletter] = useState(false);

  const [profileData, setProfileData] = useState({
    fullName: 'John Doe',
    email: 'johndoe@gmail.com',
    phone: '+234 912 413 6316',
    gender: 'Female'
  });

  const [addressData, setAddressData] = useState({
    addressLine1: '34 Anifowose Street, Somolu, Lagos.',
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Alimosho'
  });

  const sidebarItems = [
    { id: 'profile', label: 'My Profile', icon: '/icons/user.svg', active: true },
    { id: 'orders', label: 'My Orders', icon: '/icons/orders.svg', active: false },
    { id: 'wallet', label: 'My Wallet', icon: '/icons/wallet-bold.svg', active: false },
    { id: 'inbox', label: 'My Inbox', icon: '/icons/inbox-bold.svg', active: false },
    { id: 'wishlist', label: 'Wishlist', icon: '/icons/wishlist.svg', active: false },
    { id: 'reviews', label: 'Pending Reviews', icon: '/icons/pending-review-bold.svg', active: false },
    { id: 'recent', label: 'Recently Viewed', icon: '/icons/history-bold.svg', active: false },
    { id: 'delete', label: 'Delete Account', icon: '/icons/trash-bold.svg', active: false }
  ];

  const handleProfileChange = (e) => {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  };

  const handleAddressChange = (e) => {
    setAddressData({ ...addressData, [e.target.name]: e.target.value });
  };

  const breadcrumbs = [
    { label: 'Market CloseBy', link: '/' },
    { label: 'My Account', active: true }
  ];

  const genderOptions = ['Male', 'Female', 'Other'];
  const countryOptions = ['Nigeria', 'Ghana', 'Kenya', 'South Africa'];
  const stateOptions = ['Lagos', 'Abuja', 'Kano', 'Rivers'];
  const lgaOptions = ['Alimosho', 'Ikeja', 'Surulere', 'Victoria Island'];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        containerStyle="shadow"
        titleSize="medium"
      />

      <div className=" mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap">
          {/* Sidebar */}
          <div className="w-45 flex-shrink-0">
            <div className="bg-primary h-full  shadow-2xl overflow-hidden">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full items-center px-6 py-4 text-center transition-colors duration-200 ${

                    activeSection === item.id
                      ? 'bg-white text-primary'
                      : 'text-white hover:bg-primary-light'
                  }`}
                >
                  <img 
                    src={item.icon} 
                    alt={item.label} 
                    className={`w-5 h-5 my-3 justify-self-center ${

                      activeSection === item.id ? 'filter-none' : 'filter brightness-0 invert'
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-background  shadow-sm">
              {/* Header */}
              <div className="px-8 py-6 border-b border-gray-200">
                <h1 className="text-2xl font-semibold text-gray-900">Account Overview</h1>
              </div>

              <div className="p-8 space-y-8">
                {/* Grid for Personal Info and Delivery Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information Section */}
                  <div className="shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                      <h2 className="text-lg font-semibold text-white bg-primary px-6 py-3">
                        PERSONAL INFORMATION
                      </h2>
                      <button 
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                        className="absolute top-3 right-3 bg-secondary hover:bg-secondary-light text-white p-1.5 rounded-full transition-colors duration-200"
                      >
                        <img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <TextInput
                        label="Full Name"
                        name="fullName"
                        value={profileData.fullName}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                        className = 'rounded-lg'

                      />
                      <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                      />
                      <TextInput
                        label="Phone Number"
                        name="phone"
                        value={profileData.phone}
                        onChange={handleProfileChange}
                        disabled={!isEditingProfile}
                      />
                      <SelectInput
                        label="Gender"
                        name="gender"
                        value={profileData.gender}
                        onChange={handleProfileChange}
                        options={genderOptions}
                        disabled={!isEditingProfile}
                      />
                    </div>
                    
                    <div className="px-6 pb-6">
                      <Button
                        variant="secondary"
                        size="sm"
                        shape="rounded"
                        icon={<img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />}
                        onClick={() => setIsEditingProfile(!isEditingProfile)}
                      >
                        {isEditingProfile ? 'Save' : 'Edit Profile'}
                      </Button>
                    </div>
                  </div>

                  {/* Delivery Address Section */}
                  <div className="shadow-lg rounded-lg overflow-hidden">
                    <div className="relative">
                      <h2 className="text-lg font-semibold text-white bg-primary px-6 py-3">
                        DELIVERY ADDRESS
                      </h2>
                      <button 
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                        className="absolute top-3 right-3 bg-secondary hover:bg-secondary-light text-white p-1.5 rounded-full transition-colors duration-200"
                      >
                        <img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />
                      </button>
                    </div>
                    
                    <div className="p-6 space-y-4">
                      <TextInput
                        label="Address Line 1"
                        name="addressLine1"
                        value={addressData.addressLine1}
                        onChange={handleAddressChange}
                        disabled={!isEditingAddress}
                      />
                      <SelectInput
                        label="Country"
                        name="country"
                        value={addressData.country}
                        onChange={handleAddressChange}
                        options={countryOptions}
                        disabled={!isEditingAddress}
                      />
                      <SelectInput
                        label="State"
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        options={stateOptions}
                        disabled={!isEditingAddress}
                      />
                      <SelectInput
                        label="L.G.A"
                        name="lga"
                        value={addressData.lga}
                        onChange={handleAddressChange}
                        options={lgaOptions}
                        disabled={!isEditingAddress}
                      />
                    </div>
                    
                    <div className="px-6 pb-6">
                      <Button
                        variant="secondary"
                        size="sm"
                        shape="rounded"
                        icon={<img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />}
                        onClick={() => setIsEditingAddress(!isEditingAddress)}
                      >
                        {isEditingAddress ? 'Save' : 'Edit Address'}
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Newsletter Preferences Section - Full Width */}
                <div className="shadow-lg rounded-lg overflow-hidden">
                  <div className="relative">
                    <h2 className="text-lg font-semibold text-white bg-primary px-6 py-3">
                      NEWSLETTER PREFERENCES
                    </h2>
                    <button 
                      onClick={() => setIsEditingNewsletter(!isEditingNewsletter)}
                      className="absolute top-3 right-3 bg-secondary hover:bg-secondary-light text-white p-1.5 rounded-full transition-colors duration-200"
                    >
                      <img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      Manage your Market CloseBy notifications to stay informed about the latest deals, updates, and nearby offers.
                    </p>
                    
                    <Button
                      variant="secondary"
                      size="sm"
                      shape="rounded"
                      icon={<img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />}
                      onClick={() => setIsEditingNewsletter(!isEditingNewsletter)}
                    >
                      {isEditingNewsletter ? 'Save' : 'Edit Newsletter Preferences'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAccount;