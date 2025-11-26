import { create } from 'zustand';

export const useAccountStore = create((set, get) => ({
  // User profile
  profile: {
    id: 'user-1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '08012345678',
    avatar: '/images/avatar-placeholder.png',
    preferences: {
      marketingEmails: true,
      orderUpdates: true,
      smsAlerts: false,
    },
    security: {
      twoFactorEnabled: false,
      biometricLogin: false,
    },
    addressBook: [
      {
        id: 'addr-1',
        label: 'Home',
        fullName: 'John Doe',
        phone: '08012345678',
        address: '123 Main Street',
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
        holder: 'JOHN DOE',
        exp: '07/28',
        isDefault: true,
      },
    ],
  },

  // Inbox state
  conversations: [
    {
      id: 'conv-1',
      title: 'Order MCB12345 - Delivery Update',
      participant: 'Market Closeby',
      avatar: '/icons/chat-bubble.svg',
      lastMessage: 'Your order is out for delivery today.',
      unreadCount: 2,
      updatedAt: new Date().toISOString(),
      messages: [
        {
          id: 'msg-1',
          sender: 'Market Closeby',
          text: 'Hi John, thanks for your order!',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
          me: false,
        },
        {
          id: 'msg-2',
          sender: 'John Doe',
          text: 'Thanks! When will it arrive?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
          me: true,
        },
        {
          id: 'msg-3',
          sender: 'Market Closeby',
          text: 'Your order is out for delivery today.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          me: false,
        },
      ],
    },
  ],

  // Actions: Profile
  updateProfile: (updates) =>
    set((state) => ({ profile: { ...state.profile, ...updates } })),

  addAddress: (address) =>
    set((state) => ({ profile: { ...state.profile, addressBook: [address, ...state.profile.addressBook] } })),

  updateAddress: (addressId, updates = {}) =>
    set((state) => ({
      profile: {
        ...state.profile,
        addressBook: state.profile.addressBook.map((addr) =>
          addr.id === addressId ? { ...addr, ...updates } : addr
        ),
      },
    })),

  removeAddress: (addressId) =>
    set((state) => ({
      profile: {
        ...state.profile,
        addressBook: state.profile.addressBook.filter((a) => a.id !== addressId),
      },
    })),

  setDefaultAddress: (addressId) =>
    set((state) => ({
      profile: {
        ...state.profile,
        addressBook: state.profile.addressBook.map((a) => ({ ...a, isDefault: a.id === addressId })),
      },
    })),

  // Actions: Payments
  addPaymentMethod: (pm) =>
    set((state) => {
      const isDefault = pm.isDefault ?? state.profile.paymentMethods.length === 0;
      const sanitized = {
        id: pm.id || `pm-${Date.now()}`,
        type: pm.type || 'card',
        brand: pm.brand || 'Visa',
        last4: pm.last4 || '',
        holder: pm.holder || state.profile.name?.toUpperCase() || 'CARD HOLDER',
        exp: pm.exp || '',
        isDefault,
      };

      const existing = isDefault
        ? state.profile.paymentMethods.map((method) => ({ ...method, isDefault: false }))
        : state.profile.paymentMethods;

      return {
        profile: {
          ...state.profile,
          paymentMethods: [sanitized, ...existing],
        },
      };
    }),

  removePaymentMethod: (pmId) =>
    set((state) => ({
      profile: (() => {
        const remaining = state.profile.paymentMethods.filter((p) => p.id !== pmId);
        if (!remaining.length) {
          return { ...state.profile, paymentMethods: [] };
        }
        if (!remaining.some((p) => p.isDefault)) {
          remaining[0] = { ...remaining[0], isDefault: true };
        }
        return { ...state.profile, paymentMethods: remaining };
      })(),
    })),

  setDefaultPaymentMethod: (pmId) =>
    set((state) => ({
      profile: {
        ...state.profile,
        paymentMethods: state.profile.paymentMethods.map((p) => ({ ...p, isDefault: p.id === pmId })),
      },
    })),

  // Actions: Inbox
  markConversationRead: (conversationId) =>
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId ? { ...c, unreadCount: 0 } : c
      ),
    })),

  sendMessage: (conversationId, text) => {
    const newMsg = {
      id: `msg-${Date.now()}`,
      sender: get().profile.name,
      text,
      timestamp: new Date().toISOString(),
      me: true,
    };
    set((state) => ({
      conversations: state.conversations.map((c) =>
        c.id === conversationId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, updatedAt: newMsg.timestamp }
          : c
      ),
    }));
  },
}));





