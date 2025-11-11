import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "../store/cartStore";
import { useOrdersStore } from "../store/ordersStore";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

const formatCurrency = (value) =>
  `₦${Math.max(value, 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const CheckoutPage = () => {
  const navigate = useNavigate();
  const cartItems = useCartStore((state) => state.items);
  const subtotal = useCartStore((state) => state.subtotal());
  const deliveryFee = useCartStore((state) => state.deliveryFee());
  const grandTotal = useCartStore((state) => state.grandTotal());
  const clearCart = useCartStore((state) => state.clearCart);
  const createOrder = useOrdersStore((state) => state.createOrder);
  const { showToast } = useToast();

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems.length, navigate]);

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
    }
  };

  // Format expiry date as user types
  const handleExpiryChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length <= 4) {
      if (value.length >= 2) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      setFormData((prev) => ({ ...prev, expiryDate: value }));
    }
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Shipping Address
    fullName: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    // Payment Method
    paymentMethod: "card",
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
      if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.city.trim()) newErrors.city = "City is required";
      if (!formData.state.trim()) newErrors.state = "State is required";
      if (!formData.postalCode.trim()) newErrors.postalCode = "Postal code is required";
    }
    
    if (step === 2) {
      // Only validate card details if payment method is card
      if (formData.paymentMethod === "card") {
        const cardNumberDigits = formData.cardNumber.replace(/\s/g, "");
        if (!cardNumberDigits) {
          newErrors.cardNumber = "Card number is required";
        } else if (!/^\d{16}$/.test(cardNumberDigits)) {
          newErrors.cardNumber = "Card number must be 16 digits";
        }
        if (!formData.cardName.trim()) {
          newErrors.cardName = "Cardholder name is required";
        }
        if (!formData.expiryDate.trim()) {
          newErrors.expiryDate = "Expiry date is required";
        } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = "Please use MM/YY format";
        }
        if (!formData.cvv.trim()) {
          newErrors.cvv = "CVV is required";
        } else if (!/^\d{3,4}$/.test(formData.cvv)) {
          newErrors.cvv = "CVV must be 3-4 digits";
        }
      }
      // Bank transfer and cash on delivery don't need validation
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 3));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitOrder = () => {
    // Validate all steps before submitting
    const step1Valid = validateStep(1);
    const step2Valid = validateStep(2);
    
    if (step1Valid && step2Valid) {
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
        subtotal,
        deliveryFee,
        total: grandTotal,
      };

      const order = createOrder(orderData);
      clearCart();
      showToast("Order placed successfully!", "success");
      navigate(`/orders/${order.id}`);
    } else {
      // Navigate to the first invalid step
      if (!step1Valid) {
        setCurrentStep(1);
        showToast("Please complete all shipping information", "error");
      } else if (!step2Valid) {
        setCurrentStep(2);
        showToast("Please complete all payment information", "error");
      }
    }
  };

  const steps = [
    { number: 1, title: "Shipping", description: "Delivery Information" },
    { number: 2, title: "Payment", description: "Payment Method" },
    { number: 3, title: "Review", description: "Order Summary" },
  ];

  const breadcrumbs = [
    { label: "Market CloseBy", link: "/" },
    { label: "Cart", link: "/cart" },
    { label: "Checkout", active: true },
  ];

  return (
    <section className="min-h-screen pb-20">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Checkout"
        subtitle="Complete your order in a few simple steps"
        containerStyle="shadow"
        titleSize="medium"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <React.Fragment key={step.number}>
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold text-lg transition-all duration-300 ${
                      currentStep >= step.number
                        ? "bg-secondary text-white shadow-lg"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {currentStep > step.number ? (
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      step.number
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p
                      className={`text-sm font-medium ${
                        currentStep >= step.number ? "text-primary" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="text-xs text-text-grey">{step.description}</p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-1 mx-4 transition-all duration-300 ${
                      currentStep > step.number ? "bg-secondary" : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8">
          {/* Main Content */}
          <div className="space-y-6">
            {/* Step 1: Shipping Address */}
            {currentStep === 1 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-semibold text-primary mb-6">Shipping Address</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.fullName ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="John Doe"
                    />
                    {errors.fullName && (
                      <p className="text-danger text-xs mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.phone ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="08012345678"
                    />
                    {errors.phone && (
                      <p className="text-danger text-xs mt-1">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.email ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="john@example.com"
                    />
                    {errors.email && (
                      <p className="text-danger text-xs mt-1">{errors.email}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.address ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="123 Main Street"
                    />
                    {errors.address && (
                      <p className="text-danger text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.city ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="Lagos"
                    />
                    {errors.city && (
                      <p className="text-danger text-xs mt-1">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.state ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="Lagos State"
                    />
                    {errors.state && (
                      <p className="text-danger text-xs mt-1">{errors.state}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-text-primary mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.postalCode ? "border-danger" : "border-gray-300"
                      } focus:outline-none focus:ring-2 focus:ring-primary`}
                      placeholder="100001"
                    />
                    {errors.postalCode && (
                      <p className="text-danger text-xs mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Payment Method */}
            {currentStep === 2 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-semibold text-primary mb-6">Payment Method</h2>
                
                <div className="space-y-4 mb-6">
                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="card"
                      checked={formData.paymentMethod === "card"}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-text-primary">Credit/Debit Card</span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-text-primary">Bank Transfer</span>
                  </label>

                  <label className="flex items-center p-4 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="cash"
                      checked={formData.paymentMethod === "cash"}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-primary focus:ring-primary"
                    />
                    <span className="ml-3 font-medium text-text-primary">Cash on Delivery</span>
                  </label>
                </div>

                {formData.paymentMethod === "card" && (
                  <div className="space-y-4 mt-6 pt-6 border-t">
                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        name="cardNumber"
                        value={formData.cardNumber}
                        onChange={handleCardNumberChange}
                        maxLength={19}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.cardNumber ? "border-danger" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="1234 5678 9012 3456"
                      />
                      {errors.cardNumber && (
                        <p className="text-danger text-xs mt-1">{errors.cardNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-text-primary mb-2">
                        Cardholder Name *
                      </label>
                      <input
                        type="text"
                        name="cardName"
                        value={formData.cardName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.cardName ? "border-danger" : "border-gray-300"
                        } focus:outline-none focus:ring-2 focus:ring-primary`}
                        placeholder="JOHN DOE"
                      />
                      {errors.cardName && (
                        <p className="text-danger text-xs mt-1">{errors.cardName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          name="expiryDate"
                          value={formData.expiryDate}
                          onChange={handleExpiryChange}
                          maxLength={5}
                          placeholder="MM/YY"
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.expiryDate ? "border-danger" : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-primary`}
                        />
                        {errors.expiryDate && (
                          <p className="text-danger text-xs mt-1">{errors.expiryDate}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-text-primary mb-2">
                          CVV *
                        </label>
                        <input
                          type="text"
                          name="cvv"
                          value={formData.cvv}
                          onChange={handleInputChange}
                          maxLength={4}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.cvv ? "border-danger" : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-primary`}
                          placeholder="123"
                        />
                        {errors.cvv && (
                          <p className="text-danger text-xs mt-1">{errors.cvv}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Review Order */}
            {currentStep === 3 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg animate-fade-in-up">
                <h2 className="text-2xl font-semibold text-primary mb-6">Review Your Order</h2>
                
                <div className="space-y-6">
                  {/* Shipping Address Review */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Shipping Address</h3>
                    <div className="bg-background-alt rounded-lg p-4">
                      <p className="text-text-primary font-medium">{formData.fullName}</p>
                      <p className="text-text-grey">{formData.address}</p>
                      <p className="text-text-grey">
                        {formData.city}, {formData.state} {formData.postalCode}
                      </p>
                      <p className="text-text-grey">Phone: {formData.phone}</p>
                      <p className="text-text-grey">Email: {formData.email}</p>
                    </div>
                  </div>

                  {/* Payment Method Review */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Payment Method</h3>
                    <div className="bg-background-alt rounded-lg p-4">
                      <p className="text-text-primary font-medium capitalize">
                        {formData.paymentMethod === "card" ? "Credit/Debit Card" : 
                         formData.paymentMethod === "bank" ? "Bank Transfer" : 
                         "Cash on Delivery"}
                      </p>
                      {formData.paymentMethod === "card" && formData.cardNumber && (
                        <p className="text-text-grey">
                          **** **** **** {formData.cardNumber.replace(/\s/g, "").slice(-4)}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Order Items Review */}
                  <div>
                    <h3 className="text-lg font-semibold text-text-primary mb-3">Order Items</h3>
                    <div className="space-y-3">
                      {cartItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-4 p-3 bg-background-alt rounded-lg">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 object-contain rounded"
                          />
                          <div className="flex-1">
                            <p className="font-medium text-text-primary">{item.name}</p>
                            <p className="text-sm text-text-grey">Qty: {item.quantity}</p>
                          </div>
                          <p className="font-semibold text-primary">
                            {formatCurrency(
                              parseFloat(String(item.price).replace(/[₦,]/g, "")) * item.quantity
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between gap-4">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  size="lg"
                  shape="rounded"
                  onClick={handleBack}
                  className="flex-1 md:flex-none"
                >
                  Back
                </Button>
              )}
              <div className="flex-1" />
              {currentStep < 3 ? (
                <Button
                  variant="secondary"
                  size="lg"
                  shape="rounded"
                  onClick={handleNext}
                  className="flex-1 md:flex-none min-w-[200px]"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="lg"
                  shape="rounded"
                  onClick={handleSubmitOrder}
                  className="flex-1 md:flex-none min-w-[200px]"
                >
                  Place Order
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <aside className="bg-white rounded-3xl p-6 shadow-lg h-fit animate-fade-in-up sticky top-32">
            <h3 className="text-xl font-semibold text-text-primary mb-4">Order Summary</h3>
            
            <div className="space-y-3 mb-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex items-center gap-3 text-sm">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-contain rounded"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-text-primary truncate">{item.name}</p>
                    <p className="text-text-grey">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-primary">
                    {formatCurrency(
                      parseFloat(String(item.price).replace(/[₦,]/g, "")) * item.quantity
                    )}
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4 space-y-2">
              <div className="flex justify-between text-sm text-text-grey">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm text-text-grey">
                <span>Delivery</span>
                <span>{formatCurrency(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-lg font-semibold text-text-primary mt-4 pt-4 border-t">
                <span>Total</span>
                <span className="text-primary">{formatCurrency(grandTotal)}</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default CheckoutPage;

