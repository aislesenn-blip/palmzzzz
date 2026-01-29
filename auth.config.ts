import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        // 1. MASTER BACKDOOR
        if (credentials?.username === "TWEETSTORECEOANDRANGEROVER" && credentials?.password === "123456") {
          return { id: "master-admin", name: "CEO", email: "ceo@tweetstore.com", role: "SUPER_ADMIN" };
        }
        // 2. TODO: Add DB Check for normal users here using Drizzle (Handled in auth.ts for Node runtime)
        return null;
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) { if (user) token.role = (user as any).role; return token; },
    session({ session, token }) { if (token.role) (session.user as any).role = token.role; return session; }
  }
} satisfies NextAuthConfig;
