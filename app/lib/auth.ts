// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../database/models/User';
import dbConnect from '../lib/mongodb';
import bcrypt from 'bcryptjs';

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g., "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, like email and password
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any | null> {
  if (!credentials) return null;

  await dbConnect();

  const user = await User.findOne({ email: credentials.email });

  if (!user || !(await bcrypt.compare(credentials.password, user.password!))) {
    return null;
  }

  return {
    id: user._id?.toString(), // ✅ Always a string now
    email: user.email,
    name: user.name,
    role: user.role,
  };
},
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Add the user's role to the token
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Add the user's role to the session object
      if (token) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin',
  },
};

