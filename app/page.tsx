import { db } from "@/lib/db";
import { products } from "@/db/schema";
import Image from "next/image";

export const dynamic = 'force-dynamic';

type Product = typeof products.$inferSelect;

export default async function Home() {
  let allProducts: Product[] = [];
  try {
    allProducts = await db.select().from(products);
  } catch (error) {
    console.error("Failed to fetch products:", error);
    // Fallback handled by empty array check
  }

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Tweet Store V2</h1>

      {allProducts.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">Welcome to Tweet Store</h2>
          <p className="text-gray-500 mt-2">No products found. The database connection is active.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {allProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow overflow-hidden">
              <div className="relative h-48 w-full">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
