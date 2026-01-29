"use server";

import { db } from "@/lib/db";
import { products, users } from "@/db/schema";
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

export async function updateProfile(formData: FormData) {
    const session = await auth();
    if (!session?.user) return;

    const bio = formData.get('bio') as string;
    const imageUrl = formData.get('imageUrl') as string;

    await db.update(users).set({ bio, avatarUrl: imageUrl }).where(eq(users.id, session.user.id));
    redirect('/dashboard');
}
