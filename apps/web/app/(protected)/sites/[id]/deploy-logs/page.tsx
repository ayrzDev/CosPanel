'use client';
import { useEffect, useState } from 'react';
import { CodeLog } from '@umixpanel/ui';

export default function DeployLogs() {
  const [lines, setLines] = useState<string[]>([]);
  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setLines((prev) => [...prev, `[${new Date().toISOString()}] build step ${i}...`]);
      if (i >= 20) clearInterval(id);
    }, 300);
    return () => clearInterval(id);
  }, []);

  return (
    <main className="p-6">
      <h2 className="text-xl font-semibold mb-4">Deploy Logları</h2>
      <CodeLog lines={lines} />
    </main>
  );
}
