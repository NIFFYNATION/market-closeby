import React, { useState } from 'react';
import { useDashboardTheme } from './DashboardLayout';
import { FiCpu, FiMessageSquare, FiTrendingUp, FiSettings, FiCheck, FiX, FiZap, FiShare2, FiBarChart2, FiPackage, FiSearch, FiGlobe, FiCalendar } from 'react-icons/fi';
import { FaRobot, FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { useToast } from '../../context/ToastContext';
import { useSellerStore } from '../../store/sellerStore';

const AiFeatures = () => {
  const { theme } = useDashboardTheme();
  const { showToast } = useToast();
  const { getCurrentStore } = useSellerStore();
  const currentStore = getCurrentStore();

  const [activeFeature, setActiveFeature] = useState(null);
  
  // Agent Config State
  const [agentConfig, setAgentConfig] = useState({
    name: 'ShopAssistant',
    personality: 'Professional',
    tone: 'Friendly',
    languages: ['English'],
    enabled: false
  });
  const [isConfiguringAgent, setIsConfiguringAgent] = useState(false);

  // Social Media Config State
  const [isSocialModalOpen, setIsSocialModalOpen] = useState(false);
  const [socialConfig, setSocialConfig] = useState({
    connected: { facebook: false, instagram: false, twitter: false, linkedin: false },
    autoPost: { enabled: false, frequency: 'Daily', contentTypes: ['New Arrivals', 'Best Sellers'] }
  });
  const [activeSocialTab, setActiveSocialTab] = useState('connect'); // 'connect' or 'autopost'

  const features = [
    {
      id: 'agent',
      title: 'Store AI Agent',
      description: 'Your personal store assistant that handles customer inquiries 24/7.',
      icon: <FaRobot className="w-8 h-8" />,
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
      gradient: 'from-blue-500/20 to-cyan-500/20',
      status: agentConfig.enabled ? 'Active' : 'Not Configured',
      action: () => setIsConfiguringAgent(true)
    },
    {
      id: 'social',
      title: 'Social Media Manager',
      description: 'Connect accounts and auto-post AI generated content to drive traffic.',
      icon: <FiShare2 className="w-8 h-8" />,
      color: 'text-pink-500',
      bg: 'bg-pink-500/10',
      gradient: 'from-pink-500/20 to-rose-500/20',
      status: socialConfig.autoPost.enabled ? 'Auto-Posting' : 'Ready',
      action: () => setIsSocialModalOpen(true)
    },
    {
      id: 'content',
      title: 'Content Generator',
      description: 'Generate SEO-friendly product descriptions and marketing copy in seconds.',
      icon: <FiCpu className="w-8 h-8" />,
      color: 'text-purple-500',
      bg: 'bg-purple-500/10',
      gradient: 'from-purple-500/20 to-violet-500/20',
      status: 'Ready',
      action: () => showToast('Use the "Generate with AI" button on product pages!', 'info')
    },
    {
      id: 'reviews',
      title: 'Sentiment Analysis',
      description: 'Analyze customer reviews to understand sentiment and improve products.',
      icon: <FiBarChart2 className="w-8 h-8" />,
      color: 'text-indigo-500',
      bg: 'bg-indigo-500/10',
      gradient: 'from-indigo-500/20 to-blue-500/20',
      status: 'New',
      action: () => showToast('Analyzing last 100 reviews... Sentiment: Positive (4.8/5)', 'success')
    },
    {
      id: 'inventory',
      title: 'Demand Forecasting',
      description: 'Predict inventory needs based on historical sales and seasonal trends.',
      icon: <FiPackage className="w-8 h-8" />,
      color: 'text-teal-500',
      bg: 'bg-teal-500/10',
      gradient: 'from-teal-500/20 to-emerald-500/20',
      status: 'Coming Soon',
      action: () => {}
    },
    {
      id: 'pricing',
      title: 'Price Optimizer',
      description: 'Get real-time price recommendations based on market trends.',
      icon: <FiTrendingUp className="w-8 h-8" />,
      color: 'text-green-500',
      bg: 'bg-green-500/10',
      gradient: 'from-green-500/20 to-lime-500/20',
      status: 'Coming Soon',
      action: () => {}
    },
    {
      id: 'support',
      title: 'Smart Auto-Reply',
      description: 'Configure intelligent automated responses for common questions.',
      icon: <FiMessageSquare className="w-8 h-8" />,
      color: 'text-amber-500',
      bg: 'bg-amber-500/10',
      gradient: 'from-amber-500/20 to-orange-500/20',
      status: 'Beta',
      action: () => showToast('Smart Auto-Reply is currently in Beta testing.', 'info')
    },
    {
      id: 'competitor',
      title: 'Competitor Spy',
      description: 'Track competitor pricing and strategies to stay ahead.',
      icon: <FiSearch className="w-8 h-8" />,
      color: 'text-red-500',
      bg: 'bg-red-500/10',
      gradient: 'from-red-500/20 to-pink-500/20',
      status: 'Premium',
      action: () => showToast('Upgrade to Premium to access Competitor Spy.', 'info')
    }
  ];

  const handleSaveAgent = () => {
    setAgentConfig(prev => ({ ...prev, enabled: true }));
    setIsConfiguringAgent(false);
    showToast('AI Agent configured and activated successfully!', 'success');
  };

  const handleToggleSocial = (platform) => {
    setSocialConfig(prev => ({
      ...prev,
      connected: {
        ...prev.connected,
        [platform]: !prev.connected[platform]
      }
    }));
  };

  const handleSaveSocial = () => {
    if (Object.values(socialConfig.connected).some(v => v)) {
        setSocialConfig(prev => ({
            ...prev,
            autoPost: { ...prev.autoPost, enabled: true }
        }));
        setIsSocialModalOpen(false);
        showToast('Social Media Manager activated!', 'success');
    } else {
        showToast('Please connect at least one social account.', 'error');
    }
  };

  const textPrimary = theme === 'dark' ? 'text-white' : 'text-slate-900';
  const textSecondary = theme === 'dark' ? 'text-slate-400' : 'text-slate-500';
  const cardBg = theme === 'dark' ? 'bg-[#1e1e1e]/80 backdrop-blur-md border-white/10' : 'bg-white/80 backdrop-blur-md border-slate-200';
  const modalBg = theme === 'dark' ? 'bg-[#1e1e1e] border-white/10' : 'bg-white';

  return (
    <div className="max-w-7xl mx-auto pb-10">
      <div className="mb-10 relative overflow-hidden rounded-2xl p-8 border border-amber-500/20">
        <div className={`absolute inset-0 opacity-10 ${theme === 'dark' ? 'bg-gradient-to-r from-amber-500 to-purple-600' : 'bg-gradient-to-r from-amber-400 to-purple-500'}`}></div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-amber-500/20 rounded-lg backdrop-blur-sm border border-amber-500/20">
                <FiZap className="w-6 h-6 text-amber-500" />
            </div>
            <h1 className={`text-3xl font-bold ${textPrimary}`}>AI Tools & Assistant</h1>
            </div>
            <p className={`text-lg ${textSecondary} max-w-2xl`}>
                Supercharge your store with our suite of AI-powered tools. Automate tasks, analyze data, and grow your business with intelligent insights.
            </p>
        </div>
      </div>

      {/* AI Stats Overview - Bento Grid Style */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <div className={`md:col-span-2 p-6 rounded-2xl border ${cardBg} relative overflow-hidden group`}>
            <div className="absolute right-0 top-0 w-32 h-32 bg-green-500/10 rounded-full blur-3xl -mr-10 -mt-10 group-hover:bg-green-500/20 transition-all duration-500"></div>
          <p className={`text-sm font-medium mb-1 ${textSecondary}`}>Time Saved This Month</p>
          <div className="flex items-end gap-3">
            <h3 className={`text-4xl font-bold ${textPrimary}`}>12.5h</h3>
            <span className="text-sm text-green-500 font-medium mb-1 flex items-center bg-green-500/10 px-2 py-0.5 rounded-full">
                <FiTrendingUp className="mr-1 w-3 h-3" /> +18%
            </span>
          </div>
          <p className={`text-xs ${textSecondary} mt-2`}>Equivalent to 1.5 working days</p>
        </div>

        <div className={`p-6 rounded-2xl border ${cardBg} relative overflow-hidden group`}>
            <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/10 rounded-full blur-3xl -mr-5 -mt-5 group-hover:bg-purple-500/20 transition-all duration-500"></div>
          <p className={`text-sm font-medium mb-1 ${textSecondary}`}>Content Generated</p>
          <h3 className={`text-3xl font-bold ${textPrimary}`}>45</h3>
          <p className="text-xs text-purple-500 mt-1 flex items-center">
            <FiCpu className="mr-1" /> Descriptions & posts
          </p>
        </div>

        <div className={`p-6 rounded-2xl border ${cardBg} relative overflow-hidden group`}>
            <div className="absolute right-0 top-0 w-24 h-24 bg-blue-500/10 rounded-full blur-3xl -mr-5 -mt-5 group-hover:bg-blue-500/20 transition-all duration-500"></div>
          <p className={`text-sm font-medium mb-1 ${textSecondary}`}>Agent Interactions</p>
          <h3 className={`text-3xl font-bold ${textPrimary}`}>128</h3>
          <p className="text-xs text-blue-500 mt-1 flex items-center">
            <FaRobot className="mr-1" /> Customer chats
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {features.map((feature) => (
          <div 
            key={feature.id}
            onClick={feature.action}
            className={`p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer relative overflow-hidden group ${cardBg}`}
          >
            {/* Hover Gradient Background */}
            <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>

            <div className="flex items-start justify-between mb-4 relative z-10">
              <div className={`p-3 rounded-xl ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform duration-300`}>
                {feature.icon}
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${
                feature.status === 'Active' || feature.status === 'Auto-Posting' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                feature.status === 'Ready' ? 'bg-blue-500/10 text-blue-500 border-blue-500/20' :
                feature.status === 'Beta' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' :
                feature.status === 'Premium' ? 'bg-red-500/10 text-red-500 border-red-500/20' :
                feature.status === 'New' ? 'bg-indigo-500/10 text-indigo-500 border-indigo-500/20' :
                'bg-slate-500/10 text-slate-500 border-slate-500/20'
              }`}>
                {feature.status}
              </span>
            </div>
            
            <h3 className={`text-lg font-bold mb-2 ${textPrimary} relative z-10`}>{feature.title}</h3>
            <p className={`mb-4 text-sm ${textSecondary} line-clamp-2 relative z-10`}>{feature.description}</p>
            
            <div className={`flex items-center text-xs font-bold ${feature.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0`}>
                Configure <FiCheck className="ml-1" />
            </div>
          </div>
        ))}
      </div>

      {/* AI Agent Configuration Modal */}
      {isConfiguringAgent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden ${modalBg} border`}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/10 rounded-lg">
                  <FaRobot className="w-6 h-6 text-blue-500" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Setup AI Agent</h3>
                  <p className={`text-xs ${textSecondary}`}>Configure your store's virtual assistant</p>
                </div>
              </div>
              <button 
                onClick={() => setIsConfiguringAgent(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Agent Name</label>
                <input
                  type="text"
                  value={agentConfig.name}
                  onChange={(e) => setAgentConfig({...agentConfig, name: e.target.value})}
                  className={`w-full px-4 py-3 rounded-xl outline-none border transition-colors ${
                    theme === 'dark' 
                      ? 'bg-[#121212] border-white/10 text-white focus:border-blue-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Personality</label>
                  <select
                    value={agentConfig.personality}
                    onChange={(e) => setAgentConfig({...agentConfig, personality: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl outline-none border transition-colors ${
                      theme === 'dark' 
                        ? 'bg-[#121212] border-white/10 text-white focus:border-blue-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                    }`}
                  >
                    <option>Professional</option>
                    <option>Friendly</option>
                    <option>Humorous</option>
                    <option>Luxury</option>
                  </select>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Tone</label>
                  <select
                    value={agentConfig.tone}
                    onChange={(e) => setAgentConfig({...agentConfig, tone: e.target.value})}
                    className={`w-full px-4 py-3 rounded-xl outline-none border transition-colors ${
                      theme === 'dark' 
                        ? 'bg-[#121212] border-white/10 text-white focus:border-blue-500' 
                        : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-blue-500'
                    }`}
                  >
                    <option>Helpful</option>
                    <option>Concise</option>
                    <option>Enthusiastic</option>
                    <option>Formal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${textPrimary}`}>Capabilities</label>
                <div className="space-y-3">
                  {['Answer product questions', 'Handle order status inquiries', 'Suggest similar products', 'Process return requests'].map((cap, index) => (
                    <label key={index} className="flex items-center gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                        theme === 'dark' ? 'border-white/20 bg-[#121212]' : 'border-slate-300 bg-white'
                      } group-hover:border-blue-500`}>
                        <FiCheck className="w-3.5 h-3.5 text-blue-500" />
                      </div>
                      <span className={`text-sm ${textSecondary}`}>{cap}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
              <button
                onClick={() => setIsConfiguringAgent(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAgent}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-blue-500/20"
              >
                Activate Agent
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Social Media Manager Modal */}
      {isSocialModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className={`w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden ${modalBg} border`}>
            <div className="flex items-center justify-between p-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-pink-500/10 rounded-lg">
                  <FiShare2 className="w-6 h-6 text-pink-500" />
                </div>
                <div>
                  <h3 className={`text-lg font-bold ${textPrimary}`}>Social Media Manager</h3>
                  <p className={`text-xs ${textSecondary}`}>Automate your social presence</p>
                </div>
              </div>
              <button 
                onClick={() => setIsSocialModalOpen(false)}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' ? 'hover:bg-white/10 text-slate-400' : 'hover:bg-slate-100 text-slate-500'
                }`}
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-white/10">
                <button 
                    onClick={() => setActiveSocialTab('connect')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeSocialTab === 'connect' ? 'text-pink-500' : textSecondary}`}
                >
                    Connect Accounts
                    {activeSocialTab === 'connect' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"></div>}
                </button>
                <button 
                    onClick={() => setActiveSocialTab('autopost')}
                    className={`flex-1 py-3 text-sm font-medium transition-colors relative ${activeSocialTab === 'autopost' ? 'text-pink-500' : textSecondary}`}
                >
                    Auto-Post Settings
                    {activeSocialTab === 'autopost' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-500"></div>}
                </button>
            </div>
            
            <div className="p-6">
                {activeSocialTab === 'connect' ? (
                    <div className="space-y-4">
                        <p className={`text-sm ${textSecondary} mb-4`}>Connect your social media accounts to enable auto-posting and analytics.</p>
                        
                        {[
                            { id: 'facebook', name: 'Facebook', icon: <FaFacebook className="w-6 h-6 text-blue-600" /> },
                            { id: 'instagram', name: 'Instagram', icon: <FaInstagram className="w-6 h-6 text-pink-600" /> },
                            { id: 'twitter', name: 'Twitter / X', icon: <FaTwitter className="w-6 h-6 text-sky-500" /> },
                            { id: 'linkedin', name: 'LinkedIn', icon: <FaLinkedin className="w-6 h-6 text-blue-700" /> },
                        ].map((platform) => (
                            <div key={platform.id} className={`flex items-center justify-between p-4 rounded-xl border ${theme === 'dark' ? 'bg-[#121212] border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                                <div className="flex items-center gap-3">
                                    {platform.icon}
                                    <span className={`font-medium ${textPrimary}`}>{platform.name}</span>
                                </div>
                                <button
                                    onClick={() => handleToggleSocial(platform.id)}
                                    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                        socialConfig.connected[platform.id]
                                            ? 'bg-green-500/10 text-green-500 border border-green-500/20'
                                            : 'bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10'
                                    }`}
                                >
                                    {socialConfig.connected[platform.id] ? 'Connected' : 'Connect'}
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                         <div className={`p-4 rounded-xl border border-amber-500/20 bg-amber-500/5`}>
                            <div className="flex items-start gap-3">
                                <FiZap className="w-5 h-5 text-amber-500 mt-0.5" />
                                <div>
                                    <h4 className={`text-sm font-bold ${textPrimary} mb-1`}>AI Auto-Pilot</h4>
                                    <p className={`text-xs ${textSecondary}`}>
                                        The AI will automatically generate and post content based on your new products and best sellers.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className={`block text-sm font-medium mb-3 ${textPrimary}`}>Posting Frequency</label>
                            <div className="grid grid-cols-3 gap-3">
                                {['Daily', 'Weekly', 'Bi-Weekly'].map((freq) => (
                                    <button
                                        key={freq}
                                        onClick={() => setSocialConfig(prev => ({ ...prev, autoPost: { ...prev.autoPost, frequency: freq } }))}
                                        className={`py-2 rounded-lg text-sm font-medium border transition-all ${
                                            socialConfig.autoPost.frequency === freq
                                                ? 'bg-pink-500 text-white border-pink-500'
                                                : theme === 'dark' ? 'bg-[#121212] border-white/10 text-slate-400 hover:border-pink-500/50' : 'bg-white border-slate-200 text-slate-600'
                                        }`}
                                    >
                                        {freq}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                             <label className={`block text-sm font-medium mb-3 ${textPrimary}`}>Content Types</label>
                             <div className="space-y-2">
                                {['New Arrivals', 'Best Sellers', 'Promotions', 'Industry News'].map((type) => (
                                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                                            theme === 'dark' ? 'border-white/20 bg-[#121212]' : 'border-slate-300 bg-white'
                                        } group-hover:border-pink-500`}>
                                            <FiCheck className="w-3.5 h-3.5 text-pink-500" />
                                        </div>
                                        <span className={`text-sm ${textSecondary}`}>{type}</span>
                                    </label>
                                ))}
                             </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="p-6 border-t border-white/10 bg-black/20 flex justify-end gap-3">
              <button
                onClick={() => setIsSocialModalOpen(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  theme === 'dark' 
                    ? 'bg-white/5 text-slate-300 hover:bg-white/10' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSocial}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white text-sm font-bold rounded-lg transition-all shadow-lg shadow-pink-500/20"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AiFeatures;
