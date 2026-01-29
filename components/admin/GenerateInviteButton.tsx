'use client';

import { useState } from 'react';

export default function GenerateInviteButton() {
    const [lastCode, setLastCode] = useState('');

    const generate = async () => {
        const res = await fetch('/api/admin/invite', { method: 'POST' });
        const data = await res.json();
        if (data.code) {
             setLastCode(data.code);
        } else {
            alert('Failed');
        }
    };

    return (
        <div className="text-center">
            <button onClick={generate} className="bg-black text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800">Generate VIP Link</button>
            {lastCode && <div className="mt-4 p-2 bg-yellow-100 rounded font-mono text-sm select-all">{lastCode}</div>}
        </div>
    );
}
