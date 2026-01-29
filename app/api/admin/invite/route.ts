import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { invites } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userPayload = await verifyToken(token || '');

    if (!userPayload?.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const code = `VIP-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    await db.insert(invites).values({ code, isUsed: false });

    return NextResponse.json({ code });
}
