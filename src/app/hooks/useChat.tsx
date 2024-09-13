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
 */

import { useState, useRef, useEffect, FormEvent } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

// Type definitions for chat messages
type ChatRole = 'user' | 'assistant';

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

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

const useChat = () => {
  // State variables
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [responseStream, setResponseStream] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentEventSource, setCurrentEventSource] = useState<EventSource | null>(null);

  // Refs
  const messageIdCounter = useRef(0); // Unique ID counter for messages
  const initialMessageSent = useRef(false); // Tracks if the initial message has been sent

  // Hooks
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedOption = searchParams.get('option');

  // API base URL from environment variables
  const API_BASE_URL = process.env.NEXT_PUBLIC_FLASK_AVA_BASE_URL;

  /**
   * Handles the submission of a new message.
   * @param e Optional form event.
   * @param overrideMessage Optional message to override the current input.
   */
  const handleSubmit = async (e?: FormEvent, overrideMessage?: string) => {
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

    // Update chat history with the new user message
    setChatHistory(prev => [...prev, newUserMessage].slice(-100));
    setMessage('');

    const requestBody = { message: messageToSend };

    try {
      // Send the message to the backend API
      const res = await fetch(`${API_BASE_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (res.ok) {
        // Close any existing EventSource connection
        currentEventSource?.close();

        // Open a new EventSource to receive the assistant's response
        const eventSource = new EventSource(`${API_BASE_URL}/stream`);
        setCurrentEventSource(eventSource);
        let fullResponse = '';

        eventSource.onmessage = event => {
          fullResponse += event.data;
          setResponseStream(fullResponse); // Update the response stream
        };

        eventSource.onerror = () => {
          // Handle completion or error
          eventSource.close();
          const newAssistantMessageId = `msg-${messageIdCounter.current++}`;
          const newAssistantMessage: ChatMessage = {
            id: newAssistantMessageId,
            role: 'assistant',
            content: fullResponse,
          };

          // Update chat history with the assistant's response
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
  };

  /**
   * Handles resetting the chat session.
   */
  const handleReset = () => {
    currentEventSource?.close();

    fetch(`${API_BASE_URL}/reset`, { method: 'POST' })
      .then(() => {
        // Reset state variables
        setChatHistory([]);
        setResponseStream('');
        setIsLoading(false);
        setCurrentEventSource(null);
      })
      .catch(error => {
        console.error('Error resetting chat:', error);
        alert('An error occurred while resetting the chat. Please try again.');
      });
  };

  /**
   * Handles navigation back to the options page.
   */
  const handleBack = () => {
    currentEventSource?.close();

    fetch(`${API_BASE_URL}/reset`, { method: 'POST' })
      .then(() => {
        router.push('/avatar/options');
      })
      .catch(error => {
        console.error('Error resetting chat:', error);
        router.push('/avatar/options');
      });
  };

  /**
   * Sends the initial message based on the selected option.
   */
  useEffect(() => {
    if (selectedOption && !initialMessageSent.current) {
      const optionText = chatOptions.find(option => option.id === selectedOption)?.text || '';
      if (optionText) {
        handleSubmit(undefined, optionText);
        initialMessageSent.current = true;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOption]);

  /**
   * Cleans up the EventSource when the component unmounts.
   */
  useEffect(() => {
    return () => {
      currentEventSource?.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Return state variables and handlers for use in the component
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
