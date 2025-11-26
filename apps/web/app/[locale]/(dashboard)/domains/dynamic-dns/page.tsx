'use client';

import { useState } from 'react';
import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';

export default function DynamicDNSPage() {
  const [enabled, setEnabled] = useState(true);
  const [domains] = useState([
    { id: 1, domain: 'home.siyezden.com', currentIP: '203.0.113.45', lastUpdate: '2024-12-15 10:30' },
    { id: 2, domain: 'server.siyezden.com', currentIP: '198.51.100.22', lastUpdate: '2024-12-15 08:15' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
            <ArrowPathRoundedSquareIcon className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dynamic DNS</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dinamik IP adreslerinizi otomatik güncelleyin</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">What is Dynamic DNS?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          DDNS, değişken IP adresinizi otomatik olarak domain kaydınıza günceller. Ev sunucuları ve değişken IP bağlantıları için idealdir.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dynamic DNS Status</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Otomatik IP güncelleme</p>
          </div>
          <label className="flex items-center cursor-pointer">
            <div className="relative">
              <input type="checkbox" checked={enabled} onChange={(e) => setEnabled(e.target.checked)} className="sr-only peer" />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </div>
            <span className="ml-3 text-sm font-medium text-gray-900 dark:text-white">{enabled ? 'Enabled' : 'Disabled'}</span>
          </label>
        </div>

        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4">
          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Update URL</h4>
          <div className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded p-3 font-mono text-xs text-gray-800 dark:text-gray-300 break-all">
            https://siyezden.com:2083/json-api/cpanel?cpanel_jsonapi_user=USERNAME&cpanel_jsonapi_apiversion=2&cpanel_jsonapi_module=ZoneEdit
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Bu URL'yi DDNS client'ınızda kullanın</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create DDNS Domain</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subdomain</label>
            <input 
              type="text" 
              placeholder="home.siyezden.com" 
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Enable DDNS
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active DDNS Domains</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Current IP</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Last Update</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {domains.map((domain) => (
              <tr key={domain.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{domain.domain}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{domain.currentIP}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{domain.lastUpdate}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Update Now</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Supported DDNS Clients</h4>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li>DD-WRT Router Firmware</li>
          <li>No-IP DUC (Dynamic Update Client)</li>
          <li>DDclient (Linux/Unix)</li>
          <li>Custom scripts with curl/wget</li>
        </ul>
      </div>
    </div>
  );
}
