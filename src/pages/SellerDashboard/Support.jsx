import React, { useState } from 'react';
import { useDashboardTheme } from './DashboardLayout';
import { 
  FiSend, FiPaperclip, FiSearch, FiMoreVertical, FiUser, FiMessageSquare, 
  FiCpu, FiZap, FiSmile, FiMeh, FiFrown, FiSliders, FiEdit3, FiGlobe, FiClock, FiArrowLeft 
} from 'react-icons/fi';

const Support = () => {
  const { theme } = useDashboardTheme();
  
  // AI Feature States
  const [isAiAgentActive, setIsAiAgentActive] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(true);
  
  // Mobile view state
  const [showMobileChat, setShowMobileChat] = useState(false);

  // Mock data for chats
  const [chats, setChats] = useState([
    {
      id: 1,
      buyer: 'John Fortune',
      avatar: null,
      lastMessage: 'Is the iPhone 16 still available?',
      time: '10:30 AM',
      unread: 2,
      online: true,
      sentiment: 'neutral',
      summary: 'Inquiring about product availability.',
      messages: [
        { id: 1, sender: 'buyer', text: 'Hi, I saw your listing for the iPhone 16.', time: '10:28 AM' },
        { id: 2, sender: 'buyer', text: 'Is the iPhone 16 still available?', time: '10:30 AM' }
      ]
    },
    {
      id: 2,
      buyer: 'Sarah Johnson',
      avatar: null,
      lastMessage: 'Thanks for the quick delivery!',
      time: 'Yesterday',
      unread: 0,
      online: false,
      sentiment: 'positive',
      summary: 'Order shipped and received. Customer satisfied.',
      messages: [
        { id: 1, sender: 'me', text: 'Your order has been shipped!', time: 'Yesterday 2:00 PM' },
        { id: 2, sender: 'buyer', text: 'Thanks for the quick delivery!', time: 'Yesterday 5:00 PM' }
      ]
    },
    {
      id: 3,
      buyer: 'Mike Davis',
      avatar: null,
      lastMessage: 'Can you lower the price for the Gas Cooker?',
      time: 'Yesterday',
      unread: 0,
      online: true,
      sentiment: 'negative',
      summary: 'Negotiating price for Gas Cooker.',
      messages: [
        { id: 1, sender: 'buyer', text: 'Can you lower the price for the Gas Cooker?', time: 'Yesterday 11:00 AM' }
      ]
    }
  ]);

  const [selectedChatId, setSelectedChatId] = useState(null);
  const [newMessage, setNewMessage] = useState('');

  const selectedChat = chats.find(c => c.id === selectedChatId);

  // Mock AI Smart Replies
  const smartReplies = [
    "Yes, it is still available!",
    "I can ship it to you tomorrow.",
    "The price is fixed, sorry.",
    "Would you like to see more photos?"
  ];

  const handleSendMessage = (e, msgText = newMessage) => {
    if (e) e.preventDefault();
    if (!msgText.trim()) return;

    const updatedChats = chats.map(chat => {
      if (chat.id === selectedChatId) {
        return {
          ...chat,
          lastMessage: msgText,
          time: 'Just now',
          messages: [
            ...chat.messages,
            { id: Date.now(), sender: 'me', text: msgText, time: 'Just now' }
          ]
        };
      }
      return chat;
    });

    setChats(updatedChats);
    setNewMessage('');
  };

  const handleAiRewrite = () => {
    if (!newMessage) return;
    // Mock AI Rewrite logic
    setNewMessage(`Hello! ${newMessage} Let me know if you have any other questions.`);
  };

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const borderColor = theme === 'dark' ? 'border-white/10' : 'border-slate-200';
  const inputBg = theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-slate-50';
  const hoverBg = theme === 'dark' ? 'hover:bg-white/5' : 'hover:bg-slate-100';
  const activeBg = theme === 'dark' ? 'bg-white/10' : 'bg-slate-100';

  const getSentimentIcon = (sentiment) => {
    switch (sentiment) {
      case 'positive': return <FiSmile className="w-4 h-4 text-green-500" />;
      case 'negative': return <FiFrown className="w-4 h-4 text-red-500" />;
      default: return <FiMeh className="w-4 h-4 text-amber-500" />;
    }
  };

  const handleChatSelect = (id) => {
    setSelectedChatId(id);
    setShowMobileChat(true);
  };

  return (
    <div className={`flex h-[calc(100vh-140px)] rounded-2xl border overflow-hidden ${borderColor} ${theme === 'dark' ? 'bg-[#1e1e1e]' : 'bg-white'}`}>
      {/* Sidebar - Chat List */}
      <div className={`w-full md:w-80 border-r flex flex-col ${borderColor} ${showMobileChat ? 'hidden md:flex' : 'flex'}`}>
        <div className={`p-4 border-b ${borderColor}`}>
          <div className="flex justify-between items-center mb-4">
            <h2 className={`font-bold text-lg ${textPrimary}`}>Messages</h2>
            <div className="flex items-center gap-2">
               <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${isAiAgentActive ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'text-slate-400 border-slate-700'}`}>
                 AI AGENT {isAiAgentActive ? 'ON' : 'OFF'}
               </span>
               <button 
                onClick={() => setIsAiAgentActive(!isAiAgentActive)}
                className={`w-8 h-5 rounded-full relative transition-colors ${isAiAgentActive ? 'bg-purple-600' : 'bg-slate-600'}`}
               >
                 <div className={`absolute top-1 w-3 h-3 rounded-full bg-white transition-transform ${isAiAgentActive ? 'left-4' : 'left-1'}`}></div>
               </button>
            </div>
          </div>
          <div className="relative">
            <FiSearch className={`absolute left-3 top-1/2 -translate-y-1/2 ${textSecondary}`} />
            <input 
              type="text" 
              placeholder="Search chats..." 
              className={`w-full pl-10 pr-4 py-2 rounded-lg text-sm outline-none transition-colors ${
                theme === 'dark' 
                  ? 'bg-white/5 text-white placeholder-slate-500 focus:bg-white/10' 
                  : 'bg-slate-100 text-slate-900 placeholder-slate-400 focus:bg-slate-200'
              }`}
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {chats.map(chat => (
            <button
              key={chat.id}
              onClick={() => handleChatSelect(chat.id)}
              className={`w-full p-4 flex items-start gap-3 transition-colors text-left ${
                selectedChatId === chat.id ? activeBg : hoverBg
              }`}
            >
              <div className="relative">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  theme === 'dark' ? 'bg-orange-900/50 text-orange-400' : 'bg-orange-100 text-orange-600'
                }`}>
                  {chat.avatar ? <img src={chat.avatar} alt={chat.buyer} className="w-full h-full rounded-full object-cover" /> : chat.buyer.charAt(0)}
                </div>
                {chat.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#1e1e1e]"></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <span className={`font-semibold truncate ${textPrimary}`}>{chat.buyer}</span>
                  <span className={`text-xs ${textSecondary}`}>{chat.time}</span>
                </div>
                <div className="flex items-center gap-2">
                   {getSentimentIcon(chat.sentiment)}
                   <p className={`text-sm truncate ${textSecondary} ${chat.unread > 0 ? 'font-medium ' + textPrimary : ''}`}>
                     {chat.lastMessage}
                   </p>
                </div>
              </div>
              {chat.unread > 0 && (
                <div className="w-5 h-5 rounded-full bg-orange-500 text-white text-xs flex items-center justify-center font-bold">
                  {chat.unread}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className={`flex-1 flex-col relative ${showMobileChat ? 'flex' : 'hidden md:flex'}`}>
        {selectedChat ? (
          <>
            {/* Chat Header */}
            <div className={`p-4 border-b flex justify-between items-center ${borderColor} z-10 relative bg-inherit`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setShowMobileChat(false)}
                  className="md:hidden p-1 -ml-2 mr-1"
                >
                  <FiArrowLeft className={`w-5 h-5 ${textPrimary}`} />
                </button>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
                  theme === 'dark' ? 'bg-orange-900/50 text-orange-400' : 'bg-orange-100 text-orange-600'
                }`}>
                  {selectedChat.avatar ? <img src={selectedChat.avatar} alt={selectedChat.buyer} className="w-full h-full rounded-full object-cover" /> : selectedChat.buyer.charAt(0)}
                </div>
                <div>
                  <h3 className={`font-bold ${textPrimary}`}>{selectedChat.buyer}</h3>
                  <span className={`text-xs flex items-center gap-1 ${selectedChat.online ? 'text-green-500' : textSecondary}`}>
                    <div className={`w-2 h-2 rounded-full ${selectedChat.online ? 'bg-green-500' : 'bg-slate-400'}`}></div>
                    {selectedChat.online ? 'Online' : 'Offline'}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowAiInsights(!showAiInsights)}
                  className={`p-2 rounded-lg flex items-center gap-2 text-xs font-medium border ${
                    showAiInsights 
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20' 
                      : `${hoverBg} ${textSecondary} ${borderColor}`
                  }`}
                >
                  <FiCpu className="w-4 h-4" />
                  AI Insights
                </button>
                <button className={`p-2 rounded-lg ${hoverBg} ${textSecondary}`}>
                  <FiMoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* AI Insights Panel */}
            {showAiInsights && (
               <div className={`px-4 py-3 border-b ${borderColor} ${theme === 'dark' ? 'bg-[#1a1a1a]' : 'bg-slate-50'}`}>
                 <div className="flex items-start gap-4">
                   <div className="flex-1">
                     <div className="flex items-center gap-2 mb-1">
                       <FiZap className="w-3 h-3 text-amber-500" />
                       <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Smart Summary</span>
                     </div>
                     <p className={`text-sm ${textPrimary}`}>{selectedChat.summary}</p>
                   </div>
                   <div className="px-4 border-l border-dashed border-slate-700">
                     <div className="flex items-center gap-2 mb-1">
                       <FiGlobe className="w-3 h-3 text-blue-500" />
                       <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Sentiment</span>
                     </div>
                     <div className="flex items-center gap-2">
                        {getSentimentIcon(selectedChat.sentiment)}
                        <span className={`text-sm capitalize ${textPrimary}`}>{selectedChat.sentiment}</span>
                     </div>
                   </div>
                 </div>
               </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-black/20">
              {selectedChat.messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[70%] rounded-2xl px-4 py-3 ${
                    msg.sender === 'me' 
                      ? 'bg-orange-500 text-white rounded-tr-none' 
                      : `${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-white text-slate-800 border border-slate-100'} rounded-tl-none`
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <span className={`text-[10px] mt-1 block ${msg.sender === 'me' ? 'text-white/70' : textSecondary}`}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
              {isAiAgentActive && (
                 <div className="flex justify-start">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-500/10 border border-purple-500/20">
                      <div className="animate-pulse w-2 h-2 rounded-full bg-purple-500"></div>
                      <span className="text-xs text-purple-400">AI Agent is analyzing...</span>
                    </div>
                 </div>
              )}
            </div>

            {/* Smart Replies */}
            <div className={`px-4 pt-3 pb-1 flex gap-2 overflow-x-auto ${borderColor}`}>
              {smartReplies.map((reply, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSendMessage(null, reply)}
                  className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-white/5 border-white/10 text-slate-300 hover:bg-white/10 hover:border-purple-500/50' 
                      : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-purple-300'
                  }`}
                >
                  <span className="mr-1 text-purple-500">✨</span> {reply}
                </button>
              ))}
            </div>

            {/* Input Area */}
            <div className={`p-4 pt-2 border-t ${borderColor}`}>
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <button type="button" className={`p-3 rounded-xl transition-colors ${hoverBg} ${textSecondary}`}>
                  <FiPaperclip className="w-5 h-5" />
                </button>
                <div className={`flex-1 flex items-center rounded-xl px-2 transition-colors ${inputBg} ${textPrimary}`}>
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type a message..."
                      className={`flex-1 px-2 py-2 bg-transparent outline-none placeholder-slate-400`}
                    />
                    {newMessage && (
                        <button 
                          type="button" 
                          onClick={handleAiRewrite}
                          className="p-1.5 rounded-lg text-purple-400 hover:bg-purple-500/10 transition-colors"
                          title="AI Rewrite"
                        >
                            <FiEdit3 className="w-4 h-4" />
                        </button>
                    )}
                </div>
                <button 
                  type="submit" 
                  disabled={!newMessage.trim()}
                  className={`p-3 rounded-xl bg-orange-500 text-white transition-transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-8 opacity-50">
            <FiMessageSquare className={`w-16 h-16 mb-4 ${textSecondary}`} />
            <h3 className={`text-xl font-bold mb-2 ${textPrimary}`}>Select a chat</h3>
            <p className={textSecondary}>Choose a conversation from the list to start messaging.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Support;
