import { db } from '@/lib/db';
import { users, products } from '@/db/schema';
import { eq, desc } from 'drizzle-orm';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import ProductFeed from '@/components/storefront/ProductFeed';

export const dynamic = 'force-dynamic';

export default async function Storefront({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;

    if (handle === 'favicon.ico') return notFound();

    const userRows = await db.select().from(users).where(eq(users.handle, handle));
    const user = userRows[0];

    if (!user) return notFound();

    const userProducts = await db.select().from(products).where(eq(products.userId, String(user.id))).orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Header */}
            <div className="bg-white p-8 text-center border-b border-gray-100 sticky top-0 z-10">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden relative">
                    {user.avatarUrl ? (
                         <Image src={user.avatarUrl} alt={user.handle} fill className="object-cover" />
                    ) : (
                        <div className="flex items-center justify-center h-full text-2xl font-bold bg-gradient-to-br from-gray-800 to-black text-white">
                            {user.handle[0].toUpperCase()}
                        </div>
                    )}
                </div>
                <h1 className="text-2xl font-bold">@{user.handle}</h1>
                <p className="text-gray-500 max-w-sm mx-auto mt-2">Check out my latest drops. DM me to buy.</p>
            </div>

            {/* Product Feed Client Component */}
            <ProductFeed products={userProducts} whatsappNumber={user.whatsappNumber} template={user.template} />

            {/* Footer / Traffic Loop */}
             <div className="mt-20 py-10 bg-white border-t border-gray-100 overflow-x-auto">
                <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">More from our Network</h3>
                <div className="flex gap-4 px-4 w-max mx-auto">
                    {[1,2,3].map(i => (
                         <div key={i} className="w-40 h-56 bg-gray-100 rounded-lg shrink-0"></div>
                    ))}
                </div>
                <div className="text-center mt-8">
                     <Link href="/" className="font-bold text-sm">Create your own store</Link>
                </div>
            </div>
        </div>
    );
}
