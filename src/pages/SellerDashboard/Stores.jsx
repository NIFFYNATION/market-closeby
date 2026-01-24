import React, { useState, useEffect, useRef } from 'react';
import { useSellerStore } from '../../store/sellerStore';
import { useDashboardTheme } from './DashboardLayout';
import { FiPlus, FiEdit2, FiTrash2, FiPower, FiMapPin, FiGrid, FiMoreVertical, FiX, FiAlertTriangle, FiCheck, FiCpu, FiBarChart2, FiDollarSign, FiShoppingBag, FiEye, FiShield, FiClock } from 'react-icons/fi';
import { TextInput, TextareaInput, SelectInput } from '../../components/forms/FormFields';
import { statesAndCities } from '../../components/common/locationsData';
import { categories } from '../../components/common/categoryData';
import { useToast } from '../../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Stores = () => {
  const { theme } = useDashboardTheme();
  const { stores, updateStore, deleteStore, toggleStoreStatus, currentStoreId, setCurrentStore } = useSellerStore();
  const { showToast } = useToast();
  const navigate = useNavigate();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'
  const [selectedStore, setSelectedStore] = useState(null);
  const [dropdownOpenId, setDropdownOpenId] = useState(null);
  
  // Confirmation Modal State
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    type: 'delete', // 'delete' or 'disable'
    storeId: null,
    storeName: ''
  });

  const [aiInsightsModal, setAiInsightsModal] = useState({
    isOpen: false,
    store: null,
    insights: []
  });

  const generateAiInsights = (store) => {
    // Simulate AI generation
    const insights = [
      { title: 'Optimization Score', value: '85/100', desc: 'Your store profile is well-optimized. Consider adding more high-quality product images.' },
      { title: 'Trending Category', value: store.category, desc: `Demand for ${store.category} has increased by 15% in your region (${store.location?.state}) this week.` },
      { title: 'Suggested Action', value: 'Run a Promo', desc: 'Stores in your area saw a 20% sales boost after running weekend flash sales.' }
    ];
    setAiInsightsModal({
      isOpen: true,
      store,
      insights
    });
    setDropdownOpenId(null);
  };

  const getVerificationBadge = (status) => {
    switch (status) {
      case 'verified':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-green text-white border border-green-200 "><FiShield className="w-3 h-3" /> Verified</span>;
      case 'rejected':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-red text-white border border-red-200 "><FiAlertTriangle className="w-3 h-3" /> Rejected</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber text-black border border-amber-200"><FiClock className="w-3 h-3" /> Pending</span>;
    }
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpenId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const initialFormState = {
    name: '',
    description: '',
    category: '',
    state: '',
    lga: '',
    address: '',
    status: 'active'
  };
  
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState({});

  const handleOpenAddWizard = () => {
    navigate('/seller-dashboard/add-store');
  };

  const handleOpenEditModal = (store) => {
    setModalMode('edit');
    setSelectedStore(store);
    setFormData({
      name: store.name,
      description: store.description || '',
      category: store.category || '',
      state: store.location?.state || '',
      lga: store.location?.lga || '',
      address: store.location?.address || '',
      status: store.status
    });
    setErrors({});
    setIsModalOpen(true);
    setDropdownOpenId(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStore(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Store name is required';
    if (!formData.category) newErrors.category = 'Category is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.lga) newErrors.lga = 'LGA is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const storeData = {
      name: formData.name,
      description: formData.description,
      category: formData.category,
      location: {
        state: formData.state,
        lga: formData.lga,
        address: formData.address
      },
      status: formData.status
    };

    if (modalMode === 'add') {
      // Add store logic is now handled in the wizard, but keeping this for edit
    } else {
      updateStore(selectedStore.id, storeData);
      showToast('Store updated successfully', 'success');
    }

    handleCloseModal();
  };

  const confirmAction = (type, store) => {
    setConfirmModal({
      isOpen: true,
      type,
      storeId: store.id,
      storeName: store.name
    });
    setDropdownOpenId(null);
  };

  const handleConfirmAction = () => {
    if (confirmModal.type === 'delete') {
      deleteStore(confirmModal.storeId);
      showToast('Store deleted successfully', 'success');
    } else if (confirmModal.type === 'disable') {
      toggleStoreStatus(confirmModal.storeId);
      showToast(`Store ${confirmModal.storeName} status updated`, 'success');
    }
    setConfirmModal({ ...confirmModal, isOpen: false });
  };

  const toggleDropdown = (e, id) => {
    e.stopPropagation();
    setDropdownOpenId(dropdownOpenId === id ? null : id);
  };

  // Get options for dropdowns
  const stateOptions = statesAndCities.map(s => s.name);
  const selectedStateData = statesAndCities.find(s => s.name === formData.state);
  const lgaOptions = selectedStateData ? selectedStateData.cities : [];
  const categoryOptions = categories.map(c => c.name);

  // Theme classes
  const cardClass = theme === 'dark' 
    ? 'bg-[#1e1e1e] border-white/10' 
    : 'bg-white border-slate-200';
  
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const inputThemeClass = theme === 'dark'
    ? 'bg-[#111827] border-gray-700 text-slate-100 placeholder-slate-500'
    : 'border-gray-300 bg-white text-slate-900';
  const labelThemeClass = theme === 'dark' ? 'text-slate-300' : 'text-gray-700';

  return (
    <div className="max-w-7xl mx-auto pb-10" onClick={() => setDropdownOpenId(null)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className={`text-2xl font-bold ${textPrimary}`}>My Stores</h1>
          <p className={`mt-1 text-sm ${textSecondary}`}>Manage your stores, update information, and track performance.</p>
        </div>
        <button
          onClick={handleOpenAddWizard}
          className="inline-flex items-center justify-center px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] font-semibold rounded-lg transition-colors shadow-lg shadow-amber-500/20"
        >
          <FiPlus className="w-5 h-5 mr-2" />
          Add New Store
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {stores.map(store => (
          <div 
            key={store.id} 
            className={`rounded-2xl border p-6 transition-all duration-300 hover:shadow-lg ${cardClass} ${
              currentStoreId === store.id ? 'ring-2 ring-amber-400' : ''
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl font-bold shadow-inner ${
                  currentStoreId === store.id ? 'bg-amber-500 text-[#1a1a4b]' : 'bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-white'
                }`}>
                  {store.name.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${textPrimary}`}>{store.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border ${
                      store.status === 'active' 
                        ? 'bg-green-700 text-white border-green-200' 
                        : 'bg-slate text-white border-slate-200'
                    }`}>
                      {store.status === 'active' ? 'Active' : 'Disabled'}
                    </span>
                    {getVerificationBadge(store.verificationStatus || 'pending')}
                  </div>
                </div>
              </div>
              <div className="relative">
                <button 
                  onClick={(e) => toggleDropdown(e, store.id)}
                  className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 ${textSecondary} ${dropdownOpenId === store.id ? 'bg-slate-100 dark:bg-white/10' : ''}`}
                >
                  <FiMoreVertical className="w-5 h-5" />
                </button>
                {dropdownOpenId === store.id && (
                  <div 
                    ref={dropdownRef}
                    className={`absolute right-0 mt-2 w-48 rounded-lg shadow-xl z-20 border overflow-hidden ${
                    theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white border-slate-100'
                  }`}>
                    <button 
                      onClick={() => handleOpenEditModal(store)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-slate-50 dark:hover:bg-white/5 ${textPrimary}`}
                    >
                      <FiEdit2 className="w-4 h-4 mr-2" /> Edit Info
                    </button>
                    <button 
                      onClick={() => generateAiInsights(store)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-slate-50 dark:hover:bg-white/5 text-purple-500`}
                    >
                      <FiCpu className="w-4 h-4 mr-2" /> Get AI Insights
                    </button>
                    <button 
                      onClick={() => confirmAction('disable', store)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-slate-50 dark:hover:bg-white/5 ${textPrimary}`}
                    >
                      <FiPower className="w-4 h-4 mr-2" /> {store.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                    <button 
                      onClick={() => setCurrentStore(store.id)}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center hover:bg-slate-50 dark:hover:bg-white/5 ${textPrimary}`}
                      disabled={store.status !== 'active'}
                    >
                      <FiGrid className="w-4 h-4 mr-2" /> Switch to Store
                    </button>
                    <div className="border-t border-slate-100 dark:border-white/10 my-1"></div>
                    <button 
                      onClick={() => confirmAction('delete', store)}
                      className="w-full text-left px-4 py-2 text-sm flex items-center text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <FiTrash2 className="w-4 h-4 mr-2" /> Delete
                    </button>
                  </div>
                )}
              </div>
            </div>

              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <div className={`text-xs ${textSecondary} flex items-center gap-1`}><FiEye className="w-3 h-3" /> Views</div>
                    <div className={`font-bold ${textPrimary}`}>{Math.floor(Math.random() * 1000) + 100}</div>
                  </div>
                  <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5' : 'bg-slate-50'}`}>
                    <div className={`text-xs ${textSecondary} flex items-center gap-1`}><FiShoppingBag className="w-3 h-3" /> Orders</div>
                    <div className={`font-bold ${textPrimary}`}>{Math.floor(Math.random() * 50) + 5}</div>
                  </div>
                </div>
                <div className={`flex items-start gap-2 text-sm ${textSecondary}`}>
                  <FiGrid className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>{store.category}</span>
                </div>
                <div className={`flex items-start gap-2 text-sm ${textSecondary}`}>
                  <FiMapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span className="line-clamp-1">{store.location?.address}, {store.location?.lga}, {store.location?.state}</span>
                </div>
              </div>

            <div className="flex items-center gap-3">
              <button 
                onClick={() => setCurrentStore(store.id)}
                disabled={currentStoreId === store.id || store.status !== 'active'}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                  currentStoreId === store.id
                    ? 'bg-green-700 text-white en-400 cursor-default'
                    : store.status !== 'active'
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {currentStoreId === store.id ? 'Current Store' : 'Switch Store'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto ${
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}>
            <div className={`flex items-center justify-between p-6 border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-slate-100'
            }`}>
              <h2 className={`text-xl font-bold ${textPrimary}`}>
                Edit Store
              </h2>
              <button onClick={handleCloseModal} className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 ${textSecondary}`}>
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-4">
                <TextInput
                  id="name"
                  name="name"
                  label="Store Name"
                  placeholder="e.g. My Awesome Store"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  error={errors.name}
                  theme={theme}
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                />
                
                <TextareaInput
                  id="description"
                  name="description"
                  label="Description"
                  placeholder="Describe your store..."
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={3}
                  theme={theme}
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                />

                <SelectInput
                  id="category"
                  name="category"
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categoryOptions}
                  required
                  error={errors.category}
                  theme={theme}
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SelectInput
                    id="state"
                    name="state"
                    label="State"
                    value={formData.state}
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
                    value={formData.lga}
                    onChange={handleInputChange}
                    options={lgaOptions}
                    required
                    error={errors.lga}
                    theme={theme}
                    inputClassName={inputThemeClass}
                    labelClassName={labelThemeClass}
                  />
                </div>

                <TextInput
                  id="address"
                  name="address"
                  label="Address"
                  placeholder="Street address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  error={errors.address}
                  theme={theme}
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark' 
                      ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-[#1a1a4b] hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* AI Insights Modal */}
      {aiInsightsModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl shadow-2xl p-6 ${
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500">
                  <FiCpu className="w-5 h-5" />
                </div>
                <div>
                  <h2 className={`text-xl font-bold ${textPrimary}`}>AI Insights</h2>
                  <p className={`text-xs ${textSecondary}`}>Powered by Market Closeby AI</p>
                </div>
              </div>
              <button 
                onClick={() => setAiInsightsModal({ ...aiInsightsModal, isOpen: false })}
                className={`p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 ${textSecondary}`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              {aiInsightsModal.insights.map((insight, index) => (
                <div key={index} className={`p-4 rounded-xl border ${
                  theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-100'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className={`font-semibold ${textPrimary}`}>{insight.title}</h3>
                    <span className="text-xs font-bold text-purple-500 bg-purple-500/10 px-2 py-1 rounded-full">
                      {insight.value}
                    </span>
                  </div>
                  <p className={`text-sm ${textSecondary}`}>{insight.desc}</p>
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setAiInsightsModal({ ...aiInsightsModal, isOpen: false })}
                className="px-6 py-2.5 rounded-lg text-sm font-bold bg-amber-500 text-[#1a1a4b] hover:bg-amber-600 transition-colors shadow-lg shadow-amber-500/20"
              >
                Got it
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      {confirmModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-2xl shadow-2xl p-6 ${
            theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'
          }`}>
            <div className="flex items-center gap-4 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                confirmModal.type === 'delete' ? 'bg-red-100 text-red-500' : 'bg-amber-100 text-amber-500'
              }`}>
                <FiAlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h3 className={`text-lg font-bold ${textPrimary}`}>
                  {confirmModal.type === 'delete' ? 'Delete Store' : 'Disable Store'}
                </h3>
                <p className={`text-sm ${textSecondary}`}>
                  Are you sure you want to {confirmModal.type} <strong>{confirmModal.storeName}</strong>?
                </p>
              </div>
            </div>
            
            <p className={`text-sm mb-6 ${textSecondary}`}>
              {confirmModal.type === 'delete' 
                ? 'This action cannot be undone. All data associated with this store will be permanently removed.'
                : 'This store will no longer be visible to customers until you enable it again.'}
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setConfirmModal({ ...confirmModal, isOpen: false })}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className={`px-4 py-2 rounded-lg text-sm font-bold text-white transition-colors shadow-lg ${
                  confirmModal.type === 'delete'
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20'
                    : 'bg-amber-500 hover:bg-amber-600 shadow-amber-500/20 text-[#1a1a4b]'
                }`}
              >
                Yes, {confirmModal.type === 'delete' ? 'Delete' : 'Disable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Stores;