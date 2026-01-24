import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import ImageUploader from "../../components/forms/ImageUploader";
import { useDashboardTheme } from "./DashboardLayout";
import { FiCpu, FiX, FiCalendar, FiShare2, FiPercent, FiTrendingUp, FiLayers, FiCheck } from "react-icons/fi";
import { FaBullhorn } from "react-icons/fa";
import { useToast } from "../../context/ToastContext";
import { useSellerStore } from '../../store/sellerStore';

const EditProduct = () => {
  const { theme } = useDashboardTheme();
  const navigate = useNavigate();
  const { id } = useParams();
  const { stores, currentStoreId } = useSellerStore();
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentStep, setCurrentStep] = useState(1); // Add step state
  
  // AI State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    productName: "",
    category: "",
    subCategory: "",
    state: "",
    lga: "",
    price: "",
    stock: "",
    discount: "",
    tags: [],
    description: "",
    // Delivery option fields
    estimatedDeliveryDay: "",
    shippingRegion: "",
    shippingFee: "",
    productCondition: "",
    // Advanced Settings
    scheduledDate: "",
    autoPostSocial: false,
    selectedSocialPlatforms: [],
    enableDynamicPricing: false,
    dynamicPricing: {
        type: 'sales_count', // or 'date'
        increaseAmount: '',
        threshold: '', // sales count or date
    },
    enableDiscountScheduler: false,
    discountScheduler: {
        percentage: '',
        startDate: '',
        endDate: '',
    },
    enableAds: false,
    adsSettings: {
        budget: '',
        duration: '7',
        audience: 'all',
        adFormat: 'banner',
        placement: 'search_results',
        cta: 'shop_now'
    },
    targetStores: [currentStoreId], // Default to current store
  });

  const [tagInput, setTagInput] = useState("");

  // Simulate fetching product data
  useEffect(() => {
    if (id) {
        setLoading(true);
        // Simulate API call delay
        setTimeout(() => {
            // Mock data - in a real app, this would come from an API based on ID
            setFormData({
                productName: "Premium Leather Bag",
                category: "Fashion",
                subCategory: "Bags",
                state: "Lagos",
                lga: "Ikeja",
                price: "25000",
                stock: "15",
                discount: "10",
                tags: ["Fashion", "Leather", "Bag"],
                description: "High quality leather bag suitable for all occasions.",
                estimatedDeliveryDay: "1-3 Days",
                shippingRegion: "Nationwide",
                shippingFee: "2000",
                productCondition: "New",
                scheduledDate: "",
                autoPostSocial: true,
                selectedSocialPlatforms: ["Instagram"],
                enableDynamicPricing: false,
                dynamicPricing: {
                    type: 'sales_count',
                    increaseAmount: '',
                    threshold: '',
                },
                enableDiscountScheduler: false,
                discountScheduler: {
                    percentage: '',
                    startDate: '',
                    endDate: '',
                },
                enableAds: false,
                adsSettings: {
                    budget: '',
                    duration: '7',
                    audience: 'all',
                    adFormat: 'banner',
                    placement: 'search_results',
                    cta: 'shop_now'
                },
                targetStores: [currentStoreId],
            });
            
            // Mock images
            setSelectedImages([
                { id: 1, preview: "https://via.placeholder.com/150", file: null }
            ]);
            
            setLoading(false);
        }, 1000);
    }
  }, [id, currentStoreId]);

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const value = tagInput.trim().replace(/,$/, '');
      if (value && !formData.tags.includes(value)) {
        setFormData(prev => ({
          ...prev,
          tags: [...prev.tags, value]
        }));
        setTagInput("");
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

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

  const handleGenerateDescription = async () => {
    if (!aiPrompt.trim()) return;
    
    setIsGenerating(true);
    // Simulate AI generation
    setTimeout(() => {
      const generatedDesc = `This ${formData.productName || 'product'} is a top-quality item in the ${formData.category || 'general'} category. ${aiPrompt}. It features excellent durability and performance, making it a perfect choice for your needs. Condition: ${formData.productCondition || 'New'}.`;
      setFormData(prev => ({ ...prev, description: generatedDesc }));
      setIsGenerating(false);
      setIsAiModalOpen(false);
      showToast('Product description generated successfully!', 'success');
    }, 1500);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === 'checkbox' ? checked : value;
    
    setFormData((prev) => ({
      ...prev,
      [name]: val,
      // Reset dependent fields when parent field changes
      ...(name === "category" && { subCategory: "" }),
      ...(name === "state" && { lga: "" }),
    }));
  };

  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
        ...prev,
        [parent]: {
            ...prev[parent],
            [field]: value
        }
    }));
  };

  const handleToggleArray = (field, value) => {
      setFormData(prev => {
          const arr = prev[field];
          return {
              ...prev,
              [field]: arr.includes(value) ? arr.filter(item => item !== value) : [...arr, value]
          };
      });
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
        "stock",
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
       // Validate Step 2 (Delivery)
       const requiredFields = ["estimatedDeliveryDay", "shippingRegion", "shippingFee", "productCondition"];
       const missingFields = requiredFields.filter((field) => !formData[field]);
       if (missingFields.length > 0) {
           alert("Please fill in all delivery options.");
           return;
       }
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
      showToast('Product updated successfully!', 'success');
      navigate("/seller-dashboard/products");
    } catch (error) {
      console.error("Error submitting form:", error);
      showToast('Failed to update product.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/seller-dashboard/products");
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  // Reusable theme classes
  const inputThemeClass = `rounded-lg border ${
    theme === 'dark'
      ? 'bg-[#111827] border-gray-700 text-slate-100 placeholder-slate-500'
      : 'bg-background border-gray-300'
  }`;

  const labelThemeClass = theme === 'dark' ? 'text-slate-300' : 'text-gray-700';

  if (loading && !formData.productName) {
      return (
          <div className="flex items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-amber-500"></div>
          </div>
      );
  }

  return (
    <div className=" mx-auto p-0 md:p-6 ">
      {/* Header */}
      <div className="mb-8">
        <h1
          className={`text-2xl font-semibold mb-2 ${
            theme === "dark" ? "text-white" : "text-text-primary"
          }`}
        >
          Edit Product
        </h1>
      </div>

      <form className="space-y-8">
        {/* Product Information Section - Always visible */}
        <div
          className={`p-4 md:p-8 rounded-lg shadow-sm border ${
            theme === "dark"
              ? "bg-[#1e1e1e] border-white/10"
              : "bg-background border-gray-100"
          }`}
        >
          <div className="mb-6">
            <h2
              className={`text-lg font-semibold mb-2 ${
                theme === "dark" ? "text-white" : "text-text-primary"
              }`}
            >
              Product information
            </h2>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-slate-400" : "text-gray-600"
              }`}
            >
              Update information for your product
            </p>
          </div>

          {/* Images Upload Section - Always visible */}
          <ImageUploader 
            images={selectedImages}
            setImages={setSelectedImages}
            theme={theme}
          />

          {/* Conditional Content Based on Step */}
          {currentStep === 1 ? (
            /* Other Info Section - Step 1 */
            <div className="space-y-6">
              <h3
                className={`text-sm font-medium uppercase tracking-wide ${
                  theme === "dark" ? "text-slate-300" : "text-gray-700"
                }`}
              >
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
                inputClassName={inputThemeClass}
                labelClassName={labelThemeClass}
                theme={theme}
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
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
                <SelectInput
                  id="subCategory"
                  name="subCategory"
                  label="Sub category"
                  value={formData.subCategory}
                  onChange={handleInputChange}
                  options={subCategoryOptions}
                  required
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
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
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
                <SelectInput
                  id="lga"
                  name="lga"
                  label="Select LGA"
                  value={formData.lga}
                  onChange={handleInputChange}
                  options={lgaOptions}
                  required
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
              </div>

              {/* Price and Stock Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TextInput
                  id="price"
                  name="price"
                  label="Price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="Eg. ₦10,000"
                  required
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
                <TextInput
                  id="stock"
                  name="stock"
                  label="Stock Quantity"
                  value={formData.stock}
                  onChange={handleInputChange}
                  placeholder="Eg. 50"
                  required
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
              </div>

              {/* Discount and Tags Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                   <TextInput
                    id="discount"
                    name="discount"
                    label="Discount (%)"
                    value={formData.discount}
                    onChange={handleInputChange}
                    placeholder="Eg. 10"
                    inputClassName={inputThemeClass}
                    labelClassName={labelThemeClass}
                    theme={theme}
                  />
                  {formData.price && formData.discount && (
                      <p className={`absolute right-0 top-0 text-xs ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}>
                          Final Price: ₦{(parseInt(formData.price.replace(/[^0-9]/g, '')) * (1 - parseInt(formData.discount)/100)).toLocaleString()}
                      </p>
                  )}
                </div>
                
                <div className="relative">
                  <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Tags</label>
                  <div className={`w-full px-4 py-3 rounded-lg border min-h-[50px] flex flex-wrap gap-2 ${inputThemeClass}`}>
                    {formData.tags.map((tag, index) => (
                      <span key={index} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        theme === 'dark' ? 'bg-amber-500/20 text-amber-500' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 focus:outline-none"
                        >
                          <FiX className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder={formData.tags.length === 0 ? "Type and press Enter..." : ""}
                      className="flex-1 bg-transparent outline-none min-w-[120px]"
                    />
                  </div>
                  <p className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-500' : 'text-gray-500'}`}>
                    Press Enter or Comma to add tags
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="relative">
                <div className="flex justify-between items-center mb-1">
                  <label className={`block text-sm font-medium ${labelThemeClass}`}>
                    Description
                  </label>
                  <button
                    type="button"
                    onClick={() => setIsAiModalOpen(true)}
                    className="flex items-center gap-1 text-xs font-medium text-amber-500 hover:text-amber-600 transition-colors"
                  >
                    <FiCpu className="w-3 h-3" />
                    Generate with AI
                  </button>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Provide details about your product"
                  rows={6}
                  required
                  className={`w-full px-4 py-3 outline-none transition-all duration-200 ${inputThemeClass}`}
                />
              </div>

              {/* Advanced Settings & Marketing */}
              <div className="space-y-8 mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className={`text-sm font-medium uppercase tracking-wide ${theme === "dark" ? "text-slate-300" : "text-gray-700"}`}>
                  ADVANCED SETTINGS & MARKETING
                </h3>

                {/* Schedule Publishing */}
                <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-start gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">
                            <FiCalendar className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h4 className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Schedule Publishing</h4>
                            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                Choose a future date to automatically publish this product. Leave blank to publish immediately.
                            </p>
                            <input 
                                type="datetime-local" 
                                name="scheduledDate"
                                value={formData.scheduledDate}
                                onChange={handleInputChange}
                                className={`w-full max-w-xs px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Dynamic Pricing */}
                <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-500/10 rounded-lg text-green-500">
                                <FiTrendingUp className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Dynamic Pricing</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Automatically increase price based on demand or time.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="enableDynamicPricing"
                                checked={formData.enableDynamicPricing}
                                onChange={handleInputChange}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                        </label>
                    </div>

                    {formData.enableDynamicPricing && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-16">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Increase Amount (₦)</label>
                                <input 
                                    type="number" 
                                    value={formData.dynamicPricing.increaseAmount}
                                    onChange={(e) => handleNestedChange('dynamicPricing', 'increaseAmount', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                    placeholder="Eg. 500"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Trigger Type</label>
                                <select 
                                    value={formData.dynamicPricing.type}
                                    onChange={(e) => handleNestedChange('dynamicPricing', 'type', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                >
                                    <option value="sales_count">Sales Count</option>
                                    <option value="date">Specific Date</option>
                                </select>
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>
                                    {formData.dynamicPricing.type === 'sales_count' ? 'Threshold (Sales)' : 'Effective Date'}
                                </label>
                                <input 
                                    type={formData.dynamicPricing.type === 'sales_count' ? "number" : "datetime-local"}
                                    value={formData.dynamicPricing.threshold}
                                    onChange={(e) => handleNestedChange('dynamicPricing', 'threshold', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                    placeholder={formData.dynamicPricing.type === 'sales_count' ? "Eg. 10" : ""}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Discount Scheduler */}
                <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-red-500/10 rounded-lg text-red-500">
                                <FiPercent className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Scheduled Discount</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Schedule a temporary price reduction.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="enableDiscountScheduler"
                                checked={formData.enableDiscountScheduler}
                                onChange={handleInputChange}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-500"></div>
                        </label>
                    </div>

                    {formData.enableDiscountScheduler && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pl-16">
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Discount (%)</label>
                                <input 
                                    type="number" 
                                    value={formData.discountScheduler.percentage}
                                    onChange={(e) => handleNestedChange('discountScheduler', 'percentage', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                    placeholder="Eg. 20"
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Start Date</label>
                                <input 
                                    type="datetime-local" 
                                    value={formData.discountScheduler.startDate}
                                    onChange={(e) => handleNestedChange('discountScheduler', 'startDate', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                />
                            </div>
                            <div>
                                <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>End Date</label>
                                <input 
                                    type="datetime-local" 
                                    value={formData.discountScheduler.endDate}
                                    onChange={(e) => handleNestedChange('discountScheduler', 'endDate', e.target.value)}
                                    className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                />
                            </div>
                        </div>
                    )}
                </div>

                {/* Social Media Auto-Post */}
                <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-pink-500/10 rounded-lg text-pink-500">
                                <FiShare2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Social Media Auto-Post</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Automatically post this product to your connected social accounts.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="autoPostSocial"
                                checked={formData.autoPostSocial}
                                onChange={handleInputChange}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-pink-500"></div>
                        </label>
                    </div>
                    
                    {formData.autoPostSocial && (
                        <div className="pl-16 grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Facebook', 'Instagram', 'Twitter', 'LinkedIn'].map(platform => (
                                <label key={platform} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    formData.selectedSocialPlatforms.includes(platform) 
                                    ? 'bg-pink-500/10 border-pink-500 text-pink-500' 
                                    : theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600'
                                }`}>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={formData.selectedSocialPlatforms.includes(platform)}
                                        onChange={() => handleToggleArray('selectedSocialPlatforms', platform)}
                                    />
                                    {formData.selectedSocialPlatforms.includes(platform) ? <FiCheck /> : <div className="w-4 h-4 rounded-full border border-current" />}
                                    <span className="text-sm font-medium">{platform}</span>
                                </label>
                            ))}
                        </div>
                    )}
                </div>

                {/* Platform Ads */}
                <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-500/10 rounded-lg text-amber-500">
                                <FaBullhorn className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Run Ad Campaign</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Boost visibility by running ads for this product.
                                </p>
                            </div>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                            <input 
                                type="checkbox" 
                                name="enableAds"
                                checked={formData.enableAds}
                                onChange={handleInputChange}
                                className="sr-only peer" 
                            />
                            <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                        </label>
                    </div>

                    {formData.enableAds && (
                        <div className="pl-16 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Budget (₦)</label>
                                    <input 
                                        type="number" 
                                        value={formData.adsSettings.budget}
                                        onChange={(e) => handleNestedChange('adsSettings', 'budget', e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                        placeholder="Eg. 5000"
                                    />
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Duration (Days)</label>
                                    <select 
                                        value={formData.adsSettings.duration}
                                        onChange={(e) => handleNestedChange('adsSettings', 'duration', e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                    >
                                        <option value="3">3 Days</option>
                                        <option value="7">7 Days</option>
                                        <option value="14">14 Days</option>
                                        <option value="30">30 Days</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Target Audience</label>
                                    <select 
                                        value={formData.adsSettings.audience}
                                        onChange={(e) => handleNestedChange('adsSettings', 'audience', e.target.value)}
                                        className={`w-full px-4 py-2 rounded-lg outline-none border ${inputThemeClass}`}
                                    >
                                        <option value="all">All Users</option>
                                        <option value="browsers">Recent Browsers</option>
                                        <option value="buyers">Previous Buyers</option>
                                        <option value="local">Local Only</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Ad Format</label>
                                    <select 
                                        value={formData.adsSettings.adFormat}
                                        onChange={(e) => handleNestedChange('adsSettings', 'adFormat', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-lg outline-none border ${inputThemeClass}`}
                                    >
                                        <option value="banner">Banner Ad</option>
                                        <option value="sponsored">Sponsored Listing</option>
                                        <option value="popup">Pop-up Promotion</option>
                                        <option value="sidebar">Sidebar Feature</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Placement</label>
                                    <select 
                                        value={formData.adsSettings.placement}
                                        onChange={(e) => handleNestedChange('adsSettings', 'placement', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-lg outline-none border ${inputThemeClass}`}
                                    >
                                        <option value="search_results">Search Results</option>
                                        <option value="home_page">Home Page</option>
                                        <option value="category_page">Category Page</option>
                                        <option value="checkout">Checkout Recommended</option>
                                    </select>
                                </div>
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${labelThemeClass}`}>Call to Action</label>
                                    <select 
                                        value={formData.adsSettings.cta}
                                        onChange={(e) => handleNestedChange('adsSettings', 'cta', e.target.value)}
                                        className={`w-full px-4 py-3 rounded-lg outline-none border ${inputThemeClass}`}
                                    >
                                        <option value="shop_now">Shop Now</option>
                                        <option value="learn_more">Learn More</option>
                                        <option value="sign_up">Sign Up</option>
                                        <option value="view_deal">View Deal</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                 {/* Multi-Store Posting */}
                 {stores.length > 1 && (
                    <div className={`p-6 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex items-start gap-4 mb-4">
                            <div className="p-3 bg-purple-500/10 rounded-lg text-purple-500">
                                <FiLayers className="w-6 h-6" />
                            </div>
                            <div>
                                <h4 className={`text-base font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Post to Multiple Stores</h4>
                                <p className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                                    Select other stores to publish this product to simultaneously.
                                </p>
                            </div>
                        </div>
                        
                        <div className="pl-16 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {stores.map(store => (
                                <label key={store.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${
                                    formData.targetStores.includes(store.id) 
                                    ? 'bg-purple-500/10 border-purple-500 text-purple-500' 
                                    : theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-400 hover:bg-white/10' : 'bg-white border-slate-200 text-slate-600'
                                }`}>
                                    <input 
                                        type="checkbox" 
                                        className="hidden"
                                        checked={formData.targetStores.includes(store.id)}
                                        onChange={() => handleToggleArray('targetStores', store.id)}
                                        disabled={store.id === currentStoreId}
                                    />
                                    {formData.targetStores.includes(store.id) ? <FiCheck /> : <div className="w-4 h-4 rounded-full border border-current" />}
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">{store.name}</span>
                                        {store.id === currentStoreId && <span className="text-[10px] opacity-70">(Current)</span>}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>
                 )}

              </div>
            </div>
          ) : (
            /* Delivery Option Section - Step 2 */
            <div className="space-y-6">
              <h3
                className={`text-sm font-medium uppercase tracking-wide ${
                  theme === "dark" ? "text-slate-300" : "text-gray-700"
                }`}
              >
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
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
                <SelectInput
                  id="shippingRegion"
                  name="shippingRegion"
                  label="Shipping region"
                  value={formData.shippingRegion}
                  onChange={handleInputChange}
                  options={shippingRegionSelectOptions}
                  required
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
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
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
                <SelectInput
                  id="productCondition"
                  name="productCondition"
                  label="Product condition"
                  value={formData.productCondition}
                  onChange={handleInputChange}
                  options={productConditionSelectOptions}
                  required
                  inputClassName={inputThemeClass}
                  labelClassName={labelThemeClass}
                  theme={theme}
                />
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          {currentStep > 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              className={`px-8 py-3 border rounded-lg font-medium ${
                theme === "dark"
                  ? "border-gray-600 text-slate-200 bg-[#111827] hover:bg-[#1f2937]"
                  : "border-gray-300 text-gray-700 bg-background hover:bg-gray-50"
              }`}
            >
              Previous
            </Button>
          )}
          {currentStep === 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              className={`px-8 py-3 border rounded-lg font-medium ${
                theme === "dark"
                  ? "border-gray-600 text-slate-200 bg-[#111827] hover:bg-[#1f2937]"
                  : "border-gray-300 text-gray-700 bg-background hover:bg-gray-50"
              }`}
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
              ? "Updating..."
              : currentStep === 2
              ? "Update Product"
              : "Proceed"}
          </Button>
        </div>
      </form>

      {/* AI Description Generator Modal */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className={`w-full max-w-md rounded-xl shadow-2xl overflow-hidden ${
            theme === 'dark' ? 'bg-[#1e1e1e] border border-white/10' : 'bg-white'
          }`}>
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-amber-500/10 rounded-lg">
                  <FiCpu className="w-5 h-5 text-amber-500" />
                </div>
                <h3 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                  AI Description Generator
                </h3>
              </div>
              <button 
                onClick={() => setIsAiModalOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6">
              <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}`}>
                Describe the key features of your product, and our AI will generate a professional description for you.
              </p>
              
              <textarea
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                placeholder="E.g. A durable leather bag suitable for travel and daily use..."
                className={`w-full h-32 p-3 rounded-lg resize-none mb-4 outline-none border transition-colors ${
                  theme === 'dark' 
                    ? 'bg-[#121212] border-white/10 text-white placeholder-slate-600 focus:border-amber-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-amber-500'
                }`}
              />
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsAiModalOpen(false)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    theme === 'dark' 
                      ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerateDescription}
                  disabled={!aiPrompt.trim() || isGenerating}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-[#1a1a4b] text-sm font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-[#1a1a4b] border-t-transparent rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <FiCpu className="w-4 h-4" />
                      Generate
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProduct;