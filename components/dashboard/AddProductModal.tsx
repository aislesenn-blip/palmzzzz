"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createProduct } from "@/app/actions"; // We will create this action
import { Upload, X, DollarSign } from "lucide-react";

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

    if (!isOpen) return <Button onClick={() => setIsOpen(true)} className="bg-black text-white px-8 py-4 text-lg shadow-lg hover:scale-105">+ New Drop</Button>;

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
            <div className="bg-white p-8 rounded-[2.5rem] w-full max-w-lg shadow-2xl scale-100 animate-in zoom-in-95 duration-200 relative">
                <button onClick={() => setIsOpen(false)} className="absolute top-8 right-8 text-gray-400 hover:text-black transition-colors"><X /></button>

                <h2 className="text-3xl font-serif font-black mb-1 text-black">New Product Drop</h2>
                <p className="text-gray-500 mb-8 font-medium">What are we selling today?</p>

                <form action={async (formData) => {
                    await createProduct(formData);
                    setIsOpen(false);
                    setImageUrl("");
                }} className="space-y-6">
                    <div className="border-2 border-dashed border-gray-200 rounded-3xl h-64 flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer relative group overflow-hidden">
                        <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                        {imageUrl ? (
                            <img src={imageUrl} className="w-full h-full object-cover" />
                        ) : (
                            <div className="text-center">
                                <div className="bg-gray-100 p-4 rounded-full inline-flex mb-4 group-hover:scale-110 transition-transform shadow-sm">
                                    <Upload className="w-8 h-8 text-gray-400" />
                                </div>
                                <p className="text-gray-400 font-bold text-sm uppercase tracking-wider">{uploading ? "Uploading..." : "Drag & Drop Image"}</p>
                            </div>
                        )}
                        <input type="hidden" name="imageUrl" value={imageUrl} required />
                    </div>

                    <Input name="title" placeholder="Product Name" required className="font-bold text-xl py-5" />
                    <div className="relative">
                        <span className="absolute left-5 top-5 text-gray-400 font-bold text-xl">$</span>
                        <input name="price" type="number" placeholder="Price" className="w-full p-5 pl-10 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none font-bold text-xl transition-colors placeholder-gray-300" required />
                    </div>

                    <textarea
                        name="description"
                        placeholder="Description (Tell the story...)"
                        className="w-full p-5 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-colors resize-none text-lg placeholder-gray-300 min-h-[120px]"
                        rows={3}
                    />

                    <div className="flex gap-4 pt-4">
                        <Button className="flex-1 bg-gray-100 text-black hover:bg-gray-200 py-5 text-lg" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button type="submit" className="flex-1 bg-[#2C50E3] text-white hover:bg-blue-600 py-5 text-lg shadow-xl" disabled={!imageUrl || uploading}>Launch Product</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
