import { create } from 'zustand';

export const useWishlistStore = create((set, get) => ({
  items: [],
  
  addItem: (product) => {
    const existingItem = get().items.find((item) => item.id === product.id);
    if (existingItem) {
      return false; // Item already in wishlist
    }
    
    set((state) => ({
      items: [
        ...state.items,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          oldPrice: product.oldPrice,
          image: product.image,
          images: product.images,
          brand: product.brand,
          category: product.category,
          rating: product.rating,
          reviews: product.reviews,
          verified: product.verified,
          location: product.location,
          addedAt: new Date().toISOString(),
        },
      ],
    }));
    return true; // Item added successfully
  },
  
  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
  
  clearWishlist: () => set({ items: [] }),
  
  isInWishlist: (id) => get().items.some((item) => item.id === id),
  
  wishlistCount: () => get().items.length,
}));

