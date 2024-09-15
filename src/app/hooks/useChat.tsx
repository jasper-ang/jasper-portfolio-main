/**
 * useChat Custom Hook
 *
 * This hook encapsulates the business logic for the chat interface with Ava, the digital assistant.
 * It manages state, handles user input, communicates with the backend API, and manages the conversation flow.
 *
 * The main HTTP requests are:
 * - POST /chat: to send a message to the assistant.
 * - GET /stream: to receive the assistant's response as a stream.
 * - POST /reset: to reset the chat session.
 *
 * Features:
 * - Manages chat history and current message
 * - Handles message submission and reception
 * - Supports streaming responses from the assistant
 * - Provides chat reset and navigation functionality
 * - Handles initial message based on selected chat option
 *
 * @returns {Object} An object containing the following properties and methods:
 *   @property {string} message - The current message in the input field
 *   @property {function} setMessage - Function to update the current message
 *   @property {ChatMessage[]} chatHistory - Array of chat messages
 *   @property {string} responseStream - Current streaming response from the assistant
 *   @property {boolean} isLoading - Indicates if a message is being processed
 *   @property {function} handleSubmit - Function to submit a new message
 *   @property {function} handleReset - Function to reset the chat
 *   @property {function} handleBack - Function to navigate back to options page
 *
 * @example
 * const {
 *   message,
 *   setMessage,
 *   chatHistory,
 *   responseStream,
 *   isLoading,
 *   handleSubmit,
 *   handleReset,
 *   handleBack
 * } = useChat();
 */

import { useState, useRef, useEffect, useCallback, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

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

const useChat = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [responseStream, setResponseStream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventSource, setCurrentEventSource] = useState<EventSource | null>(null);

  const messageIdCounter = useRef(0);
  const initialMessageSent = useRef(false);

  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedOption = searchParams?.get('option') || null;

  const API_BASE_URL = process.env.NEXT_PUBLIC_FLASK_AVA_BASE_URL;

  const handleSubmit = useCallback(
    async (e?: FormEvent, overrideMessage?: string) => {
      e?.preventDefault();
      const messageToSend = overrideMessage || message;
      if (!messageToSend.trim() || isLoading) return;

      setIsLoading(true);

      const newMessageId = `msg-${messageIdCounter.current++}`;
      const newUserMessage: ChatMessage = {
        id: newMessageId,
        role: 'user',
        content: messageToSend,
      };

      setChatHistory(prev => [...prev, newUserMessage].slice(-100));
      setMessage('');

      const requestBody = { message: messageToSend };

      try {
        const res = await fetch(`${API_BASE_URL}/chat`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(requestBody),
        });

        if (res.ok) {
          currentEventSource?.close();

          const eventSource = new EventSource(`${API_BASE_URL}/stream`);
          setCurrentEventSource(eventSource);
          let fullResponse = '';

          eventSource.onmessage = event => {
            fullResponse += event.data;
            setResponseStream(fullResponse);
          };

          eventSource.onerror = () => {
            eventSource.close();
            const newAssistantMessageId = `msg-${messageIdCounter.current++}`;
            const newAssistantMessage: ChatMessage = {
              id: newAssistantMessageId,
              role: 'assistant',
              content: fullResponse,
            };

            setChatHistory(prev => [...prev, newAssistantMessage].slice(-100));
            setResponseStream('');
            setIsLoading(false);
            setCurrentEventSource(null);
          };
        } else {
          setIsLoading(false);
          alert('Failed to send message. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        setIsLoading(false);
        alert('An error occurred. Please check your connection and try again.');
      }
    },
    [API_BASE_URL, currentEventSource, isLoading, message]
  );

  const handleReset = useCallback(() => {
    currentEventSource?.close();

    fetch(`${API_BASE_URL}/reset`, { method: 'POST' })
      .then(() => {
        setChatHistory([]);
        setResponseStream('');
        setIsLoading(false);
        setCurrentEventSource(null);
      })
      .catch(error => {
        console.error('Error resetting chat:', error);
        alert('An error occurred while resetting the chat. Please try again.');
      });
  }, [API_BASE_URL, currentEventSource]);

  const handleBack = useCallback(() => {
    currentEventSource?.close();

    fetch(`${API_BASE_URL}/reset`, { method: 'POST' })
      .then(() => {
        router.push('/avatar/options');
      })
      .catch(error => {
        console.error('Error resetting chat:', error);
        router.push('/avatar/options');
      });
  }, [API_BASE_URL, currentEventSource, router]);

  useEffect(() => {
    if (selectedOption && !initialMessageSent.current) {
      const optionText = chatOptions.find(option => option.id === selectedOption)?.text || '';
      if (optionText) {
        handleSubmit(undefined, optionText);
        initialMessageSent.current = true;
      }
    }
  }, [selectedOption, handleSubmit]);

  useEffect(() => {
    return () => {
      currentEventSource?.close();
    };
  }, [currentEventSource]);

  return {
    message,
    setMessage,
    chatHistory,
    responseStream,
    isLoading,
    handleSubmit,
    handleReset,
    handleBack,
  };
};

export default useChat;
