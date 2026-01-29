"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createProduct } from "@/app/actions";

export default function AddProductModal({ userPlan, productCount }: { userPlan: string, productCount: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (userPlan === 'free' && productCount >= 10) {
            alert("Upgrade to Pro to add more products.");
            return;
        }

        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ filename: file.name, contentType: file.type }),
            });
            const { uploadUrl, publicUrl } = await res.json();

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

    if (!isOpen) return <Button onClick={() => setIsOpen(true)}>+ New Drop</Button>;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-3xl w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif font-bold">New Product Drop</h2>
                    <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-black">✕</button>
                </div>

                <form action={async (formData) => {
                    await createProduct(formData);
                    setIsOpen(false);
                    setImageUrl("");
                }} className="space-y-6">
                    <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer relative group">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                        {imageUrl ? (
                            <img src={imageUrl} className="h-40 mx-auto object-cover rounded-lg shadow-sm" />
                        ) : (
                            <div className="space-y-2">
                                <span className="text-4xl block">☁️</span>
                                <span className="text-gray-400 font-bold block">{uploading ? "Uploading..." : "Drop Image Here"}</span>
                            </div>
                        )}
                        <input type="hidden" name="imageUrl" value={imageUrl} required />
                    </div>

                    <Input name="title" placeholder="Product Name" required />
                    <div className="relative">
                        <span className="absolute left-4 top-4 text-gray-400 font-bold">$</span>
                        <input name="price" type="number" placeholder="Price" className="w-full p-4 pl-8 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none font-bold text-lg" required />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Description (Tell the story...)"
                        className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-colors resize-none"
                        rows={4}
                    />

                    <div className="flex gap-4 pt-2">
                        <Button className="flex-1 bg-gray-100 text-black hover:bg-gray-200" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" className="flex-1 bg-electric" disabled={!imageUrl || uploading}>Launch Product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
