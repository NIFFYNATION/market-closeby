import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import { Button } from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';

const StoreImageUpload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSkip = () => {
    navigate('/kyc');
  };

  const handleSaveAndContinue = async () => {
    if (!selectedFile) {
      alert('Please select an image to upload.');
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate file upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Navigate to KYC page
      navigate('/kyc');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-15">
      {/* Header */}
      <AuthHeader 
        title="Upload Picture Of Your Store"
        subtitle="Make your store stand out with a clear, professional image"
        onBackClick={() => navigate('/store-setup')}
      />

      {/* Upload Content */}
      <div className="px-6 py-8 max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Upload Section */}
          <FileUpload
            label="Upload Store Image"
            acceptedTypes={['.png', '.jpg', '.jpeg']}
            acceptedMimeTypes={['image/png', 'image/jpeg']}
            maxSizeText="PNG or JPG"
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            disabled={isLoading}
          />

          {/* Action Buttons */}
          <div className="flex justify-evenly pt-8">
            <Button
              onClick={handleSkip}
              variant="ghost"
              size="lg"
              disabled={isLoading}
            >
              Skip
            </Button>
            
            <Button
              onClick={handleSaveAndContinue}
              variant="secondary"
              size="lg"
              disabled={isLoading}
            >
              {isLoading ? 'Uploading...' : 'Save & Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreImageUpload;