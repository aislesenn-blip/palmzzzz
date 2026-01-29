import { Button } from "@/components/ui/Button";
import Link from "next/link";

export default function VisionPage() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-8 text-center font-sans">
            <div className="max-w-2xl">
                <h1 className="text-6xl md:text-7xl font-serif font-bold mb-8 text-charcoal leading-tight">Welcome to the <br/> 1% Family.</h1>
                <p className="text-xl md:text-2xl text-gray-500 mb-12 font-medium leading-relaxed">
                    TweetStore is a mini-site engine built to increase your conversion rate. We verify members to maintain quality.
                </p>

                <div className="relative mb-12">
                    <div className="aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-2xl rotate-2 hover:rotate-0 transition-transform duration-500">
                        <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80" alt="Success" className="w-full h-full object-cover" />
                    </div>
                </div>

                <Link href="/register">
                    <Button variant="black" className="text-xl py-5 px-12 shadow-xl">Join the Family</Button>
                </Link>
            </div>
        </div>
    )
}
