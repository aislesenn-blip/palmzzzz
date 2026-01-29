import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full font-sans overflow-x-hidden">
      {/* NAV */}
      <nav className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4">
        <div className="bg-white/95 backdrop-blur-md rounded-full shadow-lg px-4 py-3 md:px-6 md:py-3 flex justify-between items-center w-full max-w-4xl border border-gray-100">
          <Link href="/" className="text-xl md:text-2xl tracking-tight text-black flex items-center group">
            <span className="font-bold font-sans text-[#153308]">Tweet</span>
            <span className="font-serif italic font-normal -ml-1.5 text-black">Store.</span>
          </Link>
          <div className="flex gap-2 items-center">
            <Link href="/login" className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-gray-100 font-bold text-gray-800 hover:bg-gray-200 transition text-xs md:text-sm whitespace-nowrap">
              Log in
            </Link>
            <Link href="/vision" className="px-3 py-1.5 md:px-5 md:py-2.5 rounded-full bg-black text-white font-bold hover:scale-105 transition text-xs md:text-sm whitespace-nowrap">
              Sign up free
            </Link>
          </div>
        </div>
      </nav>

      {/* HERO SECTION (FOREST GREEN) */}
      <section className="bg-[#153308] min-h-[95vh] flex flex-col items-center justify-start pt-32 px-4 relative rounded-b-[3rem] md:rounded-b-[4rem]">
        <div className="max-w-3xl text-center z-10 mb-8">
          <h1 className="text-4xl md:text-7xl font-serif font-black text-[#D2E823] mb-6 leading-[1.1] tracking-tight drop-shadow-sm">
            Everything you are. <br/> In one link.
          </h1>
          <p className="text-white/80 text-base md:text-xl font-medium max-w-lg mx-auto mb-8 leading-relaxed">
            The premium storefront for creators, retailers, and visionaries. No website needed. Just your vibe.
          </p>
          <Link href="/vision" className="px-8 py-4 rounded-full bg-[#D2E823] text-[#153308] font-bold text-lg hover:bg-white transition flex items-center gap-2 inline-flex shadow-xl hover:shadow-2xl transform hover:-translate-y-1">
             Claim your Link <ArrowRight size={20}/>
          </Link>
        </div>

        {/* VISUAL: FASHION / SNEAKERS (Mobile Optimized) */}
        <div className="w-full max-w-xs md:max-w-md aspect-[4/5] relative rounded-t-[2.5rem] overflow-hidden border-8 border-white/10 shadow-2xl mt-auto">
            <Image
              src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=800&q=80"
              alt="Fashion Vibe" fill className="object-cover" priority
            />
        </div>
      </section>

      {/* MINIMALIST SECTION (GREY) */}
      <section className="bg-[#F3F4F6] py-20 px-4 flex flex-col items-center text-center">
        <h2 className="text-3xl md:text-6xl font-serif font-black text-gray-900 mb-10 leading-tight">
            Sell <span className="italic text-gray-400">anything</span>. <br/> Beautifully.
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-5xl">
             {/* RETAIL */}
             <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition text-left flex flex-col">
                <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 bg-gray-100">
                    <Image src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500" alt="Retail" fill className="object-cover"/>
                </div>
                <h3 className="font-bold text-xl text-black">The Boutique</h3>
                <p className="text-sm text-gray-500 mt-1">Drop new collections instantly.</p>
             </div>
             {/* FOOD */}
             <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition text-left flex flex-col">
                <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 bg-gray-200">
                    <Image src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500" alt="Cakes" fill className="object-cover"/>
                </div>
                <h3 className="font-bold text-xl text-black">The Baker</h3>
                <p className="text-sm text-gray-500 mt-1">Showcase menus & take orders.</p>
             </div>
             {/* SERVICE */}
             <div className="bg-white p-6 rounded-3xl shadow-sm hover:shadow-md transition text-left flex flex-col">
                <div className="h-48 w-full relative rounded-xl overflow-hidden mb-4 bg-gray-200">
                    <Image src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=500" alt="Service" fill className="object-cover"/>
                </div>
                <h3 className="font-bold text-xl text-black">The Pro</h3>
                <p className="text-sm text-gray-500 mt-1">Book consultations & sell skills.</p>
             </div>
        </div>
      </section>

      {/* TRAFFIC SECTION (MAROON) */}
      <section className="bg-[#780016] py-24 px-4 text-center text-[#E9C0E9] rounded-t-[3rem] -mt-8 relative z-10">
         <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-black mb-6 leading-tight">
              Traffic that converts.
            </h2>
            <p className="text-white/90 text-lg mb-8 leading-relaxed">
              Don't just get likes. Get sales. Route your TikTok and Instagram followers directly to checkout.
            </p>
         </div>
      </section>

      {/* COMMUNITY SECTION (BLUE) */}
      <section className="bg-[#2C50E3] py-24 px-4 text-center text-[#D2E823]">
        <div className="max-w-2xl mx-auto">
           <h2 className="text-3xl md:text-5xl font-serif font-black mb-8">Join the 1% Club.</h2>
           <Link href="/vision" className="px-10 py-4 rounded-full bg-[#D2E823] text-[#2C50E3] font-bold text-lg hover:bg-white hover:scale-105 transition shadow-lg inline-block">
             Get Your Invite
           </Link>
        </div>
      </section>
    </main>
  );
}
