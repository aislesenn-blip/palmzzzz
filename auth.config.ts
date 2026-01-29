import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  providers: [],
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isOnAdmin = nextUrl.pathname.startsWith('/admin') && nextUrl.pathname !== '/admin/login';

      if (isOnAdmin) {
        if (isLoggedIn && (auth.user as any).handle === 'CEO') return true;
        return false;
      }

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      }
      return true;
    },
    jwt({ token, user }) {
        if (user) {
            token.id = user.id;
            token.handle = (user as any).handle;
            token.plan = (user as any).planStatus;
        }
        return token;
    },
    session({ session, token }) {
        if (session.user) {
            session.user.id = token.id as string;
            (session.user as any).handle = token.handle as string;
            (session.user as any).plan = token.plan as string;
        }
        return session;
    }
  },
} satisfies NextAuthConfig;
