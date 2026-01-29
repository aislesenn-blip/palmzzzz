import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { comparePassword, signToken } from '@/lib/auth';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string(),
  password: z.string(),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const result = loginSchema.safeParse(body);
        if (!result.success) {
            return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
        }
        const { username, password } = result.data;

        // Hardcoded Admin
        if (username === 'TWEETSTORECEOANDRANGEROVER' && password === '123456') {
            const token = await signToken({ isAdmin: true, handle: 'CEO', id: 0 });
            const response = NextResponse.json({ success: true, isAdmin: true });
            response.cookies.set('token', token, { httpOnly: true, path: '/' });
            return response;
        }

        // Regular User
        const userRows = await db.select().from(users).where(eq(users.email, username));
        let user = userRows[0];

        if (!user) {
            const userHandleRows = await db.select().from(users).where(eq(users.handle, username));
            user = userHandleRows[0];
        }

        if (!user || !(await comparePassword(password, user.passwordHash))) {
            return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
        }

        const token = await signToken({ id: user.id, email: user.email, handle: user.handle, isAdmin: user.isAdmin });
        const response = NextResponse.json({ success: true, user });
        response.cookies.set('token', token, { httpOnly: true, path: '/' });
        return response;
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
