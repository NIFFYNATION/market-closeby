import { create } from 'zustand';

export const useOrdersStore = create((set, get) => ({
  orders: [],
  
  createOrder: (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      orderNumber: `MCB${Date.now()}`,
      items: orderData.items,
      shippingAddress: orderData.shippingAddress,
      paymentMethod: orderData.paymentMethod,
      subtotal: orderData.subtotal,
      deliveryFee: orderData.deliveryFee,
      total: orderData.total,
      status: 'Pending',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
    };
    
    set((state) => ({
      orders: [newOrder, ...state.orders],
    }));
    
    return newOrder;
  },
  
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      ),
    })),
  
  cancelOrder: (orderId) =>
    set((state) => ({
      orders: state.orders.map((order) =>
        order.id === orderId ? { ...order, status: 'Cancelled' } : order
      ),
    })),
  
  getOrder: (orderId) => get().orders.find((order) => order.id === orderId),
  
  getOrdersByStatus: (status) => 
    get().orders.filter((order) => order.status === status),
}));
