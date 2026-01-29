import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#1E2330] p-4 font-sans">
            <div className="bg-[#1E2330] p-12 rounded-[2.5rem] border border-gray-800 max-w-sm w-full shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#D2E823] to-[#2C50E3]"></div>
                <h1 className="text-white text-3xl font-serif font-black mb-8 text-center tracking-tight">Restricted Access</h1>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-6">
                    <Input name="username" placeholder="ID" className="bg-white/5 border-white/10 text-white focus:border-[#D2E823] placeholder-white/20 py-4 text-center tracking-widest font-mono" />
                    <Input name="password" type="password" placeholder="KEY" className="bg-white/5 border-white/10 text-white focus:border-[#D2E823] placeholder-white/20 py-4 text-center tracking-widest font-mono" />
                    <Button type="submit" className="w-full bg-[#D2E823] text-black hover:bg-white hover:scale-105 font-bold py-4 text-lg">Authenticate</Button>
                </form>
            </div>
        </div>
    )
}
