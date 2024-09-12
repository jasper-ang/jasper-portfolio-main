/**
 * Avatar - Ava
 *
 * This page displays a message liked chat interface for interacting with a digital assistant.
 * It redirects from avatar/option/page.tsx
 * The page handles user input, displays chat history, and manages the conversation flow.
 * The component also includes options for resetting the chat and navigating back to the options page.
 * The main http request: post /chat followed by /stream, and post /reset for resetting
 */

'use client';

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { RotateCcw, ChevronLeft, Send } from 'lucide-react';

// Chat options for initial messages
const chatOptions = [
  {
    id: 'work',
    text: "Hi, I'm hiring for a role and would like to learn more about Jasper's work experience.",
  },
  {
    id: 'friend',
    text: "Hi, I'm Jasper's friend and just wanted to catch up and see how he's doing.",
  },
  {
    id: 'connect',
    text: "Hi, I don't know Jasper personally, but I'm working on something and would love to connect with him.",
  },
];

const Chat = () => {
  // State variables
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [responseStream, setResponseStream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventSource, setCurrentEventSource] = useState<EventSource | null>(null);
  const [temperature, setTemperature] = useState(0.7);

  // Refs
  const initialMessageSent = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedOption = searchParams.get('option');

  /**
   * Effect: Scroll to bottom of chat container when chat history or response stream updates
   */
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, responseStream]);

  /**
   * Effect: Send initial message based on selected option
   */
  useEffect(() => {
    if (selectedOption && !initialMessageSent.current) {
      const optionText = chatOptions.find(option => option.id === selectedOption)?.text || '';
      if (optionText) {
        handleSubmit(undefined, optionText);
        initialMessageSent.current = true;
      }
    }
  }, [selectedOption]);

  /**
   * Effect: Adjust textarea height based on content
   */
  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  // Business logic functions

  /**
   * Scrolls the chat container to the bottom
   */
  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  /**
   * Adjusts the height of the textarea based on its content
   */
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 100); // Max height of 100px
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

  /**
   * Handles the submission of a new message
   * @param {FormEvent} e - The form event (optional)
   * @param {string} overrideMessage - An optional message to override user input
   */
  const handleSubmit = async (e?: FormEvent, overrideMessage?: string) => {
    e?.preventDefault();
    const messageToSend = overrideMessage || message;
    if (!messageToSend.trim() || isLoading) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: messageToSend }]);
    setMessage('');

    const requestBody = { message: messageToSend, temperature };
    console.log('Sending request to backend:', requestBody);

    try {
      const res = await fetch('https://flask-avatar.onrender.com/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', res.status);

      if (res.ok) {
        if (currentEventSource) {
          currentEventSource.close();
        }
        const eventSource = new EventSource('https://flask-avatar.onrender.com/stream');
        setCurrentEventSource(eventSource);
        let fullResponse = '';

        eventSource.onmessage = event => {
          fullResponse += event.data;
          setResponseStream(fullResponse);
        };

        eventSource.onerror = () => {
          eventSource.close();
          setChatHistory(prev => [...prev, { role: 'assistant', content: fullResponse }]);
          setResponseStream('');
          setIsLoading(false);
          setCurrentEventSource(null);
        };
      } else {
        console.error('Error from /chat:', res.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  /**
   * Handles the 'Enter' key press in the textarea
   * @param {KeyboardEvent<HTMLTextAreaElement>} e - The keyboard event
   */
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  /**
   * Handles navigation back to the options page
   */
  const handleBack = async () => {
    if (currentEventSource) {
      currentEventSource.close();
    }

    try {
      await fetch('https://flask-avatar.onrender.com/reset', { method: 'POST' });
    } catch (error) {
      console.error('Error resetting chat:', error);
    }

    router.push('/avatar/options');
  };

  /**
   * Resets the chat history and state
   */
  const handleReset = async () => {
    if (currentEventSource) {
      currentEventSource.close();
    }

    try {
      await fetch('https://flask-avatar.onrender.com/reset', { method: 'POST' });
      setChatHistory([{ role: 'system', content: 'You are a helpful assistant.' }]);
      setResponseStream('');
      setIsLoading(false);
      setCurrentEventSource(null);
      initialMessageSent.current = false;
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  // Render functions

  /**
   * Renders the chat header
   */
  const renderHeader = () => (
    <div className="flex items-center justify-between bg-base-100 p-4 shadow-md">
      <div className="flex items-center">
        <button onClick={handleBack} className="btn btn-circle btn-ghost mr-3">
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
      <button onClick={handleReset} className="btn btn-circle btn-ghost">
        <RotateCcw className="h-6 w-6 text-base-content" />
      </button>
    </div>
  );

  /**
   * Renders the chat messages
   */
  const renderChatMessages = () => (
    <div className="flex-grow overflow-y-auto p-4" ref={chatContainerRef}>
      {chatHistory.slice(1).map((msg, index) => (
        <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
          <div
            className={`chat-bubble ${msg.role === 'user' ? 'bg-primary text-primary-content' : 'bg-base-300'}`}
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
   * Renders the input area
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
