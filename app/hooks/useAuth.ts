// src/hooks/useAuth.ts
import { useSession } from 'next-auth/react';
import { CustomSession } from '../types/auth';

/**
 * A custom hook to access the NextAuth session and authentication status.
 * @returns An object containing the session, status, and admin status.
 */
export const useAuth = () => {
  const { data: session, status } = useSession() as { data: CustomSession | null; status: 'loading' | 'authenticated' | 'unauthenticated' };
  
  const isAuthenticated = status === 'authenticated';
  const isAdmin = isAuthenticated && session?.user?.role === 'admin';

  return {
    session,
    status,
    isAuthenticated,
    isAdmin,
  };
};
