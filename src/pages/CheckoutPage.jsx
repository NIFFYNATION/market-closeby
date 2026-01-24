import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useOrdersStore } from "../store/ordersStore";
import { useUserStore } from "../store/userStore";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";
import { TextInput, SelectInput } from "../components/forms/FormFields";
import ShippingAddressSection from "../components/checkout/ShippingAddressSection";

const formatCurrency = (value) =>
  `₦${Math.max(value, 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const deliveryFee = useCartStore((state) => state.deliveryFee());
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const { showToast } = useToast();
  
  // User store for addresses
  const addresses = useUserStore((state) => state.addresses);
  const profile = useUserStore((state) => state.profile);
  const addAddressToStore = useUserStore((state) => state.addAddress);
  const updateAddressInStore = useUserStore((state) => state.updateAddress);
  const setDefaultAddress = useUserStore((state) => state.setDefaultAddress);
  const defaultAddress = addresses.find((a) => a.isDefault) || addresses[0];
  const removeAddressFromStore = useUserStore((state) => state.removeAddress);

  // State declarations - must be before useEffect hooks
  const [selectedAddressId, setSelectedAddressId] = useState(defaultAddress?.id || '');
  const [selectedShippingMethod, setSelectedShippingMethod] = useState('standard');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const profileDefaults = useMemo(
    () => ({
      fullName: profile.fullName || "",
      email: profile.email || "",
      phone: profile.phone || "",
    }),
    [profile.fullName, profile.email, profile.phone]
  );

  const normalizeUserAddress = (address) => ({
    id: address.id,
    label: address.label || "Address",
    fullName: address.recipient || address.fullName || profileDefaults.fullName,
    email: address.email || profileDefaults.email,
    phone: address.phone || profileDefaults.phone,
    addressLine: address.street || address.address || "",
    city: address.city || "",
    state: address.state || "",
    postalCode: address.postalCode || "",
    isDefault: address.isDefault,
  });

  const normalizedAddresses = addresses.map((addr) => normalizeUserAddress(addr));

  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: defaultAddress?.recipient || profile.fullName || "",
    phone: defaultAddress?.phone || profile.phone || "",
    email: defaultAddress?.email || profile.email || "",
    address: defaultAddress?.street || "",
    city: defaultAddress?.city || "",
    state: defaultAddress?.state || "",
    postalCode: defaultAddress?.postalCode || "",
    // Payment Method
    paymentMethod: "palmpay-wallet",
    cardBrand: "Visa",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  // Computed values
  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || defaultAddress;

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

  useEffect(() => {
    if (!addresses.length) {
      setSelectedAddressId('');
      return;
    }
    if (!selectedAddressId) {
      setSelectedAddressId(defaultAddress?.id || addresses[0]?.id || '');
    }
  }, [addresses, defaultAddress, selectedAddressId]);

  useEffect(() => {
    if (selectedAddress) {
      setFormData((prev) => ({
        ...prev,
        fullName: selectedAddress.recipient || prev.fullName,
        email: selectedAddress.email || prev.email || profile.email,
        phone: selectedAddress.phone || prev.phone,
        address: selectedAddress.street || prev.address,
        city: selectedAddress.city || prev.city,
        state: selectedAddress.state || prev.state,
        postalCode: selectedAddress.postalCode || prev.postalCode,
      }));
    }
  }, [profile, selectedAddress]);

  // Don't render checkout if cart is empty
  if (cartItems.length === 0) {
    return null;
  }

  // Format card number as user types
  const handleCardNumberChange = (e) => {
    let value = e.target.value.replace(/\s/g, '');
    if (value.length <= 16) {
      value = value.match(/.{1,4}/g)?.join(' ') || value;
      setFormData((prev) => ({ ...prev, cardNumber: value }));
      if (errors.cardNumber) {
        setErrors((prev) => ({ ...prev, cardNumber: "" }));
      }
    }
  };

  const mapToStorePayload = (address) => ({
    label: address.label,
    recipient: address.fullName,
    email: address.email,
    phone: address.phone,
    street: address.addressLine,
    city: address.city,
    state: address.state,
    postalCode: address.postalCode,
    isDefault: address.isDefault,
  });

  const handleAddAddress = (address) => {
    const created = addAddressToStore(mapToStorePayload(address));
    return created ? normalizeUserAddress(created) : null;
  };

  const handleUpdateAddress = (addressId, address) => {
    const updated = updateAddressInStore(addressId, mapToStorePayload(address));
    return updated ? normalizeUserAddress(updated) : null;
  };

  const handleRemoveAddress = (addressId) => {
    removeAddressFromStore(addressId);
  };

  // Format expiry date as user types
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      setFormData((prev) => ({ ...prev, expiryDate: value }));
      if (errors.expiryDate) {
        setErrors((prev) => ({ ...prev, expiryDate: "" }));
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleMakeDefault = (addressId) => {
    if (!addressId) return;
    setDefaultAddress(addressId);
    setSelectedAddressId(addressId);
    showToast("Default address updated", "success");
  };

  const handleAddressSelect = (addressId) => {
    if (addressId) {
      setSelectedAddressId(addressId);
    }
  };

  const shippingMethods = [
    { id: 'standard', name: 'Standard Shipping', duration: '3-7 working days', price: 1800 },
    { id: 'express', name: 'Express Shipping', duration: '1-3 working days', price: 3500 },
  ];
  const paymentOptions = [
    {
      id: 'palmpay-bank',
      title: 'Palmpay Bank Transfer',
      description: 'Pay via bank transfer and get instant confirmation.',
      badge: 'Extra 2% OFF',
      helper: '100% Delivery Guarantee',
      iconType: 'palmpay',
    },
    {
      id: 'palmpay-wallet',
      title: 'Palmpay Wallet',
      description: 'Pay directly from your Palmpay wallet balance.',
      badge: 'Extra 2% OFF',
      helper: 'Instant auto-approval',
      iconType: 'palmpay',
    },
    {
      id: 'cash',
      title: 'Cash On Delivery (COD)',
      description: 'Pay with cash or transfer when the order arrives.',
      helper: '100% Delivery Guarantee',
      iconType: 'cod',
    },
    {
      id: 'card',
      title: 'Debit or Credit Card',
      description: 'Secure payments with Visa, Mastercard or Verve.',
      helper: 'SSL encrypted. No fees.',
      iconType: 'card',
    },
  ];
  const validateForm = () => {
    const newErrors = {};
    
    if (!selectedAddressId) newErrors.addressSelect = "Select or add a shipping address";
    
    if (formData.paymentMethod === 'card') {
      const digits = formData.cardNumber.replace(/\s/g, '');
      if (digits.length < 16) newErrors.cardNumber = "Enter a valid card number";
      if (!formData.cardName.trim()) newErrors.cardName = "Enter the cardholder name";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = "Use MM/YY format";
      if (!/^\d{3,4}$/.test(formData.cvv)) newErrors.cvv = "Enter a valid CVV";
    }
    
    if (!agreedToTerms) newErrors.terms = "You must agree to the terms";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = () => {
    if (!validateForm()) {
      showToast("Please complete all required fields", "error");
      return;
    }

    const selectedShipping = shippingMethods.find((m) => m.id === selectedShippingMethod);
    const finalDeliveryFee = selectedShipping?.price || deliveryFee;
    const finalTotal = subtotal + finalDeliveryFee;

    const orderData = {
      items: cartItems,
      shippingAddress: {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        postalCode: formData.postalCode,
      },
      paymentMethod: formData.paymentMethod,
      shippingMethod: selectedShippingMethod,
      subtotal,
      deliveryFee: finalDeliveryFee,
      total: finalTotal,
    };

    const order = createOrder(orderData);
    clearCart();
    showToast("Order placed successfully!", "success");
    navigate(`/orders/${order.id}`);
  };

  const selectedShipping = shippingMethods.find((m) => m.id === selectedShippingMethod);
  const finalDeliveryFee = selectedShipping?.price || deliveryFee;
  const discount = 1354; // Example discount
  const rounding = 46; // Example rounding
  const finalTotal = subtotal + finalDeliveryFee - discount - rounding;
  const saved = 1400; // Example saved amount

  const breadcrumbs = [
    { label: "Market CloseBy", link: "/" },
    { label: "Cart", link: "/cart" },
    { label: "Checkout", active: true },
  ];

  const renderPaymentIcon = (type) => {
    switch (type) {
      case 'palmpay':
        return <img src="/icons/palmpay-logo.svg" alt="Palmpay" className="w-10 h-10" />;
      case 'cod':
        return (
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <span className="text-primary font-bold text-sm">COD</span>
          </div>
        );
      case 'card':
        return (
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 11h18M7 15h2m4 0h4" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-10 h-10 rounded-lg bg-background-alt flex items-center justify-center text-primary font-semibold">
            ₦
          </div>
        );
    }
  };

  return (
    <section className="min-h-screen pb-20">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Checkout"
        subtitle="Complete your order"
        containerStyle="shadow"
        titleSize="medium"
      />

      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Left Column */}
          <div className="space-y-6">
            <ShippingAddressSection
              addresses={normalizedAddresses}
              profileDefaults={profileDefaults}
              selectedAddressId={selectedAddressId}
              onSelectAddress={handleAddressSelect}
              onAddAddress={handleAddAddress}
              onUpdateAddress={handleUpdateAddress}
              onRemoveAddress={handleRemoveAddress}
              onMakeDefaultAddress={handleMakeDefault}
              includeEmail
              showSelectDropdown={addresses.length > 0}
              allowRemoval={false}
              sectionTitle="Shipping Address"
              actionLabel="Add Shipping Address"
            />

            {/* Shipping Method Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
              <h2 className="text-xl font-semibold text-text-primary mb-6">Shipping Method</h2>
              <div className="space-y-4">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 border-2 rounded-2xl cursor-pointer transition ${
                      selectedShippingMethod === method.id
                        ? "border-secondary bg-secondary/5"
                        : "border-gray-200 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="shippingMethod"
                        value={method.id}
                        checked={selectedShippingMethod === method.id}
                        onChange={(e) => setSelectedShippingMethod(e.target.value)}
                        className="w-5 h-5 text-secondary focus:ring-secondary"
                      />
                      <div>
                        <p className="font-semibold text-text-primary">{method.name}</p>
                        <p className="text-sm text-text-grey">{method.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-primary">{formatCurrency(method.price)}</span>
                      {selectedShippingMethod === method.id && (
                        <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment Method Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
              <h2 className="text-xl font-semibold text-text-primary mb-6">Payment Method</h2>
              <div className="space-y-4">
                {paymentOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center justify-between p-5 border-2 rounded-2xl cursor-pointer transition ${
                      formData.paymentMethod === option.id
                        ? "border-secondary bg-secondary/5"
                        : "border-gray-200 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value={option.id}
                        checked={formData.paymentMethod === option.id}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-secondary focus:ring-secondary"
                      />
                      <div className="flex items-center gap-3">
                        {renderPaymentIcon(option.iconType)}
                        <div>
                          <p className="font-semibold text-text-primary">{option.title}</p>
                          <p className="text-sm text-text-grey">{option.description}</p>
                          <div className="flex flex-wrap items-center gap-2 mt-2">
                            {option.badge && (
                              <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded-full">
                                {option.badge}
                              </span>
                            )}
                            {option.helper && (
                              <span className="text-xs text-success font-semibold">{option.helper}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    {formData.paymentMethod === option.id && (
                      <svg className="w-6 h-6 text-secondary" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </label>
                ))}

                {formData.paymentMethod === 'card' && (
                  <div className="mt-4 bg-background-alt rounded-2xl p-5 space-y-4 animate-fade-in-up">
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-text-grey">Your card details are encrypted and never stored.</p>
                      <div className="flex items-center gap-2 text-xs font-semibold text-success">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                        SSL Secured
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <SelectInput
                        id="cardBrand"
                        name="cardBrand"
                        label="Card Network"
                        value={formData.cardBrand}
                        onChange={handleInputChange}
                        options={['Visa', 'Mastercard', 'Verve']}
                        inputClassName={errors.cardBrand ? "border-danger" : ""}
                      />
                      <TextInput
                        id="cardName"
                        name="cardName"
                        label="Cardholder Name"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        placeholder="JOHN DOE"
                        inputClassName={errors.cardName ? "border-danger" : ""}
                      />
                      {errors.cardName && (
                        <p className="text-danger text-xs md:col-span-2 -mt-3">{errors.cardName}</p>
                      )}
                      <div className="md:col-span-2">
                        <TextInput
                          id="cardNumber"
                          name="cardNumber"
                          label="Card Number"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9012 3456"
                          inputClassName={errors.cardNumber ? "border-danger" : ""}
                        />
                        {errors.cardNumber && (
                          <p className="text-danger text-xs mt-1">{errors.cardNumber}</p>
                        )}
                      </div>
                      <TextInput
                        id="expiryDate"
                        name="expiryDate"
                        label="Expiry (MM/YY)"
                        value={formData.expiryDate}
                        onChange={handleExpiryChange}
                        placeholder="07/28"
                        inputClassName={errors.expiryDate ? "border-danger" : ""}
                      />
                      <TextInput
                        id="cvv"
                        name="cvv"
                        label="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        placeholder="123"
                        type="password"
                        inputClassName={errors.cvv ? "border-danger" : ""}
                      />
                      {errors.expiryDate && (
                        <p className="text-danger text-xs -mt-3">{errors.expiryDate}</p>
                      )}
                      {errors.cvv && (
                        <p className="text-danger text-xs -mt-3 md:col-start-2">{errors.cvv}</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Safe Payment Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <h2 className="text-xl font-semibold text-text-primary">Safe Payment</h2>
              </div>
              <p className="text-sm text-text-grey">
                At Market Closeby, every payment method is 100% secure, guaranteeing a completely safe and worry-free shopping experience.
              </p>
            </div>

            {/* Points Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-text-primary">Points</h2>
                  <svg className="w-5 h-5 text-text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-text-grey">No available points &gt;</span>
              </div>
            </div>

            {/* Discount Section */}
            <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h2 className="text-xl font-semibold text-text-primary">Discount</h2>
                  <svg className="w-5 h-5 text-text-grey" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <span className="text-sm text-text-grey">No available coupons &gt;</span>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <aside className="space-y-6">
            {/* My Order Section */}
            <div className="bg-white rounded-3xl p-6 shadow-lg animate-fade-in-up sticky top-32">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-text-primary">My Order</h3>
                <button className="text-primary text-sm hover:text-secondary transition">Edit</button>
              </div>
              
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4">
                    <div className="w-20 h-20 bg-background-alt rounded-xl flex items-center justify-center flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain rounded-xl" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-text-primary text-sm line-clamp-2">{item.name}</p>
                      <p className="text-xs text-text-grey mt-1">Qty: {item.quantity} {item.color || ''}</p>
                    </div>
                    <p className="font-semibold text-primary">{formatCurrency(parseFloat(String(item.price).replace(/[₦,]/g, "")) * item.quantity)}</p>
                  </div>
                ))}
              </div>

              {/* Grab & Go Deals Section */}
              <div className="border-t pt-4 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-text-primary">Grab & Go Deals</h3>
                  <button className="text-primary text-sm hover:text-secondary transition flex items-center gap-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Change
                  </button>
                </div>
                <div className="flex items-center gap-4 p-3 bg-background-alt rounded-xl">
                  <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src="/images/product-placeholder.svg" alt="Deal" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-text-primary text-xs line-clamp-2">oraimo SpaceBuds Neo+ ANC Spatial Audio True...</p>
                    <p className="text-xs text-text-grey mt-1">Black</p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="font-semibold text-primary text-sm">₦19,710</span>
                      <span className="text-xs text-text-grey line-through">₦25,000</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-success flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>

              {/* Order Summary */}
              <div className="border-t pt-4 space-y-3">
                <div className="flex justify-between text-sm text-text-grey">
                  <span>Cart Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-text-grey">
                  <span>Shipping</span>
                  <span>{formatCurrency(finalDeliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm text-danger">
                  <span>Discount</span>
                  <span>-{formatCurrency(discount)}</span>
                </div>
                <div className="flex justify-between text-sm text-danger">
                  <span>Rounding</span>
                  <span>-{formatCurrency(rounding)}</span>
                </div>
                <div className="flex justify-between items-center text-xl font-bold text-text-primary pt-4 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(finalTotal)}</span>
                </div>
                <p className="text-sm text-success font-semibold">Saved ₦{saved.toLocaleString()}</p>
              </div>

              {/* Place Order Button */}
              <Button
                variant="secondary"
                size="lg"
                shape="rounded"
                fullWidth
                className="mt-6 shadow-lg hover:shadow-xl transition duration-300"
                onClick={handleSubmitOrder}
                disabled={!agreedToTerms}
              >
                PLACE ORDER
              </Button>

              {/* Terms Checkbox */}
              <label className="flex items-start gap-3 mt-4 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-success focus:ring-success border-gray-300 rounded"
                />
                <span className="text-sm text-text-grey">
                  I have read and agree to the Market Closeby{" "}
                  <a href="/terms" className="text-primary hover:underline">Terms of use</a> and{" "}
                  <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
                </span>
              </label>
              {errors.terms && (
                <p className="text-danger text-xs mt-1">{errors.terms}</p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;
