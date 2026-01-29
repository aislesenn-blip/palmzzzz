import { db } from "@/lib/db";
import { users, products } from "@/db/schema";
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

    return (
        <div className="min-h-screen bg-[#F3F3F1] pb-32 font-sans">
            <div className="bg-white pt-16 pb-10 px-4 text-center border-b border-gray-100 sticky top-0 z-10 shadow-sm/50 backdrop-blur-md bg-white/90">
                <div className="w-28 h-28 rounded-full bg-gray-200 mx-auto mb-6 overflow-hidden relative border-4 border-white shadow-xl ring-1 ring-black/5">
                    {user.avatarUrl ? <Image src={user.avatarUrl} alt={user.handle} fill className="object-cover" /> : <div className="w-full h-full bg-gradient-to-br from-[#1E2330] to-black text-white flex items-center justify-center text-4xl font-bold">{user.handle[0].toUpperCase()}</div>}
                </div>
                <h1 className="text-3xl font-serif font-black mb-2 text-black">@{user.handle}</h1>
                <p className="text-gray-500 max-w-sm mx-auto text-base font-medium leading-relaxed">{user.bio || "Welcome to my digital store."}</p>
                <div className="flex justify-center gap-4 mt-6 text-gray-400">
                    <div className="bg-gray-100 p-3 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"><Instagram size={20} /></div>
                    <div className="bg-gray-100 p-3 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"><Globe size={20} /></div>
                    <div className="bg-gray-100 p-3 rounded-full hover:bg-black hover:text-white transition-all cursor-pointer"><Mail size={20} /></div>
                </div>
            </div>
            <div className="max-w-md mx-auto p-6 space-y-6 mt-4">
                {userProducts.map(p => (
                    <ProductDrawer key={p.id} product={p} whatsappNumber={user.whatsappNumber} />
                ))}
            </div>
        </div>
    )
}
