import { Button } from "@/components/ui/Button";

async function getUnsplashImages() {
  const res = await fetch(`https://api.unsplash.com/photos/random?count=12&query=fashion,minimalist,tech&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
  if (!res.ok) return [];
  return res.json();
}

export default async function LandingPage() {
  const images = await getUnsplashImages();

  return (
    <main className="min-h-screen bg-cream text-charcoal overflow-hidden font-sans">
        {/* Hero */}
        <div className="flex flex-col lg:flex-row h-screen">
            <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 z-10 bg-cream">
                <nav className="absolute top-8 left-8 lg:left-20">
                    <span className="text-2xl font-bold tracking-tighter">Tweet Store.</span>
                </nav>

                <div className="max-w-xl mt-20 lg:mt-0">
                    <h1 className="text-6xl lg:text-8xl font-extrabold tracking-tight leading-[0.9] mb-8">
                        The Instant Storefront for <span className="text-gray-400">Global Creators.</span>
                    </h1>
                    <p className="text-xl text-gray-500 mb-12 max-w-md font-medium">
                        Turn your passion into profit. Join 1M+ creators using Tweet Store to sell digitally and physically.
                    </p>

                    <form action="/register" method="GET" className="flex flex-col gap-4">
                         <div className="flex items-center gap-4 p-2 border-2 border-gray-200 bg-white rounded-full pl-8 max-w-md focus-within:border-black transition-colors shadow-sm hover:shadow-md">
                            <span className="text-gray-400 font-bold tracking-tight">palmtweets.com/</span>
                            <input
                                name="handle"
                                type="text"
                                placeholder="yourname"
                                className="flex-1 outline-none text-charcoal font-bold text-xl placeholder-gray-300 bg-transparent"
                            />
                        </div>
                        <Button type="submit" className="w-full max-w-md text-xl py-4">Claim my Link</Button>
                    </form>

                    <div className="mt-16 flex items-center gap-4">
                         <div className="flex -space-x-4">
                            {[1,2,3,4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-cream bg-gray-300"></div>
                            ))}
                         </div>
                         <p className="font-bold text-sm text-gray-500">Trusted by 1M+ Creators</p>
                    </div>
                </div>
            </div>

            {/* Wall of Success */}
            <div className="hidden lg:block w-1/2 h-full relative overflow-hidden bg-gray-100">
                <div className="columns-3 gap-4 p-4 animate-scroll-vertical">
                    {images.map((img: any) => (
                        <div key={img.id} className="mb-4 break-inside-avoid rounded-xl overflow-hidden shadow-lg hover:scale-[1.02] transition-transform duration-500">
                            <img src={img.urls.regular} alt={img.alt_description} className="w-full object-cover" />
                        </div>
                    ))}
                    {/* Fallback if no images */}
                    {images.length === 0 && Array.from({length: 9}).map((_, i) => (
                         <div key={i} className="mb-4 break-inside-avoid rounded-xl overflow-hidden bg-gray-200 h-64 w-full"></div>
                    ))}
                </div>
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-cream via-transparent to-cream opacity-20 pointer-events-none"></div>
            </div>
        </div>
    </main>
  );
}
