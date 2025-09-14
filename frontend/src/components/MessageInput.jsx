import React from 'react';

function MessageInput({ input, setInput, handleSend, isLoading }) {
  return (
    <div className="p-4 border-t border-purple-800/50">
      <form onSubmit={handleSend} className="flex items-center gap-3">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-slate-800 border border-slate-700 rounded-lg py-2 px-4 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-shadow duration-300"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-purple-600 hover:bg-purple-700 disabled:bg-purple-800 disabled:cursor-not-allowed text-white font-bold p-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-purple-500/50"
          disabled={isLoading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6"
          >
            <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
          </svg>
        </button>
      </form>
    </div>
  );
}

export default MessageInput;

