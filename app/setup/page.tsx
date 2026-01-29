import { Button } from "@/components/ui/Button";
import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Input } from "@/components/ui/Input";

export default async function SetupPage() {
    const session = await auth();
    if (!session?.user) redirect('/login');

    const user = await db.query.users.findFirst({ where: eq(users.id, session.user.id) });
    if (!user) redirect('/login');
    // If already set up (has avatar and bio), go to dashboard
    if (user.avatarUrl && user.bio) redirect('/dashboard');

    async function completeSetup(formData: FormData) {
        "use server";
        const session = await auth();
        if (!session?.user) return;

        const bio = formData.get('bio') as string;
        const imageUrl = formData.get('imageUrl') as string;

        await db.update(users).set({ bio, avatarUrl: imageUrl }).where(eq(users.id, session.user.id));
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen bg-cream flex items-center justify-center p-8 font-sans">
            <div className="bg-white p-12 rounded-[2.5rem] shadow-2xl max-w-lg w-full">
                <h1 className="text-4xl font-serif font-bold mb-4 text-charcoal">Final Step.</h1>
                <p className="text-gray-500 mb-8">Your store needs a face. This is mandatory.</p>

                {/* Client component wrapper for R2 upload would be ideal here, simplified for this file */}
                <SetupForm />
            </div>
        </div>
    )
}

// Client Component for Upload
import SetupForm from "@/components/onboarding/SetupForm";
