'use client';

import { useState } from 'react';
import { GlobeAltIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function RemoteMySQLPage() {
  const [allowedHosts] = useState([
    { id: 1, host: '192.168.1.100', addedAt: '2024-12-10 14:30', status: 'active' },
    { id: 2, host: '203.0.113.50', addedAt: '2024-12-08 10:15', status: 'active' },
    { id: 3, host: '%.example.com', addedAt: '2024-11-20 09:00', status: 'active' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <GlobeAltIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Remote MySQL</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Uzaktan MySQL erişimini yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">⚠️ Security Warning</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Remote MySQL erişimi güvenlik riski oluşturabilir. Yalnızca güvendiğiniz IP adreslerine izin verin ve güçlü şifreler kullanın.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Access Host</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Host IP Address or Domain
            </label>
            <input 
              type="text" 
              placeholder="192.168.1.100 or %.example.com" 
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Use % as wildcard (e.g., %.example.com allows all subdomains)
            </p>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add Host
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Access Hosts</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Host</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Added At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {allowedHosts.map((host) => (
              <tr key={host.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white font-mono">{host.host}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{host.addedAt}</td>
                <td className="px-6 py-4">
                  {host.status === 'active' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs">
                      <CheckCircleIcon className="w-4 h-4" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs">
                      <XCircleIcon className="w-4 h-4" /> Inactive
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Connection Information</h3>
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 space-y-2 text-sm font-mono">
          <p><strong>Server:</strong> siyezden.com</p>
          <p><strong>Port:</strong> 3306</p>
          <p><strong>Username:</strong> siyezden_dbuser</p>
          <p><strong>Database:</strong> siyezden_database</p>
        </div>
      </div>
    </div>
  );
}
