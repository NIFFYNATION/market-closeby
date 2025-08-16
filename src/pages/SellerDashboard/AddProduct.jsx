import React, { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/common/Button";
import {
  TextInput,
  SelectInput,
  TextareaInput,
} from "../../components/forms/FormFields";
import {
  statesAndCities,
  shippingRegionOptions,
} from "../../components/common/locationsData";
import {
  categories,
  deliveryDayOptions,
  productConditionOptions,
} from "../../components/common/categoryData";

const AddProduct = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [dragActive, setDragActive] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Add step state
  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    state: "",
    lga: "",
    price: "",
    tags: "",
    description: "",
    // Delivery option fields
    estimatedDeliveryDay: "",
    shippingRegion: "",
    shippingFee: "",
    productCondition: "",
  });

  // Generate category options from imported data
  const categoryOptions = useMemo(() => {
    return ["Choose category", ...categories.map((cat) => cat.name)];
  }, []);

  // Generate subcategory options based on selected category
  const subCategoryOptions = useMemo(() => {
    if (!formData.category || formData.category === "Choose category") {
      return ["Choose sub category"];
    }

    const selectedCategory = categories.find(
      (cat) => cat.name === formData.category
    );
    if (!selectedCategory) return ["Choose sub category"];

    const allSubCategories = selectedCategory.sections.flatMap(
      (section) => section.items
    );
    return ["Choose sub category", ...allSubCategories];
  }, [formData.category]);

  // Generate state options from imported data
  const stateOptions = useMemo(() => {
    return ["Select state", ...statesAndCities.map((state) => state.name)];
  }, []);

  // Generate LGA options based on selected state
  const lgaOptions = useMemo(() => {
    if (!formData.state || formData.state === "Select state") {
      return ["Select LGA"];
    }

    const selectedState = statesAndCities.find(
      (state) => state.name === formData.state
    );
    if (!selectedState) return ["Select LGA"];

    return ["Select LGA", ...selectedState.cities];
  }, [formData.state]);

  // Generate tags options from category data
  const tagsOptions = useMemo(() => {
    const allTags = new Set(["Eg. Bags, totes"]); // Use Set to avoid duplicates

    categories.forEach((category) => {
      // Add category name as a tag
      allTags.add(category.name);

      // Add section titles as tags
      category.sections.forEach((section) => {
        allTags.add(section.title);

        // Add some items as tags (limit to avoid too many options)
        section.items.slice(0, 3).forEach((item) => {
          allTags.add(item);
        });
      });
    });

    return Array.from(allTags);
  }, []);

 
  const deliveryDaySelectOptions = useMemo(() => {
    return [
      "Choose category",
      ...deliveryDayOptions.map((option) => option.label),
    ];
  }, []);

  // Generate shipping region options from imported data
  const shippingRegionSelectOptions = useMemo(() => {
    return [
      "Select region",
      ...shippingRegionOptions.map((option) => option.label),
    ];
  }, []);

  // Generate product condition options from imported data
  const productConditionSelectOptions = useMemo(() => {
    return [
      "Select condition",
      ...productConditionOptions.map((option) => option.label),
    ];
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      // Reset dependent fields when parent field changes
      ...(name === "category" && { subCategory: "" }),
      ...(name === "state" && { lga: "" }),
    }));
  };

  const handleImageSelect = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray.filter((file) =>
      file.type.startsWith("image/")
    );

    if (selectedImages.length + validFiles.length > 10) {
      alert("Maximum 10 images allowed");
      return;
    }

    const newImages = validFiles.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      id: Date.now() + Math.random(),
    }));

    setSelectedImages((prev) => [...prev, ...newImages]);
  };

  const removeImage = (id) => {
    setSelectedImages((prev) => {
      const updated = prev.filter((img) => img.id !== id);
      // Clean up object URLs
      prev.forEach((img) => {
        if (img.id === id) {
          URL.revokeObjectURL(img.preview);
        }
      });
      return updated;
    });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageSelect(e.dataTransfer.files);
    }
  };

  const handleFileInputClick = () => {
    document.getElementById("imageInput").click();
  };

  const handleProceed = () => {
    if (currentStep === 1) {
      // Validate step 1 fields before proceeding
      const requiredFields = [
        "productName",
        "category",
        "subCategory",
        "state",
        "lga",
        "price",
        "description",
      ];
      const missingFields = requiredFields.filter((field) => !formData[field]);

      if (missingFields.length > 0 || selectedImages.length === 0) {
        alert(
          "Please fill in all required fields and upload at least one image."
        );
        return;
      }

      setCurrentStep(2);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Form Data:", formData);
      console.log("Selected Images:", selectedImages);
      // Navigate back to dashboard or show success message
      navigate("/seller-dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/seller-dashboard");
  };

  const handlePrevious = () => {
    setCurrentStep(1);
  };

  return (
    <div className=" mx-auto p-0 md:p-6 ">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-text-primary mb-2">
          Add Product
        </h1>
      </div>

      <form className="space-y-8">
        {/* Product Information Section - Always visible */}
        <div className="bg-background p-4 md:p-8 rounded-lg">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-text-primary mb-2">
              Product information
            </h2>
            <p className="text-sm text-gray-600">
              Provide valid information for your clients to reach you
            </p>
          </div>

          {/* Images Upload Section - Always visible */}
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-700 mb-4 uppercase tracking-wide">
              IMAGES
            </h3>

            {/* Desktop Layout */}
            <div className="hidden md:flex gap-6">
              {/* Upload Area - Left Side */}
              <div className="flex-shrink-0">
                <div
                  className={`w-50 h-47 bg-[#F8F8FF] border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
                    dragActive
                      ? "border-orange-400 bg-orange-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={handleFileInputClick}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center relative">
                      <img
                        src="/icons/upload.svg"
                        alt="Upload"
                        className="w-14 h-14"
                      />
                    </div>
                    <div className="text-center space-y-4">
                      <p className="text-gray-600 text-sm leading-tight">
                        <span className="font-bold text-primary ">
                          Click to upload
                        </span>{" "}
                        or
                        <br />
                        <span className="font-medium">drag and drop</span>
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Supported formats:
                        <br />
                        JPEG & PNG
                      </p>
                    </div>
                  </div>

                  <input
                    id="imageInput"
                    type="file"
                    multiple
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageSelect(e.target.files)}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2 text-center">
                  Upload a maximum of 10 pictures
                </p>
              </div>

              {/* Image Preview Grid - Right Side (Desktop) */}
              <div className="flex-1">
                {selectedImages.length > 0 ? (
                  <div>
                    <div className="grid grid-cols-7 gap-3">
                      {selectedImages.map((image) => (
                        <div key={image.id} className="relative group">
                          <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                            <img
                              src={image.preview}
                              alt="Preview"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeImage(image.id);
                            }}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-background rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          >
                            <img src="/icons/cancel-black.svg" alt="Cancel" />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-sm text-gray-500 mt-3">
                      {selectedImages.length}/10 images selected
                    </p>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32 text-gray-400 text-sm">
                    No images selected
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Layout */}
            <div className="md:hidden space-y-4">
              {/* Upload Area - Mobile */}
              <div
                className={`w-full h-32 bg-[#F8F8FF] border-2 border-dashed rounded-lg flex flex-col items-center justify-center transition-colors duration-200 cursor-pointer ${
                  dragActive
                    ? "border-orange-400 bg-orange-50"
                    : "border-gray-300 hover:border-gray-400"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={handleFileInputClick}
              >
                <div className="flex flex-col items-center space-y-1">
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center relative">
                    <img
                      src="/icons/upload.svg"
                      alt="Upload"
                      className="w-14 h-14"
                    />
                  </div>
                  <div className="text-center space-y-2">
                    <p className="text-gray-600 text-sm leading-tight">
                      <span className="font-bold text-primary ">
                        Click to upload{" "}
                      </span>
                      <span className="font-medium">or drag and drop</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-1">
                      Supported formats: JPEG & PNG
                    </p>
                  </div>
                </div>

                <input
                  id="imageInput"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleImageSelect(e.target.files)}
                />
              </div>

              <p className="text-gray-500 text-xs text-center">
                Upload a maximum of 10 pictures
              </p>

              {/* Image Preview Grid - Mobile */}
              {selectedImages.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-gray-700">
                      Selected Images
                    </h4>
                    <span className="text-sm text-gray-500">
                      {selectedImages.length}/10
                    </span>
                  </div>

                  {/* Mobile Image Grid - 2 columns for better visibility */}
                  <div className="grid grid-cols-2 gap-3">
                    {selectedImages.map((image) => (
                      <div key={image.id} className="relative group">
                        <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                          <img
                            src={image.preview}
                            alt="Preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeImage(image.id);
                          }}
                          className="absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center shadow-lg  transition-colors duration-200"
                        >
                          <img src="/icons/cancel-black.svg" alt="Cancel" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Horizontal scroll for many images (alternative layout) */}
                  {selectedImages.length > 4 && (
                    <div className="mt-4">
                      <p className="text-xs text-gray-500 mb-2">
                        Scroll to see all images:
                      </p>
                      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300">
                        {selectedImages.map((image) => (
                          <div
                            key={`scroll-${image.id}`}
                            className="relative flex-shrink-0 group"
                          >
                            <div className="w-20 h-20 rounded-lg overflow-hidden bg-gray-100">
                              <img
                                src={image.preview}
                                alt="Preview"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeImage(image.id);
                              }}
                              className="absolute -top-1 -right-1 w-5 h-5 bg-black text-background rounded-full flex items-center justify-center text-xs hover:bg-gray-800 transition-colors duration-200"
                            >
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"
                                />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Conditional Content Based on Step */}
          {currentStep === 1 ? (
            /* Other Info Section - Step 1 */
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                OTHER INFO
              </h3>

              {/* Product Name */}
              <TextInput
                id="productName"
                name="productName"
                label="Product name"
                value={formData.productName}
                onChange={handleInputChange}
                placeholder="Eg. Cooker"
                required
                inputClassName="rounded-lg bg-background border-gray-300"
              />

              {/* Category and Sub Category Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput
                  id="category"
                  name="category"
                  label="Category"
                  value={formData.category}
                  onChange={handleInputChange}
                  options={categoryOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
                <SelectInput
                  id="subCategory"
                  name="subCategory"
                  label="Sub category"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  options={subCategoryOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
              </div>

              {/* State and LGA Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput
                  id="state"
                  name="state"
                  label="Select state"
                  value={formData.state}
                  onChange={handleInputChange}
                  options={stateOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
                <SelectInput
                  id="lga"
                  name="lga"
                  label="Select LGA"
                  value={formData.lga}
                  onChange={handleInputChange}
                  options={lgaOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
              </div>

              {/* Price and Tags Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  id="price"
                  name="price"
                  label="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Eg. ₦10,000"
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
                <SelectInput
                  id="tags"
                  name="tags"
                  label="Tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  options={tagsOptions}
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
              </div>

              {/* Description */}
              <TextareaInput
                id="description"
                name="description"
                label="Description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide details about your service"
                rows={6}
                required
                inputClassName="rounded-lg bg-background border-gray-300"
              />
            </div>
          ) : (
            /* Delivery Option Section - Step 2 */
            <div className="space-y-6">
              <h3 className="text-sm font-medium text-gray-700 uppercase tracking-wide">
                DELIVERY OPTION
              </h3>

              {/* Estimated delivery day and Shipping region Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SelectInput
                  id="estimatedDeliveryDay"
                  name="estimatedDeliveryDay"
                  label="Estimated delivery day"
                  value={formData.estimatedDeliveryDay}
                  onChange={handleInputChange}
                  options={deliveryDaySelectOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
                <SelectInput
                  id="shippingRegion"
                  name="shippingRegion"
                  label="Shipping region"
                  value={formData.shippingRegion}
                  onChange={handleInputChange}
                  options={shippingRegionSelectOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
              </div>

              {/* Shipping fee and Product condition Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  id="shippingFee"
                  name="shippingFee"
                  label="Shipping fee"
                  value={formData.shippingFee}
                  onChange={handleInputChange}
                  placeholder="Eg. ₦10,000"
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
                <SelectInput
                  id="productCondition"
                  name="productCondition"
                  label="Product condition"
                  value={formData.productCondition}
                  onChange={handleInputChange}
                  options={productConditionSelectOptions}
                  required
                  inputClassName="rounded-lg bg-background border-gray-300"
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          {currentStep === 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className="px-8 py-3 border border-gray-300 text-gray-700 bg-background hover:bg-gray-50 rounded-lg font-medium"
            >
              Previous
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className="px-8 py-3 border border-gray-300 text-gray-700 bg-background hover:bg-gray-50 rounded-lg font-medium"
            >
              Cancel
            </Button>
          )}
          <Button
            type="button"
            variant="secondary"
            disabled={loading}
            onClick={handleProceed}
            className="px-8 py-3 bg-secondary text-background hover:bg-secondary-light rounded-lg font-medium disabled:opacity-50"
          >
            {loading
              ? "Processing..."
              : currentStep === 1
              ? "Proceed"
              : "Post Product"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;