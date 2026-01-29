import { Button } from "@/components/ui/Button";
import Link from "next/link";

async function getUnsplashImages() {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?count=12&query=fashion,minimalist,tech&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function LandingPage() {
  const images = await getUnsplashImages();

  return (
    <main className="min-h-screen bg-lime text-charcoal font-sans">
        {/* Sticky Header */}
        <nav className="sticky top-0 z-50 bg-lime/90 backdrop-blur-md px-4 py-4 border-b border-black/5">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span className="text-3xl font-serif font-bold tracking-tight">TweetStore.</span>
                <div className="flex gap-4">
                    <Link href="/login" className="px-6 py-2 bg-gray-100 rounded-full font-bold hover:bg-white transition-colors">Log in</Link>
                    <Link href="/register" className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">Sign up free</Link>
                </div>
            </div>
        </nav>

        {/* Hero */}
        <div className="relative pt-20 pb-32 overflow-hidden">
            <div className="max-w-4xl mx-auto text-center px-4 z-10 relative">
                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 text-charcoal">
                    A link in bio built for <span className="italic">Business.</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-charcoal/80 mb-12 max-w-2xl mx-auto">
                    Join 1M+ people using Tweet Store to sell, curate, and grow.
                </p>

                <form action="/register" method="GET" className="flex flex-col md:flex-row items-center justify-center gap-4 max-w-xl mx-auto">
                     <div className="flex items-center gap-2 p-1 bg-white rounded-full pl-6 w-full shadow-xl hover:shadow-2xl transition-shadow border-2 border-black">
                        <span className="text-gray-400 font-bold tracking-tight whitespace-nowrap">palmtweets.com/</span>
                        <input
                            name="handle"
                            type="text"
                            placeholder="yourname"
                            className="flex-1 outline-none text-charcoal font-bold text-xl placeholder-gray-300 bg-transparent py-4"
                        />
                    </div>
                    <Button type="submit" variant="forest" className="w-full md:w-auto text-xl py-5 px-8 shadow-xl">Claim your Link</Button>
                </form>
            </div>

            {/* Visual */}
            <div className="mt-20 mx-auto max-w-5xl relative">
                 <div className="absolute inset-0 bg-gradient-to-t from-lime via-transparent to-transparent z-10"></div>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-4 opacity-80">
                    {images.slice(0, 4).map((img: any) => (
                        <div key={img.id} className="aspect-[4/5] rounded-2xl overflow-hidden shadow-lg transform translate-y-12 even:-translate-y-12">
                            <img src={img.urls?.regular || "https://placehold.co/400x500"} className="w-full h-full object-cover" />
                        </div>
                    ))}
                 </div>
            </div>
        </div>

        {/* Create Block */}
        <section className="bg-electric py-32 px-4 text-center text-white">
            <div className="max-w-3xl mx-auto">
                <h2 className="text-lime text-xl font-bold uppercase tracking-widest mb-4">Create</h2>
                <h3 className="text-5xl md:text-7xl font-serif font-bold mb-8">Customize in minutes.</h3>
                <p className="text-2xl opacity-90">Connect all your content, products, and services in one link.</p>
            </div>
        </section>

        {/* Share Block */}
        <section className="bg-maroon py-32 px-4 text-center text-white">
             <div className="max-w-3xl mx-auto">
                <h2 className="text-pink text-xl font-bold uppercase tracking-widest mb-4">Share</h2>
                <h3 className="text-5xl md:text-7xl font-serif font-bold mb-8">Share anywhere.</h3>
                <p className="text-2xl opacity-90">Drive traffic from Instagram, TikTok, and WhatsApp directly to your checkout.</p>
            </div>
        </section>

        {/* Analytics & Social Proof */}
        <section className="bg-cream py-32 px-4 text-center">
             <div className="max-w-4xl mx-auto">
                <h2 className="text-forest text-xl font-bold uppercase tracking-widest mb-8">Analytics</h2>
                <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-200 mb-20">
                    {/* Fake Chart */}
                    <div className="flex items-end gap-2 h-40 w-full justify-between px-8">
                        {[40, 60, 45, 80, 70, 90, 100].map((h, i) => (
                            <div key={i} className="w-full bg-electric rounded-t-lg opacity-20" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-8 text-left">
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase">Total Views</p>
                            <p className="text-4xl font-black text-charcoal">124.5K</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs font-bold uppercase">Clicks</p>
                            <p className="text-4xl font-black text-charcoal">8,203</p>
                        </div>
                    </div>
                </div>

                <h3 className="text-3xl font-serif font-bold mb-12">Trusted by 1M+ Monetizers.</h3>
                <div className="flex justify-center gap-12 opacity-30 grayscale">
                    {/* Generic Logos */}
                    <div className="h-8 w-24 bg-black rounded"></div>
                    <div className="h-8 w-24 bg-black rounded"></div>
                    <div className="h-8 w-24 bg-black rounded"></div>
                    <div className="h-8 w-24 bg-black rounded"></div>
                </div>
            </div>
        </section>
    </main>
  );
}
