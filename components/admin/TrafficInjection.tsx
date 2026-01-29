'use client';
import { useState } from 'react';

export default function TrafficInjection() {
    const [source, setSource] = useState('');
    const [target, setTarget] = useState('');

    const handleInject = async () => {
        await fetch('/api/admin/traffic', {
            method: 'POST',
            body: JSON.stringify({ source, target }),
            headers: { 'Content-Type': 'application/json' }
        });
        alert('Traffic Matrix Updated.');
        setSource('');
        setTarget('');
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm mb-12">
            <h3 className="text-gray-500 uppercase font-bold text-xs mb-4">The Matrix (Traffic Injection)</h3>
            <div className="flex gap-4">
                <input
                    placeholder="@source (e.g. newbie)"
                    className="p-4 border rounded w-1/2"
                    value={source}
                    onChange={e => setSource(e.target.value)}
                />
                <input
                    placeholder="@target (e.g. vip_store)"
                    className="p-4 border rounded w-1/2"
                    value={target}
                    onChange={e => setTarget(e.target.value)}
                />
                <button onClick={handleInject} className="bg-black text-white px-8 rounded font-bold hover:bg-gray-800">Inject</button>
            </div>
        </div>
    );
}
