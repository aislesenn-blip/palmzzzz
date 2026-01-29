import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-cream p-4">
            <div className="bg-white p-12 rounded-3xl shadow-xl max-w-md w-full text-center border border-gray-100">
                <h1 className="text-3xl font-serif font-bold mb-8">Welcome Back.</h1>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-6">
                    <Input name="username" placeholder="Handle (e.g. palmtweets.com/user)" required />
                    <Input name="password" type="password" placeholder="Password" required />
                    <Button type="submit" className="w-full py-4 text-lg">Enter Dashboard</Button>
                </form>
            </div>
        </div>
    )
}
