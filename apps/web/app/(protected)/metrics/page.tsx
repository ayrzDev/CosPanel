'use client';
import { useEffect, useState } from 'react';

export default function MetricsLive() {
  const [ticks, setTicks] = useState<number[]>([]);
  useEffect(() => {
    const id = setInterval(() => setTicks((t) => [...t.slice(-30), Math.random() * 100]), 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold mb-4">Canlı Metrikler</h2>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {['CPU', 'RAM', 'Disk'].map((k, idx) => (
          <div key={idx} className="border rounded-lg p-4">
            <div className="text-sm text-muted-foreground mb-2">{k}</div>
            <div className="h-24 bg-muted rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}
