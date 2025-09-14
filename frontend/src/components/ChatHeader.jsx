import React from 'react';

function ChatHeader() {
  return (
    <div className="p-4 border-b border-purple-800/50">
      <div className="flex items-center">
        <div className="relative">
          <img
            src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
            alt="Bot Avatar"
            className="w-12 h-12 rounded-full border-2 border-purple-400"
          />
          <span className="absolute bottom-0 right-0 block h-3.5 w-3.5 rounded-full bg-green-400 border-2 border-slate-800"></span>
        </div>
        <div className="ml-4">
          <h2 className="text-lg font-bold text-white">Medical Chatbot</h2>
          <p className="text-sm text-green-400">Online</p>
        </div>
      </div>
    </div>
  );
}

export default ChatHeader;

