import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import { SelectInput } from '../../components/forms/FormFields';
import { Button } from '../../components/common/Button';

const DeliveryAndShipping = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    pickupAvailable: '',
    preferredCourier: ''
  });

  const pickupOptions = [
    'Select pickup availability',
    'Yes, pickup available',
    'No, delivery only',
    'Both pickup and delivery'
  ];

  const courierOptions = [
    'Select preferred courier',
    'DHL',
    'FedEx',
    'UPS',
    'GIG Logistics',
    'Jumia Logistics',
    'Konga Logistics',
    'Red Star Express',
    'ABC Transport'
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
      
      // Navigate to next step
      navigate('/bank-details');
    } catch (error) {
      console.error('Error submitting delivery info:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/bank-details');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white py-15">

      <div className="w-full max-w-xl px-4">
        <AuthHeader
          logo="/imgs/Logo-2.svg"
          logoWidth="w-20 h-20 mx-auto"
          title="Delivery & Shipping"
          subtitle="Please provide account details where your proceeds will go to"
          showBackButton={false}
        />

        <form onSubmit={handleSubmit} className="space-y-6">
          <SelectInput
            id="pickupAvailable"
            name="pickupAvailable"
            label="Pickup Available"
            value={formData.pickupAvailable}
            onChange={handleInputChange}
            options={pickupOptions}
            required
            className="mb-6"
            inputClassName="rounded-lg"
            labelClassName="font-semibold text-text-primary"
          />

          <SelectInput
            id="preferredCourier"
            name="preferredCourier"
            label="Preferred Courier"
            value={formData.preferredCourier}
            onChange={handleInputChange}
            options={courierOptions}
            required
            className="mb-6"
            inputClassName="rounded-lg"
            labelClassName="font-semibold text-text-primary"

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

export default DeliveryAndShipping;