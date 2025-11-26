'use client';

import { useState } from 'react';
import { FolderIcon } from '@heroicons/react/24/outline';

export default function IndexesPage() {
  const [directories] = useState([
    { path: '/public_html', indexing: 'No Indexing', inheritedFrom: 'default' },
    { path: '/public_html/images', indexing: 'Standard Indexing', inheritedFrom: 'custom' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <FolderIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Indexes</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dizin listeleme ayarlarını yönetin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Dizin İndeksleme Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Dizin indeksleme, bir klasörde index.html yoksa dosya listesinin gösterilip gösterilmeyeceğini kontrol eder.
        </p>
      </div>

      {/* Create */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Add Index</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Directory</label>
            <input
              type="text"
              placeholder="/public_html/downloads"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Indexing Type</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>No Indexing (Disable)</option>
              <option>Standard Indexing (Generate list on-the-fly)</option>
              <option>Fancy Indexing (Icons, sorting)</option>
            </select>
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Create Index
          </button>
        </div>
      </div>

      {/* Current Indexes */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Current Directory Indexes</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Directory</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Indexing Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Source</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {directories.map((dir, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white font-mono">{dir.path}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{dir.indexing}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{dir.inheritedFrom}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">Edit</button>
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
