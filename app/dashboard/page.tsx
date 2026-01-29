import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/Button";
import AddProductModal from "@/components/dashboard/AddProductModal";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const userProducts = await db.select().from(products).where(eq(products.userId, session.user.id)).orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-gray-50">
             <nav className="bg-white border-b border-gray-100 sticky top-0 z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    <span className="text-xl font-bold tracking-tighter">Tweet Store.</span>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-sm bg-gray-100 px-3 py-1 rounded-full">@{ (session.user as any).handle }</span>
                        <form action={async () => { "use server"; await import("@/auth").then(m => m.signOut()); }}><button className="text-sm font-bold text-gray-400 hover:text-red-500">Sign Out</button></form>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-black text-white p-8 rounded-3xl shadow-lg">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Sales</h3>
                        <p className="text-5xl font-extrabold">{userProducts.reduce((acc, p) => acc + p.clicks, 0)}</p>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Views</h3>
                         <p className="text-5xl font-extrabold">{userProducts.reduce((acc, p) => acc + p.views, 0)}</p>
                    </div>
                    <div className="bg-cream p-8 rounded-3xl border border-gray-200 flex flex-col justify-center items-center text-center">
                        <Link href={`/${(session.user as any).handle}`} target="_blank" className="font-bold text-lg underline">View Live Store</Link>
                    </div>
                </div>

                {/* Products */}
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-bold">Your Products</h2>
                    <AddProductModal />
                </div>

                {userProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                         <div className="mx-auto h-32 w-32 bg-gray-100 rounded-full mb-6 flex items-center justify-center text-4xl">🛍️</div>
                         <h3 className="text-2xl font-bold mb-2">Your store is empty.</h3>
                         <p className="text-gray-500 mb-8">Drop your first digital or physical product.</p>
                         <AddProductModal />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userProducts.map(p => (
                            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group">
                                <div className="aspect-[4/5] bg-gray-200 relative">
                                    <img src={p.imageUrl} className="w-full h-full object-cover" />
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg mb-1">{p.title}</h4>
                                    <p className="text-gray-500 text-sm font-medium">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
