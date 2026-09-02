import React, { useMemo, useState } from 'react';
import { Bot, MessageCircle, RotateCcw, Send, Sparkles, X } from 'lucide-react';

const quickReplies = [
  'Where are you located?',
  'What do you produce?',
  'How sustainable is the process?',
  'How can I contact NSCL?',
  'What is DRI technology?',
];

const chatbotKnowledge = [
  {
    keywords: ['location', 'where', 'located', 'karachi', 'bin qasim', 'address', 'site'],
    response: 'NSCL is located at Port Bin Qasim, Karachi, Pakistan, with direct access to the port, logistics network, and industrial infrastructure.',
  },
  {
    keywords: ['dri', 'direct reduced iron', 'technology', 'midrex', 'process'],
    response: 'DRI stands for Direct Reduced Iron. NSCL uses a MIDREX gas-based reduction process to convert iron ore into high-metallization iron with a more efficient and lower-emission route than conventional blast furnace production.',
  },
  {
    keywords: ['product', 'produce', 'steel', 'iron', 'output', 'capacity'],
    response: 'NSCL produces high-purity Direct Reduced Iron (DRI) and metallized iron products designed for domestic steelmakers, downstream engineering applications, and value-added manufacturing.',
  },
  {
    keywords: ['sustainable', 'environment', 'carbon', 'green', 'emissions', 'eco'],
    response: 'The MIDREX gas-based DRI route is designed to reduce emissions compared with conventional blast furnace operations, while supporting cleaner, more efficient steelmaking for Pakistan.',
  },
  {
    keywords: ['contact', 'email', 'phone', 'reach', 'inquiry', 'call'],
    response: 'You can reach NSCL via the Contact Us page or use the contact details listed on the website for email, phone, and address inquiries.',
  },
  {
    keywords: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greetings'],
    response: 'Hello! I can help with NSCL locations, DRI technology, sustainability, production, and contact details?',
  },
];

function getBotReply(input: string, recentMessages: Array<{ sender: 'user' | 'bot'; text: string }>) {
  const normalized = input.toLowerCase();
  const greetingMatch = ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good evening']
    .some((greeting) => normalized.includes(greeting));

  if (greetingMatch) {
    return 'Hello! I can help with NSCL locations, DRI technology, sustainability, production, and contact details.';
  }

  const directMatch = chatbotKnowledge.find((item) =>
    item.keywords.some((keyword) => normalized.includes(keyword))
  );

  if (directMatch) {
    return directMatch.response;
  }

  const recentUserContext = recentMessages
    .filter((message) => message.sender === 'user')
    .slice(-2)
    .map((message) => message.text.toLowerCase())
    .join(' ');

  if (
    (normalized.includes('what about') || normalized.includes('how about') || normalized.includes('and')) &&
    recentUserContext
  ) {
    const followUpMatch = chatbotKnowledge.find((item) =>
      item.keywords.some((keyword) => recentUserContext.includes(keyword))
    );

    if (followUpMatch) {
      return followUpMatch.response;
    }
  }

  if (normalized.includes('future') || normalized.includes('innovation')) {
    return 'NSCL is focused on industrial innovation, cleaner steelmaking, and strategic domestic supply chain integration for Pakistan.';
  }

  if (normalized.includes('thank')) {
    return 'You’re welcome. I’m happy to help with NSCL, DRI technology, sustainability, and contact details.';
  }

  if (normalized.includes('why') && (normalized.includes('important') || normalized.includes('value'))) {
    return 'NSCL is important because it strengthens Pakistan’s domestic steel ecosystem, reduces dependence on imported inputs, and supports industrial growth with cleaner ironmaking technology.';
  }

  if (normalized.includes('who') && normalized.includes('nscl')) {
    return 'NSCL is a private-sector integrated DRI steel complex in Pakistan focused on domestic steel self-reliance and cleaner industrial production.';
  }

  return 'I can help with NSCL locations, DRI technology, production, sustainability, and contact information. Try asking about steelmaking, sustainability, or how to reach the team.';
}

export const AIChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Hi! I’m the NSCL assistant. Ask me about DRI technology, sustainability, production, or contact details.',
    },
  ]);

  const recentSuggestions = useMemo(() => quickReplies.slice(0, 4), []);

  const sendMessage = (value?: string) => {
    const trimmed = (value ?? input).trim();
    if (!trimmed || isTyping) return;

    const userMessage = { sender: 'user' as const, text: trimmed };
    const botReply = { sender: 'bot' as const, text: getBotReply(trimmed, messages) };

    setMessages((prev) => [...prev, userMessage].slice(-10));
    setInput('');
    setIsTyping(true);

    window.setTimeout(() => {
      setMessages((prev) => [...prev, botReply].slice(-10));
      setIsTyping(false);
    }, 700);
  };

  const clearConversation = () => {
    setMessages([
      {
        sender: 'bot',
        text: 'Conversation cleared. Ask me anything about NSCL, DRI technology, or sustainability.',
      },
    ]);
    setInput('');
    setIsTyping(false);
  };

  return (
    <div className="ai-chatbot-wrap">
      {isOpen && (
        <div className="ai-chatbot-panel">
          <div className="ai-chatbot-header">
            <div className="ai-chatbot-title">
              <div className="ai-chatbot-badge">
                <Bot size={16} />
              </div>
              <span>NSCL Assistant</span>
            </div>
            <div className="ai-chatbot-header-actions">
              <button type="button" className="ai-chatbot-clear" onClick={clearConversation} aria-label="Clear conversation">
                <RotateCcw size={14} />
              </button>
              <button type="button" className="ai-chatbot-close" onClick={() => setIsOpen(false)} aria-label="Close chatbot">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className="ai-chatbot-body">
            {messages.map((message, index) => (
              <div key={`${message.sender}-${index}`} className={`ai-message ${message.sender}`}>
                {message.text}
              </div>
            ))}

            {isTyping && (
              <div className="ai-message bot ai-chatbot-typing" aria-live="polite">
                <span className="ai-dots" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            )}
          </div>

          <div className="ai-suggestion-row">
            {recentSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                className="ai-suggestion"
                onClick={() => sendMessage(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <div className="ai-chatbot-input-row">
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  sendMessage();
                }
              }}
              placeholder="Ask about NSCL..."
              aria-label="Ask the chatbot"
            />
            <button type="button" onClick={() => sendMessage()} aria-label="Send message">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        className="ai-chatbot-launcher"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? 'Close assistant' : 'Open assistant'}
      >
        <Sparkles size={15} />
        <MessageCircle size={18} />
      </button>
    </div>
  );
};
