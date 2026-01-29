import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { db } from "@/lib/db";
import { users, invites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/password";
import Link from "next/link";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ handle?: string, error?: string }> }) {
    const params = await searchParams;
    const initialHandle = params.handle || '';
    const error = params.error;

    async function register(formData: FormData) {
        "use server";
        const code = formData.get('code') as string;
        const handle = formData.get('handle') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const whatsapp = formData.get('whatsapp') as string;
        // const template = formData.get('template') as string; // Template unused for now

        // Step 1: Invite Check
        const invite = await db.query.invites.findFirst({ where: eq(invites.code, code) });
        if (!invite || invite.isUsed) {
            redirect('/register?error=invalid_invite&handle=' + handle);
        }

        // Check Handle
        const existing = await db.query.users.findFirst({ where: eq(users.handle, handle) });
        if (existing) redirect('/register?error=handle_taken&handle=' + handle);

        // Create User
        const hashedPassword = await hashPassword(password);
        await db.insert(users).values({
            id: crypto.randomUUID(),
            handle,
            email,
            password: hashedPassword,
            whatsappNumber: whatsapp,
            planStatus: 'free',
        });

        // Mark invite used
        await db.update(invites).set({ isUsed: true }).where(eq(invites.code, code));

        redirect('/login');
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-4">
            <div className="bg-white p-8 lg:p-12 rounded-3xl shadow-xl w-full max-w-2xl border border-gray-100">
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight mb-4">Join the Club.</h1>
                    <p className="text-gray-500">Application for Tweet Store Creator Access.</p>
                    {error === 'invalid_invite' && <p className="text-red-500 font-bold mt-2">Invalid or used invite code.</p>}
                    {error === 'handle_taken' && <p className="text-red-500 font-bold mt-2">Handle already taken.</p>}
                </div>

                <form action={register} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Input name="code" label="Invite Code" placeholder="ENTER-CODE" required />
                        <Input name="handle" label="Handle" placeholder="username" defaultValue={initialHandle} required />
                    </div>

                    <Input name="email" label="Email" type="email" placeholder="you@example.com" required />
                    <Input name="password" label="Password" type="password" required />

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100">
                        <Input name="whatsapp" label="WhatsApp Number" placeholder="+254..." required />
                        <p className="text-xs text-gray-400 mt-2 font-medium">This is your checkout counter. Orders go here instantly.</p>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                        {['Muse', 'Titan', 'Studio'].map(t => (
                            <label key={t} className="cursor-pointer">
                                <input type="radio" name="template" value={t} className="peer sr-only" required />
                                <div className="p-4 rounded-xl border-2 border-gray-100 peer-checked:border-black peer-checked:bg-gray-50 text-center font-bold text-gray-400 peer-checked:text-black transition-all">
                                    {t}
                                </div>
                            </label>
                        ))}
                    </div>

                    <Button type="submit" className="w-full text-lg">Initialize Storefront</Button>
                </form>
                 <div className="mt-8 text-center">
                    <Link href="/login" className="text-sm font-bold text-gray-400 hover:text-black">Already have an account? Login</Link>
                </div>
            </div>
        </div>
    )
}
