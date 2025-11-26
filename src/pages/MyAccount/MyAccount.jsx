import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/accountStore";
import { useOrdersStore } from "../../store/ordersStore";
import PageHeader from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";
import { TextInput, SelectInput } from "../../components/forms/FormFields";
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

const MyAccount = () => {
  const navigate = useNavigate();
  const profile = useAccountStore((s) => s.profile);
  const addPaymentMethod = useAccountStore((s) => s.addPaymentMethod);
  const removePaymentMethod = useAccountStore((s) => s.removePaymentMethod);
  const setDefaultPaymentMethod = useAccountStore((s) => s.setDefaultPaymentMethod);
  const orders = useOrdersStore((s) => s.orders);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("overview");
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const defaultAddress = useMemo(() => profile.addressBook.find((a) => a.isDefault), [profile.addressBook]);
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
              <SectionCard title="Account Summary" right={<Link to="/account" className="text-primary text-sm">Edit</Link>}>
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button variant="outline" onClick={() => navigate('/orders')}>View Orders</Button>
                  <Button variant="outline" onClick={() => navigate('/wishlist')}>Wishlist</Button>
                  <Button variant="outline" onClick={() => setActiveTab('addresses')}>Addresses</Button>
                  <Button variant="outline" onClick={() => setActiveTab('payments')}>Payment Methods</Button>
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
            <SectionCard title="Address Book" right={<Button variant="secondary" size="sm">Add Address</Button>}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.addressBook.map((a) => (
                  <div key={a.id} className={`rounded-2xl p-4 border ${a.isDefault ? 'border-secondary' : 'border-gray-200'}`}>
                    <p className="font-semibold text-text-primary">{a.label}</p>
                    <p className="text-sm text-text-grey">{a.fullName}</p>
                    <p className="text-sm text-text-grey">{a.address}</p>
                    <p className="text-sm text-text-grey">{a.city}, {a.state} {a.postalCode}</p>
                    <div className="flex gap-2 mt-3">
                      {!a.isDefault && <Button variant="outline" size="sm">Make Default</Button>}
                      <Button variant="textDanger" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
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
          <div className="animate-fade-in-up">
            <SectionCard title="Account Settings">
              <p className="text-text-grey">Profile editing, password changes, and notifications will be added here.</p>
            </SectionCard>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyAccount;