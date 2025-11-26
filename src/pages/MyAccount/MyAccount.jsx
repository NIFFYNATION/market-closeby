import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/accountStore";
import { useOrdersStore } from "../../store/ordersStore";
import PageHeader from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { TextInput, SelectInput } from "../../components/forms/FormFields";
import ShippingAddressSection from "../../components/checkout/ShippingAddressSection";
import { useToast } from "../../context/ToastContext";

const SectionCard = ({ title, children, right }) => (
  <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      {right}
    </div>
    {children}
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-start justify-between py-3 border-b last:border-b-0">
    <span className="text-sm text-text-grey">{label}</span>
    <span className="text-sm font-medium text-text-primary text-right ml-4">{value}</span>
  </div>
);

const Modal = ({ title, children, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6 sm:py-10">
    <div className="absolute inset-0 bg-black/40" onClick={onClose} />
    <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl animate-fade-in-up max-h-[90vh] flex flex-col">
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 flex-shrink-0">
        <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-background-alt flex items-center justify-center hover:bg-gray-200 transition"
          aria-label="Close"
        >
          <svg className="w-4 h-4 text-text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>
      </div>
      <div className="p-6 overflow-y-auto flex-1 w-full">{children}</div>
    </div>
  </div>
);

const QuickActionCard = ({ icon, title, description, actionLabel, onAction, accent = "bg-primary/10" }) => (
  <div className="flex flex-col gap-4 p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition">
    <div className={`w-12 h-12 rounded-2xl ${accent} flex items-center justify-center text-primary`}>{icon}</div>
    <div>
      <p className="text-text-primary font-semibold">{title}</p>
      <p className="text-sm text-text-grey mt-1">{description}</p>
    </div>
    <Button variant="textPrimary" size="sm" onClick={onAction}>
      {actionLabel}
    </Button>
  </div>
);

const SettingsSection = ({ title, description, children }) => (
  <div className="bg-white rounded-3xl p-6 shadow-lg">
    <div className="mb-4">
      <h3 className="text-lg font-semibold text-text-primary">{title}</h3>
      {description && <p className="text-sm text-text-grey mt-1">{description}</p>}
    </div>
    <div className="space-y-4">{children}</div>
  </div>
);

const SettingsToggle = ({ label, description, checked, onChange }) => (
  <div className="flex items-center justify-between p-4 rounded-2xl border border-gray-100">
    <div>
      <p className="font-medium text-text-primary">{label}</p>
      {description && <p className="text-sm text-text-grey">{description}</p>}
    </div>
    <button
      onClick={onChange}
      className={`w-14 h-7 rounded-full transition flex items-center px-1 ${
        checked ? "bg-secondary" : "bg-gray-200"
      }`}
    >
      <span
        className={`w-5 h-5 bg-white rounded-full shadow transform transition ${
          checked ? "translate-x-7" : ""
        }`}
      />
    </button>
  </div>
);

const AddressCard = ({ address, onEdit, onMakeDefault, onRemove }) => (
  <div
    className={`rounded-2xl p-4 border ${
      address.isDefault ? "border-secondary bg-secondary/5" : "border-gray-200"
    }`}
  >
    <div className="flex items-center justify-between mb-2">
      <p className="font-semibold text-text-primary">{address.label}</p>
      {address.isDefault && (
        <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Default</span>
      )}
    </div>
    <div className="text-sm text-text-grey space-y-1">
      <p className="font-medium text-text-primary">{address.fullName}</p>
      <p>{address.address}</p>
      <p>
        {address.city}, {address.state} {address.postalCode}
      </p>
      <p>{address.phone}</p>
    </div>
    <div className="flex flex-wrap gap-2 mt-4">
      <Button variant="outline" size="sm" onClick={() => onEdit(address)}>
        Edit
      </Button>
      {!address.isDefault && (
        <Button variant="textPrimary" size="sm" onClick={() => onMakeDefault(address.id)}>
          Make default
        </Button>
      )}
      <Button variant="textDanger" size="sm" onClick={() => onRemove(address.id)}>
        Remove
      </Button>
    </div>
  </div>
);

const MyAccount = () => {
  const navigate = useNavigate();
  const profile = useAccountStore((s) => s.profile);
  const addPaymentMethod = useAccountStore((s) => s.addPaymentMethod);
  const removePaymentMethod = useAccountStore((s) => s.removePaymentMethod);
  const setDefaultPaymentMethod = useAccountStore((s) => s.setDefaultPaymentMethod);
  const updateProfile = useAccountStore((s) => s.updateProfile);
  const addAddress = useAccountStore((s) => s.addAddress);
  const updateAddress = useAccountStore((s) => s.updateAddress);
  const removeAddress = useAccountStore((s) => s.removeAddress);
  const setDefaultAddressStore = useAccountStore((s) => s.setDefaultAddress);
  const orders = useOrdersStore((s) => s.orders);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [isProfileModalOpen, setProfileModalOpen] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: profile.name,
    email: profile.email,
    phone: profile.phone,
  });
  const [profileErrors, setProfileErrors] = useState({});
  const [addressModalOpen, setAddressModalOpen] = useState(false);
  const [addressPrefill, setAddressPrefill] = useState(null);
  const defaultAddress = useMemo(() => profile.addressBook.find((a) => a.isDefault), [profile.addressBook]);
  const formatAccountAddress = (address = {}) => ({
    id: address.id,
    label: address.label || "Address",
    fullName: address.fullName || profile.name || "",
    email: profile.email || "",
    phone: address.phone || profile.phone || "",
    addressLine: address.address || "",
    city: address.city || "",
    state: address.state || "",
    postalCode: address.postalCode || "",
    isDefault: address.isDefault,
  });
  const accountAddresses = useMemo(
    () => profile.addressBook.map((addr) => formatAccountAddress(addr)),
    [profile.addressBook, profile.email, profile.name, profile.phone]
  );
  const [accountSelectedAddressId, setAccountSelectedAddressId] = useState(defaultAddress?.id || "");
  useEffect(() => {
    setAccountSelectedAddressId(defaultAddress?.id || "");
  }, [defaultAddress?.id]);
  const profileDefaults = useMemo(
    () => ({
      fullName: profile.name || "",
      email: profile.email || "",
      phone: profile.phone || "",
    }),
    [profile.name, profile.email, profile.phone]
  );
  const paymentMethods = profile.paymentMethods;
  const defaultPayment = useMemo(() => paymentMethods.find((p) => p.isDefault), [paymentMethods]);
  const [cardForm, setCardForm] = useState({
    brand: "Visa",
    holder: profile.name?.toUpperCase() || "",
    cardNumber: "",
    exp: "",
    isDefault: paymentMethods.length === 0,
  });
  const [cardErrors, setCardErrors] = useState({});

  useEffect(() => {
    setProfileForm({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
    });
  }, [profile.name, profile.email, profile.phone]);

  const preferences = profile.preferences || {
    marketingEmails: true,
    orderUpdates: true,
    smsAlerts: false,
  };
  const security = profile.security || {
    twoFactorEnabled: false,
    biometricLogin: false,
  };

  const formatCardNumber = (value = "") =>
    value.replace(/\D/g, "").slice(0, 16).match(/.{1,4}/g)?.join(" ") || value.replace(/\D/g, "").slice(0, 16);

  const handleCardFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    const nextValue = name === "cardNumber" ? formatCardNumber(value) : value;
    setCardForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : nextValue,
    }));
    if (cardErrors[name]) {
      setCardErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateCardForm = () => {
    const errors = {};
    const digits = cardForm.cardNumber.replace(/\s/g, "");

    if (digits.length < 16) errors.cardNumber = "Enter a 16-digit card number";
    if (!cardForm.holder.trim()) errors.holder = "Cardholder name is required";
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardForm.exp)) errors.exp = "Use MM/YY format";

    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmitCard = (e) => {
    e.preventDefault();
    if (!validateCardForm()) return;

    const digitsOnly = cardForm.cardNumber.replace(/\s/g, "");
    const last4 = digitsOnly.slice(-4);
    addPaymentMethod({
      brand: cardForm.brand,
      last4,
      holder: cardForm.holder.toUpperCase(),
      exp: cardForm.exp,
      type: "card",
      isDefault: cardForm.isDefault,
    });

    showToast("Card added successfully", "success");
    setCardForm({
      brand: cardForm.brand,
      holder: profile.name?.toUpperCase() || "",
      cardNumber: "",
      exp: "",
      isDefault: false,
    });
    setShowAddCardForm(false);
  };

  const handleRemoveCard = (id) => {
    removePaymentMethod(id);
    showToast("Payment method removed", "info");
  };

  const handleMakeDefaultCard = (id) => {
    setDefaultPaymentMethod(id);
    showToast("Default payment method updated", "success");
  };

  const handleProfileFieldChange = (e) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({ ...prev, [name]: value }));
    if (profileErrors[name]) {
      setProfileErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateProfileForm = () => {
    const errors = {};
    if (!profileForm.name.trim()) errors.name = "Name is required";
    if (!profileForm.email.trim() || !/\S+@\S+\.\S+/.test(profileForm.email)) errors.email = "Valid email required";
    if (!profileForm.phone.trim()) errors.phone = "Phone is required";
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!validateProfileForm()) return;
    updateProfile({
      name: profileForm.name.trim(),
      email: profileForm.email.trim(),
      phone: profileForm.phone.trim(),
    });
    showToast("Profile updated", "success");
    setProfileModalOpen(false);
  };

  const closeAddressModal = () => {
    setAddressModalOpen(false);
    setAddressPrefill(null);
  };

  const handleOpenAddressModal = (address = null) => {
    setAddressPrefill(address ? formatAccountAddress(address) : null);
    setAddressModalOpen(true);
  };

  const handleAccountAddAddress = (values) => {
    const created = addAddress({
      label: values.label,
      fullName: values.fullName,
      phone: values.phone,
      address: values.addressLine,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      isDefault: values.isDefault,
    });
    showToast("Address added", "success");
    return created ? formatAccountAddress(created) : null;
  };

  const handleAccountUpdateAddress = (addressId, values) => {
    const updated = updateAddress(addressId, {
      label: values.label,
      fullName: values.fullName,
      phone: values.phone,
      address: values.addressLine,
      city: values.city,
      state: values.state,
      postalCode: values.postalCode,
      isDefault: values.isDefault,
    });
    showToast("Address updated", "success");
    return updated ? formatAccountAddress(updated) : null;
  };

  const handleMakeDefaultAddress = (addressId) => {
    setDefaultAddressStore(addressId);
    showToast("Default address updated", "success");
  };

  const handleAccountRemoveAddress = (addressId) => {
    removeAddress(addressId);
    if (addressId === accountSelectedAddressId) {
      setAccountSelectedAddressId(defaultAddress?.id || "");
    }
    showToast("Address removed", "info");
  };

  const handlePreferenceToggle = (field) => {
    updateProfile({
      preferences: { ...preferences, [field]: !preferences[field] },
    });
  };

  const handleSecurityToggle = (field) => {
    updateProfile({
      security: { ...security, [field]: !security[field] },
    });
  };

  const quickActions = [
    {
      title: "Track Orders",
      description: "Monitor your latest purchases and delivery progress.",
      actionLabel: "View orders",
      onAction: () => setActiveTab("orders"),
      accent: "bg-primary/10",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7h18M3 12h18M7 17h2m4 0h4" />
        </svg>
      ),
    },
    {
      title: "Wishlist",
      description: "Jump back to products you saved for later.",
      actionLabel: "Open wishlist",
      onAction: () => navigate("/wishlist"),
      accent: "bg-secondary/10",
      icon: (
        <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
    },
    {
      title: "Manage Addresses",
      description: "Keep your delivery locations up to date.",
      actionLabel: "Manage addresses",
      onAction: () => {
        setActiveTab("addresses");
        handleOpenAddressModal();
      },
      accent: "bg-success/10",
      icon: (
        <svg className="w-5 h-5 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.341A8 8 0 104.572 15.34L12 21l7.428-5.659z" />
        </svg>
      ),
    },
    {
      title: "Inbox & Support",
      description: "Continue conversations with sellers and support.",
      actionLabel: "Open inbox",
      onAction: () => navigate("/inbox"),
      accent: "bg-primary-light/10",
      icon: (
        <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h8M8 14h4m1 7l-4-4H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2h-2l-4 4z" />
        </svg>
      ),
    },
  ];

  const breadcrumbs = [
    { label: "Market CloseBy", link: "/" },
    { label: "My Account", active: true },
  ];

  return (
    <section className="min-h-screen pb-20">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="My Account"
        subtitle="Manage your profile, orders, addresses and settings"
        containerStyle="shadow"
        titleSize="large"
      />

      <div className=" mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-[#D9D9D9] mb-6">
          {[
            { id: "overview", label: "Overview" },
            { id: "orders", label: "Orders" },
            { id: "wishlist", label: "Wishlist" },
            { id: "addresses", label: "Addresses" },
            { id: "payments", label: "Payment Methods" },
            { id: "settings", label: "Settings" },
          ].map((t) => (
          <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`px-4 py-3 font-medium border-b-2 transition-colors ${
                activeTab === t.id
                  ? "border-secondary text-secondary"
                  : "border-transparent text-text-grey hover:text-primary"
              }`}
            >
              {t.label}
          </button>
          ))}
        </div>

        {/* Overview */}
        {activeTab === "overview" && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-6 animate-fade-in-up">
            <div className="space-y-6">
              <SectionCard
                title="Account Summary"
                right={
                  <Button variant="textPrimary" size="sm" onClick={() => setProfileModalOpen(true)}>
                    Edit profile
                  </Button>
                }
              >
                <div className="flex items-center gap-4">
                  <img src={profile.avatar} alt={profile.name} className="w-16 h-16 rounded-full object-cover" />
                  <div>
                    <p className="text-lg font-semibold text-primary">{profile.name}</p>
                    <p className="text-sm text-text-grey">{profile.email}</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="bg-background-alt rounded-xl p-4">
                    <p className="text-sm text-text-grey">Orders</p>
                    <p className="text-2xl font-bold text-primary">{orders.length}</p>
                  </div>
                  <div className="bg-background-alt rounded-xl p-4">
                    <p className="text-sm text-text-grey">Default Address</p>
                    <p className="text-sm font-medium text-text-primary line-clamp-2">{defaultAddress?.address || '—'}</p>
                  </div>
                  <div className="bg-background-alt rounded-xl p-4">
                    <p className="text-sm text-text-grey">Payment</p>
                    <p className="text-sm font-medium text-text-primary">{defaultPayment ? `${defaultPayment.brand} •••• ${defaultPayment.last4}` : '—'}</p>
                  </div>
                </div>
              </SectionCard>

              <SectionCard title="Quick Actions">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action) => (
                    <QuickActionCard key={action.title} {...action} />
                  ))}
                </div>
              </SectionCard>

              <SectionCard title="Recent Orders" right={<Link to="/orders" className="text-primary text-sm">See all</Link>}>
                {orders.length === 0 ? (
                  <p className="text-text-grey">No recent orders</p>
                ) : (
                  <div className="space-y-3">
                    {orders.slice(0, 3).map((o) => (
                      <div key={o.id} className="flex items-center justify-between p-4 bg-background-alt rounded-xl">
                        <div>
                          <p className="font-semibold text-text-primary">Order {o.orderNumber}</p>
                          <p className="text-xs text-text-grey">{new Date(o.orderDate).toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            o.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' : o.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                          }`}>{o.status}</span>
                          <Button variant="outline" size="sm" onClick={() => navigate(`/orders/${o.id}`)}>View</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </SectionCard>
            </div>

            {/* Right side */}
            <div className="space-y-6">
              <SectionCard title="Default Address">
                {defaultAddress ? (
                  <div className="text-sm space-y-1">
                    <p className="font-medium text-text-primary">{defaultAddress.fullName}</p>
                    <p className="text-text-grey">{defaultAddress.address}</p>
                    <p className="text-text-grey">{defaultAddress.city}, {defaultAddress.state} {defaultAddress.postalCode}</p>
                    <p className="text-text-grey">{defaultAddress.phone}</p>
                  </div>
                ) : (
                  <p className="text-text-grey">Add your first address</p>
                )}
              </SectionCard>

              <SectionCard title="Default Payment">
                {defaultPayment ? (
                  <div className="text-sm space-y-1">
                    <p className="font-medium text-text-primary">{defaultPayment.brand} •••• {defaultPayment.last4}</p>
                    <p className="text-text-grey text-xs">Cardholder: {defaultPayment.holder}</p>
                  </div>
                ) : (
                  <p className="text-text-grey">Add a payment method</p>
                )}
              </SectionCard>
            </div>
          </div>
        )}

        {/* Addresses */}
        {activeTab === "addresses" && (
          <div className="animate-fade-in-up">
            <SectionCard
              title="Address Book"
              right={
                <Button variant="secondary" size="sm" onClick={() => handleOpenAddressModal()}>
                  Manage addresses
                </Button>
              }
            >
              {profile.addressBook.length === 0 ? (
                <div className="text-center py-10 text-text-grey">
                  No addresses yet. Add one to speed up checkout.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {profile.addressBook.map((address) => (
                    <AddressCard
                      key={address.id}
                      address={address}
                      onEdit={handleOpenAddressModal}
                      onMakeDefault={handleMakeDefaultAddress}
                      onRemove={handleAccountRemoveAddress}
                    />
                  ))}
                </div>
              )}
            </SectionCard>
            </div>
          )}

        {/* Payments */}
        {activeTab === "payments" && (
          <div className="animate-fade-in-up space-y-6">
            <SectionCard
              title="Payment Methods"
              right={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setShowAddCardForm((prev) => !prev)}
                >
                  {showAddCardForm ? "Close form" : "Add new card"}
                </Button>
              }
            >
              {paymentMethods.length === 0 ? (
                <p className="text-text-grey">No cards saved yet. Add your first payment method to checkout faster.</p>
              ) : (
                <div className="space-y-4">
                  {paymentMethods.map((pm) => (
                    <div
                      key={pm.id}
                      className={`p-4 rounded-2xl border flex flex-col md:flex-row md:items-center md:justify-between gap-4 ${
                        pm.isDefault ? "border-secondary bg-secondary/5" : "border-gray-200"
                      }`}
                    >
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold text-lg">{pm.brand?.[0]}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-semibold text-text-primary">{pm.brand}</p>
                            {pm.isDefault && (
                              <span className="text-xs bg-secondary text-white px-2 py-0.5 rounded-full">Default</span>
                            )}
              </div>
                          <p className="text-sm text-text-grey">•••• {pm.last4}</p>
                          <p className="text-xs text-text-grey mt-1">Expires {pm.exp || "—"}</p>
                      </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {!pm.isDefault && (
                          <Button variant="outline" size="sm" onClick={() => handleMakeDefaultCard(pm.id)}>
                            Make default
                          </Button>
                        )}
                        <Button variant="textDanger" size="sm" onClick={() => handleRemoveCard(pm.id)}>
                          Remove
                        </Button>
                      </div>
                    </div>
                  ))}
                  </div>
              )}
            </SectionCard>

            {showAddCardForm && (
              <SectionCard title="Add a new card">
                <form className="space-y-4" onSubmit={handleSubmitCard}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <SelectInput
                      id="brand"
                      name="brand"
                      label="Card Network"
                      value={cardForm.brand}
                      onChange={handleCardFormChange}
                      options={["Visa", "Mastercard", "Verve"]}
                    />
                      <TextInput
                      id="holder"
                      name="holder"
                      label="Cardholder Name"
                      value={cardForm.holder}
                      onChange={handleCardFormChange}
                      placeholder="JOHN DOE"
                      inputClassName={cardErrors.holder ? "border-danger" : ""}
                    />
                    {cardErrors.holder && (
                      <p className="text-danger text-xs -mt-3 md:col-span-2">{cardErrors.holder}</p>
                    )}
                      <TextInput
                      id="cardNumber"
                      name="cardNumber"
                      label="Card Number"
                      value={cardForm.cardNumber}
                      onChange={handleCardFormChange}
                      placeholder="1234 5678 9012 3456"
                      className="md:col-span-2"
                      inputClassName={cardErrors.cardNumber ? "border-danger" : ""}
                    />
                    {cardErrors.cardNumber && (
                      <p className="text-danger text-xs -mt-3 md:col-span-2">{cardErrors.cardNumber}</p>
                    )}
                    <TextInput
                      id="exp"
                      name="exp"
                      label="Expiry (MM/YY)"
                      value={cardForm.exp}
                      onChange={handleCardFormChange}
                      placeholder="07/28"
                      inputClassName={cardErrors.exp ? "border-danger" : ""}
                    />
                    {cardErrors.exp && (
                      <p className="text-danger text-xs -mt-3 md:col-span-2">{cardErrors.exp}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      id="default-card"
                      type="checkbox"
                      name="isDefault"
                      checked={cardForm.isDefault}
                      onChange={handleCardFormChange}
                      className="w-4 h-4 text-secondary focus:ring-secondary border-gray-300 rounded"
                    />
                    <label htmlFor="default-card" className="text-sm text-text-primary">
                      Set as default payment method
                    </label>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button type="submit" variant="secondary" size="md">
                      Save card
                    </Button>
                        <Button
                      type="button"
                      variant="textPrimary"
                          size="md"
                      onClick={() => setShowAddCardForm(false)}
                        >
                      Cancel
                        </Button>
                  </div>
                </form>
              </SectionCard>
            )}
                                </div>
                              )}

        {/* Orders tab shortcut */}
        {activeTab === "orders" && (
          <div className="animate-fade-in-up">
            <SectionCard title="Orders">
              <div className="text-center py-12">
                <p className="text-text-grey mb-4">Manage your orders on the Orders page.</p>
                <Button variant="secondary" onClick={() => navigate('/orders')}>Go to Orders</Button>
                            </div>
            </SectionCard>
                                </div>
                              )}

        {/* Wishlist tab shortcut */}
        {activeTab === "wishlist" && (
          <div className="animate-fade-in-up">
            <SectionCard title="Wishlist">
              <div className="text-center py-12">
                <p className="text-text-grey mb-4">View and manage wishlist items.</p>
                <Button variant="secondary" onClick={() => navigate('/wishlist')}>Open Wishlist</Button>
                            </div>
            </SectionCard>
                                </div>
                              )}

        {/* Settings placeholder */}
        {activeTab === "settings" && (
          <div className="animate-fade-in-up space-y-6">
            <SettingsSection title="Notification Preferences" description="Choose how Market Closeby keeps you updated.">
              <SettingsToggle
                label="Marketing emails"
                description="Deals, promotions, and tailored recommendations."
                checked={preferences.marketingEmails}
                onChange={() => handlePreferenceToggle("marketingEmails")}
              />
              <SettingsToggle
                label="Order updates"
                description="Real-time status on purchases and deliveries."
                checked={preferences.orderUpdates}
                onChange={() => handlePreferenceToggle("orderUpdates")}
              />
              <SettingsToggle
                label="SMS alerts"
                description="Text messages for urgent order events."
                checked={preferences.smsAlerts}
                onChange={() => handlePreferenceToggle("smsAlerts")}
              />
            </SettingsSection>

            <SettingsSection title="Security & Privacy" description="Keep your account secure and up to date.">
              <SettingsToggle
                label="Two-factor authentication"
                description="Add a verification step at sign-in."
                checked={security.twoFactorEnabled}
                onChange={() => handleSecurityToggle("twoFactorEnabled")}
              />
              <SettingsToggle
                label="Biometric login"
                description="Use Face ID or fingerprint on supported devices."
                checked={security.biometricLogin}
                onChange={() => handleSecurityToggle("biometricLogin")}
              />
              <div className="flex flex-wrap gap-3 pt-2">
                <Button variant="outline" onClick={() => navigate("/reset-password")}>
                  Change password
                </Button>
                <Button variant="textPrimary" onClick={() => showToast("Login history coming soon", "info")}>
                  View login history
                </Button>
              </div>
            </SettingsSection>
                                </div>
                              )}
                      </div>

      {isProfileModalOpen && (
        <Modal title="Edit profile" onClose={() => setProfileModalOpen(false)}>
          <form className="space-y-4" onSubmit={handleSaveProfile}>
            <TextInput
              id="name"
              name="name"
              label="Full name"
              value={profileForm.name}
              onChange={handleProfileFieldChange}
              inputClassName={profileErrors.name ? "border-danger" : ""}
            />
            {profileErrors.name && <p className="text-danger text-xs -mt-3">{profileErrors.name}</p>}
            <TextInput
              id="email"
              name="email"
              label="Email address"
              value={profileForm.email}
              onChange={handleProfileFieldChange}
              inputClassName={profileErrors.email ? "border-danger" : ""}
            />
            {profileErrors.email && <p className="text-danger text-xs -mt-3">{profileErrors.email}</p>}
            <TextInput
              id="phone"
              name="phone"
              label="Phone number"
              value={profileForm.phone}
              onChange={handleProfileFieldChange}
              inputClassName={profileErrors.phone ? "border-danger" : ""}
            />
            {profileErrors.phone && <p className="text-danger text-xs -mt-3">{profileErrors.phone}</p>}
            <div className="flex gap-3 pt-2">
              <Button type="submit" variant="secondary">
                Save changes
              </Button>
              <Button type="button" variant="textPrimary" onClick={() => setProfileModalOpen(false)}>
                Cancel
                        </Button>
                      </div>
          </form>
        </Modal>
      )}

      {addressModalOpen && (
        <Modal title="Manage addresses" onClose={closeAddressModal}>
          <ShippingAddressSection
            hideHeader
            layout="modal"
            addresses={accountAddresses}
            profileDefaults={profileDefaults}
            selectedAddressId={accountSelectedAddressId}
            onSelectAddress={setAccountSelectedAddressId}
            onAddAddress={handleAccountAddAddress}
            onUpdateAddress={handleAccountUpdateAddress}
            onRemoveAddress={handleAccountRemoveAddress}
            onMakeDefaultAddress={handleMakeDefaultAddress}
            includeEmail={false}
            allowRemoval
            showSelectDropdown={accountAddresses.length > 0}
            actionLabel="Add address"
            sectionTitle="Manage addresses"
            showSelectedCard={false}
            prefillAddress={addressPrefill}
            onPrefillConsumed={() => setAddressPrefill(null)}
          />
        </Modal>
      )}
    </section>
  );
};

export default MyAccount;