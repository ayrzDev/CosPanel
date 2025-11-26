'use client';

import { useState } from 'react';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function ApacheHandlersPage() {
  const [handlers] = useState([
    { handler: 'cgi-script', extensions: '.cgi, .pl', action: 'Execute as CGI' },
    { handler: 'server-parsed', extensions: '.shtml, .shtm', action: 'Server Side Includes' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <DocumentTextIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Apache Handlers</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dosya uzantılarının nasıl işleneceğini belirleyin</p>
          </div>
        </div>
      </div>

      {/* Create Handler */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Create a Handler</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Handler</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>cgi-script</option>
              <option>server-parsed</option>
              <option>send-as-is</option>
              <option>imap-file</option>
              <option>type-map</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Extension(s)</label>
            <input
              type="text"
              placeholder=".pl (nokta ile başlatın)"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Add Handler
          </button>
        </div>
      </div>

      {/* Current Handlers */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">User Defined Apache Handlers</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Handler</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Extension(s)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Action</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {handlers.map((handler, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{handler.handler}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">{handler.extensions}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{handler.action}</td>
                <td className="px-6 py-4 text-right">
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
