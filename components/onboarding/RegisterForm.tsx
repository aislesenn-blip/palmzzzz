"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Briefcase, Zap, Upload } from "lucide-react";
import { createProduct, registerUser } from "@/app/actions"; // We will create registerUser action

export default function RegisterForm({ params }: { params: any }) {
    const [step, setStep] = useState(2);
    const [formData, setFormData] = useState({
        code: params.code,
        handle: params.handle,
        email: '',
        password: '',
        whatsapp: '',
        persona: '',
        template: '',
        bio: '',
        imageUrl: ''
    });
    const [uploading, setUploading] = useState(false);

    const handleChange = (e: any) => setFormData({ ...formData, [e.target.name]: e.target.value });

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
            setFormData({ ...formData, imageUrl: publicUrl });
        } catch (err) { alert("Upload failed"); }
        finally { setUploading(false); }
    };

    const submitRegistration = async () => {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => data.append(key, value));
        await registerUser(data);
    };

    return (
        <div className="space-y-8">
            {step === 2 && (
                <>
                    <h1 className="text-3xl font-serif font-black mb-6 text-black border-b-4 border-[#D2E823] pb-2 inline-block">Identity</h1>
                    <div className="space-y-4">
                        <Input name="handle" value={`@${formData.handle}`} disabled className="bg-gray-100 text-gray-500 border-none" />
                        <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
                        <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
                        <Button onClick={() => setStep(3)} className="w-full bg-black text-white py-4 rounded-full mt-4" disabled={!formData.email || !formData.password}>Next: The Engine</Button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <h1 className="text-3xl font-serif font-black mb-2 text-black">The Engine</h1>
                    <p className="text-sm text-gray-500 mb-6 font-medium">This is your checkout counter. Orders will be sent here instantly.</p>
                    <Input name="whatsapp" placeholder="WhatsApp Number (e.g. 2547...)" className="border-[#153308] focus:border-[#D2E823]" onChange={handleChange} required />
                    <Button onClick={() => setStep(4)} className="w-full bg-black text-white py-4 rounded-full mt-6" disabled={!formData.whatsapp}>Next: Persona</Button>
                </>
            )}

            {step === 4 && (
                <>
                    <h1 className="text-3xl font-serif font-black mb-6 text-black">The Persona</h1>
                    <div className="grid grid-cols-2 gap-4">
                        <div onClick={() => setFormData({...formData, persona: 'business'})} className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-center h-40 ${formData.persona === 'business' ? 'border-black bg-[#D2E823]' : 'border-gray-200 hover:border-gray-300'}`}>
                            <Briefcase className="w-8 h-8 mb-2 text-black" />
                            <span className="font-bold text-black">Business</span>
                            <span className="text-xs text-black/70">Grow my business</span>
                        </div>
                        <div onClick={() => setFormData({...formData, persona: 'service'})} className={`p-6 rounded-2xl border-2 cursor-pointer transition-all text-center flex flex-col items-center justify-center h-40 ${formData.persona === 'service' ? 'border-black bg-[#2C50E3] text-white' : 'border-gray-200 hover:border-gray-300'}`}>
                            <Zap className="w-8 h-8 mb-2" />
                            <span className="font-bold">Service Provider</span>
                            <span className="text-xs opacity-80">Sell my skills</span>
                        </div>
                    </div>
                    <Button onClick={() => setStep(5)} className="w-full bg-black text-white py-4 rounded-full mt-6" disabled={!formData.persona}>Next: Vibe Check</Button>
                </>
            )}

            {step === 5 && (
                <>
                    <h1 className="text-3xl font-serif font-black mb-6 text-black">Vibe Check</h1>
                    <div className="grid grid-cols-3 gap-4">
                        {['Muse', 'Titan', 'Studio'].map(t => (
                            <div key={t} onClick={() => setFormData({...formData, template: t})} className={`aspect-[4/5] rounded-xl border-2 cursor-pointer relative overflow-hidden transition-all ${formData.template === t ? 'border-black scale-105 ring-2 ring-[#D2E823]' : 'border-gray-200 hover:border-gray-300'}`}>
                                <div className={`absolute inset-0 ${t === 'Muse' ? 'bg-[#E9C0E9]' : t === 'Titan' ? 'bg-[#1E2330]' : 'bg-white'}`}></div>
                                <div className={`absolute inset-0 flex items-center justify-center font-bold text-sm ${t === 'Titan' ? 'text-white' : 'text-black'}`}>{t}</div>
                            </div>
                        ))}
                    </div>
                    <Button onClick={() => setStep(6)} className="w-full bg-black text-white py-4 rounded-full mt-6" disabled={!formData.template}>Next: Setup</Button>
                </>
            )}

            {step === 6 && (
                <>
                    <h1 className="text-3xl font-serif font-black mb-2 text-black">Final Step</h1>
                    <p className="text-gray-500 mb-6">Your store needs a face.</p>

                    <div className="flex justify-center mb-6">
                        <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center relative overflow-hidden group hover:border-black transition-colors cursor-pointer bg-white">
                            <input type="file" onChange={handleUpload} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" accept="image/*" />
                            {formData.imageUrl ? (
                                <img src={formData.imageUrl} className="w-full h-full object-cover" />
                            ) : (
                                <div className="text-center p-2">
                                    <Upload className="w-6 h-6 text-gray-400 mx-auto mb-1" />
                                    <span className="text-[10px] font-bold text-gray-400 uppercase">{uploading ? "..." : "Upload"}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <textarea
                        name="bio"
                        placeholder="Bio (Min 10 words)..."
                        className="w-full p-4 bg-white border-2 border-gray-200 rounded-xl focus:border-black outline-none font-medium text-lg placeholder-gray-300 resize-none h-32 mb-6"
                        onChange={handleChange}
                    />

                    <Button onClick={submitRegistration} className="w-full bg-[#153308] text-[#D2E823] py-5 text-xl font-bold rounded-full shadow-xl hover:scale-105 transition-transform" disabled={!formData.imageUrl || !formData.bio}>Enter Dashboard</Button>
                </>
            )}
        </div>
    )
}
