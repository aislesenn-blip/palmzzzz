import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { db } from "@/lib/db";
import { users, invites } from "@/db/schema";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import { hashPassword } from "@/lib/password";
import Link from "next/link";

export default async function RegisterPage({ searchParams }: { searchParams: Promise<{ handle?: string, error?: string, step?: string }> }) {
    const params = await searchParams;
    const initialHandle = params.handle || '';
    const error = params.error;
    const currentStep = parseInt(params.step || '1');

    async function checkInvite(formData: FormData) {
        "use server";
        const code = formData.get('code') as string;
        const handle = formData.get('handle') as string;

        // Hardcoded Backdoor for Demo
        if (code === 'PALM100') {
             redirect(`/register?step=2&code=${code}&handle=${handle}`);
        }

        const invite = await db.query.invites.findFirst({ where: eq(invites.code, code) });
        if (!invite || invite.isUsed) {
            redirect(`/register?error=invalid_invite&handle=${handle}`);
        }
        redirect(`/register?step=2&code=${code}&handle=${handle}`);
    }

    async function register(formData: FormData) {
        "use server";
        const code = formData.get('code') as string;
        const handle = formData.get('handle') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const whatsapp = formData.get('whatsapp') as string;
        const persona = formData.get('persona') as "business" | "service";
        const template = formData.get('template') as "Muse" | "Titan" | "Studio";

        const hashedPassword = await hashPassword(password);

        try {
            await db.insert(users).values({
                id: crypto.randomUUID(),
                handle,
                email,
                password: hashedPassword,
                whatsappNumber: whatsapp,
                planStatus: 'free',
                persona,
                template,
                inviteCodeUsed: code
            });

            if (code !== 'PALM100') {
                await db.update(invites).set({ isUsed: true }).where(eq(invites.code, code));
            }
        } catch (e) {
            console.error(e);
            redirect(`/register?step=2&error=registration_failed`);
        }

        redirect('/dashboard'); // Should redirect to login then dashboard in real app, but flow says Enter Dashboard
    }

    return (
        <div className="min-h-screen bg-cream flex">
            {/* Visual Side */}
            <div className="hidden lg:flex w-1/2 bg-maroon text-white p-20 flex-col justify-between relative overflow-hidden">
                <div className="z-10">
                    <h2 className="text-5xl font-serif font-bold mb-6">Join the 1% Family.</h2>
                    <p className="text-xl opacity-80 max-w-md">Tweet Store is a mini-site built to increase your conversion rate. It's completely free.</p>
                </div>
                <div className="absolute right-0 bottom-0 opacity-20 transform translate-x-1/4 translate-y-1/4">
                    <div className="w-[600px] h-[600px] bg-pink rounded-full blur-3xl"></div>
                </div>
            </div>

            {/* Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                <div className="max-w-md w-full">
                    {currentStep === 1 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                            <div>
                                <h1 className="text-4xl font-serif font-bold mb-2">The Gate.</h1>
                                <p className="text-gray-500">Enter your invite code to proceed.</p>
                                {error === 'invalid_invite' && <p className="text-maroon font-bold mt-2">Access Denied. Invite Only.</p>}
                            </div>
                            <form action={checkInvite} className="space-y-6">
                                <Input name="handle" value={initialHandle} type="hidden" />
                                <Input name="code" placeholder="PALM100" className="text-center text-2xl tracking-widest uppercase font-mono" required autoFocus />
                                <Button type="submit" className="w-full">Unlock Access</Button>
                            </form>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <form action={register} className="space-y-8 animate-in fade-in slide-in-from-right duration-500">
                            <input type="hidden" name="code" value={params.code as string} />
                            <input type="hidden" name="handle" value={params.handle as string} />

                            <div>
                                <h1 className="text-3xl font-serif font-bold mb-6">Identity</h1>
                                <div className="space-y-4">
                                    <Input name="handle_display" value={`@${params.handle}`} disabled className="bg-gray-100" />
                                    <Input name="email" type="email" placeholder="Email" required />
                                    <Input name="password" type="password" placeholder="Password" required />
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-serif font-bold mb-2">The Engine</h1>
                                <p className="text-sm text-gray-500 mb-6">This is your checkout counter. Orders will be sent here instantly.</p>
                                <Input name="whatsapp" placeholder="WhatsApp Number (e.g. 2547...)" required />
                            </div>

                            <div>
                                <h1 className="text-3xl font-serif font-bold mb-6">The Persona</h1>
                                <div className="grid grid-cols-2 gap-4">
                                    <label className="cursor-pointer">
                                        <input type="radio" name="persona" value="business" className="peer sr-only" required />
                                        <div className="p-6 rounded-2xl border-2 border-gray-200 peer-checked:border-black peer-checked:bg-lime hover:border-gray-300 transition-all text-center">
                                            <span className="text-2xl block mb-2">💼</span>
                                            <span className="font-bold">Business</span>
                                        </div>
                                    </label>
                                    <label className="cursor-pointer">
                                        <input type="radio" name="persona" value="service" className="peer sr-only" required />
                                        <div className="p-6 rounded-2xl border-2 border-gray-200 peer-checked:border-black peer-checked:bg-electric peer-checked:text-white hover:border-gray-300 transition-all text-center">
                                            <span className="text-2xl block mb-2">🤝</span>
                                            <span className="font-bold">Service</span>
                                        </div>
                                    </label>
                                </div>
                            </div>

                            <div>
                                <h1 className="text-3xl font-serif font-bold mb-6">Vibe Check</h1>
                                <div className="grid grid-cols-3 gap-4">
                                    {['Muse', 'Titan', 'Studio'].map(t => (
                                        <label key={t} className="cursor-pointer group">
                                            <input type="radio" name="template" value={t} className="peer sr-only" required />
                                            <div className="aspect-[4/5] rounded-xl border-2 border-gray-200 peer-checked:border-black relative overflow-hidden group-hover:shadow-lg transition-all">
                                                <div className={`absolute inset-0 ${t === 'Muse' ? 'bg-pink' : t === 'Titan' ? 'bg-charcoal' : 'bg-white'}`}></div>
                                                <div className="absolute bottom-2 left-0 right-0 text-center font-bold text-xs mix-blend-difference text-white">{t}</div>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <Button type="submit" className="w-full text-lg py-4">Initialize Profile</Button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    )
}
