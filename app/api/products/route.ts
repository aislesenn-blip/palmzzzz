import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await auth();
    if (!session?.user?.id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    try {
        const userProducts = await db.select()
            .from(products)
            .where(eq(products.userId, session.user.id))
            .orderBy(desc(products.createdAt));

        return NextResponse.json(userProducts);
    } catch (error) {
        console.error("Products API Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
