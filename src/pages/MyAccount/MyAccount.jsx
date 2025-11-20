import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAccountStore } from "../../store/accountStore";
import { useOrdersStore } from "../../store/ordersStore";
import PageHeader from "../../components/common/PageHeader";
import { Button } from "../../components/common/Button";

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
  const orders = useOrdersStore((s) => s.orders);

  const [activeTab, setActiveTab] = useState("overview");
  const defaultAddress = useMemo(() => profile.addressBook.find((a) => a.isDefault), [profile.addressBook]);
  const defaultPayment = useMemo(() => profile.paymentMethods.find((p) => p.isDefault), [profile.paymentMethods]);

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
          <div className="animate-fade-in-up">
            <SectionCard title="Payment Methods" right={<Button variant="secondary" size="sm">Add Card</Button>}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profile.paymentMethods.map((p) => (
                  <div key={p.id} className={`rounded-2xl p-4 border ${p.isDefault ? 'border-secondary' : 'border-gray-200'}`}>
                    <InfoRow label="Type" value={p.type} />
                    <InfoRow label="Brand" value={p.brand} />
                    <InfoRow label="Last 4" value={p.last4} />
                    <InfoRow label="Cardholder" value={p.holder} />
                    <div className="flex gap-2 mt-3">
                      {!p.isDefault && <Button variant="outline" size="sm">Make Default</Button>}
                      <Button variant="textDanger" size="sm">Remove</Button>
                    </div>
                  </div>
                ))}
              </div>
            </SectionCard>
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