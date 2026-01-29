import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full">
      {/* HEADER */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md py-4 px-6 flex justify-between items-center mx-4 mt-2 rounded-full shadow-sm">
        <h1 className="text-2xl font-black font-serif tracking-tighter text-black">TweetStore.</h1>
        <div className="flex gap-3">
          <Link href="/login" className="px-5 py-2.5 rounded-lg bg-gray-100 font-bold text-gray-800 hover:bg-gray-200 transition">Log in</Link>
          <Link href="/vision" className="px-5 py-2.5 rounded-full bg-black text-white font-bold hover:scale-105 transition">Sign up free</Link>
        </div>
      </nav>

      {/* HERO SECTION (#D2E823) */}
      <section className="bg-[#D2E823] pt-32 pb-20 px-4 text-center flex flex-col items-center relative overflow-hidden">
        <h1 className="text-6xl md:text-8xl font-black font-serif text-[#1e3a18] tracking-tight leading-[0.9] mb-6 max-w-5xl">
          A link in bio built for <span className="italic">Business</span> & <span className="italic">Service</span> People.
        </h1>
        <p className="text-xl font-medium text-[#1e3a18]/80 mb-8 max-w-2xl">
          Join 1M+ people using Tweet Store to sell, curate, and grow.
        </p>
        <form action="/register" method="GET" className="flex flex-col md:flex-row gap-2 w-full max-w-lg items-center justify-center relative z-10">
          <div className="relative w-full">
             <span className="absolute left-6 top-1/2 -translate-y-1/2 font-bold text-gray-500 text-lg">palmtweets.com/</span>
             <input name="handle" type="text" placeholder="yourname" className="w-full h-16 pl-44 rounded-full border-none font-bold text-xl shadow-lg focus:ring-4 focus:ring-[#1e3a18]/20 outline-none" />
          </div>
          <button type="submit" className="h-16 px-8 rounded-full bg-[#153308] text-[#D2E823] font-bold text-lg whitespace-nowrap hover:scale-105 transition shadow-xl">
            Claim your Link
          </button>
        </form>
        {/* Placeholder for Hero Image */}
        <div className="mt-12 w-full max-w-md h-64 bg-black/5 rounded-t-[3rem] border-4 border-black/5 flex items-end justify-center pb-4 overflow-hidden relative">
            <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover opacity-80" alt="Entrepreneur" />
        </div>
      </section>

      {/* CREATE SECTION (#2C50E3) */}
      <section className="bg-[#2C50E3] py-24 px-6 text-center text-[#D2E823]">
        <h2 className="text-5xl md:text-7xl font-black font-serif mb-6">Create in minutes.</h2>
        <p className="text-white text-2xl font-medium max-w-2xl mx-auto">Connect your content, products, and services in one link.</p>
      </section>

      {/* SHARE SECTION (#780016) */}
      <section className="bg-[#780016] py-24 px-6 text-center text-[#E9C0E9]">
        <h2 className="text-5xl md:text-7xl font-black font-serif mb-6">Share anywhere.</h2>
        <p className="text-white/80 text-xl font-medium max-w-2xl mx-auto">Drive traffic from Instagram, TikTok, and WhatsApp directly to your checkout.</p>
      </section>

      {/* ANALYTICS SECTION (#F3F3F1) */}
      <section className="bg-[#F3F3F1] py-24 px-6 text-center text-[#153308]">
        <h2 className="text-5xl md:text-7xl font-black font-serif mb-6">Analyze your audience.</h2>
        <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl mt-8">
             <div className="flex items-end gap-3 h-40 w-full justify-between px-4 pb-4 border-b border-gray-100">
                {[40, 60, 45, 80, 70, 90, 100].map((h, i) => (
                    <div key={i} className="w-full bg-[#2C50E3] rounded-t-md opacity-90" style={{ height: `${h}%` }}></div>
                ))}
            </div>
        </div>
      </section>

      {/* TRUST SECTION (White) */}
      <section className="bg-white py-16 text-center">
        <p className="text-xl font-bold text-gray-500 mb-8">Trusted by 1M+ Monetizers</p>
        <div className="flex justify-center gap-8 opacity-50 grayscale px-6">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
        </div>
      </section>
    </main>
  );
}
