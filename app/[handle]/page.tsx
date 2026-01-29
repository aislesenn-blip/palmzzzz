import { db } from "@/lib/db";
import { users, products, trafficInjections } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";
import ProductDrawer from "@/components/storefront/ProductDrawer";
import { Instagram, Globe, Mail } from "lucide-react";

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
        // Fallback: Random PRO user products (Simplified for demo)
        injectedProducts = await db.select().from(products).orderBy(desc(products.views)).limit(4);
    }

    return (
        <div className="min-h-screen bg-gray-50 pb-32 font-sans">
            {/* Header */}
            <div className="bg-white pt-16 pb-10 px-4 text-center border-b border-gray-100 sticky top-0 z-10 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-6 overflow-hidden relative border-4 border-white shadow-xl ring-1 ring-black/5">
                    {user.avatarUrl ? <Image src={user.avatarUrl} alt={user.handle} fill className="object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-charcoal to-black text-white flex items-center justify-center text-4xl font-bold">{user.handle[0].toUpperCase()}</div>}
                </div>
                <h1 className="text-3xl font-serif font-bold mb-2 text-charcoal">@{user.handle}</h1>
                <p className="text-gray-500 max-w-sm mx-auto text-base font-medium leading-relaxed">{user.bio || "Welcome to my digital store."}</p>

                {/* Socials Placeholder */}
                <div className="flex justify-center gap-4 mt-6 text-gray-400">
                    <div className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 hover:text-black transition-colors cursor-pointer"><Instagram size={20} /></div>
                    <div className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 hover:text-black transition-colors cursor-pointer"><Globe size={20} /></div>
                    <div className="bg-gray-100 p-2 rounded-full hover:bg-gray-200 hover:text-black transition-colors cursor-pointer"><Mail size={20} /></div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-md mx-auto p-6 space-y-6 mt-2">
                {userProducts.map(p => (
                    <ProductDrawer key={p.id} product={p} whatsappNumber={user.whatsappNumber} />
                ))}
            </div>

            {/* Traffic Loop */}
            {injectedProducts.length > 0 && (
                <div className="mt-24 border-t border-gray-200 pt-12 bg-white pb-16">
                    <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8">More from our Network</h3>
                    <div className="flex overflow-x-auto gap-6 px-6 pb-4 snap-x no-scrollbar">
                        {injectedProducts.map(p => (
                            <div key={p.id} className="min-w-[180px] w-[180px] bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 snap-center shadow-sm hover:shadow-md transition-shadow">
                                <div className="h-32 bg-gray-200 relative">
                                    <img src={p.imageUrl} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-4">
                                    <p className="font-bold text-sm truncate mb-1">{p.title}</p>
                                    <p className="text-xs text-gray-500 font-medium">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
