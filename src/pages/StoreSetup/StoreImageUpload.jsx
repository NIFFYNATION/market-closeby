import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthHeader from '../../components/common/AuthHeader';
import { Button } from '../../components/common/Button';

const StoreImageUpload = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileSelect = (file) => {
    if (file && (file.type === 'image/png' || file.type === 'image/jpeg' || file.type === 'image/jpg')) {
      setSelectedFile(file);
    } else {
      alert('Please select a PNG or JPG image file.');
    }
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSkip = () => {
    navigate('/account-complete');
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
      
      // Navigate to next step
      navigate('/account-complete');
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <AuthHeader 
        title="Upload Picture Of Your Store"
        subtitle="Make your store stand out with a clear, professional image"
        showBackButton={true}
        onBackClick={() => navigate('/store-setup')}
      />

      {/* Upload Content */}
      <div className="px-6 py-8 max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Upload Section */}
          <div>
            <label className="block text-sm font-medium text-text-primary mb-4">
              Upload Store Image
            </label>
            
            <div 
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
                isDragOver 
                  ? 'border-primary bg-blue-50' 
                  : selectedFile 
                    ? 'border-green-400 bg-green-50'
                    : 'border-gray-300 bg-gray-50'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {/* Cloud Upload Icon */}
              <div className="mb-4">
                <svg 
                  className="w-12 h-12 mx-auto text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>

              {/* Upload Text */}
              <div className="space-y-2">
                {selectedFile ? (
                  <div>
                    <p className="text-green-600 font-medium">
                      ✓ {selectedFile.name}
                    </p>
                    <p className="text-sm text-gray-500">
                      File selected successfully
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600">
                      <button 
                        type="button"
                        onClick={handleUploadClick}
                        className="text-primary-orange font-medium hover:underline"
                      >
                        Click to upload
                      </button>
                      {' '}or drag and drop
                    </p>
                    <p className="text-sm text-gray-500">
                      PNG or JPG
                    </p>
                  </div>
                )}
              </div>

              {/* Hidden File Input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".png,.jpg,.jpeg"
                onChange={handleFileInputChange}
                className="hidden"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-evenly pt-8">
            <Button
              onClick={handleSkip}
              variant="outline"
              size="lg"
              disabled={isLoading}
              className='px-15'
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