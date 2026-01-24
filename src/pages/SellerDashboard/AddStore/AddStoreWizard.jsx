import React, { useState } from 'react';
import { useDashboardTheme } from '../DashboardLayout';
import { useSellerStore } from '../../../store/sellerStore';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../context/ToastContext';
import { FiCheck, FiMapPin, FiImage, FiInfo, FiUserCheck, FiShield, FiTruck, FiCreditCard } from 'react-icons/fi';
import StepStoreInfo from './StepStoreInfo';
import StepLocationInfo from './StepLocationInfo';
import StepUploadImage from './StepUploadImage';
import StepKyc from './StepKyc';
import StepBusinessId from './StepBusinessId';
import StepDelivery from './StepDelivery';
import StepBankDetails from './StepBankDetails';

const AddStoreWizard = () => {
  const { theme } = useDashboardTheme();
  const { addStore } = useSellerStore();
  const navigate = useNavigate();
  const { showToast } = useToast();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    // Store Info
    name: '',
    description: '',
    category: '',
    socialPlatform: '',
    // Location Info
    address: '',
    state: '',
    lga: '',
    country: 'Nigeria',
    // Image
    image: null,
    // KYC
    fullName: '',
    dateOfBirth: '',
    idDocument: null,
    // Business ID
    cacDocument: null,
    // Delivery
    pickupAvailable: '',
    preferredCourier: '',
    // Bank Details
    bankName: '',
    accountNumber: '',
    accountHolderName: ''
  });

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
  };

  const steps = [
    { title: 'Store Info', icon: <FiInfo className="w-5 h-5" /> },
    { title: 'Location', icon: <FiMapPin className="w-5 h-5" /> },
    { title: 'Logo', icon: <FiImage className="w-5 h-5" /> },
    { title: 'KYC', icon: <FiUserCheck className="w-5 h-5" /> },
    { title: 'Business ID', icon: <FiShield className="w-5 h-5" /> },
    { title: 'Delivery', icon: <FiTruck className="w-5 h-5" /> },
    { title: 'Bank', icon: <FiCreditCard className="w-5 h-5" /> }
  ];

  const handleNext = () => {
    setCurrentStep(prev => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleFinalSubmit = async () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newStore = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        category: formData.category,
        status: 'active',
        verificationStatus: 'pending', // Default verification status
        image: formData.image,
        location: {
          address: formData.address,
          state: formData.state,
          lga: formData.lga,
          country: formData.country
        },
        socialPlatform: formData.socialPlatform,
        kyc: {
          fullName: formData.fullName,
          dateOfBirth: formData.dateOfBirth,
          idDocument: formData.idDocument
        },
        businessId: {
          cacDocument: formData.cacDocument
        },
        delivery: {
          pickupAvailable: formData.pickupAvailable,
          preferredCourier: formData.preferredCourier
        },
        bankDetails: {
          bankName: formData.bankName,
          accountNumber: formData.accountNumber,
          accountHolderName: formData.accountHolderName
        },
        createdAt: new Date().toISOString()
      };

      addStore(newStore);
      showToast('Store created successfully! Verification pending.', 'success');
      navigate('/seller-dashboard/stores');
    }, 1500);
  };

  // Theme classes
  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const stepperBg = theme === 'dark' ? 'border-white/10' : 'bg-white border-slate-200';

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8 text-center">
        <h1 className={`text-3xl font-bold ${textPrimary}`}>Add New Store</h1>
        <p className={`mt-2 ${textSecondary}`}>Follow the steps to set up your new store</p>
      </div>

      {/* Stepper */}
      <div className={`mb-10 rounded-2xl  overflow-hidden`}>
        <div className="overflow-x-auto w-90 sm:w-full p-4">
          <div className="flex items-center gap-2">
            {steps.map((step, index) => {
              const isActive = currentStep === index;
              const isCompleted = index < currentStep;
              
              return (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  disabled={index > currentStep}
                  className={`flex-shrink-0 flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-full border text-xs md:text-sm font-medium transition-all whitespace-nowrap ${
                    isActive 
                      ? theme === 'dark' ? 'bg-amber-500 text-[#1a1a4b] border-amber-500' : 'bg-amber-500 text-white border-amber-500'
                      : isCompleted
                        ? theme === 'dark' ? 'bg-green-500/10 text-green-500 border-green-500/50' : 'bg-green-50 text-green-600 border-green-200'
                        : theme === 'dark' ? 'bg-white/5 text-slate-400 border-white/10' : 'bg-white text-slate-400 border-slate-200'
                  } ${index <= currentStep ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed opacity-50'}`}
                >
                  {isCompleted ? <FiCheck className="w-3 h-3 md:w-4 md:h-4" /> : React.cloneElement(step.icon, { className: "w-3 h-3 md:w-4 md:h-4" })}
                  {step.title}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`rounded-2xl border p-6 md:p-8 ${stepperBg}`}>
        {currentStep === 0 && (
          <StepStoreInfo 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
          />
        )}
        {currentStep === 1 && (
          <StepLocationInfo 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack} 
          />
        )}
        {currentStep === 2 && (
          <StepUploadImage 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        {currentStep === 3 && (
          <StepKyc 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        {currentStep === 4 && (
          <StepBusinessId 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        {currentStep === 5 && (
          <StepDelivery 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleNext} 
            onBack={handleBack}
          />
        )}
        {currentStep === 6 && (
          <StepBankDetails 
            formData={formData} 
            updateFormData={updateFormData} 
            onNext={handleFinalSubmit} 
            onBack={handleBack}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
};

export default AddStoreWizard;
