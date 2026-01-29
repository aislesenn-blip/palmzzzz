'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import confetti from 'canvas-confetti';
import { useRouter } from 'next/navigation';

export default function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    inviteCode: '',
    email: '',
    password: '',
    handle: '',
    whatsappNumber: '',
    template: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleNext = async () => {
    setError('');
    if (step === 1) {
        if (!formData.inviteCode) return setError('Invite code is required.');
        setStep(2);
    } else if (step === 2) {
        if (!formData.email || !formData.password || !formData.handle) return setError('All fields required.');
        setStep(3);
    } else if (step === 3) {
        if (!formData.whatsappNumber) return setError('WhatsApp number is required.');
        setStep(4);
    } else if (step === 4) {
        if (!formData.template) return setError('Please select a vibe.');

        setLoading(true);
        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                body: JSON.stringify(formData),
                headers: { 'Content-Type': 'application/json' }
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Registration failed');

            setStep(5);
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }
  };

  const images: {[key: number]: string} = {
      1: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1000&q=80', // Handshake / Gate
      2: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1000&q=80', // Future Office
      3: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1000&q=80', // Messaging
      4: 'https://images.unsplash.com/photo-1556742502-ec7c0e9f34b1?w=1000&q=80', // Shopping/Vibe
      5: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1000&q=80', // Celebration
  };

  return (
    <div className="flex h-screen w-full overflow-hidden">
        {/* Left Input Section */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
            <div className="max-w-md w-full">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                            <h2 className="text-3xl font-bold mb-2">The Gate.</h2>
                            <p className="text-gray-500 mb-6">Enter your invite code to access the 1%.</p>
                            <input
                                type="text"
                                placeholder="Invite Code"
                                className="w-full p-4 border border-gray-200 rounded-lg mb-4 focus:ring-2 focus:ring-black outline-none"
                                value={formData.inviteCode}
                                onChange={e => setFormData({...formData, inviteCode: e.target.value})}
                            />
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                            <h2 className="text-3xl font-bold mb-2">Identity.</h2>
                            <p className="text-gray-500 mb-6">Create your creator profile.</p>
                            <input
                                type="email"
                                placeholder="Email"
                                className="w-full p-4 border border-gray-200 rounded-lg mb-4"
                                value={formData.email}
                                onChange={e => setFormData({...formData, email: e.target.value})}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full p-4 border border-gray-200 rounded-lg mb-4"
                                value={formData.password}
                                onChange={e => setFormData({...formData, password: e.target.value})}
                            />
                            <input
                                type="text"
                                placeholder="Handle"
                                className="w-full p-4 border border-gray-200 rounded-lg mb-4"
                                value={formData.handle}
                                onChange={e => setFormData({...formData, handle: e.target.value})}
                            />
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                            <h2 className="text-3xl font-bold mb-2">The Engine.</h2>
                            <p className="text-gray-500 mb-6">This is your checkout counter. Orders sent here.</p>
                            <input
                                type="text"
                                placeholder="WhatsApp Number (e.g., +1234567890)"
                                className="w-full p-4 border border-gray-200 rounded-lg mb-4"
                                value={formData.whatsappNumber}
                                onChange={e => setFormData({...formData, whatsappNumber: e.target.value})}
                            />
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                            <h2 className="text-3xl font-bold mb-2">The Vibe Check.</h2>
                            <p className="text-gray-500 mb-6">Choose your storefront aesthetic.</p>
                            <div className="grid grid-cols-1 gap-4">
                                {['Muse', 'Titan', 'Studio'].map((t) => (
                                    <div
                                        key={t}
                                        onClick={() => setFormData({...formData, template: t})}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.template === t ? 'border-black bg-gray-50' : 'border-gray-100 hover:border-gray-300'}`}
                                    >
                                        <h3 className="font-bold">{t}</h3>
                                        <p className="text-sm text-gray-500">
                                            {t === 'Muse' ? 'Soft & Pink' : t === 'Titan' ? 'Dark & Luxury' : 'Clean & White'}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                     {step === 5 && (
                        <motion.div key="step5" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                            <h2 className="text-4xl font-bold mb-4">Welcome to the 1%.</h2>
                            <p className="text-gray-500 mb-8">Your store is ready.</p>
                            <button
                                onClick={() => router.push('/dashboard')}
                                className="w-full bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800"
                            >
                                Enter Dashboard
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {error && <p className="text-red-500 mt-4 text-sm">{error}</p>}

                {step < 5 && (
                    <button
                        onClick={handleNext}
                        disabled={loading}
                        className="w-full mt-6 bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50"
                    >
                        {loading ? 'Processing...' : step === 1 ? 'Unlock Access' : step === 4 ? 'Launch Store' : 'Continue'}
                    </button>
                )}
            </div>
        </div>

        {/* Right Image Section */}
        <div className="hidden lg:block w-1/2 h-full relative overflow-hidden bg-gray-100">
             <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.7 }}
                    className="absolute inset-0"
                >
                     <Image
                        src={images[step]}
                        alt="Onboarding"
                        fill
                        className="object-cover"
                        priority
                     />
                     <div className="absolute inset-0 bg-black/10" />
                </motion.div>
             </AnimatePresence>
        </div>
    </div>
  );
}
