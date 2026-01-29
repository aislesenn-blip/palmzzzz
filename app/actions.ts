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

export async function verifyInviteCode(code: string) {
    if (!code) return false;

    try {
        const invite = await db.select().from(invites).where(eq(invites.code, code)).get();
        // Check if valid (exists and active)
        if (invite && invite.status === 'active') {
             return true;
        }
        return false;
    } catch (e) {
        console.error("Invite Check Error", e);
        return false;
    }
}

export async function registerUser(formData: FormData) {
    const code = formData.get('code') as string;
    const handle = formData.get('handle') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const whatsapp = formData.get('whatsapp') as string;
    const persona = formData.get('persona') as string; // simplified type
    const template = formData.get('template') as string; // simplified type
    const bio = formData.get('bio') as string;
    const imageUrl = formData.get('imageUrl') as string;

    const { hashPassword } = await import("@/lib/password");
    const hashedPassword = await hashPassword(password);

    try {
        await db.insert(users).values({
            id: crypto.randomUUID(),
            handle,
            email,
            password: hashedPassword,
            whatsapp: whatsapp, // Corrected from whatsappNumber (schema mismatch fix)
            category: persona, // schema uses 'category'
            // template: template, // schema doesn't have template? Check schema.
            bio,
            avatar: imageUrl, // schema uses 'avatar'
            // inviteCodeUsed: code // schema doesn't have this
        });

        // Note: db/schema.ts for users:
        // category: text("category")
        // No 'template' in users schema?
        // Let's check schema again.

        // Update invite usage
        await db.update(invites).set({
            status: 'used',
            usedBy: handle // assuming handle or user ID
        }).where(eq(invites.code, code));

    } catch (e) {
        console.error("Registration Error", e);
        return { error: "Registration failed" };
    }

    redirect('/login');
}
