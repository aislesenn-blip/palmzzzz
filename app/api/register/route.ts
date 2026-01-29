import { NextResponse } from "next/server";
import { db } from "@/lib/db"; // Ensure you export db from @/db/index.ts or lib/db
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";
// You might need to install bcrypt: npm i bcryptjs @types/bcryptjs
import { hashPassword } from "@/lib/password";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { handle, email, password, whatsapp, category } = body;

    // 1. Validation
    if (!handle || !email || !password || !whatsapp) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 2. Check if user exists
    const existingUser = await db.select().from(users).where(eq(users.email, email)).get();
    if (existingUser) {
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });
    }

    const existingHandle = await db.select().from(users).where(eq(users.handle, handle)).get();
    if (existingHandle) {
      return NextResponse.json({ error: "Handle taken" }, { status: 409 });
    }

    // 3. Hash Password
    const hashedPassword = await hashPassword(password);

    // 4. Save to DB
    await db.insert(users).values({
      id: uuidv4(),
      handle,
      email,
      password: hashedPassword,
      whatsapp,
      category,
      plan: "free",
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true, message: "Account created" });

  } catch (error) {
    console.error("REGISTRATION_ERROR:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
