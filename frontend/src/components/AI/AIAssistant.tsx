import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAdvancedTheme } from '../../contexts/AdvancedThemeContext';
import { 
  SparklesIcon,
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

interface AIMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
}

interface AIInsight {
  type: 'revenue' | 'sales' | 'customer' | 'trend';
  title: string;
  description: string;
  confidence: number;
  actionable: boolean;
}

const AIAssistant: React.FC = () => {
  const { colors, effectiveTheme } = useAdvancedTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI business assistant. I can help you analyze sales trends, forecast revenue, and provide actionable insights. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const lowerMessage = userMessage.toLowerCase();
    
    // AI response logic based on keywords
    if (lowerMessage.includes('sales') || lowerMessage.includes('revenue')) {
      return `Based on your recent data, I've noticed a 23% increase in sales over the past month. The electronics category is performing exceptionally well with a 45% growth rate. I recommend focusing marketing efforts on this category to maximize returns.`;
    } else if (lowerMessage.includes('forecast') || lowerMessage.includes('predict')) {
      return `My AI models predict a 15-20% revenue growth for the next quarter based on current trends. However, I recommend diversifying your product categories to reduce dependency on electronics, which currently represents 60% of your revenue.`;
    } else if (lowerMessage.includes('customer') || lowerMessage.includes('segment')) {
      return `Customer analysis reveals three key segments: 1) Tech enthusiasts (35% of customers, high value), 2) Budget shoppers (45%, moderate value), 3) Occasional buyers (20%, low value). I suggest creating targeted campaigns for each segment.`;
    } else if (lowerMessage.includes('trend') || lowerMessage.includes('pattern')) {
      return `I've identified several important trends: 1) Mobile purchases increased by 40% this quarter, 2) Weekend sales are 30% higher than weekdays, 3) Customer retention rate improved by 12%. Consider optimizing your mobile experience and weekend promotions.`;
    } else if (lowerMessage.includes('help') || lowerMessage.includes('what can you do')) {
      return `I can help you with:\n• Sales analysis and forecasting\n• Revenue trend identification\n• Customer segmentation insights\n• Product performance analysis\n• Market trend predictions\n• Business recommendations\n\nJust ask me about any of these topics!`;
    } else {
      return `I understand you're asking about "${userMessage}". Let me analyze your business data to provide relevant insights. Based on current patterns, I suggest focusing on customer retention and product diversification strategies. Would you like me to elaborate on any specific area?`;
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: AIMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Add typing indicator
    const typingMessage: AIMessage = {
      id: 'typing',
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };
    setMessages(prev => [...prev, typingMessage]);

    try {
      const aiResponse = await generateAIResponse(inputValue);
      
      // Remove typing indicator and add AI response
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'typing'),
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: aiResponse,
          timestamp: new Date()
        }
      ]);
    } catch (error) {
      setMessages(prev => [
        ...prev.filter(msg => msg.id !== 'typing'),
        {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: 'I apologize, but I encountered an error processing your request. Please try again.',
          timestamp: new Date()
        }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const getQuickInsights = (): AIInsight[] => [
    {
      type: 'revenue',
      title: 'Revenue Alert',
      description: 'Monthly revenue up 23%',
      confidence: 0.95,
      actionable: true
    },
    {
      type: 'sales',
      title: 'Sales Trend',
      description: 'Electronics category growing 45%',
      confidence: 0.88,
      actionable: true
    },
    {
      type: 'customer',
      title: 'Customer Insight',
      description: 'Retention rate improved 12%',
      confidence: 0.92,
      actionable: false
    }
  ];

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <motion.button
          onClick={() => setIsOpen(true)}
          className={`
            relative p-4 rounded-full shadow-lg transition-all duration-300
            ${effectiveTheme === 'dark' 
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600'
            }
            text-white hover:scale-110
          `}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <SparklesIcon className="h-6 w-6" />
          
          {/* Notification dot */}
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
      )}

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
            className={`
              w-96 h-[600px] rounded-2xl shadow-2xl border flex flex-col
              ${effectiveTheme === 'dark' 
                ? 'bg-gray-900 border-gray-700' 
                : 'bg-white border-gray-200'
              }
            `}
          >
            {/* Header */}
            <div className={`
              p-4 rounded-t-2xl flex items-center justify-between
              ${effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}
            `}>
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600">
                  <SparklesIcon className="h-5 w-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">AI Assistant</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">Always here to help</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <Cog6ToothIcon className="h-4 w-4 text-gray-500" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <XMarkIcon className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Quick Insights */}
            {!isMinimized && (
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2 overflow-x-auto">
                  {getQuickInsights().map((insight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`
                        flex-shrink-0 p-2 rounded-lg text-xs cursor-pointer
                        ${effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
                        hover:scale-105 transition-transform
                      `}
                    >
                      <div className="font-medium text-gray-900 dark:text-white">
                        {insight.title}
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        {insight.description}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {!isMinimized && (
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`
                      flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}
                    `}
                  >
                    {message.isTyping ? (
                      <div className={`
                        p-3 rounded-lg max-w-[80%]
                        ${effectiveTheme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}
                      `}>
                        <div className="flex space-x-1">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              className="w-2 h-2 bg-gray-400 rounded-full"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{
                                duration: 0.8,
                                repeat: Infinity,
                                delay: i * 0.1
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className={`
                        p-3 rounded-lg max-w-[80%]
                        ${message.type === 'user'
                          ? 'bg-blue-500 text-white'
                          : effectiveTheme === 'dark' 
                            ? 'bg-gray-800 text-gray-100'
                            : 'bg-gray-100 text-gray-900'
                        }
                      `}>
                        <div className="text-sm whitespace-pre-line">
                          {message.content}
                        </div>
                        <div className={`
                          text-xs mt-1 opacity-70
                          ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}
                        `}>
                          {message.timestamp.toLocaleTimeString()}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input */}
            {!isMinimized && (
              <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about your business..."
                    className={`
                      flex-1 px-3 py-2 rounded-lg border text-sm
                      ${effectiveTheme === 'dark'
                        ? 'bg-gray-800 border-gray-700 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                      }
                      focus:outline-none focus:ring-2 focus:ring-blue-500
                    `}
                    disabled={isTyping}
                  />
                  <motion.button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className={`
                      p-2 rounded-lg transition-colors
                      ${inputValue.trim() && !isTyping
                        ? 'bg-blue-500 hover:bg-blue-600 text-white'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }
                    `}
                    whileHover={{ scale: inputValue.trim() && !isTyping ? 1.05 : 1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PaperAirplaneIcon className="h-4 w-4" />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AIAssistant;
