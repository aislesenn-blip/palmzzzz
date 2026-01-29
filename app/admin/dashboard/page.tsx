import { db } from "@/lib/db";
import { users } from "@/db/schema";
import { count } from "drizzle-orm";

export const dynamic = 'force-dynamic';

type User = typeof users.$inferSelect;

export default async function AdminDashboard() {
    let userCount = 0;
    let allUsers: User[] = [];

    try {
        const userCountRes = await db.select({ count: count() }).from(users);
        if (userCountRes && userCountRes[0]) {
            userCount = userCountRes[0].count;
        }
        allUsers = await db.select().from(users);
    } catch (e) {
        console.error("DB Error:", e);
        // Fallback for build time if DB is not reachable or tables missing
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <h1 className="text-4xl font-extrabold mb-8">Empire Command.</h1>
            <div className="bg-white p-8 rounded-3xl shadow-sm mb-8 max-w-sm">
                <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Citizens</h3>
                <p className="text-6xl font-black mt-2">{userCount}</p>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Handle</th>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Email</th>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Plan</th>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">WhatsApp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((u) => (
                            <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold">@{u.handle}</td>
                                <td className="p-4 text-gray-500">{u.email}</td>
                                <td className="p-4"><span className="bg-black text-white text-xs font-bold px-2 py-1 rounded">{u.planStatus}</span></td>
                                <td className="p-4 text-gray-500 font-mono text-xs">{u.whatsappNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
