import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { signIn } from "@/auth";

export default function AdminLogin() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-black p-4">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800 max-w-sm w-full">
                <h1 className="text-white text-xl font-mono mb-6 text-center">Restricted Access</h1>
                <form action={async (formData) => {
                    "use server";
                    await signIn("credentials", formData);
                }} className="space-y-4">
                    <Input name="username" placeholder="ID" className="bg-gray-800 border-gray-700 text-white focus:border-white" />
                    <Input name="password" type="password" placeholder="KEY" className="bg-gray-800 border-gray-700 text-white focus:border-white" />
                    <Button type="submit" className="w-full bg-white text-black hover:bg-gray-200">Authenticate</Button>
                </form>
            </div>
        </div>
    )
}
