import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full font-sans overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg px-6 py-3 flex justify-between items-center w-full max-w-4xl border border-gray-100">
          <Link href="/" className="text-xl md:text-2xl font-black font-serif tracking-tight text-black flex items-center gap-1">
            TweetStore<span className="text-[#153308]">.</span>
          </Link>
          <div className="flex gap-3 items-center">
            <Link href="/login" className="text-sm font-bold text-gray-600 hover:text-black transition hidden sm:block">Log in</Link>
            <Link href="/vision" className="px-5 py-2.5 rounded-full bg-black text-white text-xs md:text-sm font-bold hover:scale-105 transition">Sign up free</Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (FOREST GREEN) */}
      <section className="bg-[#153308] min-h-[95vh] flex flex-col items-center justify-start pt-32 px-4 relative rounded-b-[3rem] md:rounded-b-[4rem]">
        <div className="max-w-3xl text-center z-10 mb-8">
          <h1 className="text-4xl md:text-7xl font-serif font-black text-[#D2E823] mb-6 leading-[1.1] tracking-tight">
            Everything you are. <br/> In one link.
          </h1>
          <p className="text-white/80 text-base md:text-xl font-medium max-w-lg mx-auto mb-8">
            The premium storefront for creators and retailers. No website needed. Just your vibe.
          </p>
          <Link href="/vision" className="px-8 py-4 rounded-full bg-[#D2E823] text-[#153308] font-bold text-lg hover:bg-white transition flex items-center gap-2 inline-flex shadow-xl">
             Claim your Link <ArrowRight size={20}/>
          </Link>
        </div>

        {/* VISUAL: Fashion Vibe */}
        <div className="w-full max-w-xs md:max-w-md aspect-[4/5] relative rounded-t-[2.5rem] overflow-hidden border-8 border-white/10 shadow-2xl mt-auto">
            <Image src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80" alt="Fashion Vibe" fill className="object-cover" priority />
        </div>
      </section>

      {/* MINIMALIST SECTION (GREY) */}
      <section className="bg-[#F3F4F6] py-20 px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-black text-gray-900 mb-10">Sell anything. Beautifully.</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
             {/* RETAIL */}
             <div className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition text-left">
                <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 bg-gray-200">
                    <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500" alt="Retail" fill className="object-cover"/>
                </div>
                <h3 className="font-bold text-lg text-black">The Boutique</h3>
             </div>
             {/* FOOD */}
             <div className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition text-left">
                <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 bg-gray-200">
                    <Image src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" alt="Cakes" fill className="object-cover"/>
                </div>
                <h3 className="font-bold text-lg text-black">The Baker</h3>
             </div>
             {/* SERVICE */}
             <div className="bg-white p-4 rounded-3xl shadow-sm hover:shadow-md transition text-left">
                <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 bg-gray-200">
                    <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500" alt="Service" fill className="object-cover"/>
                </div>
                <h3 className="font-bold text-lg text-black">The Pro</h3>
             </div>
        </div>
      </section>

      {/* TRAFFIC SECTION (MAROON) */}
      <section className="bg-[#780016] py-24 px-4 text-center text-[#E9C0E9] rounded-t-[3rem] -mt-8 relative z-10">
         <h2 className="text-3xl md:text-5xl font-serif font-black mb-6">Traffic that converts.</h2>
         <p className="text-white/90 text-lg">Route your followers directly to WhatsApp checkout.</p>
      </section>

      {/* COMMUNITY SECTION (BLUE) */}
      <section className="bg-[#2C50E3] py-24 px-4 text-center text-[#D2E823]">
        <h2 className="text-3xl md:text-5xl font-serif font-black mb-8">Join the 1% Club.</h2>
        <Link href="/vision" className="px-10 py-4 rounded-full bg-[#D2E823] text-[#2C50E3] font-bold text-lg hover:bg-white hover:scale-105 transition shadow-lg inline-block">Get Your Invite</Link>
      </section>
    </main>
  );
}
