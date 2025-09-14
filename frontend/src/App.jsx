import { useState } from "react";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageInput from "./components/MessageInput";

function App() {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Welcome to the Medical Chatbot! I can help answer your health-related questions. How can I assist you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/get", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ msg: input }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const botResponseText = await response.text();

      const botMessage = { sender: "bot", text: botResponseText };
      setMessages((prev) => [...prev, botMessage]);

    } catch (error) {
      console.error("Failed to fetch bot response:", error);
      const errorMessage = { sender: "bot", text: "Sorry, I'm having trouble connecting to the server. Please try again later." };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-sans bg-slate-900 text-white flex flex-col items-center justify-center min-h-screen p-4">
      <div className="bg-gradient-to-br from-purple-900/50 via-slate-900 to-slate-900 border border-purple-900/50 rounded-2xl shadow-2xl w-full max-w-2xl h-[90vh] flex flex-col">
        <ChatHeader />
        <MessageList messages={messages} isLoading={isLoading} />
        <MessageInput 
          input={input} 
          setInput={setInput} 
          handleSend={handleSend} 
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}

export default App;

