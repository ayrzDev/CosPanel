'use client';

import { useState } from 'react';
import { Square3Stack3DIcon } from '@heroicons/react/24/outline';

export default function SubdomainsPage() {
  const [subdomains] = useState([
    { id: 1, subdomain: 'blog', domain: 'siyezden.com', documentRoot: '/public_html/blog', createdAt: '2024-12-01' },
    { id: 2, subdomain: 'api', domain: 'siyezden.com', documentRoot: '/public_html/api', createdAt: '2024-11-28' },
    { id: 3, subdomain: 'cdn', domain: 'siyezden.com', documentRoot: '/public_html/cdn', createdAt: '2024-11-15' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <Square3Stack3DIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Subdomains</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Alt domain'lerinizi yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create a Subdomain</h3>
        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Subdomain</label>
              <input 
                type="text" 
                placeholder="blog" 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Domain</label>
              <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
                <option>siyezden.com</option>
                <option>shop.siyezden.com</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Document Root</label>
            <input 
              type="text" 
              placeholder="/public_html/blog" 
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Create Subdomain
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Subdomains</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subdomain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Document Root</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Created</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {subdomains.map((sub) => (
              <tr key={sub.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{sub.subdomain}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{sub.domain}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{sub.documentRoot}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{sub.createdAt}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Manage</button>
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
