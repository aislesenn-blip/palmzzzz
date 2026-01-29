import { db } from "@/lib/db";
import { users, trafficInjections, invites } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { revalidatePath } from "next/cache";

export const dynamic = 'force-dynamic';

export default async function AdminDashboard() {
    const userCount = (await db.select({ count: count() }).from(users))[0].count;
    const allUsers = await db.select().from(users);

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
        // Using very high number for unlimited
        await db.insert(invites).values({ code, usageLimit: 999999, generatedBy: 'ADMIN' });
        revalidatePath('/admin/dashboard');
    }

    async function toggleBan(userId: string, currentStatus: string) {
        "use server";
        console.log("Ban toggle", userId);
    }

    return (
        <div className="min-h-screen bg-[#F3F3F1] p-8 font-sans">
            <h1 className="text-5xl font-serif font-black mb-12 text-[#1E2330]">God Mode.</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-200">
                    <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest">Total Citizens</h3>
                    <p className="text-6xl font-black mt-2 text-[#1E2330]">{userCount}</p>
                </div>

                <div className="bg-[#1E2330] text-white p-8 rounded-[2rem] shadow-xl">
                    <h3 className="text-gray-400 font-bold uppercase text-xs tracking-widest mb-4">Traffic Injection</h3>
                    <form action={injectTraffic} className="flex gap-4 items-end">
                        <div className="flex-1">
                            <label className="text-xs font-bold mb-1 block opacity-50">Source</label>
                            <input name="source" className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-sm text-white placeholder-white/30 focus:border-[#D2E823] outline-none" placeholder="newbie" />
                        </div>
                        <div className="text-2xl mb-2 text-[#D2E823]">→</div>
                        <div className="flex-1">
                            <label className="text-xs font-bold mb-1 block opacity-50">Target</label>
                            <input name="target" className="w-full bg-white/10 border border-white/10 rounded-lg p-2 text-sm text-white placeholder-white/30 focus:border-[#D2E823] outline-none" placeholder="vip_user" />
                        </div>
                        <Button type="submit" className="bg-[#D2E823] text-black hover:bg-white text-xs px-4 py-2 h-10">Connect</Button>
                    </form>
                </div>

                <div className="bg-[#2C50E3] text-white p-8 rounded-[2rem] shadow-xl">
                    <h3 className="text-white/70 font-bold uppercase text-xs tracking-widest mb-4">Growth Tools</h3>
                    <form action={generateInfiniteInvite}>
                        <Button type="submit" className="w-full bg-white text-[#2C50E3] hover:bg-gray-100 font-bold py-3 text-sm">Generate Master Invite</Button>
                    </form>
                </div>
            </div>

            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-200">
                <table className="w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100">
                        <tr>
                            <th className="p-6 font-bold text-xs uppercase text-gray-400 tracking-wider">Handle</th>
                            <th className="p-6 font-bold text-xs uppercase text-gray-400 tracking-wider">Email</th>
                            <th className="p-6 font-bold text-xs uppercase text-gray-400 tracking-wider">Plan</th>
                            <th className="p-6 font-bold text-xs uppercase text-gray-400 tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers.map((u: any) => (
                            <tr key={u.id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                                <td className="p-6 font-bold text-[#1E2330]">@{u.handle}</td>
                                <td className="p-6 text-gray-500 text-sm font-medium">{u.email}</td>
                                <td className="p-6"><span className={`text-xs font-black px-3 py-1 rounded-full uppercase tracking-wide ${u.plan === 'pro' ? 'bg-[#1E2330] text-white' : 'bg-gray-100 text-gray-500'}`}>{u.plan}</span></td>
                                <td className="p-6 flex gap-2">
                                    <form action={toggleBan.bind(null, u.id, 'active')}>
                                        <button className="text-[#780016] font-black text-xs hover:underline bg-[#780016]/10 px-3 py-1 rounded-full">BAN</button>
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
