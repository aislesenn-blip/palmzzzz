import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  const { pathname } = req.nextUrl;

  // Admin Login is public
  if (pathname === '/admin/login') {
      return NextResponse.next();
  }

  if (pathname.startsWith('/dashboard') || pathname.startsWith('/admin')) {
      if (!token) {
          if (pathname.startsWith('/admin')) {
              return NextResponse.redirect(new URL('/admin/login', req.url));
          }
          // Redirect to onboarding or home for now, or show login modal
          return NextResponse.redirect(new URL('/', req.url));
      }

      // We only check for the presence of the cookie here to avoid Edge Runtime issues with heavy auth libraries.
      // Detailed verification happens in the API routes or server components.
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
