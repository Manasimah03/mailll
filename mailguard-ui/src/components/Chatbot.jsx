import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hi there! I'm GuardBot 🛡️. I can help explain phishing tactics, MITRE ATT&CK, or how our system analyzes emails. What's on your mind?", sender: "bot" }
  ]);
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if(isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = { text: inputText, sender: "user" };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');

    // Simulate bot response based on keywords
    setTimeout(() => {
      let botResponse = "I'm looking into that for you. Our system spots unusual links and urgent language to keep you safe.";
      const lowerInput = inputText.toLowerCase();
      
      if (lowerInput.includes('mitre') || lowerInput.includes('att&ck')) {
        botResponse = "MITRE ATT&CK is a knowledge base of adversary behaviors. We map threats like 'Spearphishing (T1566)' so security teams know exactly how attackers are operating.";
      } else if (lowerInput.includes('dataset') || lowerInput.includes('ceas')) {
        botResponse = "The CEAS 2008 dataset is a renowned collection of emails used for training bots to distinctively recognize patterns between legitimate and phishing messages.";
      } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
        botResponse = "Hello! Keep safe out there. Do you have an email you want to analyze?";
      }

      setMessages(prev => [...prev, { text: botResponse, sender: "bot" }]);
    }, 1000);
  };

  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <Bot size={24} />
            <span>GuardBot Assistant</span>
            <button 
              onClick={() => setIsOpen(false)} 
              style={{ padding: 0, width: 'auto', background: 'transparent', marginLeft: 'auto', boxShadow: 'none' }}
            >
              <X size={20} color="white" />
            </button>
          </div>
          
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <form className="chatbot-input" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask me anything..." 
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <button type="submit">
              <Send size={18} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <MessageCircle size={28} color="white" />
        </button>
      )}
    </div>
  );
}
