"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2, ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const [handle, setHandle] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        username: handle,
        password: password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid credentials. (Hint: Use Master Admin)");
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    } catch (err) { setError("Something went wrong."); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md">
        <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 mb-8 hover:text-black">
          <ArrowLeft size={16} className="mr-2"/> Back home
        </Link>

        <h1 className="text-3xl md:text-4xl font-black font-serif mb-2 text-black">Welcome back.</h1>
        <p className="text-gray-500 mb-8 font-medium">Log in to manage your store.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text" placeholder="Handle" value={handle} onChange={(e) => setHandle(e.target.value)}
            className="w-full h-14 bg-gray-50 rounded-xl px-4 font-bold border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition outline-none text-black bg-gray-100 placeholder-gray-400"
            required
          />
          <input
            type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}
            className="w-full h-14 bg-gray-50 rounded-xl px-4 font-bold border-2 border-transparent focus:bg-white focus:border-black focus:ring-0 transition outline-none text-black bg-gray-100 placeholder-gray-400"
            required
          />

          {error && <div className="p-3 bg-red-50 text-red-600 text-sm font-bold rounded-lg text-center">{error}</div>}

          <button type="submit" disabled={loading} className="w-full h-14 bg-black text-white rounded-xl font-bold text-lg hover:scale-[1.02] transition flex items-center justify-center">
            {loading ? <Loader2 className="animate-spin" /> : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
