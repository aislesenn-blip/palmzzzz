"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, X, Lock } from "lucide-react";

export default function ViralInviteModal({ invitesRemaining }: { invitesRemaining: number }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Trigger 3 minutes (180000ms) after mount
        if (invitesRemaining > 0) {
            const timer = setTimeout(() => setIsOpen(true), 180000);
            return () => clearTimeout(timer);
        }
    }, [invitesRemaining]);

    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} className="bg-[#D2E823] text-black px-5 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:scale-105 transition-transform border border-black/10 shadow-sm">
            <Plus size={18} strokeWidth={3} /> Invite ({invitesRemaining})
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative text-center border-4 border-[#D2E823] scale-100 animate-in zoom-in-95">
                <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"><X /></button>

                <div className="text-7xl mb-6">🤝</div>
                <h2 className="text-4xl font-serif font-black mb-4 text-black">Building the Circle.</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed font-medium">
                    You have <span className="font-bold text-black border-b-2 border-[#D2E823]">{invitesRemaining} Invites</span> for other Business People. This pools traffic across stores.
                </p>

                <div className="bg-[#F3F3F1] rounded-2xl p-6 mb-8 border border-gray-200">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Expires In</p>
                    <p className="text-4xl font-mono font-black text-[#780016]">47:59:59</p>
                </div>

                <Button className="w-full py-5 text-xl shadow-xl hover:scale-105 transition-transform bg-black text-white" onClick={() => setIsOpen(false)}>Send Invites</Button>
            </div>
        </div>
    );
}
