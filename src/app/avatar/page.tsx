/**
 * Avatar - Ava
 *
 * This page displays a message-like chat interface for interacting with a digital assistant.
 * It redirects from avatar/options/page.tsx.
 * The page handles user input, displays chat history, and manages the conversation flow.
 * The component also includes options for resetting the chat and navigating back to the options page.
 * The main HTTP requests are:
 * - POST /chat: to send a message to the assistant.
 * - GET /stream: to receive the assistant's response as a stream.
 * - POST /reset: to reset the chat session.
 */

'use client';

import { KeyboardEvent, useRef, useEffect } from 'react';
import Image from 'next/image';
import { RotateCcw, ChevronLeft, Send } from 'lucide-react';
import useChat from '../hooks/useChat'; // Import the custom hook

const Chat = () => {
  // Use the custom hook to manage chat logic
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

  // Refs for DOM elements
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /**
   * Adjusts the height of the textarea based on its content.
   */
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 100); // Max height of 100px
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  /**
   * Scrolls the chat container to the bottom.
   */
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  /**
   * Effect: Adjust textarea height when message changes.
   */
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  /**
   * Effect: Scroll to bottom when chat history or response stream updates.
   */
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, responseStream]);

  /**
   * Handles the 'Enter' key press in the textarea.
   * @param e The keyboard event.
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Renders the chat header.
   */
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

  /**
   * Renders the chat messages.
   */
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

  /**
   * Renders the input area.
   */
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

  // Main render
  return (
    <div className="flex h-[80vh] max-h-[800px] flex-col bg-base-200">
      {renderHeader()}
      {renderChatMessages()}
      {renderInputArea()}
    </div>
  );
};

export default Chat;
