import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import { Button } from "@/components/ui/Button";
import AddProductModal from "@/components/dashboard/AddProductModal";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const userProducts = await db.select().from(products).where(eq(products.userId, session.user.id)).orderBy(desc(products.createdAt));
    const user = await db.query.users.findFirst({ where: eq(users.id, session.user.id) });

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
             <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    <span className="text-xl font-serif font-bold tracking-tight">TweetStore.</span>
                    <div className="flex items-center gap-4">
                        <span className="font-bold text-sm bg-lime px-3 py-1 rounded-full text-charcoal">@{ (session.user as any).handle }</span>
                        <form action={async () => { "use server"; await import("@/auth").then(m => m.signOut()); }}><button className="text-sm font-bold text-gray-400 hover:text-maroon">Sign Out</button></form>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-charcoal text-white p-8 rounded-3xl shadow-lg relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Sales</h3>
                            <p className="text-5xl font-serif font-bold">{userProducts.reduce((acc, p) => acc + p.clicks, 0)}</p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-32 h-32 bg-lime rounded-full blur-3xl opacity-20"></div>
                    </div>
                    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Views</h3>
                         <p className="text-5xl font-serif font-bold text-charcoal">{userProducts.reduce((acc, p) => acc + p.views, 0)}</p>
                    </div>
                    <div className="bg-electric p-8 rounded-3xl shadow-lg flex flex-col justify-center items-center text-center text-white">
                        <Link href={`/${(session.user as any).handle}`} target="_blank" className="font-bold text-lg hover:underline">View Live Store ↗</Link>
                    </div>
                </div>

                {/* Products */}
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-serif font-bold">Your Inventory</h2>
                    <AddProductModal userPlan={user?.planStatus || 'free'} productCount={userProducts.length} />
                </div>

                {userProducts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-20 text-center border-2 border-dashed border-gray-200">
                         <div className="mx-auto h-32 w-32 bg-gray-100 rounded-full mb-6 flex items-center justify-center text-4xl">🚀</div>
                         <h3 className="text-2xl font-bold mb-2">Your store is empty.</h3>
                         <p className="text-gray-500 mb-8">Let's drop your first product.</p>
                         <AddProductModal userPlan={user?.planStatus || 'free'} productCount={userProducts.length} />
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userProducts.map(p => (
                            <div key={p.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-md transition-all">
                                <div className="aspect-[4/5] bg-gray-200 relative">
                                    <img src={p.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs backdrop-blur-sm">
                                        {p.views} Views
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg mb-1 leading-tight">{p.title}</h4>
                                    <p className="text-electric font-bold">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
