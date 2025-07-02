import { useState, useEffect, useRef } from "react";

import { api } from "../api/api";

export default function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "How can I help?", sender: "bot" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatModalRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, userMessage]);
    setLoading(true);
    
    try {
      const botRes = await api.post("/chat", { userID: "12345", message: input });
      const botReply = botRes.data.response;
      console.log(botReply);
      setMessages(prev => [...prev, { text: botReply, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [...prev, { text: "Sorry, I couldn't process your request.", sender: "bot" }]);
    } finally {
      setLoading(false);
      setInput("");
    }
  };

  // Handle clicking outside to close the chat
  useEffect(() => {
    function handleClickOutside(event) {
      if (chatModalRef.current && !chatModalRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  // Auto-scroll to bottom when messages update
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Initialize chat when component mounts
  useEffect(() => {
    const initChat = async () => {
      try {
        const res = await api.post("/chat/init", { userID: "12345" });
        console.log("Chat initialized:", res.data);
      } catch (error) {
        console.error("Error initializing chat:", error);
      }
    };

    initChat();
  }, []);

  // Handle Enter key press for sending messages
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="relative">
      {/* Side Chat Button - Hidden when chat is open */}
      <button 
        onClick={toggleChat}
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-3 rounded-l-lg shadow-lg hover:bg-red-700 transition-all z-50 ${isOpen ? 'opacity-0 translate-x-full pointer-events-none' : 'opacity-100 translate-x-0'}`}
        style={{ 
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          padding: '20px 8px',
          transitionProperty: 'opacity, transform',
          transitionDuration: '300ms'
        }}
      >
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span>Chat with Spiriter</span>
        </div>
      </button>

      {/* Side Sliding Chat Modal */}
      <div 
        ref={chatModalRef}
        className={`fixed top-0 right-0 w-80 md:w-96 h-full bg-white shadow-2xl z-40 transition-transform duration-300 ease-in-out ${isOpen ? 'transform-none' : 'translate-x-full'}`}
        style={{ borderLeft: '1px solid #e5e7eb' }}
      >
        <div className="w-full h-full flex flex-col overflow-hidden">
          {/* Chat Header */}
          <div className="border-b-2 px-4 py-3 bg-white flex justify-between items-center">
            <div className="flex items-center">
              <span className="font-bold text-red-700 text-xl">Spiriter</span>
            </div>
            <button 
              onClick={toggleChat} 
              className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close chat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div 
            ref={chatContainerRef} 
            className="flex-grow flex flex-col w-full px-4 py-3 space-y-4 overflow-y-auto"
          >
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <span 
                  className={`px-4 py-2 text-white rounded-lg break-words ${msg.sender === "user" ? "bg-black" : "bg-red-600"}`}
                  style={{
                    wordBreak: "break-word",
                    maxWidth: "75%",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            
            {/* Loading indicator */}
            {loading && (
              <div className="flex justify-start">
                <span className="px-4 py-2 text-white rounded-lg bg-gray-500">
                  Thinking...
                </span>
              </div>
            )}
          </div>

          {/* Chat Footer */}
          <div className="border-t-2 flex items-center p-3 bg-white">
            <div className="flex flex-wrap w-full relative">
              <textarea
                placeholder="Type here..."
                className="w-full rounded-lg px-4 py-2 border-2 pr-10 resize-none"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={1}
                style={{
                  minHeight: "36px",
                  maxHeight: "100px",
                  overflowY: "auto",
                }}
              />
              <button
                type="button"
                onClick={handleSend}
                className="absolute right-3 top-1/2 transform -translate-y-1/2"
                disabled={loading || input.trim() === ""}
              >
                <img src="./send.svg" alt="Send" className="w-5 h-5" />
              </button>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}