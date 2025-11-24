import React, { useMemo, useState } from "react";
import { useAccountStore } from "../store/accountStore";
import PageHeader from "../components/common/PageHeader";
import { Button } from "../components/common/Button";

const ConversationItem = ({ conversation, selected, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full text-left px-4 py-3 rounded-2xl transition-colors ${
      selected ? 'bg-primary/5 border border-primary/20' : 'hover:bg-gray-50 border border-transparent'
    }`}
  >
    <div className="flex items-center gap-3">
      <img src={conversation.avatar} alt={conversation.title} className="w-10 h-10 rounded-full object-cover" />
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-text-primary truncate">{conversation.title}</p>
        <p className="text-xs text-text-grey truncate">{conversation.lastMessage}</p>
      </div>
      {conversation.unreadCount > 0 && (
        <span className="text-xs bg-secondary text-white font-semibold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1">
          {conversation.unreadCount}
        </span>
      )}
    </div>
  </button>
);

const MessageBubble = ({ message }) => (
  <div className={`flex ${message.me ? 'justify-end' : 'justify-start'}`}>
    <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm shadow ${
      message.me ? 'bg-secondary text-white rounded-br-sm' : 'bg-background-alt text-text-primary rounded-bl-sm'
    }`}>
      <p>{message.text}</p>
      <p className={`mt-1 text-[10px] ${message.me ? 'text-white/80' : 'text-text-grey'}`}>
        {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </p>
    </div>
  </div>
);

const InboxPage = () => {
  const conversations = useAccountStore((s) => s.conversations);
  const markConversationRead = useAccountStore((s) => s.markConversationRead);
  const sendMessage = useAccountStore((s) => s.sendMessage);

  const [activeId, setActiveId] = useState(conversations[0]?.id || null);
  const [draft, setDraft] = useState("");

  const activeConversation = useMemo(
    () => conversations.find((c) => c.id === activeId),
    [activeId, conversations]
  );

  const breadcrumbs = [
    { label: "Market CloseBy", link: "/" },
    { label: "Inbox", active: true },
  ];

  const handleSelect = (id) => {
    setActiveId(id);
    markConversationRead(id);
  };

  const handleSend = () => {
    const text = draft.trim();
    if (!text || !activeId) return;
    sendMessage(activeId, text);
    setDraft("");
  };

  return (
    <section className="min-h-screen pb-20">
      <PageHeader
        breadcrumbs={breadcrumbs}
        title="Inbox"
        subtitle="Chat with sellers and support"
        containerStyle="shadow"
        titleSize="large"
      />

      <div className=" mx-auto px-4 md:px-8 lg:px-12 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-6">
          {/* Conversations List */}
          <aside className="bg-white rounded-3xl p-4 shadow-lg h-[70vh] overflow-y-auto sidebar-scrollbar">
            <div className="flex items-center justify-between px-2 py-2 mb-2">
              <p className="text-sm font-semibold text-text-primary">Conversations</p>
              <span className="text-xs text-text-grey">{conversations.length}</span>
            </div>
            <div className="space-y-2">
              {conversations.map((c) => (
                <ConversationItem
                  key={c.id}
                  conversation={c}
                  selected={c.id === activeId}
                  onClick={() => handleSelect(c.id)}
                />
              ))}
            </div>
          </aside>

          {/* Thread */}
          <main className="bg-white rounded-3xl p-4 md:p-6 shadow-lg h-[70vh] flex flex-col">
            {!activeConversation ? (
              <div className="flex-1 flex items-center justify-center text-text-grey">Select a conversation</div>
            ) : (
              <>
                <div className="flex items-center gap-3 border-b pb-4 mb-4">
                  <img src={activeConversation.avatar} alt={activeConversation.title} className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-text-primary">{activeConversation.participant}</p>
                    <p className="text-xs text-text-grey">{activeConversation.title}</p>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto sidebar-scrollbar space-y-3 pr-1">
                  {activeConversation.messages.map((m) => (
                    <MessageBubble key={m.id} message={m} />
                  ))}
                </div>

                <div className="mt-4 flex items-center gap-2">
                  <input
                    type="text"
                    value={draft}
                    onChange={(e) => setDraft(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleSend();
                    }}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Button variant="secondary" onClick={handleSend}>Send</Button>
                </div>
              </>
            )}
          </main>
        </div>
      </div>
    </section>
  );
};

export default InboxPage;





