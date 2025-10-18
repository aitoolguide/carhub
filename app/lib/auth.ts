// src/lib/auth.ts
import { NextAuthOptions } from 'next-auth';
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../database/models/User';
import bcrypt from 'bcryptjs';
import { dbConnect } from './mongodb';

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'admin@example.com' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req): Promise<any | null> {
        if (!credentials) return null;

        try {
          await dbConnect();
          console.log('🔐 Authorizing user with email:', credentials.email);
          
          const user = await User.findOne({ email: credentials.email });
          console.log('👤 User found:', !!user);

          if (!user) {
            console.log('❌ No user found');
            return null;
          }

          const passwordMatch = await bcrypt.compare(credentials.password, user.password!);
          console.log('🔑 Password match:', passwordMatch);

          if (!passwordMatch) {
            console.log('❌ Password mismatch');
            return null;
          }

          // ✅ Return actual user data from database
          return {
            id: user._id?.toString(),
            email: user.email,
            name: user.name,
            role: user.role, // ✅ Use actual role from database
            roleId: user.roleId, // ✅ Add roleId if it exists
            profile: user.profile, // ✅ Add profile if it exists
          };
        } catch (error) {
          console.error('💥 Auth error:', error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      console.log('🎫 JWT Callback - Token:', token);
      console.log('👤 JWT Callback - User:', user);
      console.log('🔗 JWT Callback - Account:', account);

      // ✅ Handle both Google and Credentials login
      if (user) {
        // For credentials login, user object already has role
        token.role = user.role;
        token.roleId = user.roleId;
        token.profile = user.profile;
      }
      
      // ✅ For Google login, always fetch user from database
      if (account?.provider === 'google' || (!token.role && token.email)) {
        try {
          await dbConnect();
          console.log('🔍 Fetching user from DB for email:', token.email);
          
          const dbUser = await User.findOne({ email: token.email });
          console.log('📦 DB User found:', !!dbUser, dbUser?.role);
          console.log('DB User details:', dbUser);
          if (dbUser) {
            token.role = dbUser.role;
            token.roleId = dbUser.roleId;
            token.profile = dbUser.profile;
            console.log('✅ Added role to token:', token.role);
            token.id =dbUser.id ;
          } else {
            console.log('⚠️ No user found in DB, setting default role');
            
            // ✅ Quick fix: Set role based on email (for testing)
            if (token.email === 'aitoolguide10@gmail.com') {
              token.role = 'admin';
              console.log('🔥 Force admin role for test email');
            } else {
              token.role = 'user'; // default role for new Google users
            }
            
            // TODO: Optionally create the user in database
            const newUser = new User({
              email: token.email,
              name: token.name,
              role: "user",
              password:'111111111', // Dummy password, should be changed
              provider: 'google'
            });
            await newUser.save();
             token.id =newUser.id ;
            console.log('🆕 Created new user in DB for Google login',newUser);
          }
        } catch (error) {
          console.error('💥 Error fetching user for Google login:', error);
          token.role = 'user'; // fallback
        }
      }
      
      console.log('🎫 Final token with role:', { email: token.email, role: token.role });
      return token;
    },
    async session({ session, token }) {
      // ✅ Add all custom properties to session
      if (session.user) {
        session.user.id = token.id!;
        session.user.role = token.role || 'user';
        session.user.roleId = token.roleId;
        session.user.profile = token.profile;
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/signin', // ✅ Only if you have a properly implemented custom sign-in page
    // signIn: undefined, // ✅ Uncomment this line to use NextAuth default sign-in page
  },
};