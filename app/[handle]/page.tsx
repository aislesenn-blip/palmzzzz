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
        // Fallback: Random user products
        injectedProducts = await db.select().from(products).orderBy(desc(products.views)).limit(4);
    }

    return (
        <div className="min-h-screen bg-[#F3F3F1] pb-32 font-sans">
            {/* Header */}
            <div className="bg-white pt-16 pb-10 px-4 text-center border-b border-gray-100 sticky top-0 z-10 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-6 overflow-hidden relative border-4 border-white shadow-xl ring-1 ring-black/5">
                    {user.avatar ? <Image src={user.avatar} alt={user.handle} fill className="object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-[#1E2330] to-black text-white flex items-center justify-center text-4xl font-bold">{user.handle[0].toUpperCase()}</div>}
                </div>
                <h1 className="text-3xl font-serif font-black mb-2 text-black">@{user.handle}</h1>
                <p className="text-gray-500 max-w-sm mx-auto text-base font-medium leading-relaxed">{user.bio || "Welcome to my digital store."}</p>

                {/* Socials Placeholder */}
                <div className="flex justify-center gap-4 mt-6 text-gray-400">
                    <div className="bg-gray-100 p-3 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"><Instagram size={20} /></div>
                    <div className="bg-gray-100 p-3 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"><Globe size={20} /></div>
                    <div className="bg-gray-100 p-3 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"><Mail size={20} /></div>
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-md mx-auto p-6 space-y-6 mt-4">
                {userProducts.map(p => (
                    <ProductDrawer key={p.id} product={p} whatsappNumber={user.whatsapp || ''} />
                ))}
            </div>

            {/* Traffic Loop */}
            {injectedProducts.length > 0 && (
                <div className="mt-24 border-t border-gray-200 pt-12 bg-white pb-16">
                    <h3 className="text-center text-xs font-bold uppercase tracking-widest text-gray-400 mb-8 px-6">More from our Network</h3>
                    <div className="flex overflow-x-auto gap-6 px-6 pb-4 snap-x no-scrollbar">
                        {injectedProducts.map(p => (
                            <div key={p.id} className="min-w-[200px] w-[200px] bg-white rounded-2xl overflow-hidden border border-gray-100 snap-center shadow-lg hover:shadow-xl transition-shadow cursor-pointer group">
                                <div className="h-40 bg-gray-100 relative overflow-hidden">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="p-5">
                                    <p className="font-bold text-sm truncate mb-1 font-serif text-black">{p.title}</p>
                                    <p className="text-xs text-[#2C50E3] font-bold uppercase tracking-wide">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}
