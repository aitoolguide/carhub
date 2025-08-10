// src/contexts/AuthContext.tsx
'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useSession } from 'next-auth/react';
import { CustomSession, SessionUser } from '../types/auth';

interface AuthContextType {
  session: CustomSession | null;
  status: 'loading' | 'authenticated' | 'unauthenticated';
  isAuthenticated: boolean;
  isAdmin: boolean;
  user: SessionUser | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: 'loading' | 'authenticated' | 'unauthenticated' };

  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.role === 'admin';
  const user = session?.user || null;

  const value = {
    session,
    status,
    isAuthenticated,
    isAdmin,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuthContext must be used within an AuthProvider');
  }
  return context;
};
