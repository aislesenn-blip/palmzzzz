'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleLogin = async (e: any) => {
        e.preventDefault();
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        if (data.success && data.isAdmin) {
            router.push('/admin/dashboard');
        } else {
            alert('Access Denied');
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-black text-white">
            <form onSubmit={handleLogin} className="flex flex-col gap-4 w-full max-w-sm p-8">
                <h1 className="text-2xl font-bold mb-4">God Mode.</h1>
                <input
                    className="bg-gray-900 border border-gray-800 p-4 rounded text-white"
                    placeholder="Admin Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    className="bg-gray-900 border border-gray-800 p-4 rounded text-white"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="bg-white text-black font-bold p-4 rounded hover:bg-gray-200">Enter</button>
            </form>
        </div>
    );
}
