'use client';

import { useState } from 'react';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';

export default function AliasesPage() {
  const [aliases] = useState([
    { id: 1, alias: 'siyezden.net', redirectsTo: 'siyezden.com', createdAt: '2024-10-15' },
    { id: 2, alias: 'siyezden.org', redirectsTo: 'siyezden.com', createdAt: '2024-09-20' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
            <ArrowsRightLeftIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Aliases (Parked Domains)</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Aynı içeriği gösteren alternatif domainler</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">What are Aliases?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Alias (Parked) domainler, ana domaininizle aynı içeriği gösterir. Örneğin: siyezden.net ve siyezden.org her ikisi de siyezden.com ile aynı siteyi gösterir.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create an Alias</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">New Domain Alias</label>
            <input 
              type="text" 
              placeholder="example.com" 
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Points To</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>siyezden.com (Main Domain)</option>
              <option>shop.siyezden.com</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add Alias
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Aliases</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Alias Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Redirects To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {aliases.map((alias) => (
              <tr key={alias.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{alias.alias}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{alias.redirectsTo}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{alias.createdAt}</td>
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
