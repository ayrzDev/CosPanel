'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/lib/api-client';
import { ShieldExclamationIcon } from '@heroicons/react/24/outline';

interface SpamFilter {
  id: string;
  spamScore: number;
  enabled: boolean;
  whiteList: string[];
  blackList: string[];
}

export default function SpamAssassinPage() {
  const [spamFilter, setSpamFilter] = useState<SpamFilter | null>(null);
  const [loading, setLoading] = useState(true);
  const [enabled, setEnabled] = useState(true);
  const [spamScore, setSpamScore] = useState(5);
  const [processedToday] = useState({ total: 2456, spam: 187, clean: 2269 });

  useEffect(() => {
    loadSpamFilter();
  }, []);

  const loadSpamFilter = async () => {
    try {
      const response = await apiClient.get('/email/spam-filter');
      if (response.data) {
        setSpamFilter(response.data);
        setEnabled(response.data.enabled);
        setSpamScore(response.data.spamScore || 5);
      }
    } catch (error) {
      console.error('Failed to load spam filter:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfiguration = async () => {
    try {
      await apiClient.put('/email/spam-filter', {
        isEnabled: enabled,
        spamScore: spamScore,
        whitelist: spamFilter?.whiteList || [],
        blacklist: spamFilter?.blackList || [],
      });
      alert('Configuration saved successfully!');
      loadSpamFilter();
    } catch (error) {
      console.error('Failed to save configuration:', error);
      alert('Failed to save configuration');
    }
  };

  if (loading) return <div className="p-8">Yükleniyor...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <ShieldExclamationIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Apache SpamAssassin</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Gelişmiş spam filtreleme sistemi</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Processed (24h)</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{processedToday.total.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Spam Detected</p>
          <p className="text-3xl font-bold text-red-600 mt-2">{processedToday.spam.toLocaleString()}</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Clean Emails</p>
          <p className="text-3xl font-bold text-green-600 mt-2">{processedToday.clean.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SpamAssassin Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Otomatik spam tespiti ve filtreleme</p>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{enabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Spam Score Threshold: {spamScore}
            </label>
            <input 
              type="range" 
              min="1" 
              max="10" 
              step="1" 
              value={spamScore}
              onChange={(e) => setSpamScore(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
              <span>1 (Strict)</span>
              <span>10 (Lenient)</span>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-900 rounded p-4">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Configuration</h4>
            <div className="space-y-2 text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-700 dark:text-gray-300">Auto-delete spam messages</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-gray-700 dark:text-gray-300">Add spam headers to messages</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-gray-700 dark:text-gray-300">Move spam to Junk folder</span>
              </label>
            </div>
          </div>

          <button onClick={handleSaveConfiguration} className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Save Configuration</button>
        </div>
      </div>

      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <h4 className="font-semibold text-orange-900 dark:text-orange-200 mb-2">About SpamAssassin</h4>
        <p className="text-sm text-orange-800 dark:text-orange-300">
          SpamAssassin, e-postaları çeşitli kurallara göre analiz eder ve spam skorlaması yapar. 
          Düşük skor (1-3) daha agresif filtreleme yaparken, yüksek skor (8-10) yalnızca açık spam'leri filtreler.
        </p>
      </div>
    </div>
  );
}
