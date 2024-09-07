'use client';

import { useState, FormEvent, useEffect, KeyboardEvent } from 'react';

const Chat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([
    { role: 'system', content: 'You are a helpful assistant.' },
  ]);
  const [responseStream, setResponseStream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventSource, setCurrentEventSource] = useState<EventSource | null>(null);

  useEffect(() => {
    const chatContainer = document.querySelector('.chat-container');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [chatHistory, responseStream]);

  const handleSubmit = async (e?: FormEvent) => {
    e?.preventDefault();
    if (!message.trim() || isLoading) return;

    setIsLoading(true);
    setChatHistory(prev => [...prev, { role: 'user', content: message }]);
    const sentMessage = message;
    setMessage('');

    try {
      const res = await fetch('http://127.0.0.1:5000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: sentMessage }),
      });

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

  const handleClear = async () => {
    setChatHistory([{ role: 'system', content: 'You are a helpful assistant.' }]);
    setResponseStream('');

    if (currentEventSource) {
      currentEventSource.close();
      setCurrentEventSource(null);
    }

    try {
      const res = await fetch('http://127.0.0.1:5000/reset', { method: 'POST' });
      if (!res.ok) {
        console.error('Error clearing chat on server:', res.statusText);
      }
    } catch (error) {
      console.error('Error clearing chat:', error);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center bg-base-200">
      <div className="w-full max-w-xl p-4">
        <div className="mb-4 flex items-center">
          <div className="text-xl font-bold">OpenAI Chat Demo</div>
        </div>

        <div className="chat-container h-96 overflow-y-auto rounded-lg bg-base-100 p-4 shadow-md">
          {chatHistory.map((msg, index) => (
            <div key={index} className={`chat ${msg.role === 'user' ? 'chat-end' : 'chat-start'}`}>
              <div
                className={`chat-bubble ${msg.role === 'user' ? 'chat-bubble-primary' : 'chat-bubble-secondary'}`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {responseStream && (
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-secondary">{responseStream}</div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="mt-4">
          <textarea
            className="textarea textarea-bordered mb-2 w-full"
            placeholder="Type your message here... (Press Enter to send)"
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            required
          ></textarea>
          <div className="flex justify-between">
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Sending...' : 'Send'}
            </button>
            <button type="button" onClick={handleClear} className="btn btn-secondary">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
