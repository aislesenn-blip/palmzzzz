import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { products, users } from '@/db/schema';
import { eq, count } from 'drizzle-orm';
import { verifyToken } from '@/lib/auth';
import { cookies } from 'next/headers';
import { z } from 'zod';

const productSchema = z.object({
  name: z.string().min(1),
  price: z.string().min(1),
  description: z.string().optional(),
  imageUrl: z.string().url(),
});

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('token')?.value;
        const userPayload = await verifyToken(token || '');

        if (!userPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

        const body = await req.json();
        const { name, price, description, imageUrl } = productSchema.parse(body);

        // Check limit
        const userProducts = await db.select({ count: count() }).from(products).where(eq(products.userId, userPayload.id as number));
        const productCount = userProducts[0].count;

        // Check user plan
        const userRows = await db.select().from(users).where(eq(users.id, userPayload.id as number));
        const userRow = userRows[0];

        if (userRow.plan === 'free' && productCount >= 10) {
            return NextResponse.json({ error: 'Store Full. Upgrade to Pro.' }, { status: 403 });
        }

        const newProduct = await db.insert(products).values({
            userId: userPayload.id as number,
            name,
            price,
            description,
            imageUrl,
        }).returning().get();

        return NextResponse.json({ success: true, product: newProduct });
    } catch (e) {
        console.error(e);
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}

export async function GET(req: Request) {
     const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value;
    const userPayload = await verifyToken(token || '');

    if (!userPayload) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const userProducts = await db.select().from(products).where(eq(products.userId, userPayload.id as number));
    return NextResponse.json({ products: userProducts });
}
