import { auth } from "@/auth";
import { db } from "@/lib/db";
import { products, users } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import AddProductModal from "@/components/dashboard/AddProductModal";
import ViralInviteModal from "@/components/dashboard/ViralInviteModal";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Dashboard() {
    const session = await auth();
    if (!session?.user?.id) redirect('/login');

    let user = null;
    try {
        user = await db.select().from(users).where(eq(users.id, session.user.id)).get();
    } catch (e) {
        console.error("User fetch error:", e);
    }

    if (!user && session?.user) {
        // Fallback for CEO or if DB fails
        user = {
            handle: session.user.name || "User",
            plan: 'free',
            id: session.user.id
        };
    }

    // Safety check
    if (!user) redirect('/login');

    let userProducts = [];
    try {
        userProducts = await db.select().from(products).where(eq(products.userId, session.user.id)).orderBy(desc(products.createdAt));
    } catch (error) {
        console.error("Dashboard Data Error:", error);
        // Fallback to empty state
    }

    return (
        <div className="min-h-screen bg-[#F3F3F1] font-sans">
             <nav className="bg-white border-b border-gray-200 sticky top-0 z-30 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <span className="text-xl font-serif font-black tracking-tight text-black">TweetStore.</span>
                    <div className="flex items-center gap-4">
                        <ViralInviteModal invitesRemaining={3} />
                        <span className="font-bold text-sm bg-[#D2E823] px-4 py-2 rounded-full text-black border border-black/5">@{ user.handle }</span>
                        <form action={async () => { "use server"; await import("@/auth").then(m => m.signOut()); }}><button className="text-sm font-bold text-gray-400 hover:text-[#780016] transition-colors">Sign Out</button></form>
                    </div>
                </div>
            </nav>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                     <div className="bg-[#1E2330] text-white p-8 rounded-[2rem] shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform">
                        <div className="relative z-10">
                            <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Sales</h3>
                            <p className="text-6xl font-serif font-bold text-[#D2E823]">{userProducts.reduce((acc, p) => acc + p.clicks, 0)}</p>
                        </div>
                        <div className="absolute right-0 bottom-0 w-40 h-40 bg-[#D2E823] rounded-full blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    </div>
                    <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200/60">
                        <h3 className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2">Total Views</h3>
                         <p className="text-6xl font-serif font-bold text-black">{userProducts.reduce((acc, p) => acc + p.views, 0)}</p>
                    </div>
                    <div className="bg-[#2C50E3] p-8 rounded-[2rem] shadow-lg flex flex-col justify-center items-center text-center text-white relative overflow-hidden group hover:scale-[1.02] transition-transform cursor-pointer">
                        <Link href={`/${user.handle}`} target="_blank" className="font-bold text-xl hover:underline z-10 flex items-center gap-2">
                            View Live Store <span className="text-2xl">↗</span>
                        </Link>
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#2C50E3] to-blue-400 opacity-100"></div>
                    </div>
                </div>

                <div className="flex justify-between items-end mb-8">
                    <h2 className="text-4xl font-serif font-black text-black">Your Inventory</h2>
                    <AddProductModal userPlan={user?.plan || 'free'} productCount={userProducts.length} />
                </div>

                {userProducts.length === 0 ? (
                    <div className="bg-white rounded-[2.5rem] p-24 text-center border-2 border-dashed border-gray-200">
                         <div className="mx-auto h-32 w-32 bg-gray-50 rounded-full mb-6 flex items-center justify-center text-6xl shadow-inner bg-[#F3F3F1]">📦</div>
                         <h3 className="text-3xl font-serif font-bold mb-2 text-black">Your store is empty.</h3>
                         <p className="text-gray-500 mb-8 max-w-sm mx-auto text-lg">Upload your first digital or physical product to start selling.</p>
                         <div className="inline-block">
                            <AddProductModal userPlan={user?.plan || 'free'} productCount={userProducts.length} />
                         </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {userProducts.map(p => (
                            <div key={p.id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className="aspect-[4/5] bg-gray-100 relative overflow-hidden">
                                    <img src={p.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md border border-white/10">
                                        {p.views} Views
                                    </div>
                                </div>
                                <div className="p-6">
                                    <h4 className="font-bold text-xl mb-1 leading-tight text-black font-serif">{p.title}</h4>
                                    <p className="text-[#2C50E3] font-black text-2xl">${p.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
