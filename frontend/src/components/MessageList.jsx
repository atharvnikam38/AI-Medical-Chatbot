import React, { useEffect, useRef } from 'react';

function MessageList({ messages, isLoading }) {
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 p-4 overflow-y-auto">
      <div className="flex flex-col gap-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex items-start gap-3 animate-message-in ${
              message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
            }`}
          >
            <img
              src={
                message.sender === 'user'
                  ? 'https://i.ibb.co/d5b84Xw/Untitled-design.png'
                  : 'https://cdn-icons-png.flaticon.com/512/387/387569.png'
              }
              alt={`${message.sender} avatar`}
              className="w-8 h-8 rounded-full"
            />
            <div
              className={`max-w-xs md:max-w-md p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-purple-600 text-white rounded-br-none'
                  : 'bg-slate-700 text-slate-200 rounded-bl-none'
              }`}
            >
              <p className="text-sm whitespace-pre-wrap">{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3 animate-message-in">
            <img
              src="https://cdn-icons-png.flaticon.com/512/387/387569.png"
              alt="bot avatar"
              className="w-8 h-8 rounded-full"
            />
            <div className="bg-slate-700 p-3 rounded-2xl rounded-bl-none">
              <div className="flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-150"></div>
                <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={endOfMessagesRef} />
      </div>
    </div>
  );
}

export default MessageList;

