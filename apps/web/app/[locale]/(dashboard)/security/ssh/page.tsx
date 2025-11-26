'use client';

import { useState } from 'react';
import { KeyIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function SSHAccessPage() {
  const [sshEnabled, setSshEnabled] = useState(true);
  const [keys] = useState([
    { 
      id: 1,
      name: 'MacBook Pro',
      fingerprint: 'SHA256:nThbg6kXUpJWGl7E1IGOCspRomTxdCARLviKw6E5SY8',
      created: '2024-01-15',
      lastUsed: '2024-12-10'
    },
    { 
      id: 2,
      name: 'Ubuntu Desktop',
      fingerprint: 'SHA256:6Lv8QzJqF9K3p2yNxTgH4mR1sV7wB8cD9eF0gH1iJ2k',
      created: '2024-03-22',
      lastUsed: '2024-12-14'
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <KeyIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">SSH Access</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">SSH erişimi ve anahtar yönetimi</p>
          </div>
        </div>
      </div>

      {/* SSH Status */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">SSH Access Status</h3>
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
          <div>
            <p className="font-semibold text-gray-900 dark:text-white">SSH Access</p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {sshEnabled ? 'Enabled - You can connect via SSH' : 'Disabled - SSH connections not allowed'}
            </p>
          </div>
          <button
            onClick={() => setSshEnabled(!sshEnabled)}
            className={`px-6 py-2 rounded-lg font-semibold ${
              sshEnabled
                ? 'bg-red-600 hover:bg-red-700 text-white'
                : 'bg-green-600 hover:bg-green-700 text-white'
            }`}
          >
            {sshEnabled ? 'Disable SSH' : 'Enable SSH'}
          </button>
        </div>
      </div>

      {/* Connection Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">SSH Connection Information</h4>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
          <div className="flex gap-2">
            <span className="font-semibold">Host:</span>
            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">server.umixpanel.com</code>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Port:</span>
            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">22</code>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Username:</span>
            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">siyezden</code>
          </div>
          <div className="flex gap-2">
            <span className="font-semibold">Example:</span>
            <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">ssh siyezden@server.umixpanel.com</code>
          </div>
        </div>
      </div>

      {/* Import Public Key */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Import Public Key
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Name</label>
            <input
              type="text"
              placeholder="My Laptop"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Public Key</label>
            <textarea
              rows={5}
              placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC... user@hostname"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono text-sm"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Import Key
          </button>
        </div>
      </div>

      {/* Generate Key Pair */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Generate Key Pair</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Generate a new SSH key pair. The private key will be downloaded to your computer.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Key Type</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>RSA (4096 bits)</option>
              <option>RSA (2048 bits)</option>
              <option>ECDSA</option>
              <option>Ed25519</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Passphrase (Optional)</label>
            <input
              type="password"
              placeholder="Enter passphrase for extra security"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Generate & Download
          </button>
        </div>
      </div>

      {/* Public Keys */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authorized Public Keys</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Fingerprint</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Last Used</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {keys.map((key) => (
              <tr key={key.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{key.name}</td>
                <td className="px-6 py-4 text-xs font-mono text-gray-600 dark:text-gray-400">{key.fingerprint}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{key.created}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{key.lastUsed}</td>
                <td className="px-6 py-4 text-right space-x-3">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">View</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
