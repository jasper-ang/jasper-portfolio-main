'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type User = {
  user: string; // Username, e.g., "admintest"
  role: string; // Role, e.g., "admin"
};

type AuthContextType = {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>; // Expose setUser to the context
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const response = await fetch('http://localhost:5050/auth/verify', {
          method: 'POST',
          credentials: 'include', // This sends the cookies along with the request
        });

        if (response.ok) {
          const data = await response.json();
          if (data.status) {
            setUser({ user: data.user, role: data.role });
          } else {
            setUser(null); // If the status is not true, treat the user as unauthenticated
          }
        } else {
          setUser(null); // Treat any non-OK response as unauthenticated
        }
      } catch (err) {
        console.error('Error verifying user:', err);
        setUser(null); // On error, treat the user as unauthenticated
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
