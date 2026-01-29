'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload } from 'lucide-react';

export default function AddProductModal({ isOpen, onClose, onProductAdded }: any) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [upgradeMode, setUpgradeMode] = useState(false);

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!file) return alert('Please upload an image');

        setUploading(true);
        try {
            // 1. Get Presigned URL
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ filename: file.name, contentType: file.type }),
                headers: { 'Content-Type': 'application/json' }
            });
            const { uploadUrl, publicUrl } = await res.json();

            // 2. Upload to R2
            if (!uploadUrl.includes('mock-upload')) {
                await fetch(uploadUrl, {
                    method: 'PUT',
                    body: file,
                    headers: { 'Content-Type': file.type }
                });
            }

            // 3. Create Product in DB
             const prodRes = await fetch('/api/products', {
                method: 'POST',
                body: JSON.stringify({ name, price, description, imageUrl: publicUrl }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (prodRes.ok) {
                onProductAdded();
                onClose();
                setName('');
                setPrice('');
                setDescription('');
                setFile(null);
            } else {
                const data = await prodRes.json();
                if (prodRes.status === 403 && data.error.includes("Store Full")) {
                    setUpgradeMode(true);
                } else {
                    alert(data.error || 'Failed');
                }
            }
        } catch (error) {
            console.error(error);
            alert('Failed to create product');
        } finally {
            setUploading(false);
        }
    };

    const handleUpgrade = async () => {
        // Send upgrade request (mock)
        alert("Upgrade request sent to Admin.");
        onClose();
        setUpgradeMode(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="bg-white rounded-xl p-8 w-full max-w-lg shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">{upgradeMode ? "Limit Reached" : "Drop a Product"}</h2>
                            <button onClick={onClose}><X /></button>
                        </div>

                        {upgradeMode ? (
                            <div className="text-center py-8">
                                <p className="text-gray-500 mb-6">You have reached the 10 product limit on the Free plan.</p>
                                <h3 className="text-3xl font-bold mb-8">Upgrade to Pro ($2/mo)</h3>
                                <button
                                    onClick={handleUpgrade}
                                    className="w-full bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800"
                                >
                                    Request Upgrade
                                </button>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                                <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer relative">
                                    <input
                                        type="file"
                                        className="absolute inset-0 opacity-0 cursor-pointer"
                                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                                        accept="image/*"
                                    />
                                    <Upload className="mb-2" />
                                    <p>{file ? file.name : "Drag & Drop High-Res Photo (4K)"}</p>
                                </div>

                                <input value={name} onChange={e => setName(e.target.value)} placeholder="Product Name" className="p-4 border rounded-lg font-bold" required />
                                <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price (e.g. $50 or Free)" className="p-4 border rounded-lg" required />
                                <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" className="p-4 border rounded-lg" />

                                <button type="submit" disabled={uploading} className="bg-black text-white p-4 rounded-lg font-bold hover:bg-gray-800 disabled:opacity-50">
                                    {uploading ? 'Uploading...' : 'Publish Product'}
                                </button>
                            </form>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
