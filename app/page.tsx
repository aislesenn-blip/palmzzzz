import Link from 'next/link';
import MarqueeGrid from '@/components/landing/MarqueeGrid';

export default function Home() {
  return (
    <main className="h-screen w-full flex overflow-hidden">
      {/* Left Section */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 lg:px-20 bg-white z-10">
        <nav className="absolute top-8 left-8 lg:left-20">
            <span className="text-xl font-bold tracking-tighter">Tweet Store.</span>
        </nav>

        <div className="max-w-xl">
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight text-gray-900 leading-[1.1] mb-6">
                The Instant Storefront for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Global Creators.</span>
            </h1>
            <p className="text-lg text-gray-600 mb-10 max-w-md leading-relaxed">
                Turn your passion into profit. Join 1M+ creators using Tweet Store to sell digitally and physically.
            </p>

            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2 p-2 border-2 border-gray-100 rounded-full pl-6 max-w-md focus-within:border-black transition-colors">
                    <span className="text-gray-400 font-medium">palmtweets.com/</span>
                    <input
                        type="text"
                        placeholder="yourname"
                        className="flex-1 outline-none text-gray-900 font-medium placeholder-gray-300 bg-transparent"
                    />
                    <Link href="/onboarding" className="bg-black text-white px-6 py-3 rounded-full font-bold hover:bg-gray-800 transition-all transform hover:scale-105">
                        Claim Your Link
                    </Link>
                </div>
            </div>

            <div className="mt-12">
                <p className="text-xs font-bold text-gray-400 tracking-widest uppercase mb-4">Trusted by the World's Best</p>
                <div className="flex gap-6 opacity-50 grayscale">
                    {/* Placeholder Logos */}
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                    <div className="h-6 w-20 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="hidden lg:block w-1/2 h-full relative bg-gray-50">
         <MarqueeGrid />
      </div>

      {/* Admin Login Shortcut (Hidden) */}
      <Link href="/admin/login" className="fixed bottom-2 right-2 opacity-0 hover:opacity-100 text-xs">Admin</Link>
    </main>
  );
}
