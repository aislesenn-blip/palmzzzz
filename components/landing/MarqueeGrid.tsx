'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const images = [
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=500&q=80', // Fashion
    'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=500&q=80', // Workspace
    'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80', // Watch
    'https://images.unsplash.com/photo-1596462502278-27bfdd403348?w=500&q=80', // Skincare
    'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&q=80', // Sneakers
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80', // Red Shoe
    'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=500&q=80', // Laptop
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80', // Headphones
];

export default function MarqueeGrid() {
    return (
        <div className="relative h-full w-full overflow-hidden bg-gray-50/50">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-white via-transparent to-transparent" />

            <div className="grid grid-cols-2 gap-4 p-4 h-[150%] -mt-20">
                <Column images={images.slice(0, 4)} duration={20} />
                <Column images={images.slice(4, 8)} duration={25} />
            </div>

            {/* Sales Notification Overlay */}
            <SalesNotification />
        </div>
    );
}

function Column({ images, duration }: { images: string[], duration: number }) {
    return (
        <motion.div
            animate={{ y: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, duration, ease: "linear" }}
            className="flex flex-col gap-4"
        >
            {[...images, ...images].map((src, i) => (
                <div key={i} className="relative aspect-[3/4] w-full overflow-hidden rounded-xl shadow-lg">
                    <Image src={src} alt="Product" fill className="object-cover" />
                </div>
            ))}
        </motion.div>
    );
}

function SalesNotification() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2, duration: 0.5 }}
            className="absolute bottom-10 right-10 z-20 bg-white/90 backdrop-blur-md px-4 py-3 rounded-full shadow-xl border border-gray-100 flex items-center gap-3"
        >
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold text-xs">$50</div>
            <div>
                <p className="text-xs font-semibold text-gray-900">Just sold</p>
                <p className="text-[10px] text-gray-500">2 seconds ago</p>
            </div>
        </motion.div>
    );
}
