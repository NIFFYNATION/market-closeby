import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import { TextInput, TextareaInput, SelectInput } from '../../components/forms/FormFields';
import { Button } from '../../components/common/Button';

function StoreInfo() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    storeName: '',
    storeDescription: '',
    category: 'Choose category',
    socialPlatform: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    'Choose category',
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
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.storeName.trim() || !formData.storeDescription.trim() || formData.category === 'Choose category') {
      alert('Please fill in all required fields');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to next step or dashboard
      navigate('/account');
    } catch (error) {
      console.error('Error saving store information:', error);
      alert('Failed to save store information. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-10">
      {/* Header */}
      <AuthHeader 
        title="Store Information"
        subtitle="Let's start by gathering some basic details about your store."
        // showBackButton={true}
        onBackClick={() => navigate('/')}
      />

      {/* Form Content */}
      <div className="px-6 max-w-xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Store Name */}
          <TextInput
            id="storeName"
            name="storeName"
            label="Store Name"
            value={formData.storeName}
            onChange={handleInputChange}
            placeholder="Enter your business name"
            required
            className="mb-4"
            inputClassName="rounded-lg"
          />

          {/* Store Description */}
          <TextareaInput
            id="storeDescription"
            name="storeDescription"
            label="Store Description"
            value={formData.storeDescription}
            onChange={handleInputChange}
            placeholder="Provide details about your service"
            rows={4}
            required
            className="mb-4"
            inputClassName="rounded-lg"
          />

          {/* Category */}
          <SelectInput
            id="category"
            name="category"
            label="Category"
            value={formData.category}
            onChange={handleInputChange}
            options={categories}
            required
            className="mb-4"
            inputClassName="rounded-lg"
          />

          {/* Social Platform */}
          <TextInput
            id="socialPlatform"
            name="socialPlatform"
            label="Social Platform"
            value={formData.socialPlatform}
            onChange={handleInputChange}
            placeholder="Paste link of any of your social media page"
            type="url"
            className="mb-6"
            inputClassName="rounded-lg"
          />

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="secondary"
              size="lg"
              fullWidth
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save & Continue'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StoreInfo;