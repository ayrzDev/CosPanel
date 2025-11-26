'use client';

import { useState } from 'react';
import { LockClosedIcon, KeyIcon } from '@heroicons/react/24/outline';

export default function EncryptionPage() {
  const [gnupgStatus] = useState({ installed: true, version: '2.2.27' });
  const [keys] = useState([
    { id: 1, email: 'admin@siyezden.com', keyId: '1A2B3C4D', type: 'RSA 4096', created: '2024-01-15' },
    { id: 2, email: 'support@siyezden.com', keyId: '5E6F7G8H', type: 'RSA 4096', created: '2024-03-20' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <LockClosedIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Email Encryption</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">GnuPG anahtarlarını yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">GnuPG Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {gnupgStatus.installed ? (
                <span className="text-green-600">✓ Installed - Version {gnupgStatus.version}</span>
              ) : (
                <span className="text-red-600">✗ Not Installed</span>
              )}
            </p>
          </div>
          <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">Generate New Key</button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <KeyIcon className="w-5 h-5" /> PGP Keys
          </h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Key ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {keys.map((key) => (
              <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{key.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{key.keyId}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{key.type}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{key.created}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Export</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
