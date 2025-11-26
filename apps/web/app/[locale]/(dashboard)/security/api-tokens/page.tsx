'use client';

import { useState } from 'react';
import { KeyIcon, PlusIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function APITokensPage() {
  const [tokens] = useState([
    {
      id: 1,
      name: 'Production API',
      token: 'umx_prod_1a2b3c4d5e6f7g8h9i0j',
      created: '2024-01-15',
      lastUsed: '2024-12-14',
      permissions: ['read', 'write'],
      status: 'Active'
    },
    {
      id: 2,
      name: 'Development',
      token: 'umx_dev_k1l2m3n4o5p6q7r8s9t0',
      created: '2024-03-22',
      lastUsed: '2024-12-10',
      permissions: ['read'],
      status: 'Active'
    },
    {
      id: 3,
      name: 'Backup Script',
      token: 'umx_bak_u1v2w3x4y5z6a7b8c9d0',
      created: '2024-02-10',
      lastUsed: '2024-11-30',
      permissions: ['read', 'write', 'delete'],
      status: 'Expired'
    },
  ]);

  const [showToken, setShowToken] = useState<{[key: number]: boolean}>({});

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <KeyIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Manage API Tokens</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">API erişimi için token oluşturun ve yönetin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">API Token Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          API tokenları, uygulamalarınızın ve scriptlerinizin UmixPanel API'sine güvenli bir şekilde erişmesini sağlar. 
          Her token için farklı izinler atayabilir ve kullanımı izleyebilirsiniz.
        </p>
      </div>

      {/* Create Token */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Create New API Token
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Token Name</label>
            <input
              type="text"
              placeholder="My Application Token"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Permissions</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2">
                <input type="checkbox" defaultChecked className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Read - View account information</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Write - Create and modify resources</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Delete - Remove resources</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Admin - Full administrative access</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiration</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>Never</option>
              <option>30 days</option>
              <option>90 days</option>
              <option>1 year</option>
              <option>Custom...</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IP Whitelist (Optional)</label>
            <input
              type="text"
              placeholder="192.168.1.0/24 (leave empty for no restriction)"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono"
            />
          </div>

          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Generate Token
          </button>
        </div>
      </div>

      {/* Existing Tokens */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your API Tokens</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {tokens.map((token) => (
            <div key={token.id} className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{token.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      token.status === 'Active'
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                        : 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                    }`}>
                      {token.status}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Created: {token.created}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Last used: {token.lastUsed}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Edit</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Revoke</button>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center gap-2 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg font-mono text-sm">
                  <span className="flex-1 text-gray-900 dark:text-white">
                    {showToken[token.id] ? token.token : '••••••••••••••••••••'}
                  </span>
                  <button
                    onClick={() => setShowToken(prev => ({...prev, [token.id]: !prev[token.id]}))}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded"
                  >
                    {showToken[token.id] ? (
                      <EyeSlashIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    ) : (
                      <EyeIcon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    )}
                  </button>
                  <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-xs">
                    Copy
                  </button>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Permissions:</p>
                <div className="flex gap-2">
                  {token.permissions.map((perm, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs font-medium"
                    >
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Usage Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">API Usage This Month</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Requests</p>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12,458</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Success Rate</p>
            <p className="text-3xl font-bold text-green-600 mt-2">99.2%</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Failed Requests</p>
            <p className="text-3xl font-bold text-red-600 mt-2">98</p>
          </div>
        </div>
      </div>

      {/* Documentation Link */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">📚 API Documentation</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
          Learn how to use the UmixPanel API in your applications.
        </p>
        <a href="#" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View API Documentation →
        </a>
      </div>
    </div>
  );
}
