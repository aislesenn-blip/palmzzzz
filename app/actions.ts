"use server";

import { db } from "@/lib/db";
import { products, users, invites } from "@/db/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export async function createProduct(formData: FormData) {
    const session = await auth();
    if (!session?.user) return { error: "Unauthorized" };

    const title = formData.get("title") as string;
    const price = parseFloat(formData.get("price") as string);
    const imageUrl = formData.get("imageUrl") as string;
    const description = formData.get("description") as string;

    await db.insert(products).values({
        userId: session.user.id as string,
        title,
        price,
        imageUrl,
        description,
    });

    revalidatePath("/dashboard");
    return { success: true };
}

export async function registerUser(formData: FormData) {
    const code = formData.get('code') as string;
    const handle = formData.get('handle') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const persona = formData.get('persona') as "business" | "service";
    const template = formData.get('template') as "Muse" | "Titan" | "Studio";
    const bio = formData.get('bio') as string;
    const imageUrl = formData.get('imageUrl') as string;

    // We need to import hashPassword here, but imports from 'lib' in server actions work fine.
    // However, importing from a file that imports 'bcryptjs' might be tricky if not careful with runtimes,
    // but Server Actions run on Node by default in App Router (unless configured otherwise).
    // Let's dynamically import or ensure lib/password is node-safe. It is.
    const { hashPassword } = await import("@/lib/password");
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
            bio,
            avatarUrl: imageUrl,
            inviteCodeUsed: code
        });

        if (code !== 'PALM100') {
            const invite = await db.query.invites.findFirst({ where: eq(invites.code, code) });
            if (invite) {
                await db.update(invites).set({
                    timesUsed: invite.timesUsed + 1,
                    isUsed: (invite.usageLimit !== null && invite.timesUsed + 1 >= invite.usageLimit)
                }).where(eq(invites.code, code));
            }
        }
    } catch (e) {
        console.error("Registration Error", e);
        return { error: "Registration failed" };
    }

    redirect('/login');
}
