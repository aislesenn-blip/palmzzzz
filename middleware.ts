import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check for NextAuth session cookies
  // Supports both secure (production) and non-secure (development) naming
  const hasSession =
    request.cookies.has('authjs.session-token') ||
    request.cookies.has('__Secure-authjs.session-token') ||
    request.cookies.has('next-auth.session-token');

  // 1. Absolute Redirect: Logged In + Visiting /login -> Force /dashboard
  if (hasSession && pathname === '/login') {
      const url = request.nextUrl.clone();
      url.pathname = '/dashboard';
      return NextResponse.redirect(url);
  }

  // Define paths that require authentication
  // Exclude /admin/login from protection
  const isProtectedRoute =
    (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) &&
    !pathname.startsWith('/admin/login');

  // 2. Absolute Redirect: Logged Out + Visiting Protected Route -> Force /login
  if (isProtectedRoute && !hasSession) {
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
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public|.*\\..*).*)'],
};
