import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';

interface SessionContextProps {
  sessionId: string;
  isLoading: boolean;
  error: string | null;
  startNewSession: () => Promise<void>;
}

const SessionContext = createContext<SessionContextProps | undefined>(undefined);

interface SessionProviderProps {
  children: ReactNode;
}

const API_BASE_URL = 'http://127.0.0.1:5000';

export const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionId, setSessionId] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const createSession = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/newsession`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.session_id) {
        setSessionId(data.session_id);
        localStorage.setItem('session_id', data.session_id);
      } else {
        throw new Error('Failed to create session');
      }
    } catch (error) {
      console.error('Error creating session:', error);
      setError('Failed to create session. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const startNewSession = async () => {
    localStorage.removeItem('session_id');
    setSessionId('');
    await createSession();
  };

  useEffect(() => {
    const initializeSession = async () => {
      const storedSessionId = localStorage.getItem('session_id');
      if (storedSessionId) {
        setSessionId(storedSessionId);
        setIsLoading(false);
      } else {
        await createSession();
      }
    };

    initializeSession();
  }, []);

  const contextValue: SessionContextProps = {
    sessionId,
    isLoading,
    error,
    startNewSession,
  };

  return <SessionContext.Provider value={contextValue}>{children}</SessionContext.Provider>;
};

export const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};
