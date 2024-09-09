'use client';

import { useState, FormEvent, KeyboardEvent, useRef, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedOption = searchParams.get('option');
  const initialMessageSent = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [responseStream, setResponseStream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventSource, setCurrentEventSource] = useState<EventSource | null>(null);
  const [temperature, setTemperature] = useState(0.7);

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, responseStream]);

  useEffect(() => {
    if (selectedOption && !initialMessageSent.current) {
      const optionText = chatOptions.find(option => option.id === selectedOption)?.text || '';
      if (optionText) {
        handleSubmit(undefined, optionText);
        initialMessageSent.current = true;
      }
    }
  }, [selectedOption]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const scrollToBottom = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 100); // Max height of 100px
      textareaRef.current.style.height = `${newHeight}px`;
    }
  };

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
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      console.log('Response status:', res.status);

      if (res.ok) {
        if (currentEventSource) {
          currentEventSource.close();
        }
        const eventSource = new EventSource('http://127.0.0.1:5000/stream');
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

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleBack = async () => {
    if (currentEventSource) {
      currentEventSource.close();
    }

    try {
      await fetch('http://127.0.0.1:5000/reset', { method: 'POST' });
    } catch (error) {
      console.error('Error resetting chat:', error);
    }

    router.push('/avatar/options');
  };

  const handleClearChat = async () => {
    if (currentEventSource) {
      currentEventSource.close();
    }

    try {
      await fetch('http://127.0.0.1:5000/reset', { method: 'POST' });
      setChatHistory([{ role: 'system', content: 'You are a helpful assistant.' }]);
      setResponseStream('');
      setIsLoading(false);
      setCurrentEventSource(null);
      initialMessageSent.current = false;
    } catch (error) {
      console.error('Error resetting chat:', error);
    }
  };

  return (
    <div className="flex max-h-screen flex-col bg-base-200">
      {/* Header */}
      <div className="flex items-center justify-between bg-base-100 p-4 shadow-md">
        <button onClick={handleBack} className="btn btn-circle btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <div className="flex items-center">
          <Image src="/ava.jpg" alt="Ava" width={40} height={40} className="mr-3 rounded-full" />
          <div>
            <h2 className="font-bold">Ava</h2>
            <p className="text-xs opacity-70">AI Assistant</p>
          </div>
        </div>
      </div>

      {/* Chat container */}
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

      {/* Input area */}
      <div className="bg-base-100 p-4">
        <div className="flex items-center rounded-full bg-base-200">
          <textarea
            ref={textareaRef}
            placeholder="Message..."
            className="textarea textarea-ghost w-full resize-none bg-transparent focus:outline-none"
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
            className="btn btn-circle btn-ghost flex-shrink-0"
          >
            {isLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="h-6 w-6"
              >
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
