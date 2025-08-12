import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import { Button } from '../../components/common/Button';
import FileUpload from '../../components/common/FileUpload';

const ConfirmBusinessId = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileSelect = (file) => {
    setUploadedFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Navigate to next step
      navigate('/delivery-shipping');
    } catch (error) {
      console.error('Error submitting business ID:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSkip = () => {
    navigate('/delivery-shipping');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-white py-15">
      <div className="w-full max-w-xl px-4">
        <AuthHeader
          logo="/imgs/Logo-2.svg"
          logoWidth="w-20 h-20 mx-auto"
          title="Business Identity Confirmation"
          subtitle="Upload your CAC certificate to confirm your business is officially registered"
          showBackButton={false}
        />

        <div className="space-y-6">
          <FileUpload
            label="Upload your document (CAC)"
            acceptedTypes={['.svg', '.png', '.jpg', '.jpeg', '.gif']}
            acceptedMimeTypes={['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']}
            maxSizeText="SVG, PNG, JPG or GIF (max. 800x400px)"
            onFileSelect={handleFileSelect}
            selectedFile={uploadedFile}
            disabled={loading}
          />

          <div className="flex gap-4 pt-8 justify-evenly">
            <Button
              type="button"
              onClick={handleSkip}
              variant="ghost"
              disabled={loading}
            >
              Skip
            </Button>
            <Button
              variant="secondary"
              type="button"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save & Continue'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmBusinessId;