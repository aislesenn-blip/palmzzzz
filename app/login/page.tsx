import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function LoginPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
            <div className="bg-white p-8 rounded-2xl shadow-sm max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-6">Creator Login</h1>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-4">
                    <Input name="username" placeholder="Email or Handle" required />
                    <Input name="password" type="password" placeholder="Password" required />
                    <Button type="submit" className="w-full">Enter Dashboard</Button>
                </form>
            </div>
        </div>
    )
}
