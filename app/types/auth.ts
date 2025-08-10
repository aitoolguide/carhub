// src/types/auth.ts

import { Session, User } from 'next-auth';

// Extend the NextAuth User type to include the role
export interface SessionUser extends User {
  role?: 'user' | 'admin';
}

// Extend the NextAuth Session type to include the custom user
export interface CustomSession extends Omit<Session, 'user'> {
  user?: SessionUser;
}
