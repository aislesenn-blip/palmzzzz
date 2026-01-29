import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function VisionPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col md:flex-row font-sans">
            <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
                <h1 className="text-6xl font-serif font-black mb-6 text-black leading-tight">Welcome to the <br/> 1% Family.</h1>
                <p className="text-xl text-gray-600 mb-12 font-medium leading-relaxed max-w-lg">
                    TweetStore is a mini-site engine built to increase your conversion rate. We verify members to maintain quality.
                </p>
                <Link href="/register">
                    <button className="px-10 py-5 bg-black text-white font-bold text-xl rounded-full hover:scale-105 transition shadow-xl">Join the Family</button>
                </Link>
            </div>
            <div className="hidden md:block w-1/2 relative bg-gray-100">
                 <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Success" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/10"></div>
            </div>
        </div>
    )
}
