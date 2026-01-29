import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { products, users } from "@/db/schema";
import { auth } from "@/auth"; // Your auth helper
import { eq, count } from "drizzle-orm";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, price, image, description } = body;

  // 1. Get User ID
  const user = await db.select().from(users).where(eq(users.email, session.user.email)).get();
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  // 2. Check Paywall (Max 10 products for Free Plan)
  if (user.plan === "free") {
    const productCount = await db.select({ count: count() }).from(products).where(eq(products.userId, user.id));
    if (productCount[0].count >= 10) {
      return NextResponse.json({ error: "Limit reached. Upgrade to Pro." }, { status: 403 });
    }
  }

  // 3. Save Product
  await db.insert(products).values({
    id: uuidv4(),
    userId: user.id,
    title,
    price: parseFloat(price),
    image, // URL from R2
    description,
    createdAt: new Date(),
  });

  return NextResponse.json({ success: true });
}
