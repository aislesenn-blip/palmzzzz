import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

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
          // Redirect to onboarding or home for now, or show login modal (handled by frontend usually, but here we redirect)
          return NextResponse.redirect(new URL('/', req.url));
      }

      const payload = await verifyToken(token);
      if (!payload) {
          if (pathname.startsWith('/admin')) {
              return NextResponse.redirect(new URL('/admin/login', req.url));
          }
          return NextResponse.redirect(new URL('/', req.url));
      }

      if (pathname.startsWith('/admin') && !payload.isAdmin) {
          return NextResponse.redirect(new URL('/', req.url));
      }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
