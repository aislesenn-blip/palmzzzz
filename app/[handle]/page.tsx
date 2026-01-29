import { db } from "@/lib/db";
import { users, products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { notFound } from "next/navigation";
import Image from "next/image";

export default async function Storefront({ params }: { params: Promise<{ handle: string }> }) {
    const { handle } = await params;
    const user = await db.query.users.findFirst({ where: eq(users.handle, handle) });
    if (!user) return notFound();

    const userProducts = await db.select().from(products).where(eq(products.userId, user.id)).orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            {/* Profile Header */}
            <div className="bg-white pt-12 pb-8 px-4 text-center border-b border-gray-100 sticky top-0 z-10">
                <div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden relative border-4 border-white shadow-sm">
                    {user.avatarUrl ? <Image src={user.avatarUrl} alt={user.handle} fill className="object-cover" /> : <div className="w-full h-full bg-black text-white flex items-center justify-center text-3xl font-bold">{user.handle[0].toUpperCase()}</div>}
                </div>
                <h1 className="text-2xl font-bold mb-1">@{user.handle}</h1>
                <p className="text-gray-500 max-w-sm mx-auto text-sm">{user.bio || "Welcome to my store."}</p>
                <div className="mt-6 flex justify-center gap-4">
                    {/* Social Icons would go here */}
                </div>
            </div>

            {/* Product Grid */}
            <div className="max-w-md mx-auto p-4 space-y-6">
                {userProducts.map(p => (
                    <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                        <div className="aspect-[4/5] relative">
                             <Image src={p.imageUrl} alt={p.title} fill className="object-cover" />
                        </div>
                        <div className="p-6 flex justify-between items-center">
                            <div>
                                <h3 className="font-bold text-lg leading-tight mb-1">{p.title}</h3>
                                <div className="flex items-center gap-2">
                                    <span className="text-yellow-400 text-sm">★ 4.9</span>
                                    <span className="text-gray-300 text-xs">•</span>
                                    <span className="text-gray-900 font-bold">${p.price}</span>
                                </div>
                            </div>
                            <a
                                href={`https://wa.me/${user.whatsappNumber}?text=Hi, I want to buy ${p.title}`}
                                target="_blank"
                                className="bg-black text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-gray-800 transition-colors"
                            >
                                BUY
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
