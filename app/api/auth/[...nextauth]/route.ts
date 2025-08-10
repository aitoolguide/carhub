// src/app/api/auth/[...nextauth]/route.ts
// This is the standard API handler for NextAuth.js.

import { authOptions } from '@app/lib/auth';
import NextAuth from 'next-auth';


const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
