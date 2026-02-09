import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { generateResponse, getInitialGreeting } from '@/lib/aiLogic';
import { MenuItem } from '@/lib/menuData';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'concierge';
  recommendations?: MenuItem[];
}

export const AIConcierge = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([{
          id: '1',
          text: getInitialGreeting(),
          sender: 'concierge',
        }]);
        setIsTyping(false);
      }, 1000);
    }
  }, [isOpen, messages.length]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const { response, recommendations } = generateResponse(input, {
        mood: null,
        dietary: [],
        occasion: null,
        lastRecommendations: [],
      });

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'concierge',
        recommendations,
      };

      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickActions = [
    "What's popular tonight?",
    "I'm celebrating!",
    "Vegetarian options?",
    "Wine pairings",
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
        onClick={() => setIsOpen(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0 : 1 }}
        style={{ display: isOpen ? 'none' : 'flex' }}
      >
        <MessageCircle size={24} />
        <motion.div
          className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[600px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-border bg-background/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Sparkles size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-serif text-lg text-foreground">Food Concierge</h3>
                  <span className="text-xs text-muted-foreground">Your personal guide</span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-charcoal-light text-foreground rounded-br-sm'
                        : 'bg-primary/10 border border-primary/20 text-foreground rounded-bl-sm'
                    }`}
                  >
                    <p className="text-sm leading-relaxed">{message.text}</p>
                    
                    {/* Recommendations */}
                    {message.recommendations && message.recommendations.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-border/50 space-y-2">
                        {message.recommendations.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 bg-background/50 rounded-sm cursor-pointer hover:bg-background transition-colors"
                          >
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-12 h-12 rounded-sm object-cover"
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {item.name}
                              </p>
                              <p className="text-xs text-primary">${item.price}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex justify-start"
                >
                  <div className="bg-primary/10 border border-primary/20 px-4 py-3 rounded-lg rounded-bl-sm">
                    <div className="flex gap-1">
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-primary/60 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action}
                      onClick={() => {
                        setInput(action);
                        setTimeout(handleSend, 100);
                      }}
                      className="text-xs px-3 py-1.5 bg-background border border-border rounded-full text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-border bg-background/50">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-3 bg-charcoal-light border border-border rounded-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-sm"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-3 bg-primary text-primary-foreground rounded-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary/90 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
