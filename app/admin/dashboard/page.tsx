import { db } from "@/lib/db";
import { users, trafficInjections, invites } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    let userCount = 0;
    let allUsers = [];

    try {
        const userCountRes = await db.select({ count: count() }).from(users);
        if (userCountRes && userCountRes[0]) {
            userCount = userCountRes[0].count;
        }
        allUsers = await db.select().from(users);
    } catch (e) {
        console.error("DB Error:", e);
    }

    async function injectTraffic(formData: FormData) {
        "use server";
        const source = formData.get('source') as string;
        const target = formData.get('target') as string;
        await db.insert(trafficInjections).values({ sourceHandle: source, targetHandle: target });
        revalidatePath('/admin/dashboard');
    }

    async function generateInfiniteInvite() {
        "use server";
        const code = `MASTER-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
        await db.insert(invites).values({ code, usageLimit: 999999, generatedBy: 'ADMIN' });
        revalidatePath('/admin/dashboard');
    }

    async function toggleBan(userId: string, currentStatus: string) {
        "use server";
        console.log("Ban toggle", userId);
    }

    return (
        <div className="min-h-screen bg-gray-100 p-8 font-sans">
            <h1 className="text-4xl font-extrabold mb-8 text-charcoal">God Mode.</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm">
                    <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Citizens</h3>
                    <p className="text-6xl font-black mt-2 text-charcoal">{userCount}</p>
                </div>

                <div className="bg-charcoal text-white p-8 rounded-[2rem] shadow-lg">
                    <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Traffic Injection</h3>
                    <form action={injectTraffic} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="text-xs font-bold mb-1 block">Source Handle</label>
                            <input name="source" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm" placeholder="newbie" />
                        </div>
                        <div className="text-2xl mb-2">→</div>
                        <div className="flex-1">
                            <label className="text-xs font-bold mb-1 block">Target Handle</label>
                            <input name="target" className="w-full bg-gray-800 border border-gray-700 rounded-lg p-2 text-sm" placeholder="vip_user" />
                        </div>
                        <Button type="submit" className="bg-lime text-black hover:bg-white text-xs px-4">Connect</Button>
                    </form>
                </div>

                <div className="bg-electric text-white p-8 rounded-[2rem] shadow-lg">
                    <h3 className="text-white/70 font-bold uppercase text-xs tracking-widest mb-4">Growth Tools</h3>
                    <form action={generateInfiniteInvite}>
                        <Button type="submit" className="w-full bg-white text-electric hover:bg-gray-100">Generate Master Invite</Button>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Handle</th>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Email</th>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Plan</th>
                            <th className="p-4 font-bold text-xs uppercase text-gray-400">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((u: any) => (
                            <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="p-4 font-bold">@{u.handle}</td>
                                <td className="p-4 text-gray-500 text-sm">{u.email}</td>
                                <td className="p-4"><span className={`text-xs font-bold px-2 py-1 rounded ${u.planStatus === 'pro' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>{u.planStatus.toUpperCase()}</span></td>
                                <td className="p-4 flex gap-2">
                                    <form action={toggleBan.bind(null, u.id, 'active')}>
                                        <button className="text-red-500 font-bold text-xs hover:underline">BAN</button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
