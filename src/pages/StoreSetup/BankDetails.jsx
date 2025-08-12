import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import { TextInput, SelectInput } from '../../components/forms/FormFields';
import { Button } from '../../components/common/Button';

const BankDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bankName: '',
    accountNumber: '',
    accountHolderName: ''
  });

  const bankOptions = [
    'Select/Type Bank Name',
    'Access Bank',
    'Zenith Bank',
    'GTBank',
    'First Bank',
    'UBA',
    'Fidelity Bank',
    'FCMB',
    'Sterling Bank',
    'Stanbic IBTC',
    'Union Bank',
    'Wema Bank',
    'Polaris Bank',
    'Keystone Bank',
    'Ecobank',
    'Heritage Bank'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to account complete or dashboard
      navigate('/account-complete');
    } catch (error) {
      console.error('Error submitting bank details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/account-complete');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white py-15">

      <div className="w-full max-w-xl px-4">
        <AuthHeader
          logo="/imgs/Logo-2.svg"
          logoWidth="w-20 h-20 mx-auto"
          title="Enter Your Bank Details"
          subtitle="Please provide account details where your proceeds will go to"
          showBackButton={false}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectInput
            id="bankName"
            name="bankName"
            label="Bank Name"
            value={formData.bankName}
            onChange={handleInputChange}
            options={bankOptions}
            required
            className="mb-6"
            inputClassName="rounded-lg"

              
          />

          <TextInput
            id="accountNumber"
            name="accountNumber"
            label="Account Number"
            value={formData.accountNumber}
            onChange={handleInputChange}
            placeholder="Bank Account Number"
            required
            className="mb-6"
            inputClassName="rounded-lg"
          />

          <TextInput
            id="accountHolderName"
            name="accountHolderName"
            label="Account Holder Name"
            value={formData.accountHolderName}
            onChange={handleInputChange}
            placeholder="Full name as on bank account"
            required
            className="mb-6"
            inputClassName="rounded-lg"
            
          />

          <div className="flex gap-4 pt-8 justify-evenly">

            <Button
              type="button"
              onClick={handleSkip}
              variant="ghost"
                
            >
              Skip
            </Button>
            <Button
              type="submit"
              disabled={loading}
              variant="secondary"

            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BankDetails;