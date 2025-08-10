import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be used to authenticate requests.
// For a real application, you would check for a valid session token.
const isAuthenticated = (request: NextRequest): boolean => {
  // Mock authentication check.
  // In a real app, you'd check a token or cookie.
  // For example:
  // const token = request.cookies.get('auth-token');
  // return token?.value === 'valid-token';
  return true; // Always return true for this example
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect all routes under /admin
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated(request)) {
      // Redirect to the login page if not authenticated
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

// See "Matching Paths" for more information:
// https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths
export const config = {
  matcher: ['/admin/:path*'],
};
