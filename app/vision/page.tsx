import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function VisionPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-sans">
            <div className="max-w-4xl flex flex-col md:flex-row items-center gap-12">
                <div className="flex-1 text-left">
                    <h1 className="text-6xl font-serif font-black mb-6 text-black leading-tight">Welcome to the <br/> 1% Family.</h1>
                    <p className="text-xl text-gray-600 mb-8 font-medium leading-relaxed">
                        TweetStore is a mini-site engine built to increase your conversion rate. We verify members to maintain quality.
                    </p>
                    <Link href="/register">
                        <Button className="bg-[#153308] text-[#D2E823] text-xl py-5 px-12 shadow-xl hover:scale-105 transition-transform rounded-full">Join the Family</Button>
                    </Link>
                </div>

                <div className="flex-1 relative">
                    <div className="aspect-[3/4] bg-gray-100 rounded-3xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500 border-4 border-gray-50">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" alt="Success" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </div>
            </div>
        </div>
    )
}
