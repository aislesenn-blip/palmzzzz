import { db } from "@/lib/db";
import { users, invites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { code, handle, email, password, whatsapp, persona, bio, avatarUrl } = body;

        const { hashPassword } = await import("@/lib/password");
        const hashedPassword = await hashPassword(password);

        await db.insert(users).values({
            id: crypto.randomUUID(),
            handle,
            email,
            password: hashedPassword,
            whatsapp,
            category: persona,
            bio,
            avatar: avatarUrl,
        });

        if (code) {
             await db.update(invites).set({
                status: 'used',
                usedBy: handle
            }).where(eq(invites.code, code));
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Register API Error:", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
