/**
 * Avatar - Ava Chat Interface
 *
 * This module implements a chat interface for interacting with Ava, a digital assistant.
 * It provides a user-friendly UI for sending messages, displaying chat history, and managing the conversation flow.
 *
 * Key Features:
 * - Real-time chat interface with message history
 * - Auto-expanding textarea for user input
 * - Auto-scrolling chat container
 * - Loading indicator for message sending
 * - Reset chat functionality
 * - Navigation back to options page
 *
 * Components:
 * - ChatContent: The main component containing all chat UI and logic
 * - Chat: A wrapper component that provides Suspense boundary for ChatContent
 *
 * Custom Hook:
 * - useChat: Manages chat state and operations (imported from '../hooks/useChat')
 *
 * @module AvatarChat
 */

'use client';

import { KeyboardEvent, useRef, useEffect, Suspense } from 'react';
import Image from 'next/image';
import { RotateCcw, ChevronLeft, Send } from 'lucide-react';
import useChat from '../hooks/useChat';

const ChatContent = () => {
  const {
    message,
    setMessage,
    chatHistory,
    responseStream,
    isLoading,
    handleSubmit,
    handleReset,
    handleBack,
  } = useChat();

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 100);
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, responseStream]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between bg-base-100 p-4 shadow-md">
      <div className="flex items-center">
        <button onClick={handleBack} className="btn btn-circle btn-ghost mr-3" aria-label="Go Back">
          <ChevronLeft className="h-6 w-6" />
        </button>
        <Image
          src="/ava.jpg"
          alt="Ava"
          width={128}
          height={128}
          className="mr-3 h-10 w-10 overflow-hidden rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h2 className="font-bold">Ava</h2>
          <p className="text-xs opacity-70">Digital Assistant</p>
        </div>
      </div>
      <button onClick={handleReset} className="btn btn-circle btn-ghost" aria-label="Reset Chat">
        <RotateCcw className="h-6 w-6 text-base-content" />
      </button>
    </div>
  );

  const renderChatMessages = () => (
    <div className="flex-grow overflow-y-auto p-4" ref={chatContainerRef}>
      {chatHistory.map(msg => (
        <div key={msg.id} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
          <div
            className={`chat-bubble ${
              msg.role === 'user' ? 'bg-primary text-primary-content' : 'bg-base-300'
            }`}
          >
            {msg.content}
          </div>
        </div>
      ))}
      {responseStream && (
        <div className="chat chat-start">
          <div className="chat-bubble bg-base-300">{responseStream}</div>
        </div>
      )}
    </div>
  );

  const renderInputArea = () => (
    <div className="bg-base-100 p-4">
      <div className="flex items-center rounded-3xl bg-base-200">
        <textarea
          ref={textareaRef}
          placeholder="Message..."
          className="hide-scrollbar textarea textarea-ghost w-full resize-none overflow-auto transition-all focus:outline-none"
          value={message}
          onChange={e => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isLoading}
          rows={1}
          style={{
            maxHeight: '100px',
            minHeight: '40px',
            overflowY: 'auto',
          }}
        />
        <button
          onClick={() => handleSubmit()}
          disabled={isLoading}
          className="btn btn-circle btn-ghost mr-2 flex-shrink-0"
          aria-label="Send Message"
        >
          {isLoading ? (
            <span className="loading loading-spinner"></span>
          ) : (
            <Send className="h-6 w-6" />
          )}
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-[80vh] max-h-[800px] flex-col bg-base-200">
      {renderHeader()}
      {renderChatMessages()}
      {renderInputArea()}
    </div>
  );
};

const Chat = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatContent />
    </Suspense>
  );
};

export default Chat;
