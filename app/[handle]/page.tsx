import { db } from "@/lib/db";
import { users, products, trafficInjections } from "@/db/schema";
import { eq, desc } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LucideShoppingBag, LucideStar } from "lucide-react";
import ProductDrawer from "@/components/storefront/ProductDrawer";

export default async function StorePage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;

  // 1. Fetch User Data
  const user = await db.select().from(users).where(eq(users.handle, handle)).get();
  if (!user) return notFound();

  // 2. Fetch User Products
  const userProducts = await db.select().from(products).where(eq(products.userId, user.id));

  // 4. Traffic Injection Logic (Placeholder Logic)
  // In a real scenario, query the 'traffic_injections' table here.
  let injectedProducts = [];
  const injection = await db.query.trafficInjections.findFirst({ where: eq(trafficInjections.sourceHandle, handle) });
  if (injection) {
      const targetUser = await db.query.users.findFirst({ where: eq(users.handle, injection.targetHandle) });
      if (targetUser) {
          injectedProducts = await db.select().from(products).where(eq(products.userId, targetUser.id)).limit(4);
      }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* HEADER: Avatar & Bio */}
      <header className="bg-white pt-12 pb-8 px-6 text-center rounded-b-[2rem] shadow-sm mb-6">
        <div className="w-24 h-24 mx-auto relative mb-4">
           {/* Fallback avatar if user has none */}
           <Image
             src={user.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200"}
             alt={user.handle}
             fill
             className="object-cover rounded-full border-4 border-[#D2E823]"
           />
        </div>
        <h1 className="text-2xl font-black font-serif text-black mb-2">@{user.handle}</h1>
        <p className="text-gray-600 max-w-sm mx-auto text-sm">{user.bio || "Welcome to my store!"}</p>

        {/* Category Badge */}
        {user.category && (
          <span className="inline-block mt-3 px-3 py-1 bg-gray-100 text-xs font-bold uppercase tracking-wider text-gray-500 rounded-full">
            {user.category}
          </span>
        )}
      </header>

      {/* PRODUCT GRID */}
      <div className="px-4 max-w-md mx-auto space-y-4">
        {userProducts.length === 0 ? (
          <div className="text-center py-10 opacity-50">
            <LucideShoppingBag className="mx-auto mb-2" size={32}/>
            <p>No products yet.</p>
          </div>
        ) : (
          userProducts.map((product) => (
            <ProductDrawer key={product.id} product={product} whatsappNumber={user.whatsapp || ''} />
          ))
        )}
      </div>

      {/* TRAFFIC LOOP FOOTER (The Network) */}
      {injectedProducts.length > 0 && (
          <div className="mt-12 border-t border-gray-200 pt-8 px-6">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest text-center mb-4">More from TweetStore Network</h4>
            <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
               {injectedProducts.map(p => (
                   <div key={p.id} className="min-w-[120px] bg-white rounded-xl overflow-hidden shadow-sm">
                       <div className="h-24 relative bg-gray-200">
                           <Image src={p.image} alt={p.title} fill className="object-cover"/>
                       </div>
                       <div className="p-2">
                           <p className="font-bold text-xs truncate">{p.title}</p>
                       </div>
                   </div>
               ))}
            </div>
            <div className="text-center mt-6">
              <Link href="/" className="text-xs font-black font-serif text-black opacity-50 hover:opacity-100">
                Powered by TweetStore.
              </Link>
            </div>
          </div>
      )}
    </div>
  );
}
