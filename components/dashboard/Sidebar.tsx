import Link from "next/link";
import { Home, Package, Settings, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#F3F3F1] border-r border-gray-200 hidden md:flex flex-col z-20">
      <div className="p-6 border-b border-gray-200">
        <span className="text-xl font-serif font-black tracking-tight text-black">TweetStore.</span>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        <Link href="/dashboard" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-black bg-white rounded-xl shadow-sm border border-gray-100">
          <Home className="w-4 h-4" />
          Overview
        </Link>
        <Link href="/dashboard/products" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:text-black hover:bg-white/50 rounded-xl transition-colors">
          <Package className="w-4 h-4" />
          Products
        </Link>
        <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-500 hover:text-black hover:bg-white/50 rounded-xl transition-colors">
          <Settings className="w-4 h-4" />
          Settings
        </Link>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <form action={async () => { "use server"; await import("@/auth").then(m => m.signOut()); }}>
            <button className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-red-500 hover:bg-red-50 rounded-xl w-full transition-colors">
                <LogOut className="w-4 h-4" />
                Sign Out
            </button>
        </form>
      </div>
    </aside>
  );
}
