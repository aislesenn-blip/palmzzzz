"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Star } from "lucide-react";

export default function ProductDrawer({ product, whatsappNumber }: { product: any, whatsappNumber: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border border-gray-100 group relative">
                <div className="aspect-[4/5] relative overflow-hidden">
                     <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6 flex justify-between items-center bg-white relative z-10">
                    <div>
                        <h3 className="font-bold text-lg leading-tight mb-1 text-charcoal">{product.title}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm flex items-center gap-1"><Star size={12} fill="currentColor"/> 5.0</span>
                            <span className="text-gray-300 text-xs">•</span>
                            <span className="text-charcoal font-bold">${product.price}</span>
                        </div>
                    </div>
                    <button className="bg-[#153308] text-[#D2E823] px-6 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-lg">
                        GET
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
                        />
                        <motion.div
                            initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[2.5rem] z-50 max-h-[85vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="sticky top-0 bg-white z-10 pt-6 pb-2 px-6 flex justify-center">
                                <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
                                <button onClick={() => setIsOpen(false)} className="absolute right-6 top-6 bg-gray-100 p-2 rounded-full hover:bg-gray-200"><X size={20}/></button>
                            </div>

                            <div className="p-8 pt-2 pb-32">
                                <div className="aspect-square rounded-3xl overflow-hidden mb-8 shadow-inner bg-gray-100">
                                    <img src={product.image} className="w-full h-full object-cover" />
                                </div>

                                <h2 className="text-4xl font-serif font-bold mb-2 text-charcoal">{product.title}</h2>
                                <p className="text-3xl font-bold text-electric mb-8">${product.price}</p>

                                <div className="prose prose-lg text-gray-600 mb-12 leading-relaxed">
                                    {product.description || "No description provided."}
                                </div>

                                <div className="bg-[#F3F3F1] rounded-3xl p-8 mb-8">
                                    <h4 className="font-bold mb-6 flex items-center gap-3 text-xl font-serif text-black">
                                        <span>Reviews</span>
                                        <span className="bg-black text-white text-xs px-3 py-1 rounded-full font-sans">3</span>
                                    </h4>
                                    {[1,2,3].map(i => (
                                        <div key={i} className="mb-6 last:mb-0 border-b border-black/5 last:border-0 pb-6 last:pb-0">
                                            <div className="flex gap-1 text-yellow-400 text-xs mb-2">★★★★★</div>
                                            <p className="text-lg font-medium text-gray-800 leading-snug">"Exactly what I needed. Delivered instantly."</p>
                                            <p className="text-xs text-gray-400 mt-2 font-bold uppercase tracking-wider">Verified Buyer</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hi, I want to buy ${product.title} for $${product.price}`}
                                    target="_blank"
                                    className="block w-full bg-[#153308] text-[#D2E823] text-center font-bold text-lg py-5 rounded-full hover:scale-[1.02] transition-transform shadow-xl"
                                >
                                    BUY ON WHATSAPP
                                </a>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}
