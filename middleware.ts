import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Define paths that require authentication
  // Exclude /admin/login from protection
  const isProtectedRoute =
    (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) &&
    !pathname.startsWith('/admin/login');

  // Check for NextAuth session cookies
  // Supports both secure (production) and non-secure (development) naming
  const hasSession =
    request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token') ||
    request.cookies.has('next-auth.session-token');

  if (isProtectedRoute && !hasSession) {
    // Redirect unauthenticated users to login page
    const url = request.nextUrl.clone();
    url.pathname = '/login';

    if (pathname.startsWith('/admin')) {
        url.pathname = '/admin/login';
    }

    url.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)',
  ],
};
