"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { Plus, X } from "lucide-react";

export default function ViralInviteModal({ invitesRemaining }: { invitesRemaining: number }) {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (invitesRemaining > 0) {
            const timer = setTimeout(() => setIsOpen(true), 180000); // 3 minutes
            return () => clearTimeout(timer);
        }
    }, [invitesRemaining]);

    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} className="bg-lime text-charcoal px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-lime/80 transition-colors">
            <Plus size={16} /> Invite ({invitesRemaining})
        </button>
    );

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-300">
            <div className="bg-white p-10 rounded-[2.5rem] w-full max-w-md shadow-2xl relative text-center border-4 border-lime">
                <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-gray-400 hover:text-black transition-colors"><X /></button>

                <div className="text-6xl mb-6">🤝</div>
                <h2 className="text-4xl font-serif font-bold mb-4 text-charcoal">Building the Circle.</h2>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                    You have <span className="font-bold text-black">{invitesRemaining} Invites</span> for other Business People. This pools traffic across stores.
                </p>

                <div className="bg-gray-100 rounded-xl p-4 mb-8">
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Expires In</p>
                    <p className="text-3xl font-mono font-bold text-maroon">47:59:59</p>
                </div>

                <Button variant="primary" className="w-full py-4 text-lg shadow-xl" onClick={() => setIsOpen(false)}>Send Invites</Button>
            </div>
        </div>
    );
}
