import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSellerStore = create(
  persist(
    (set, get) => ({
      stores: [
        {
          id: 'store-1',
          name: 'Fortune Store',
          description: 'Best electronics in town',
          category: 'Electronics',
          role: 'Owner',
          status: 'active',
          image: '/icons/store-placeholder.svg',
          createdAt: '2024-01-15',
        },
        {
          id: 'store-2',
          name: 'Fortune Fashion',
          description: 'Trendy clothes for everyone',
          category: 'Fashion & Clothing',
          role: 'Owner',
          status: 'active',
          image: '/icons/store-placeholder.svg',
          createdAt: '2024-02-20',
        },
      ],
      currentStoreId: 'store-1',

      // Actions
      setCurrentStore: (storeId) => set({ currentStoreId: storeId }),

      addStore: (store) =>
        set((state) => {
          const newStore = {
            ...store,
            id: `store-${Date.now()}`,
            role: 'Owner',
            status: 'active',
            createdAt: new Date().toISOString(),
          };
          return {
            stores: [...state.stores, newStore],
            currentStoreId: newStore.id, // Switch to new store
          };
        }),

      updateStore: (id, updates) =>
        set((state) => ({
          stores: state.stores.map((store) =>
            store.id === id ? { ...store, ...updates } : store
          ),
        })),

      deleteStore: (id) =>
        set((state) => {
          const newStores = state.stores.filter((store) => store.id !== id);
          return {
            stores: newStores,
            currentStoreId:
              state.currentStoreId === id
                ? newStores.length > 0
                  ? newStores[0].id
                  : null
                : state.currentStoreId,
          };
        }),

      toggleStoreStatus: (id) =>
        set((state) => ({
          stores: state.stores.map((store) =>
            store.id === id
              ? { ...store, status: store.status === 'active' ? 'disabled' : 'active' }
              : store
          ),
        })),

      // Computed
      getCurrentStore: () => {
        const state = get();
        return state.stores.find((s) => s.id === state.currentStoreId) || null;
      },
    }),
    {
      name: 'seller-storage', // unique name
      partialize: (state) => ({ stores: state.stores, currentStoreId: state.currentStoreId }),
    }
  )
);
