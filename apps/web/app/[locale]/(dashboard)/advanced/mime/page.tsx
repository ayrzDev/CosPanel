'use client';

import { useState } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function MIMETypesPage() {
  const [mimeTypes] = useState([
    { extension: '.pdf', mimeType: 'application/pdf' },
    { extension: '.json', mimeType: 'application/json' },
    { extension: '.xml', mimeType: 'application/xml' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <DocumentTextIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MIME Types</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dosya uzantıları için MIME türlerini yönetin</p>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">MIME Type Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          MIME (Multipurpose Internet Mail Extensions) türleri, web sunucusuna dosyanın türünü ve tarayıcıda nasıl işleneceğini söyler.
        </p>
      </div>

      {/* Create MIME Type */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create a MIME Type</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">MIME Type</label>
            <input
              type="text"
              placeholder="application/json"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Extension</label>
            <input
              type="text"
              placeholder=".json"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add MIME Type
          </button>
        </div>
      </div>

      {/* Current MIME Types */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Defined MIME Types</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">MIME Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Extension</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {mimeTypes.map((mime, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-mono">{mime.mimeType}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{mime.extension}</td>
                <td className="px-6 py-4 text-right">
                  <button className="text-red-600 hover:text-red-700 text-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common MIME Types */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common MIME Types</h4>
        <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 dark:text-gray-300">
          <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">.html</code> - text/html</div>
          <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">.css</code> - text/css</div>
          <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">.js</code> - application/javascript</div>
          <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">.json</code> - application/json</div>
          <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">.jpg</code> - image/jpeg</div>
          <div><code className="bg-white dark:bg-gray-800 px-2 py-1 rounded">.png</code> - image/png</div>
        </div>
      </div>
    </div>
  );
}
