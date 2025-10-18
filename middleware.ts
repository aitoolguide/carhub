// middleware.ts
import { NextResponse } from "next/server";
import { withAuth, NextRequestWithAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req: NextRequestWithAuth) {
    const token = req.nextauth.token;
    const path = req.nextUrl.pathname;
    
    console.log('🛡️ Middleware - Path:', path);
    console.log('🛡️ Middleware - Full Token:', JSON.stringify(token, null, 2));
    console.log('🛡️ Middleware - Role:', token?.role);
    
    // ✅ If no role is set, treat as regular user
    const userRole = token?.role || 'user';
    
    // ✅ Admin has access to all paths
    if (userRole === 'admin') {
      console.log('✅ Admin access granted');
      return NextResponse.next();
    }
    
    // ✅ Block non-admin users from admin paths
    if (path.startsWith('/admin') && userRole !== 'admin') {
      console.log('❌ Access denied to admin area, redirecting...');
      return NextResponse.redirect(new URL('/dashboard', req.url));
    }
    
    // ✅ Allow access to dashboard for authenticated users
    if (path.startsWith('/dashboard')) {
      console.log('✅ Dashboard access granted');
      return NextResponse.next();
    }
    
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        // ✅ Must have a token to access protected routes
        return !!token;
      },
    },
  }
)

export const config = { 
  matcher: [
    "/admin/:path*", 
    "/dashboard/:path*",
    // ✅ DON'T protect /auth routes - this can cause loops
    // "/((?!auth|api|_next/static|_next/image|favicon.ico).*)",
  ] 
}