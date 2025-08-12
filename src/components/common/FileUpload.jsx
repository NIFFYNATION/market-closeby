import React, { useState, useRef } from 'react';

const FileUpload = ({
  label = "Upload File",
  acceptedTypes = ['.png', '.jpg', '.jpeg'],
  acceptedMimeTypes = ['image/png', 'image/jpeg'],
  maxSizeText = "PNG or JPG",
  onFileSelect,
  selectedFile,
  className = "",
  uploadIconSrc = "/icons/upload.svg",
  disabled = false
}) => {
  const fileInputRef = useRef(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleFileSelect = (file) => {
    if (file && acceptedMimeTypes.includes(file.type)) {
      onFileSelect(file);
    } else {
      const typesList = acceptedTypes.join(', ').toUpperCase();
      alert(`Please select a valid file type: ${typesList}`);
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
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (!disabled) {
      const file = e.dataTransfer.files[0];
      if (file) {
        handleFileSelect(file);
      }
    }
  };

  const handleUploadClick = () => {
    if (!disabled) {
      fileInputRef.current?.click();
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-semibold text-gray-800 mb-4">
          {label}
        </label>
      )}
      
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors duration-200 ${
          disabled
            ? 'border-gray-200 bg-gray-100 cursor-not-allowed'
            : isDragOver
            ? 'border-primary bg-primary/5'
            : selectedFile
            ? 'border-green-400 bg-green-50'
            : 'border-gray-300 hover:border-gray-400 cursor-pointer'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleUploadClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(',')}
          onChange={handleFileInputChange}
          className="hidden"
          disabled={disabled}
        />
        
        <div className="space-y-4">
          <div className="mx-auto w-12 h-12 flex items-center justify-center">
            <img src={uploadIconSrc} alt="Upload" className="w-12 h-12" />
          </div>
          
          {selectedFile ? (
            <div>
              <p className="text-green-600 font-medium">✓ {selectedFile.name}</p>
              <p className="text-sm text-gray-500">File selected successfully</p>
            </div>
          ) : (
            <div>
              <p className={`${disabled ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className={`font-medium ${disabled ? 'text-gray-400' : 'text-secondary hover:text-secondary-light'}`}>


                  Click to upload
                </span>
                {' '}or drag and drop
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {maxSizeText}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;