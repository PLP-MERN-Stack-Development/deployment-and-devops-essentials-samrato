import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const scrollRef = useRef();

  const API_BASE_URL = 'https://chatbot-wrc1.onrender.com/api';
  const LOCAL_STORAGE_KEY = 'katiba_history';

  const addMessage = (text, sender) => {
    setMessages(prev => {
      const updated = [...prev, { text, sender }];
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const sendMessage = async () => {
    const prompt = chatInput.trim();
    if (!prompt || isChatLoading) return;

    addMessage(prompt, 'user');
    setChatInput('');
    setIsChatLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer anonymous-user-token',
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (response.ok) {
        addMessage(data.response, 'ai');
      } else {
        addMessage(data.message || 'AI error occurred.', 'ai');
      }
    } catch (err) {
      addMessage('Server error. Try again later.', 'ai');
    } finally {
      setIsChatLoading(false);
    }
  };

  // Load chat history from localStorage
  useEffect(() => {
    const history = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (history && Array.isArray(history)) {
      setMessages(history);
    } else {
      const initialMessage = [
        {
          text: "Hello! I'm Katiba AI, ready to answer your questions about the Constitution of Kenya.",
          sender: 'ai',
        },
      ];
      setMessages(initialMessage);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMessage));
    }
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const startNewChat = () => {
    const initialMessage = [
      {
        text: "Hello! I'm Katiba AI, ready to answer your questions about the Constitution of Kenya.",
        sender: 'ai',
      },
    ];
    setMessages(initialMessage);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(initialMessage));
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-blue-600 text-white text-center text-lg font-semibold py-4 px-4 shadow-md flex justify-between items-center">
        <span>Katiba AI</span>
        <button
          onClick={startNewChat}
          className="text-sm bg-white text-blue-600 border border-white px-3 py-1 rounded-full hover:bg-blue-100 transition"
        >
          Start New Chat
        </button>
      </header>

      {/* Chat Area */}
      <main className="flex flex-col flex-grow px-4 pb-28 pt-2 md:pb-4">
        <div className="flex-1 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] md:max-w-[70%] px-4 py-3 rounded-2xl shadow ${
                  msg.sender === 'user'
                    ? 'bg-blue-100 text-blue-900'
                    : 'bg-gray-100 text-gray-900'
                }`}
                style={{ wordBreak: 'break-word' }}
              >
                {msg.sender === 'ai' ? (
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                ) : (
                  msg.text
                )}
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </main>

      {/* Chat Input */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center gap-2 shadow-md sm:px-6">
        <input
          type="text"
          className="flex-1 px-4 py-3 rounded-full border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Ask about the Constitution..."
          value={chatInput}
          onChange={e => setChatInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && sendMessage()}
          disabled={isChatLoading}
        />

        <button
          onClick={sendMessage}
          disabled={isChatLoading}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isChatLoading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            'Send'
          )}
        </button>
      </div>
    </div>
  );
}

export default App;
