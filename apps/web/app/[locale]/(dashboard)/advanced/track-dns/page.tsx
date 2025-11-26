'use client';

import { useState } from 'react';
import { MagnifyingGlassIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function TrackDNSPage() {
  const [domain, setDomain] = useState('');
  const [results, setResults] = useState<any>(null);

  const handleLookup = () => {
    // Simulated DNS lookup results
    setResults({
      domain: domain || 'siyezden.com',
      records: [
        { type: 'A', value: '91.217.119.88', ttl: 14400 },
        { type: 'AAAA', value: '2a0e:fd45:1f9e:2::1', ttl: 14400 },
        { type: 'MX', value: 'mail.siyezden.com', priority: 10, ttl: 14400 },
        { type: 'NS', value: 'ns1.siyezden.com', ttl: 86400 },
        { type: 'NS', value: 'ns2.siyezden.com', ttl: 86400 },
        { type: 'TXT', value: 'v=spf1 +a +mx ~all', ttl: 14400 },
      ],
      status: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <MagnifyingGlassIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track DNS</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">DNS kayıtlarını sorgulayın ve kontrol edin</p>
          </div>
        </div>
      </div>

      {/* Lookup Form */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">DNS Lookup</h3>
        <div className="flex gap-3">
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="Domain adı girin (örn: siyezden.com)"
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <button
            onClick={handleLookup}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2"
          >
            <MagnifyingGlassIcon className="w-5 h-5" />
            Lookup
          </button>
        </div>
      </div>

      {/* Results */}
      {results && (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                DNS Records for {results.domain}
              </h3>
              {results.status === 'success' ? (
                <CheckCircleIcon className="w-6 h-6 text-green-600" />
              ) : (
                <XCircleIcon className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Value</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">TTL</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {results.records.map((record: any, idx: number) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium">
                      {record.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-mono">{record.value}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{record.priority || '-'}</td>
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{record.ttl}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
