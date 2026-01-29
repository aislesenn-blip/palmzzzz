'use client';

import { useEffect, useState } from 'react';
import AddProductModal from '@/components/dashboard/AddProductModal';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [tab, setTab] = useState('products');
    const router = useRouter();

    const fetchData = async () => {
        try {
            const meRes = await fetch('/api/auth/me');
            const meData = await meRes.json();
            if (!meData.user) {
                router.push('/');
                return;
            }
            setUser(meData.user);

            const prodRes = await fetch('/api/products');
            const prodData = await prodRes.json();
            setProducts(prodData.products || []);
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold">Cockpit.</h1>
                    <p className="text-gray-500">Welcome back, @{user.handle}.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800"
                >
                    + Add Product
                </button>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Views</p>
                    <p className="text-4xl font-bold mt-2">1,240</p>
                     {/* Placeholder Chart */}
                    <div className="h-10 w-full bg-blue-50 mt-4 rounded flex items-end">
                        <div className="h-full w-1/4 bg-blue-500 opacity-20"></div>
                        <div className="h-3/4 w-1/4 bg-blue-500 opacity-40"></div>
                        <div className="h-1/2 w-1/4 bg-blue-500 opacity-60"></div>
                        <div className="h-full w-1/4 bg-blue-500"></div>
                    </div>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Clicks</p>
                    <p className="text-4xl font-bold mt-2">84</p>
                </div>
                 <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">Top Product</p>
                    <p className="text-xl font-bold mt-2 truncate">{products[0]?.name || 'N/A'}</p>
                </div>
            </div>

            <div className="flex gap-4 mb-8">
                <button onClick={() => setTab('products')} className={`px-4 py-2 font-bold rounded-lg ${tab === 'products' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>Products</button>
                <button onClick={() => setTab('invites')} className={`px-4 py-2 font-bold rounded-lg ${tab === 'invites' ? 'bg-black text-white' : 'bg-gray-200 text-gray-500'}`}>Invites</button>
            </div>

            {/* Product List */}
            {tab === 'products' && (
                products.length === 0 ? (
                    <div className="bg-white rounded-xl p-12 text-center border border-dashed border-gray-300">
                        <h3 className="text-xl font-bold mb-2">Your store is empty.</h3>
                        <p className="text-gray-500 mb-6">Let's drop your first product.</p>
                        <button
                             onClick={() => setIsModalOpen(true)}
                             className="text-blue-600 font-bold hover:underline"
                        >
                            Create Product
                        </button>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden">
                        <table className="w-full">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Product</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Price</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Views</th>
                                    <th className="text-left p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Clicks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((p: any) => (
                                    <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                        <td className="p-4 font-medium">{p.name}</td>
                                        <td className="p-4 text-gray-500">{p.price}</td>
                                        <td className="p-4 text-gray-500">{p.views}</td>
                                        <td className="p-4 text-gray-500">{p.clicks}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            )}

            {tab === 'invites' && (
                <div className="bg-white p-8 rounded-xl border border-gray-100">
                    <h3 className="text-xl font-bold mb-4">Your Invites</h3>
                    <p className="mb-4 text-gray-600">You have <span className="font-bold">3</span> invites left.</p>
                    <div className="p-4 bg-gray-50 rounded border border-gray-200 flex justify-between items-center">
                        <span className="font-mono text-gray-500">https://palmtweets.com/invite/YOURCODE</span>
                        <button className="bg-black text-white px-4 py-2 rounded font-bold text-sm">Copy Link</button>
                    </div>
                </div>
            )}

            <AddProductModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProductAdded={fetchData}
            />
        </div>
    );
}
