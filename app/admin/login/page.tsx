import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-charcoal p-4 font-sans">
            <div className="bg-gray-900 p-12 rounded-[2.5rem] border border-gray-800 max-w-sm w-full shadow-2xl">
                <h1 className="text-white text-2xl font-serif font-bold mb-8 text-center tracking-tight">Restricted Access</h1>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-6">
                    <Input name="username" placeholder="ID" className="bg-gray-800 border-gray-700 text-white focus:border-lime placeholder-gray-600" />
                    <Input name="password" type="password" placeholder="KEY" className="bg-gray-800 border-gray-700 text-white focus:border-lime placeholder-gray-600" />
                    <Button type="submit" className="w-full bg-lime text-black hover:bg-white hover:scale-105">Authenticate</Button>
                </form>
            </div>
        </div>
    )
}
