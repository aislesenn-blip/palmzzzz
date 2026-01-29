"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createProduct } from "@/app/actions";

export default function AddProductModal() {
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Get presigned URL
            const res = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ filename: file.name, contentType: file.type }),
            });
            const { uploadUrl, publicUrl } = await res.json();

            // 2. Upload to R2
            await fetch(uploadUrl, {
                method: "PUT",
                body: file,
                headers: { "Content-Type": file.type },
            });

            setImageUrl(publicUrl);
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
        }
    };

    if (!isOpen) return <Button onClick={() => setIsOpen(true)}>+ Add Product</Button>;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg">
                <h2 className="text-2xl font-bold mb-6">New Drop</h2>
                <form action={async (formData) => {
                    await createProduct(formData);
                    setIsOpen(false);
                }} className="space-y-4">
                    <Input name="title" placeholder="Product Name" required />
                    <Input name="price" type="number" placeholder="Price (USD)" required />
                    <textarea
                        name="description"
                        placeholder="Description"
                        className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100"
                        rows={3}
                    />

                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
                        {imageUrl ? (
                            <img src={imageUrl} className="h-32 mx-auto object-cover rounded-lg" />
                        ) : (
                            <label className="cursor-pointer block">
                                <span className="text-gray-400 font-bold">{uploading ? "Uploading..." : "Upload Image"}</span>
                                <input type="file" onChange={handleFileChange} className="hidden" accept="image/*" />
                            </label>
                        )}
                        <input type="hidden" name="imageUrl" value={imageUrl} required />
                    </div>

                    <div className="flex gap-4 mt-6">
                        <Button className="flex-1 bg-gray-100 text-black hover:bg-gray-200" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" className="flex-1" disabled={!imageUrl || uploading}>Launch</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
