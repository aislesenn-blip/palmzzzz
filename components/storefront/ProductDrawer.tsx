"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDrawer({ product, whatsappNumber }: { product: any, whatsappNumber: string }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div onClick={() => setIsOpen(true)} className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:scale-[1.02] transition-all cursor-pointer border border-gray-100 group relative">
                <div className="aspect-[4/5] relative overflow-hidden">
                     <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
                <div className="p-6 flex justify-between items-center bg-white relative z-10">
                    <div>
                        <h3 className="font-bold text-lg leading-tight mb-1 text-charcoal">{product.title}</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-yellow-400 text-sm">★ 5.0</span>
                            <span className="text-gray-300 text-xs">•</span>
                            <span className="text-charcoal font-bold">${product.price}</span>
                        </div>
                    </div>
                    <button className="bg-charcoal text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-black transition-colors shadow-lg">
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
                            </div>

                            <div className="p-8 pt-2 pb-32">
                                <div className="aspect-square rounded-2xl overflow-hidden mb-8 shadow-inner bg-gray-100">
                                    <img src={product.imageUrl} className="w-full h-full object-cover" />
                                </div>

                                <h2 className="text-3xl font-serif font-bold mb-2 text-charcoal">{product.title}</h2>
                                <p className="text-2xl font-bold text-electric mb-6">${product.price}</p>

                                <div className="prose prose-lg text-gray-600 mb-8 leading-relaxed">
                                    {product.description || "No description provided."}
                                </div>

                                <div className="bg-cream rounded-2xl p-6 mb-8">
                                    <h4 className="font-bold mb-4 flex items-center gap-2">
                                        <span>Reviews</span>
                                        <span className="bg-black text-white text-xs px-2 py-0.5 rounded-full">3</span>
                                    </h4>
                                    {[1,2,3].map(i => (
                                        <div key={i} className="mb-4 last:mb-0 border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                                            <div className="flex gap-1 text-yellow-400 text-xs mb-1">★★★★★</div>
                                            <p className="text-sm font-medium text-gray-800">"Exactly what I needed. Delivered instantly."</p>
                                            <p className="text-xs text-gray-400 mt-1">Verified Buyer</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-gray-100">
                                <a
                                    href={`https://wa.me/${whatsappNumber}?text=Hi, I want to buy ${product.title} for $${product.price}`}
                                    target="_blank"
                                    className="block w-full bg-forest text-white text-center font-bold text-lg py-4 rounded-full hover:scale-[1.02] transition-transform shadow-xl"
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
