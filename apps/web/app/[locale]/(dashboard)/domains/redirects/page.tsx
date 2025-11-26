'use client';

import { useState } from 'react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

export default function RedirectsPage() {
  const [redirects] = useState([
    { id: 1, type: '301', from: '/old-page', to: 'https://siyezden.com/new-page', wildcard: false },
    { id: 2, type: '302', from: '/temp', to: 'https://example.com', wildcard: false },
    { id: 3, type: '301', from: '/blog/*', to: 'https://blog.siyezden.com/$1', wildcard: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
            <ArrowPathIcon className="w-6 h-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Redirects</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">URL yönlendirmelerini yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create a Redirect</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Type</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option value="301">Permanent (301)</option>
              <option value="302">Temporary (302)</option>
            </select>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">From (Source)</label>
              <input 
                type="text" 
                placeholder="/old-page or /old-path/*" 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">To (Destination)</label>
              <input 
                type="text" 
                placeholder="https://example.com/new-page" 
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
              />
            </div>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Wildcard Redirect (use * in path)</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add Redirect
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Redirects</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Wildcard</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {redirects.map((redirect) => (
              <tr key={redirect.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${redirect.type === '301' ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400' : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'}`}>
                    {redirect.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-900 dark:text-white">{redirect.from}</td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{redirect.to}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{redirect.wildcard ? 'Yes' : 'No'}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Edit</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Redirect Types</h4>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
          <li><strong>301 (Permanent):</strong> SEO dostu, kalıcı yönlendirme. Arama motorları eski URL'yi unutur.</li>
          <li><strong>302 (Temporary):</strong> Geçici yönlendirme. Arama motorları eski URL'yi tutar.</li>
        </ul>
      </div>
    </div>
  );
}
