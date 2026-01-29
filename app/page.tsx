import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const products = [
    {
      id: 1,
      name: "Neo-Tokyo Streetwear",
      price: "50000",
      image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80",
      description: "Cyberpunk aesthetic for the modern age."
    },
    {
      id: 2,
      name: "Mechanical Keyboard Kit",
      price: "120000",
      image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80",
      description: "Build your own thocky masterpiece."
    },
    {
      id: 3,
      name: "Analog Film Camera",
      price: "85000",
      image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=800&q=80",
      description: "Capture moments with vintage soul."
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-between items-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">Tweet Store <span className="text-blue-600">Demo</span></h1>
            <Link href="/login" className="text-sm font-semibold text-gray-600 hover:text-black">Login</Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Offline Demo Mode
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Running without database connections. Verifying environment stability.
            </p>
        </div>

        <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-4 border border-gray-100">
              <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-xl bg-gray-200 relative h-64">
                 <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:opacity-75 transition-opacity"
                  unoptimized // Force unoptimized to bypass any image loader issues
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                </div>
                <p className="text-lg font-medium text-gray-900">Ksh {parseInt(product.price).toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
