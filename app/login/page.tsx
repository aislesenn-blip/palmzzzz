import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream p-4 font-sans">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-md w-full text-center border-2 border-gray-100">
                <h1 className="text-4xl font-serif font-bold mb-2 text-charcoal">Welcome Back.</h1>
                <p className="text-gray-500 mb-8">Login to manage your empire.</p>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-6">
                    <Input name="username" placeholder="Handle (e.g. palmtweets.com/user)" required className="bg-gray-50" />
                    <Input name="password" type="password" placeholder="Password" required className="bg-gray-50" />
                    <Button type="submit" variant="black" className="w-full py-4 text-lg">Enter Dashboard</Button>
                </form>
            </div>
        </div>
    )
}
