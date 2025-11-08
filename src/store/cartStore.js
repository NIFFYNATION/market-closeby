import { create } from 'zustand';

const mergeItems = (items, incoming, quantity) => {
  const existing = items.find((item) => item.id === incoming.id);
  if (!existing) {
    return [
      ...items,
      {
        id: incoming.id,
        name: incoming.name,
        slug: incoming.slug,
        price: incoming.price,
        image: incoming.image,
        seller: incoming.seller || incoming.brand || 'Market Closeby',
        maxQuantity: incoming.stock || 99,
        quantity,
      },
    ];
  }

  return items.map((item) =>
    item.id === incoming.id
      ? {
          ...item,
          quantity: Math.min(item.maxQuantity, item.quantity + quantity),
        }
      : item,
  );
};

export const useCartStore = create((set, get) => ({
  items: [],
  addItem: (product, quantity = 1) =>
    set((state) => ({
      items: mergeItems(state.items, product, quantity),
    })),
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  updateQuantity: (id, quantity) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(item.maxQuantity, quantity)) }
          : item,
      ),
    })),
  clearCart: () => set({ items: [] }),
  cartCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
  subtotal: () =>
    get().items.reduce((sum, item) => {
      const numeric = parseFloat(String(item.price).replace(/[₦,]/g, '')) || 0;
      return sum + numeric * item.quantity;
    }, 0),
  deliveryFee: () => (get().items.length ? 1500 : 0),
  grandTotal: () => {
    const subtotal = get().subtotal();
    const delivery = get().deliveryFee();
    return subtotal + delivery;
  },
}));