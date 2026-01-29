import { db } from "@/lib/db";
import { users, products, trafficInjections } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDrawer from "@/components/storefront/ProductDrawer";

export default async function Storefront({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const user = await db.query.users.findFirst({ where: eq(users.handle, handle) });
    if (!user) return notFound();

    const userProducts = await db.select().from(products).where(eq(products.userId, user.id)).orderBy(desc(products.createdAt));

    // Traffic Injection Logic
    let injectedProducts = [];
    const injection = await db.query.trafficInjections.findFirst({ where: eq(trafficInjections.sourceHandle, handle) });
    if (injection) {
        const targetUser = await db.query.users.findFirst({ where: eq(users.handle, injection.targetHandle) });
        if (targetUser) {
            injectedProducts = await db.select().from(products).where(eq(products.userId, targetUser.id)).limit(4);
        }
    } else {
        // Fallback: Random PRO user products (Simplified: just fetch last 4 products from anyone for demo)
        injectedProducts = await db.select().from(products).orderBy(desc(products.views)).limit(4);
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32 font-sans">
            {/* Header */}
            <div className="bg-white pt-12 pb-8 px-4 text-center border-b border-gray-100 sticky top-0 z-10 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden relative border-4 border-white shadow-lg ring-1 ring-black/5">
                    {user.avatarUrl ? <Image src={user.avatarUrl} alt={user.handle} fill className="object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-charcoal to-black text-white flex items-center justify-center text-3xl font-bold">{user.handle[0].toUpperCase()}</div>}
                </div>
                <h1 className="text-2xl font-serif font-bold mb-1 text-charcoal">@{user.handle}</h1>
                <p className="text-gray-500 max-w-sm mx-auto text-sm font-medium">{user.bio || "Welcome to my digital store."}</p>

                {/* Persona Badge */}
                {user.persona && (
                    <span className="inline-block mt-3 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-400">
                        {user.persona}
                    </span>
                )}
            </div>

            {/* Product Grid */}
            <div className="max-w-md mx-auto p-4 space-y-6 mt-4">
                {userProducts.map(p => (
                    <ProductDrawer key={p.id} product={p} whatsappNumber={user.whatsappNumber} />
                ))}
            </div>

            {/* Traffic Loop */}
            {injectedProducts.length > 0 && (
                <div className="mt-20 border-t border-gray-200 pt-8 bg-white pb-12">
                    <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">More from our Network</h3>
                    <div className="flex overflow-x-auto gap-4 px-4 pb-4 snap-x">
                        {injectedProducts.map(p => (
                            <div key={p.id} className="min-w-[160px] w-[160px] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 snap-center">
                                <div className="h-24 bg-gray-200 relative">
                                    <img src={p.imageUrl} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-3">
                                    <p className="font-bold text-sm truncate">{p.title}</p>
                                    <p className="text-xs text-gray-500">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
