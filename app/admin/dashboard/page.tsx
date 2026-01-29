import { db } from '@/lib/db';
import { users, products } from '@/db/schema';
import { count, desc } from 'drizzle-orm';
import GenerateInviteButton from '@/components/admin/GenerateInviteButton';
import TrafficInjection from '@/components/admin/TrafficInjection';

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const userCount = (await db.select({ count: count() }).from(users))[0].count;
    const productCount = (await db.select({ count: count() }).from(products))[0].count;
    const allUsers = await db.select().from(users).orderBy(desc(users.createdAt)).limit(50);

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <h1 className="text-4xl font-bold mb-8">Empire Overview.</h1>

            <div className="grid grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 uppercase font-bold text-xs">Total Users</h3>
                    <p className="text-5xl font-bold mt-2">{userCount}</p>
                </div>
                <div className="bg-white p-8 rounded-xl shadow-sm">
                    <h3 className="text-gray-500 uppercase font-bold text-xs">Total Products</h3>
                    <p className="text-5xl font-bold mt-2">{productCount}</p>
                </div>
                 <div className="bg-white p-8 rounded-xl shadow-sm flex flex-col justify-center items-center">
                    <GenerateInviteButton />
                </div>
            </div>

            <TrafficInjection />

            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <table className="w-full">
                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th className="p-4 text-left">User</th>
                            <th className="p-4 text-left">Email</th>
                            <th className="p-4 text-left">WhatsApp</th>
                            <th className="p-4 text-left">Plan</th>
                            <th className="p-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map(u => (
                            <tr key={u.id} className="border-b">
                                <td className="p-4 font-bold">@{u.handle}</td>
                                <td className="p-4 text-gray-500">{u.email}</td>
                                <td className="p-4 text-gray-500">{u.whatsappNumber}</td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${u.plan === 'pro' ? 'bg-black text-white' : 'bg-gray-200'}`}>
                                        {u.plan.toUpperCase()}
                                    </span>
                                </td>
                                <td className="p-4 flex gap-2">
                                    <a href={`/${u.handle}`} target="_blank" className="text-blue-500 underline text-sm">Visit</a>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
