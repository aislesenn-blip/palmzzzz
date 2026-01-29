'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Star, X } from 'lucide-react';

export default function ProductFeed({ products, whatsappNumber, template }: any) {
    const [selectedProduct, setSelectedProduct] = useState<any>(null);

    return (
        <>
            <div className="max-w-md mx-auto p-4 flex flex-col gap-6 mt-4">
                {products.length === 0 ? (
                     <div className="text-center py-20 text-gray-500">No products yet.</div>
                ) : (
                    products.map((p: any) => (
                        <div
                            key={p.id}
                            className={`bg-white overflow-hidden shadow-sm border border-gray-100 cursor-pointer transition-transform hover:scale-[1.02] ${template === 'Titan' ? 'rounded-none' : 'rounded-3xl'}`}
                            onClick={() => setSelectedProduct(p)}
                        >
                            <div className="relative aspect-[4/5] w-full bg-gray-200">
                                <Image src={p.imageUrl} alt={p.name} fill className="object-cover" />
                                <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur px-4 py-2 rounded-full font-bold shadow-lg">
                                    {p.price}
                                </div>
                            </div>
                            <div className="p-6">
                                <h2 className="text-2xl font-bold">{p.name}</h2>
                                <div className="flex items-center gap-1 text-yellow-400 mt-1">
                                    <Star size={16} fill="currentColor" />
                                    <span className="text-gray-500 text-sm font-medium">5.0</span>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <AnimatePresence>
                {selectedProduct && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProduct(null)}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: "0%" }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-white z-50 rounded-t-3xl overflow-hidden max-h-[90vh] overflow-y-auto"
                        >
                            <div className="relative">
                                <button
                                    onClick={() => setSelectedProduct(null)}
                                    className="absolute top-4 right-4 bg-gray-100 p-2 rounded-full z-10"
                                >
                                    <X size={20} />
                                </button>
                                <div className="relative aspect-square w-full">
                                    <Image src={selectedProduct.imageUrl} alt={selectedProduct.name} fill className="object-cover" />
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h2 className="text-3xl font-bold">{selectedProduct.name}</h2>
                                            <div className="flex items-center gap-2 mt-2">
                                                 <div className="flex text-yellow-400">
                                                    {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                                 </div>
                                                 <span className="text-gray-400 text-sm">(12 reviews)</span>
                                            </div>
                                        </div>
                                        <div className="text-2xl font-bold bg-gray-100 px-4 py-2 rounded-lg">
                                            {selectedProduct.price}
                                        </div>
                                    </div>

                                    <p className="text-gray-600 leading-relaxed mb-8">
                                        {selectedProduct.description || "No description provided."}
                                    </p>

                                    <a
                                        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(`Hi, I want to buy "${selectedProduct.name}" for ${selectedProduct.price}.`)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block w-full bg-green-500 text-white font-bold text-center py-4 rounded-xl hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-lg"
                                    >
                                        <MessageCircle size={24} />
                                        Buy on WhatsApp
                                    </a>

                                    <div className="mt-8 pt-8 border-t border-gray-100 text-center">
                                        <p className="text-sm font-bold text-gray-400 uppercase mb-4">Rate this product</p>
                                        <div className="flex justify-center gap-2">
                                            {[1,2,3,4,5].map(i => (
                                                <button key={i} className="text-gray-300 hover:text-yellow-400 transition-colors">
                                                    <Star size={32} />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
