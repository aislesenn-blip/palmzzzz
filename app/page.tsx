import { Button } from "@/components/ui/Button";
import Link from "next/link";
import { ArrowRight, Check, Star } from "lucide-react";

async function getUnsplashImages() {
  try {
    const res = await fetch(`https://api.unsplash.com/photos/random?count=12&query=entrepreneur,business,fashion&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    return [];
  }
}

export default async function LandingPage() {
  const images = await getUnsplashImages();

  return (
    <main className="min-h-screen font-sans">
        {/* Sticky Header */}
        <nav className="sticky top-0 z-50 bg-lime border-b border-black/5 px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <span className="text-3xl font-serif font-bold tracking-tight text-charcoal">TweetStore.</span>
                <div className="flex gap-4">
                    <Link href="/login" className="px-6 py-2 bg-gray-100 rounded-full font-bold text-charcoal hover:bg-white transition-colors">Log in</Link>
                    <Link href="/register" className="px-6 py-2 bg-black text-white rounded-full font-bold hover:bg-gray-800 transition-colors">Sign up free</Link>
                </div>
            </div>
        </nav>

        {/* Hero Section */}
        <section className="bg-lime pt-20 pb-32 px-6 overflow-hidden relative">
            <div className="max-w-7xl mx-auto flex flex-col items-center text-center z-10 relative">
                <h1 className="text-6xl md:text-8xl font-serif font-bold leading-[0.9] mb-8 text-charcoal max-w-5xl">
                    A link in bio built for <span className="italic">Business & Service People.</span>
                </h1>
                <p className="text-xl md:text-2xl font-medium text-charcoal/80 mb-12 max-w-2xl">
                    Join 1M+ people using Tweet Store to sell, curate, and grow.
                </p>

                <form action="/register" method="GET" className="flex flex-col md:flex-row items-center justify-center gap-4 w-full max-w-xl">
                     <div className="flex items-center gap-2 p-1 bg-white rounded-full pl-6 w-full shadow-xl hover:shadow-2xl transition-shadow border-2 border-transparent focus-within:border-black">
                        <span className="text-gray-400 font-bold tracking-tight whitespace-nowrap">palmtweets.com/</span>
                        <input
                            name="handle"
                            type="text"
                            placeholder="yourname"
                            className="flex-1 outline-none text-charcoal font-bold text-xl placeholder-gray-300 bg-transparent py-4"
                        />
                    </div>
                    <Button type="submit" variant="primary" className="w-full md:w-auto text-xl py-5 px-8 shadow-xl whitespace-nowrap">Claim your Link</Button>
                </form>
            </div>

            {/* Visual Overlap */}
            <div className="mt-20 mx-auto max-w-4xl relative -mb-48 z-20">
                 <div className="aspect-[16/9] bg-gray-900 rounded-t-3xl shadow-2xl overflow-hidden border-8 border-gray-900">
                    <img src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-90" alt="Dashboard Preview" />
                 </div>
            </div>
        </section>

        {/* Create Block */}
        <section className="bg-electric py-48 px-6 text-center text-white relative z-10">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-lime text-xl font-bold uppercase tracking-widest mb-6">Create</h2>
                <h3 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight">Create and customize your <br/> Tweet Store in minutes.</h3>
                <p className="text-2xl opacity-90 max-w-2xl mx-auto">Connect all your content, products, and services in one link. No coding required.</p>
            </div>
        </section>

        {/* Share Block */}
        <section className="bg-maroon py-32 px-6 text-center text-white overflow-hidden">
             <div className="max-w-7xl mx-auto">
                <div className="mb-20">
                    <h2 className="text-pink text-xl font-bold uppercase tracking-widest mb-6">Share</h2>
                    <h3 className="text-5xl md:text-7xl font-serif font-bold mb-8">Share your Tweet Store <br/> anywhere you like!</h3>
                </div>

                {/* Masonry Grid */}
                <div className="columns-2 md:columns-4 gap-4 max-w-5xl mx-auto">
                    {images.map((img: any) => (
                        <div key={img.id} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-500">
                            <img src={img.urls.regular} alt="User Profile" className="w-full object-cover" />
                        </div>
                    ))}
                     {images.length === 0 && Array.from({length: 8}).map((_, i) => (
                         <div key={i} className="mb-4 break-inside-avoid rounded-2xl overflow-hidden bg-white/10 h-64 w-full animate-pulse"></div>
                    ))}
                </div>
            </div>
        </section>

        {/* Analytics Section */}
        <section className="bg-cream py-32 px-6 text-center">
             <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-left">
                    <h2 className="text-forest text-xl font-bold uppercase tracking-widest mb-4">Analytics</h2>
                    <h3 className="text-5xl font-serif font-bold mb-6 text-charcoal">Analyze your audience.</h3>
                    <p className="text-xl text-gray-600 mb-8">Track views, clicks, and sales in real-time. Understand what your audience loves.</p>
                    <div className="flex gap-8">
                        <div>
                            <p className="text-4xl font-black text-charcoal">124K</p>
                            <p className="text-gray-500 font-bold uppercase text-xs">Total Views</p>
                        </div>
                        <div>
                            <p className="text-4xl font-black text-charcoal">8.2K</p>
                            <p className="text-gray-500 font-bold uppercase text-xs">Clicks</p>
                        </div>
                    </div>
                </div>

                {/* Fake Dashboard Card */}
                <div className="flex-1 w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-200">
                    <div className="flex items-end gap-3 h-64 w-full justify-between px-4 pb-4 border-b border-gray-100">
                        {[40, 60, 45, 80, 70, 90, 100, 85, 60, 75].map((h, i) => (
                            <div key={i} className="w-full bg-electric rounded-t-md opacity-90" style={{ height: `${h}%` }}></div>
                        ))}
                    </div>
                    <div className="flex justify-between mt-6">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-electric"></div>
                            <span className="text-sm font-bold text-gray-500">Store Views</span>
                        </div>
                        <span className="text-sm font-bold text-gray-900">Last 7 Days</span>
                    </div>
                </div>
            </div>
        </section>

        {/* Social Proof */}
        <section className="bg-white py-24 px-6 text-center border-t border-gray-100">
            <p className="text-gray-400 font-bold uppercase tracking-widest mb-12">Trusted by 1M+ Monetizers</p>
            <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-30 grayscale">
                <div className="h-8 w-32 bg-black rounded"></div>
                <div className="h-8 w-32 bg-black rounded"></div>
                <div className="h-8 w-32 bg-black rounded"></div>
                <div className="h-8 w-32 bg-black rounded"></div>
            </div>
        </section>
    </main>
  );
}
