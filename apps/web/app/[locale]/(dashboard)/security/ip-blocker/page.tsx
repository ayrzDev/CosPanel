'use client';

import { useState } from 'react';
import { ShieldExclamationIcon, PlusIcon } from '@heroicons/react/24/outline';

export default function IPBlockerPage() {
  const [blockedIPs] = useState([
    { ip: '192.168.1.100', reason: 'Brute force attempt', blocked: '2024-12-10', expires: 'Never' },
    { ip: '10.0.0.0/8', reason: 'Private network block', blocked: '2024-01-15', expires: 'Never' },
    { ip: '185.220.101.0/24', reason: 'Known malicious network', blocked: '2024-11-20', expires: '2025-01-20' },
  ]);

  const [allowedIPs] = useState([
    { ip: '203.0.113.10', reason: 'Office IP', added: '2024-01-01' },
    { ip: '198.51.100.0/24', reason: 'Company network', added: '2024-02-15' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <ShieldExclamationIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">IP Blocker</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">IP adreslerini engelleyin veya izin verin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">IP Blocker Nasıl Çalışır?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          IP Blocker, belirli IP adreslerinden veya ağlardan gelen bağlantıları engeller veya izin verir. 
          CIDR notasyonu kullanarak IP aralıkları belirleyebilirsiniz (örn: 192.168.0.0/24).
        </p>
      </div>

      {/* Add Blocked IP */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Block IP Address
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IP Address or Range</label>
            <input
              type="text"
              placeholder="192.168.1.100 or 192.168.0.0/24"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Reason</label>
            <input
              type="text"
              placeholder="Reason for blocking"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Expiration</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>Never (Permanent)</option>
              <option>1 Hour</option>
              <option>1 Day</option>
              <option>1 Week</option>
              <option>1 Month</option>
              <option>Custom...</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg">
            Block IP
          </button>
        </div>
      </div>

      {/* Add Allowed IP */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <PlusIcon className="w-5 h-5" />
          Allow IP Address (Whitelist)
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">IP Address or Range</label>
            <input
              type="text"
              placeholder="203.0.113.10 or 198.51.100.0/24"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
            <input
              type="text"
              placeholder="Office IP, Home network, etc."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Allow IP
          </button>
        </div>
      </div>

      {/* Blocked IPs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-red-200 dark:border-red-800">
        <div className="p-6 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
          <h3 className="text-lg font-semibold text-red-900 dark:text-red-200">Blocked IP Addresses</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Reason</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Blocked</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Expires</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {blockedIPs.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{item.ip}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.blocked}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.expires}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-green-600 hover:text-green-700 text-sm">Unblock</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Allowed IPs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-green-200 dark:border-green-800">
        <div className="p-6 bg-green-50 dark:bg-green-900/20 border-b border-green-200 dark:border-green-800">
          <h3 className="text-lg font-semibold text-green-900 dark:text-green-200">Allowed IP Addresses (Whitelist)</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">IP Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Added</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {allowedIPs.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{item.ip}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.reason}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{item.added}</td>
                <td className="px-6 py-4 text-right">
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
