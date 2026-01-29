import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products, users, invites } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import AddProductModal from "@/components/dashboard/AddProductModal";
import ViralInviteModal from "@/components/dashboard/ViralInviteModal";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Plus } from "lucide-react";

export default async function Dashboard() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    const user = await db.query.users.findFirst({ where: eq(users.id, session.user.id) });

    // Redirect to setup if not complete
    if (!user?.avatarUrl || !user?.bio) redirect('/setup');

    const userProducts = await db.select().from(products).where(eq(products.userId, session.user.id)).orderBy(desc(products.createdAt));

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
             <nav className="bg-white border-b border-gray-200 sticky top-0 z-30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
                    <span className="text-xl font-serif font-bold tracking-tight text-charcoal">TweetStore.</span>
                    <div className="flex items-center gap-4">
                        <ViralInviteModal invitesRemaining={user.invitesRemaining} />
                        <span className="font-bold text-sm bg-lime px-3 py-1 rounded-full text-charcoal">@{ user.handle }</span>
                        <form action={async () => { "use server"; await import("@/auth").then(m => m.signOut()); }}><button className="text-sm font-bold text-gray-400 hover:text-maroon">Sign Out</button></form>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-charcoal text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group">
                        <div className="relative z-10">
                            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Sales</h3>
                            <p className="text-5xl font-serif font-bold">{userProducts.reduce((acc, p) => acc + p.clicks, 0)}</p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-40 h-40 bg-lime rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200/60">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Views</h3>
                         <p className="text-5xl font-serif font-bold text-charcoal">{userProducts.reduce((acc, p) => acc + p.views, 0)}</p>
                    </div>
                    <div className="bg-electric p-8 rounded-[2rem] shadow-lg flex flex-col justify-center items-center text-center text-white relative overflow-hidden group">
                        <Link href={`/${user.handle}`} target="_blank" className="font-bold text-lg hover:underline z-10 flex items-center gap-2">
                            View Live Store <span className="text-xl">↗</span>
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-tr from-electric to-blue-500 opacity-100"></div>
                    </div>
                </div>

                {/* Products */}
                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-3xl font-serif font-bold text-charcoal">Your Inventory</h2>
                    <AddProductModal userPlan={user?.planStatus || 'free'} productCount={userProducts.length} />
                </div>

                {userProducts.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-24 text-center border-2 border-dashed border-gray-200">
                         <div className="mx-auto h-32 w-32 bg-gray-50 rounded-full mb-6 flex items-center justify-center text-5xl shadow-inner">📦</div>
                         <h3 className="text-2xl font-bold mb-2 text-charcoal">Your store is empty.</h3>
                         <p className="text-gray-500 mb-8 max-w-sm mx-auto">Upload your first digital or physical product to start selling.</p>
                         <div className="inline-block">
                            <AddProductModal userPlan={user?.planStatus || 'free'} productCount={userProducts.length} />
                         </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userProducts.map(p => (
                            <div key={p.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                                    <img src={p.imageUrl} className="w-full h-full object-cover" />
                                    <div className="absolute top-3 right-3 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md">
                                        {p.views} Views
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-lg mb-1 leading-tight text-charcoal">{p.title}</h4>
                                    <p className="text-electric font-black text-xl">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
