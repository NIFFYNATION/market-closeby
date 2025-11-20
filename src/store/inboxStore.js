import { create } from 'zustand';

const demoThreads = [
  {
    id: 't-1',
    title: 'Order MCB173130',
    counterpart: 'Market CloseBy Support',
    avatar: '/icons/inbox.svg',
    updatedAt: new Date().toISOString(),
    unread: 1,
    messages: [
      {
        id: 'm-1',
        sender: 'support',
        content: 'Hello John, your order has been received and is being processed.',
        time: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
      },
      {
        id: 'm-2',
        sender: 'me',
        content: 'Great, thanks for the update!',
        time: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
      },
    ],
  },
  {
    id: 't-2',
    title: 'Return Inquiry',
    counterpart: 'Seller - Home & Kitchen',
    avatar: '/icons/inbox.svg',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    unread: 0,
    messages: [
      {
        id: 'm-3',
        sender: 'me',
        content: 'Hi, I would like to know the process for returning a blender.',
        time: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
      },
      {
        id: 'm-4',
        sender: 'seller',
        content: 'Hello! Sure, I can help with that. Please provide your order number.',
        time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
      },
    ],
  },
];

export const useInboxStore = create((set, get) => ({
  threads: demoThreads,
  activeThreadId: demoThreads[0]?.id || null,

  setActiveThread: (threadId) => set({ activeThreadId: threadId }),
  markThreadRead: (threadId) =>
    set((state) => ({
      threads: state.threads.map((t) => (t.id === threadId ? { ...t, unread: 0 } : t)),
    })),
  sendMessage: (threadId, content) =>
    set((state) => {
      const newMessage = {
        id: `m-${Date.now()}`,
        sender: 'me',
        content,
        time: new Date().toISOString(),
      };
      return {
        threads: state.threads.map((t) =>
          t.id === threadId
            ? {
                ...t,
                messages: [...t.messages, newMessage],
                updatedAt: new Date().toISOString(),
                unread: t.unread, // keep as is; other side unread not simulated
              }
            : t,
        ),
      };
    }),
  startNewThread: (title, counterpart) =>
    set((state) => {
      const newThread = {
        id: `t-${Date.now()}`,
        title,
        counterpart,
        avatar: '/icons/inbox.svg',
        updatedAt: new Date().toISOString(),
        unread: 0,
        messages: [],
      };
      return {
        threads: [newThread, ...state.threads],
        activeThreadId: newThread.id,
      };
    }),
}));

