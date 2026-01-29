"use server";

import { db } from "@/lib/db";
import { products } from "@/db/schema";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

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
