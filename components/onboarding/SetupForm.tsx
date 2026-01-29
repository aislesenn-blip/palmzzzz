"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SetupForm() {
    const [uploading, setUploading] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const router = useRouter();

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
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

    async function handleSubmit(formData: FormData) {
        // This invokes the server action passed as a prop or imported?
        // In the parent page, I can't easily pass server action to client component unless passed as prop.
        // For simplicity, let's make this component handle the submission via API or server action prop.
        // Let's use a server action imported from a file.
        await updateProfile(formData);
    }

    // We need to import the server action.
    // Let's assume we create app/actions/setup.ts or similar.
    // For now, I'll inline the server action in the previous file and pass it? No, client components can't import server actions directly from page files easily if not careful.
    // I will create app/actions.ts for this.

    return (
        <form action={handleSubmit} className="space-y-8">
             <div className="flex justify-center">
                <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group hover:border-black transition-colors cursor-pointer bg-gray-50">
                    <input type="file" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" required />
                    {imageUrl ? (
                        <img src={imageUrl} className="w-full h-full object-cover" />
                    ) : (
                        <div className="text-center p-2">
                            <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                            <span className="text-[10px] font-bold text-gray-400 uppercase">Upload Avatar</span>
                        </div>
                    )}
                </div>
            </div>
            <input type="hidden" name="imageUrl" value={imageUrl} required />

            <div>
                <label className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2 block">Bio</label>
                <textarea
                    name="bio"
                    placeholder="Tell us who you are (Min 10 words)..."
                    className="w-full p-4 bg-white border-2 border-gray-100 rounded-xl focus:border-black outline-none transition-colors font-medium text-lg placeholder-gray-300 resize-none h-32"
                    required
                    minLength={50} // Rough approx for 10 words
                />
            </div>

            <Button type="submit" variant="primary" className="w-full py-4 text-lg" disabled={!imageUrl || uploading}>Enter Dashboard</Button>
        </form>
    )
}

// Helper to bridge the server action
import { updateProfile } from "@/app/actions";
