import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthHeader from "../../components/common/AuthHeader";
import { TextInput } from "../../components/forms/FormFields";
import { Button } from "../../components/common/Button";
import FileUpload from "../../components/common/FileUpload";

const Kyc = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleSkip = () => {
    navigate("/location-info");
  };

  const handleSaveAndContinue = async () => {
    // Validate required fields
    if (!formData.fullName.trim() || !formData.dateOfBirth.trim()) {
      alert("Please fill in all required fields.");
      return;
    }

    if (!selectedFile) {
      alert("Please upload a valid means of identification.");
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Navigate to location-info page
      navigate("/location-info");
    } catch (error) {
      console.error("Error submitting KYC:", error);
      alert("Failed to submit KYC information. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white py-15">
      {/* Header */}
      <AuthHeader
        title="Complete Your KYC"
        subtitle="Please ensure the details match your official documents"
        onBackClick={() => navigate("/store-image-upload")}
      />

      {/* Form Content */}
      <div className="px-6 py-8 max-w-xl mx-auto">
        <div className="space-y-6">
          {/* Full Name */}
          <TextInput
            id="fullName"
            name="fullName"
            label="Full Name (as on ID)"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Enter Your Full Name"
            required
            className="mb-4"
            inputClassName="rounded-lg"
            disabled={isLoading}
          />

          {/* Date of Birth */}
          <TextInput
            id="dateOfBirth"
            name="dateOfBirth"
            label="Date Of Birth"
            value={formData.dateOfBirth}
            onChange={handleInputChange}
            placeholder="DD/MM/YYYY"
            type="text"
            required
            className="mb-6"
            inputClassName="rounded-lg"
            disabled={isLoading}
          />

          {/* ID Upload Section */}
          <FileUpload
            label="Upload Valid Means of Identification (NIN or International Passport)"
            acceptedTypes={['.svg', '.png', '.jpg', '.jpeg', '.gif']}
            acceptedMimeTypes={['image/svg+xml', 'image/png', 'image/jpeg', 'image/gif']}
            maxSizeText="SVG, PNG, JPG or GIF (max. 800x400px)"
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
              {isLoading ? "Submitting..." : "Save & Continue"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Kyc;