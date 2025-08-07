import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { TextInput, SelectInput } from '../../components/forms/FormFields';
import PageHeader from '../../components/common/PageHeader';
import MarketClosebyDescription from '../../components/MarketClosebyDescription';

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [isEditingNewsletter, setIsEditingNewsletter] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    phone: '+234 912 413 6316',
    gender: 'Female',
    currentAddress: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [addressData, setAddressData] = useState({
    addressLine1: '34 Anifowose Street, Somolu, Lagos.',
    addressLine2: '',
    country: 'Nigeria',
    state: 'Lagos',
    lga: 'Alimosho'
  });

  const [newsletterData, setNewsletterData] = useState({
    newListings: true,
    exclusiveDeals: true,
    sellerUpdates: true,
    marketplaceNews: true,
    noPromotionalEmails: false,
    agreeToPolicy: false
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

  const handleNewsletterChange = (name, value) => {
    if (name === 'noPromotionalEmails' && value) {
      // If "I don't want to receive promotional emails" is selected, uncheck all others
      setNewsletterData({
        newListings: false,
        exclusiveDeals: false,
        sellerUpdates: false,
        marketplaceNews: false,
        noPromotionalEmails: true,
        agreeToPolicy: newsletterData.agreeToPolicy
      });
    } else if (name !== 'noPromotionalEmails' && name !== 'agreeToPolicy' && value) {
      // If any other option is selected, uncheck "no promotional emails"
      setNewsletterData({
        ...newsletterData,
        [name]: value,
        noPromotionalEmails: false
      });
    } else {
      setNewsletterData({
        ...newsletterData,
        [name]: value
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <PageHeader
        breadcrumbs={breadcrumbs}
        containerStyle="shadow"
        titleSize="medium"
      />

      <div className="mx-auto px-2 sm:px-4 lg:px-8 py-4 lg:py-8">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full bg-primary text-background px-4 py-3 rounded-lg flex items-center justify-between"
          >
            <span className="font-medium">Account Menu</span>
            <img 
              src="/icons/arrow-down.svg" 
              alt="Toggle" 
              className={`w-4 h-4 filter brightness-0 invert transition-transform duration-200 ${
                isMobileMenuOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Sidebar - Desktop */}
          <div className="hidden lg:block w-45 flex-shrink-0 shadow-2xl">
            <div className="bg-primary h-full shadow-2xl overflow-hidden">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full items-center px-6 py-4 text-center transition-colors duration-200 ${
                    activeSection === item.id
                      ? 'bg-background text-primary'
                      : 'text-background hover:bg-primary-light'
                  }`}
                >
                  <img 
                    src={item.icon} 
                    alt={item.label} 
                    className={`w-5 h-5 my-3 justify-self-center ${
                      activeSection === item.id ? 'filter-none' : 'filter brightness-0 invert'
                    }`}
                  />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Sidebar */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mb-4">
              <div className="bg-primary shadow-2xl overflow-hidden rounded-lg">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1">
                  {sidebarItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setActiveSection(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`flex flex-col items-center px-3 py-4 text-center transition-colors duration-200 ${
                        activeSection === item.id
                          ? 'bg-background text-primary'
                          : 'text-background hover:bg-primary-light'
                      }`}
                    >
                      <img 
                        src={item.icon} 
                        alt={item.label} 
                        className={`w-5 h-5 mb-2 ${
                          activeSection === item.id ? 'filter-none' : 'filter brightness-0 invert'
                        }`}
                      />
                      <span className="font-medium text-xs leading-tight">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <div className="bg-background shadow-xl px-0 pb-10 md:px-10 h-full">
              {/* Header */}
              <div className="px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
                <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">
                  {isEditingProfile ? 'Edit Personal Information' : 
                   isEditingAddress ? 'Edit Delivery Address' :
                   isEditingNewsletter ? 'Edit Newsletter Preferences' : 'Account Overview'}
                </h1>
              </div>

              <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
                {isEditingProfile ? (
                  /* Edit Profile Form */
                  <div className="shadow-xl p-4 sm:p-6 lg:p-8">
                    <div className="space-y-6">
                      {/* First Name and Last Name */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput
                          label="First Name"
                          name="firstName"
                          value={profileData.firstName}
                          onChange={handleProfileChange}
                          className="rounded-lg"
                        />
                        <TextInput
                          label="Last Name"
                          name="lastName"
                          value={profileData.lastName}
                          onChange={handleProfileChange}
                          className="rounded-lg"
                        />
                      </div>

                      {/* Email Address */}
                      <TextInput
                        label="Email Address"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleProfileChange}
                        className="rounded-lg"
                      />

                      {/* Phone Number and Gender */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextInput
                          label="Phone Number"
                          name="phone"
                          value={profileData.phone}
                          onChange={handleProfileChange}
                          className="rounded-lg"
                        />
                        <SelectInput
                          label="Gender"
                          name="gender"
                          value={profileData.gender}
                          onChange={handleProfileChange}
                          options={genderOptions}
                          className="rounded-lg"
                        />
                      </div>

                      {/* Current Address */}
                      <TextInput
                        label="Current Address"
                        name="currentAddress"
                        value={profileData.currentAddress}
                        onChange={handleProfileChange}
                        className="rounded-lg"
                      />

                      {/* New Password */}
                      <TextInput
                        label="New Password"
                        name="newPassword"
                        type="password"
                        value={profileData.newPassword}
                        onChange={handleProfileChange}
                        className="rounded-lg"
                      />

                      {/* Confirm Password */}
                      <TextInput
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleProfileChange}
                        className="rounded-lg"
                      />

                      {/* Save Changes Button */}
                      <div className="pt-4">
                        <Button
                          variant="secondary"
                          size="md"
                          shape="rounded"
                          onClick={() => setIsEditingProfile(false)}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : isEditingAddress ? (
                  /* Edit Address Form */
                  <div className="">
                    <div className="space-y-6">
                      {/* Address Line 1 */}
                      <TextInput
                        label="Address Line 1"
                        name="addressLine1"
                        value={addressData.addressLine1}
                        onChange={handleAddressChange}
                        className="rounded-lg"
                      />

                      {/* Address Line 2 */}
                      <TextInput
                        label="Address Line 2"
                        name="addressLine2"
                        value={addressData.addressLine2}
                        onChange={handleAddressChange}
                        className="rounded-lg"
                      />

                      {/* State */}
                      <SelectInput
                        label="State"
                        name="state"
                        value={addressData.state}
                        onChange={handleAddressChange}
                        options={stateOptions}
                        className="rounded-lg"
                      />

                      {/* L.G.A */}
                      <SelectInput
                        label="L.G.A"
                        name="lga"
                        value={addressData.lga}
                        onChange={handleAddressChange}
                        options={lgaOptions}
                        className="rounded-lg"
                      />

                      {/* Save Changes Button */}
                      <div className="pt-4">
                        <Button
                          variant="secondary"
                          size="md"
                          shape="rounded"
                          onClick={() => setIsEditingAddress(false)}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : isEditingNewsletter ? (
                  /* Edit Newsletter Preferences Form */
                  <div className="">
                    <div className="space-y-6">
                      {/* Description */}
                      <p className="text-text-primary  text-base leading-relaxed">
                        Customize what updates you receive from Market CloseBy, so you only get what matters most to you.
                      </p>

                      {/* Newsletter Options */}
                      <div className="space-y-4">
                        {/* New listings near me */}
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="newsletterOption"
                              checked={newsletterData.newListings}
                              onChange={() => handleNewsletterChange('newListings', true)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              newsletterData.newListings ? 'border-secondary' : 'border-gray-300'
                            }`}>
                              {newsletterData.newListings && (
                                <div className="w-4 h-4 rounded-full bg-background border border-secondary flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-text-primary text-base">New listings near me</span>
                        </label>

                        {/* Exclusive deals & discounts */}
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="newsletterOption"
                              checked={newsletterData.exclusiveDeals}
                              onChange={() => handleNewsletterChange('exclusiveDeals', true)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              newsletterData.exclusiveDeals ? 'border-secondary' : 'border-gray-300'
                            }`}>
                              {newsletterData.exclusiveDeals && (
                                <div className="w-4 h-4 rounded-full bg-background border border-secondary flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-text-primary text-base">Exclusive deals & discounts</span>
                        </label>

                        {/* Updates from sellers I follow */}
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="newsletterOption"
                              checked={newsletterData.sellerUpdates}
                              onChange={() => handleNewsletterChange('sellerUpdates', true)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              newsletterData.sellerUpdates ? 'border-secondary' : 'border-gray-300'
                            }`}>
                              {newsletterData.sellerUpdates && (
                                <div className="w-4 h-4 rounded-full bg-background border border-secondary flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-text-primary text-base">Updates from sellers I follow</span>
                        </label>

                        {/* Marketplace news & announcements */}
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="newsletterOption"
                              checked={newsletterData.marketplaceNews}
                              onChange={() => handleNewsletterChange('marketplaceNews', true)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              newsletterData.marketplaceNews ? 'border-secondary' : 'border-gray-300'
                            }`}>
                              {newsletterData.marketplaceNews && (
                                <div className="w-4 h-4 rounded-full bg-background border border-secondary flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-text-primary text-base">Marketplace news & announcements</span>
                        </label>

                        {/* I don't want to receive promotional emails */}
                        <label className="flex items-center space-x-3 cursor-pointer">
                          <div className="relative">
                            <input
                              type="radio"
                              name="newsletterOption"
                              checked={newsletterData.noPromotionalEmails}
                              onChange={() => handleNewsletterChange('noPromotionalEmails', true)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                              newsletterData.noPromotionalEmails ? 'border-gray-400' : 'border-gray-300'
                            }`}>
                              {newsletterData.noPromotionalEmails && (
                                <div className="w-4 h-4 rounded-full bg-background border border-gray-400 flex items-center justify-center">
                                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                                </div>
                              )}
                            </div>
                          </div>
                          <span className="text-text-primary text-base">I don't want to receive promotional emails</span>
                        </label>
                      </div>

                      {/* Agreement Checkbox */}
                      <div className="pt-4">
                        <label className="flex items-start space-x-3 cursor-pointer">
                          <div className="relative mt-1">
                            <input
                              type="checkbox"
                              checked={newsletterData.agreeToPolicy}
                              onChange={(e) => handleNewsletterChange('agreeToPolicy', e.target.checked)}
                              className="sr-only"
                            />
                            <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                              newsletterData.agreeToPolicy ? 'border-secondary bg-background' : 'border-gray-300'
                            }`}>
                              {newsletterData.agreeToPolicy && (
                                <svg className="w-4 h-4 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              )}
                            </div>
                          </div>
                          <span className="text-text-primary text-base leading-relaxed">
                            I agree to Market CloseBy's{' '}
                            <span className="text-secondary underline">Privacy and Cookie Policy</span>.
                            You can unsubscribe from updates at any time.
                          </span>
                        </label>
                      </div>

                      {/* Save Changes Button */}
                      <div className="pt-4">
                        <Button
                          variant="secondary"
                          size="md"
                          shape="rounded"
                          onClick={() => setIsEditingNewsletter(false)}
                        >
                          Save Changes
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Original Account Overview */
                  <>
                    {/* Grid for Personal Info and Delivery Address */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                      {/* Personal Information Section */}
                      <div className="shadow-2xl rounded-lg overflow-hidden">
                        <div className="relative">
                          <h2 className="text-base sm:text-lg font-semibold text-background bg-primary px-4 sm:px-6 py-3">
                            PERSONAL INFORMATION
                          </h2>
                          <button 
                            onClick={() => setIsEditingProfile(!isEditingProfile)}
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-secondary hover:bg-secondary-light text-background p-1.5 rounded-full transition-colors duration-200"
                          >
                            <img src="/icons/edit-bold.svg" alt="Edit" className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        
                        <div className="p-4 sm:p-6 space-y-4">
                          <TextInput
                            label="Full Name"
                            name="fullName"
                            value={`${profileData.firstName} ${profileData.lastName}`}
                            onChange={handleProfileChange}
                            disabled={true}
                            className="rounded-lg"
                          />
                          <TextInput
                            label="Email Address"
                            name="email"
                            type="email"
                            value={profileData.email}
                            onChange={handleProfileChange}
                            disabled={true}
                          />
                          <TextInput
                            label="Phone Number"
                            name="phone"
                            value={profileData.phone}
                            onChange={handleProfileChange}
                            disabled={true}
                          />
                          <SelectInput
                            label="Gender"
                            name="gender"
                            value={profileData.gender}
                            onChange={handleProfileChange}
                            options={genderOptions}
                            disabled={true}
                          />
                        </div>
                        
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <Button
                            variant="secondary"
                            size="sm"
                            shape="rounded"
                            fullWidth={true}
                            className="sm:w-auto"
                            icon={<img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />}
                            onClick={() => setIsEditingProfile(!isEditingProfile)}
                          >
                            Edit Profile
                          </Button>
                        </div>
                      </div>

                      {/* Delivery Address Section */}
                      <div className="shadow-2xl rounded-lg overflow-hidden">
                        <div className="relative">
                          <h2 className="text-base sm:text-lg font-semibold text-background bg-primary px-4 sm:px-6 py-3">
                            DELIVERY ADDRESS
                          </h2>
                          <button 
                            onClick={() => setIsEditingAddress(!isEditingAddress)}
                            className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-secondary hover:bg-secondary-light text-background p-1.5 rounded-full transition-colors duration-200"
                          >
                            <img src="/icons/edit-bold.svg" alt="Edit" className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                        
                        <div className="p-4 sm:p-6 space-y-4">
                          <TextInput
                            label="Address Line 1"
                            name="addressLine1"
                            value={addressData.addressLine1}
                            onChange={handleAddressChange}
                            disabled={true}
                          />
                          <SelectInput
                            label="Country"
                            name="country"
                            value={addressData.country}
                            onChange={handleAddressChange}
                            options={countryOptions}
                            disabled={true}
                          />
                          <SelectInput
                            label="State"
                            name="state"
                            value={addressData.state}
                            onChange={handleAddressChange}
                            options={stateOptions}
                            disabled={true}
                          />
                          <SelectInput
                            label="L.G.A"
                            name="lga"
                            value={addressData.lga}
                            onChange={handleAddressChange}
                            options={lgaOptions}
                            disabled={true}
                          />
                        </div>
                        
                        <div className="px-4 sm:px-6 pb-4 sm:pb-6">
                          <Button
                            variant="secondary"
                            size="sm"
                            shape="rounded"
                            fullWidth={true}
                            className="sm:w-auto"
                            icon={<img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />}
                            onClick={() => setIsEditingAddress(!isEditingAddress)}
                          >
                            Edit Address
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Newsletter Preferences Section - Full Width */}
                    <div className="shadow-lg rounded-lg overflow-hidden">
                      <div className="relative">
                        <h2 className="text-base sm:text-lg font-semibold text-background bg-primary px-4 sm:px-6 py-3">
                          NEWSLETTER PREFERENCES
                        </h2>
                        <button 
                          onClick={() => setIsEditingNewsletter(!isEditingNewsletter)}
                          className="absolute top-2 sm:top-3 right-2 sm:right-3 bg-secondary hover:bg-secondary-light text-background p-1.5 rounded-full transition-colors duration-200"
                        >
                          <img src="/icons/edit-bold.svg" alt="Edit" className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>
                      
                      <div className="p-4 sm:p-6">
                        <p className="text-text-primary text-sm leading-relaxed mb-4 sm:mb-6">
                          Manage your Market CloseBy notifications to stay informed about the latest deals, updates, and nearby offers.
                        </p>
                        
                        <Button
                          variant="secondary"
                          size="sm"
                          shape="rounded"
                          fullWidth={true}
                          className="sm:w-auto"
                          icon={<img src="/icons/edit-bold.svg" alt="Edit" className="w-4 h-4" />}
                          onClick={() => setIsEditingNewsletter(!isEditingNewsletter)}
                        >
                          {isEditingNewsletter ? 'Save' : 'Edit Newsletter Preferences'}
                        </Button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Market Closeby Description */}
      <MarketClosebyDescription />
    </div>
  );
};

export default MyAccount;