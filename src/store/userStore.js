import { create } from 'zustand';

export const useUserStore = create((set, get) => ({
  profile: {
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '08012345678',
    avatar: '/images/avatar-placeholder.png',
  },
  addresses: [
    {
      id: 'addr-1',
      label: 'Home',
      recipient: 'John Doe',
      phone: '08012345678',
      street: '123 Main Street',
      city: 'Lagos',
      state: 'Lagos',
      postalCode: '100001',
      isDefault: true,
    },
  ],
  paymentMethods: [
    {
      id: 'pm-1',
      type: 'card',
      brand: 'Visa',
      last4: '3456',
      exp: '07/28',
      isDefault: true,
    },
  ],
  security: {
    twoFactorEnabled: false,
  },

  // Profile
  updateProfile: (updates) =>
    set((state) => ({
      profile: { ...state.profile, ...updates },
    })),

  // Addresses
  addAddress: (address) =>
    set((state) => ({
      addresses: [
        { ...address, id: `addr-${Date.now()}`, isDefault: state.addresses.length === 0 },
        ...state.addresses,
      ],
    })),
  updateAddress: (id, updates) =>
    set((state) => ({
      addresses: state.addresses.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),
  removeAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.filter((a) => a.id !== id),
    })),
  setDefaultAddress: (id) =>
    set((state) => ({
      addresses: state.addresses.map((a) => ({ ...a, isDefault: a.id === id })),
    })),

  // Payment Methods
  addPaymentMethod: (pm) =>
    set((state) => ({
      paymentMethods: [{ ...pm, id: `pm-${Date.now()}` }, ...state.paymentMethods],
    })),
  removePaymentMethod: (id) =>
    set((state) => ({
      paymentMethods: state.paymentMethods.filter((p) => p.id !== id),
    })),
  setDefaultPaymentMethod: (id) =>
    set((state) => ({
      paymentMethods: state.paymentMethods.map((p) => ({ ...p, isDefault: p.id === id })),
    })),

  // Security
  toggleTwoFactor: () =>
    set((state) => ({
      security: { ...state.security, twoFactorEnabled: !state.security.twoFactorEnabled },
    })),
}));

