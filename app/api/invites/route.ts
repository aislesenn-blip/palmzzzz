import { db } from "@/lib/db";
import { invites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');

    if (!code) return NextResponse.json({ valid: false });

    try {
        const invite = await db.select().from(invites).where(eq(invites.code, code)).get();
        if (invite && invite.status === 'active') {
            return NextResponse.json({ valid: true });
        }
        return NextResponse.json({ valid: false });
    } catch (error) {
        return NextResponse.json({ valid: false }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        if (!code) return NextResponse.json({ valid: false });

        const invite = await db.select().from(invites).where(eq(invites.code, code)).get();
        if (invite && invite.status === 'active') {
            return NextResponse.json({ valid: true });
        }
        return NextResponse.json({ valid: false });
    } catch (error) {
         return NextResponse.json({ valid: false }, { status: 500 });
    }
}
