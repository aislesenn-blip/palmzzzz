import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { trafficInjections } from '@/db/schema';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userPayload = await verifyToken(token || '');

    if (!userPayload?.isAdmin) return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });

    const { source, target } = await req.json();
    await db.insert(trafficInjections).values({ sourceHandle: source, targetHandle: target });

    return NextResponse.json({ success: true });
}
