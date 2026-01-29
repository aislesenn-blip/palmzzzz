"use client";

import { useState, Suspense } from "react";
import { Button } from "@/components/ui/Button"; // Will create this later
import { Input } from "@/components/ui/Input";   // Will create this later
import { Briefcase, Zap, Upload, ArrowRight, Check } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { createProduct, registerUser } from "@/app/actions";

function RegisterContent() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Step state
    const [step, setStep] = useState(1);

    // Form Data
    const [formData, setFormData] = useState({
        code: "",
        handle: searchParams.get("handle") || "",
        email: "",
        password: "",
        whatsapp: "",
        persona: "",
        template: "",
        bio: "",
        avatarUrl: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [uploading, setUploading] = useState(false);

    // --- LOGIC ---

    const handleChange = (e: any) => setFormData({...formData, [e.target.name]: e.target.value});

    const checkInvite = async () => {
        // Mock check or API call. For simplicity in this client flow we trust the user input
        // until final submission where server validates.
        if (formData.code.length > 3) setStep(2);
        else setError("Invalid Code");
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: JSON.stringify({ filename: file.name, contentType: file.type }),
            });
            const { uploadUrl, publicUrl } = await res.json();
            await fetch(uploadUrl, { method: "PUT", body: file, headers: { "Content-Type": file.type } });
            setFormData({...formData, avatarUrl: publicUrl});
        } catch (err) { alert("Upload failed"); }
        finally { setUploading(false); }
    };

    const submitRegistration = async () => {
        setLoading(true);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        await registerUser(data);
        setLoading(false);
    };

    return (
        <div className="w-full max-w-lg bg-white p-8 rounded-[2.5rem] shadow-xl">
            {/* Progress */}
            <div className="flex gap-2 mb-8">
                {[1,2,3,4,5,6].map(i => (
                    <div key={i} className={`h-1 flex-1 rounded-full ${step >= i ? "bg-black" : "bg-gray-200"}`} />
                ))}
            </div>

            {/* STEPS */}
            {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right">
                    <h1 className="text-3xl font-serif font-black mb-2">The Gate.</h1>
                    <p className="text-gray-500 mb-6">Enter your invite code.</p>
                    <input name="code" placeholder="Invite Code" onChange={handleChange} className="w-full h-14 border-2 border-black rounded-xl text-center font-mono text-xl mb-6" />
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <button onClick={checkInvite} className="w-full h-14 bg-black text-white font-bold rounded-xl hover:scale-[1.02] transition">Unlock Access</button>
                </div>
            )}

            {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right">
                    <h1 className="text-3xl font-serif font-black mb-6">Identity</h1>
                    <div className="space-y-4">
                        <input name="handle" placeholder="Handle" value={formData.handle} onChange={handleChange} className="w-full p-4 bg-gray-50 rounded-xl" />
                        <input name="email" type="email" placeholder="Email" onChange={handleChange} className="w-full p-4 bg-gray-50 rounded-xl" />
                        <input name="password" type="password" placeholder="Password" onChange={handleChange} className="w-full p-4 bg-gray-50 rounded-xl" />
                        <button onClick={() => setStep(3)} className="w-full h-14 bg-black text-white font-bold rounded-xl mt-4">Next Step</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right">
                    <h1 className="text-3xl font-serif font-black mb-2">The Engine</h1>
                    <p className="text-gray-500 mb-6 text-sm">Your checkout counter. Orders sent here.</p>
                    <input name="whatsapp" placeholder="WhatsApp Number" onChange={handleChange} className="w-full p-4 border-2 border-[#153308] rounded-xl mb-6" />
                    <button onClick={() => setStep(4)} className="w-full h-14 bg-black text-white font-bold rounded-xl">Next Step</button>
                </div>
            )}

            {step === 4 && (
                <div className="animate-in fade-in slide-in-from-right">
                    <h1 className="text-3xl font-serif font-black mb-6">Categorization</h1>
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <div onClick={() => setFormData({...formData, persona: 'business'})} className={`p-6 border-2 rounded-xl cursor-pointer ${formData.persona === 'business' ? 'border-black bg-[#D2E823]' : 'border-gray-200'}`}>
                            <Briefcase className="mb-2"/> <span className="font-bold">Business</span>
                        </div>
                        <div onClick={() => setFormData({...formData, persona: 'service'})} className={`p-6 border-2 rounded-xl cursor-pointer ${formData.persona === 'service' ? 'border-black bg-[#2C50E3] text-white' : 'border-gray-200'}`}>
                            <Zap className="mb-2"/> <span className="font-bold">Service</span>
                        </div>
                    </div>
                    <button onClick={() => setStep(5)} disabled={!formData.persona} className="w-full h-14 bg-black text-white font-bold rounded-xl disabled:opacity-50">Next Step</button>
                </div>
            )}

            {step === 5 && (
                <div className="animate-in fade-in slide-in-from-right">
                    <h1 className="text-3xl font-serif font-black mb-6">Vibe Check</h1>
                    <div className="grid grid-cols-3 gap-3 mb-6">
                        <div onClick={() => setFormData({...formData, template: 'muse'})} className={`h-32 rounded-lg bg-[#E9C0E9] cursor-pointer border-2 ${formData.template === 'muse' ? 'border-black' : 'border-transparent'}`}></div>
                        <div onClick={() => setFormData({...formData, template: 'titan'})} className={`h-32 rounded-lg bg-[#1E2330] cursor-pointer border-2 ${formData.template === 'titan' ? 'border-[#D2E823]' : 'border-transparent'}`}></div>
                        <div onClick={() => setFormData({...formData, template: 'studio'})} className={`h-32 rounded-lg bg-white border cursor-pointer border-2 ${formData.template === 'studio' ? 'border-black' : 'border-gray-200'}`}></div>
                    </div>
                    <button onClick={() => setStep(6)} disabled={!formData.template} className="w-full h-14 bg-black text-white font-bold rounded-xl disabled:opacity-50">Next Step</button>
                </div>
            )}

            {step === 6 && (
                <div className="animate-in fade-in slide-in-from-right">
                    <h1 className="text-3xl font-serif font-black mb-6">Setup Profile</h1>

                    <div className="flex justify-center mb-6">
                        <label className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-black transition">
                            <input type="file" onChange={handleUpload} className="hidden" />
                            {formData.avatarUrl ? <img src={formData.avatarUrl} className="w-full h-full rounded-full object-cover"/> : <Upload className="text-gray-400"/>}
                        </label>
                    </div>

                    <textarea placeholder="Bio (Min 10 chars)" onChange={handleChange} name="bio" className="w-full p-4 border rounded-xl mb-6 h-24 resize-none" />

                    {error && <p className="text-red-500 font-bold mb-4 text-center">{error}</p>}

                    <button onClick={submitRegistration} disabled={loading || !formData.avatarUrl || formData.bio.length < 10} className="w-full h-14 bg-[#153308] text-[#D2E823] font-bold rounded-xl hover:scale-[1.02] transition">
                        {loading ? "Creating..." : "Enter Dashboard"}
                    </button>
                </div>
            )}
        </div>
    );
}

export default function RegisterPage() {
    return (
        <div className="min-h-screen bg-[#F3F3F1] flex items-center justify-center p-6 font-sans">
            <Suspense fallback={<div>Loading...</div>}>
                <RegisterContent />
            </Suspense>
        </div>
    );
}
