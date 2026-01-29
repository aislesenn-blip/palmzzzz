import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users, invites } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { hashPassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  handle: z.string().min(3),
  whatsappNumber: z.string().min(10),
  inviteCode: z.string().min(1),
  template: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const result = registerSchema.safeParse(body);

    if (!result.success) {
        return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
    }

    const { email, password, handle, whatsappNumber, inviteCode, template } = result.data;

    // Check invite code
    const inviteRows = await db.select().from(invites).where(eq(invites.code, inviteCode));
    const inviteRow = inviteRows[0];

    if (!inviteRow || inviteRow.isUsed) {
       return NextResponse.json({ error: 'Access Denied. Tweet Store is currently Invite-Only.' }, { status: 403 });
    }

    // Check existing user
    const existingUser = (await db.select().from(users).where(eq(users.email, email)))[0];
    if (existingUser) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    // Check existing handle
    const existingHandle = (await db.select().from(users).where(eq(users.handle, handle)))[0];
    if (existingHandle) {
        return NextResponse.json({ error: 'Handle already taken' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = await db.insert(users).values({
        email,
        passwordHash: hashedPassword,
        handle,
        whatsappNumber,
        template: template || 'Muse',
    }).returning().get();

    // Mark invite as used
    await db.update(invites).set({ isUsed: true, usedBy: newUser.id }).where(eq(invites.id, inviteRow.id));

    const token = await signToken({ id: newUser.id, email: newUser.email, handle: newUser.handle, isAdmin: false });

    const response = NextResponse.json({ success: true, user: newUser });
    response.cookies.set('token', token, { httpOnly: true, path: '/' });

    return response;

  } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
