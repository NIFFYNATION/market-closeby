import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useOrdersStore } from "../store/ordersStore";
import { useToast } from "../context/ToastContext";
import { Button } from "../components/common/Button";
import PageHeader from "../components/common/PageHeader";

const formatCurrency = (value) =>
  `₦${Math.max(value, 0)
    .toFixed(0)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const OrdersPage = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  const orders = useOrdersStore((state) => state.orders);
  const getOrder = useOrdersStore((state) => state.getOrder);
  const cancelOrder = useOrdersStore((state) => state.cancelOrder);
  const { showToast } = useToast();

  const [activeTab, setActiveTab] = useState("all");

  const handleCancelOrder = (orderId, orderNumber) => {
    cancelOrder(orderId);
    showToast(`Order ${orderNumber} has been cancelled`, "info");
    navigate("/orders");
  };

  // If orderId is provided, show single order detail
  if (orderId) {
    const order = getOrder(orderId);
    
    if (!order) {
      return (
        <section className="min-h-screen pt-32 pb-16 flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-2xl font-semibold text-primary mb-4">Order not found</h1>
          <Button variant="secondary" onClick={() => navigate("/orders")}>
            Back to Orders
          </Button>
        </section>
      );
    }

    return (
      <section className="min-h-screen pb-20">
        <PageHeader
          breadcrumbs={[
            { label: "Market CloseBy", link: "/" },
            { label: "Orders", link: "/orders" },
            { label: `Order ${order.orderNumber}`, active: true },
          ]}
          title={`Order ${order.orderNumber}`}
          containerStyle="shadow"
          titleSize="medium"
        />

        <div className="max-w-4xl mx-auto px-4 md:px-8 lg:px-12 py-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-lg space-y-6 animate-fade-in-up">
            {/* Order Status */}
            <div className="flex items-center justify-between pb-6 border-b">
              <div>
                <p className="text-sm text-text-grey">Order Status</p>
                <span
                  className={`inline-block px-4 py-2 rounded-full text-sm font-semibold mt-2 ${
                    order.status === "Pending"
                      ? "bg-secondary text-yellow-800"
                      : order.status === "Completed"
                      ? "bg-success text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {order.status}
                </span>
              </div>
              <div className="text-right">
                <p className="text-sm text-text-grey">Order Date</p>
                <p className="font-semibold text-text-primary">{formatDate(order.orderDate)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Order Items</h3>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-4 p-4 bg-background-alt rounded-lg"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-contain rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-text-primary">{item.name}</h4>
                      <p className="text-sm text-text-grey">Quantity: {item.quantity}</p>
                      <p className="text-sm text-text-grey">Sold by {item.seller}</p>
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

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Payment Method</h3>
              <div className="bg-background-alt rounded-lg p-4">
                <p className="text-text-primary font-medium capitalize">
                  {order.paymentMethod === "card"
                    ? "Credit/Debit Card"
                    : order.paymentMethod === "bank"
                    ? "Bank Transfer"
                    : "Cash on Delivery"}
                </p>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold text-text-primary mb-4">Shipping Address</h3>
              <div className="bg-background-alt rounded-lg p-4">
                <p className="font-medium text-text-primary">{order.shippingAddress.fullName}</p>
                <p className="text-text-grey">{order.shippingAddress.address}</p>
                <p className="text-text-grey">
                  {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
                  {order.shippingAddress.postalCode}
                </p>
                <p className="text-text-grey">Phone: {order.shippingAddress.phone}</p>
                <p className="text-text-grey">Email: {order.shippingAddress.email}</p>
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-text-primary mb-4">Order Summary</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-text-grey">
                  <span>Subtotal</span>
                  <span>{formatCurrency(order.subtotal)}</span>
                </div>
                <div className="flex justify-between text-text-grey">
                  <span>Delivery</span>
                  <span>{formatCurrency(order.deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-text-primary pt-4 border-t">
                  <span>Total</span>
                  <span className="text-primary">{formatCurrency(order.total)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            {order.status === "Pending" && (
              <div className="flex gap-4 pt-4 border-t">
                <Button
                  variant="outline"
                  size="md"
                  shape="rounded"
                  onClick={() => handleCancelOrder(order.id, order.orderNumber)}
                >
                  Cancel Order
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  shape="rounded"
                  onClick={() => navigate("/")}
                  className="flex-1"
                >
                  Continue Shopping
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Filter orders by status
  const filteredOrders =
    activeTab === "all"
      ? orders
      : orders.filter((order) => order.status.toLowerCase() === activeTab.toLowerCase());

  const breadcrumbs = [
    { label: "Market CloseBy", link: "/" },
    { label: "Orders", active: true },
  ];

  return (
    <section className="min-h-screen pb-20">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="My Orders"
        containerStyle="shadow"
        titleSize="large"
      />

      <div className="max-w-6xl mx-auto px-4 md:px-8 lg:px-12 py-8">
        {/* Tabs */}
        <div className="mb-6 flex gap-4 border-b border-[#D9D9D9]">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "all"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-grey hover:text-primary"
            }`}
          >
            All Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab("pending")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "pending"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-grey hover:text-primary"
            }`}
          >
            Pending ({orders.filter((o) => o.status === "Pending").length})
          </button>
          <button
            onClick={() => setActiveTab("completed")}
            className={`px-4 py-3 font-medium border-b-2 transition-colors ${
              activeTab === "completed"
                ? "border-secondary text-secondary"
                : "border-transparent text-text-grey hover:text-primary"
            }`}
          >
            Completed ({orders.filter((o) => o.status === "Completed").length})
          </button>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center shadow-lg animate-fade-in-up">
            <div className="mb-6">
              <svg
                className="w-24 h-24 mx-auto text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-primary mb-4">No orders yet</h2>
            <p className="text-text-grey mb-8 max-w-md mx-auto">
              {activeTab === "all"
                ? "You haven't placed any orders yet. Start shopping to see your orders here!"
                : `You don't have any ${activeTab} orders.`}
            </p>
            <Button variant="secondary" size="md" shape="rounded" onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <article
                key={order.id}
                className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 animate-fade-in-up"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-text-primary">
                        Order {order.orderNumber}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          order.status === "Pending"
                            ? "bg-secondary text-yellow-800"
                            : order.status === "Completed"
                            ? "bg-success text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="text-sm text-text-grey">
                      Placed on {formatDate(order.orderDate)}
                    </p>
                    {order.estimatedDelivery && (
                      <p className="text-sm text-text-grey">
                        Estimated delivery: {formatDate(order.estimatedDelivery)}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-primary">{formatCurrency(order.total)}</p>
                    <p className="text-sm text-text-grey">{order.items.length} item(s)</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {order.items.slice(0, 3).map((item) => (
                      <div key={item.id} className="flex items-center gap-2">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 object-contain rounded"
                        />
                        <div>
                          <p className="text-sm font-medium text-text-primary line-clamp-1">
                            {item.name}
                          </p>
                          <p className="text-xs text-text-grey">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center text-sm text-text-grey">
                        +{order.items.length - 3} more
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      shape="rounded"
                      onClick={() => navigate(`/orders/${order.id}`)}
                    >
                      View Details
                    </Button>
                    {order.status === "Pending" && (
                      <Button
                        variant="textDanger"
                        size="sm"
                        shape="rounded"
                        onClick={() => handleCancelOrder(order.id, order.orderNumber)}
                      >
                        Cancel Order
                      </Button>
                    )}
                    {order.status === "Completed" && (
                      <Button
                        variant="outline"
                        size="sm"
                        shape="rounded"
                        onClick={() => navigate(`/product/${order.items[0]?.id}`)}
                      >
                        Buy Again
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default OrdersPage;

