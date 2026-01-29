import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F3F3F1] p-4 font-sans">
            <div className="bg-white p-12 rounded-[2rem] shadow-xl max-w-md w-full text-center border border-gray-200">
                <h1 className="text-3xl font-serif font-black mb-2 text-black">Welcome Back.</h1>
                <p className="text-gray-500 mb-8 font-medium">Login to manage your empire.</p>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-6">
                    <Input name="username" placeholder="Handle" required className="bg-gray-50 border-gray-200 focus:border-black" />
                    <Input name="password" type="password" placeholder="Password" required className="bg-gray-50 border-gray-200 focus:border-black" />
                    <Button type="submit" className="w-full bg-black text-white py-4 text-lg hover:bg-gray-900 rounded-full">Enter Dashboard</Button>
                </form>
            </div>
        </div>
    )
}
