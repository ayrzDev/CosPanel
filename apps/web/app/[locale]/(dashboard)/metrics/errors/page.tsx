'use client';

import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ErrorsPage() {
  const [errorLogs] = useState([
    {
      timestamp: '2024-12-14 15:45:23',
      type: '404',
      message: 'File not found: /images/missing.jpg',
      url: '/images/missing.jpg',
      referrer: 'https://siyezden.com/blog/post-1',
      ip: '203.0.113.45'
    },
    {
      timestamp: '2024-12-14 14:32:10',
      type: '500',
      message: 'PHP Fatal error: Uncaught Error: Call to undefined function',
      url: '/api/endpoint.php',
      referrer: '-',
      ip: '198.51.100.12'
    },
    {
      timestamp: '2024-12-14 13:15:44',
      type: '403',
      message: 'Forbidden: You don\'t have permission to access this resource',
      url: '/admin/',
      referrer: '-',
      ip: '192.0.2.88'
    },
    {
      timestamp: '2024-12-14 12:05:33',
      type: '404',
      message: 'File not found: /old-page.html',
      url: '/old-page.html',
      referrer: 'https://google.com',
      ip: '203.0.113.101'
    },
  ]);

  const errorStats = {
    '404': 156,
    '500': 12,
    '403': 8,
    '502': 3,
    '503': 1,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Errors</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Hata loglarını görüntüleyin ve analiz edin</p>
          </div>
        </div>
      </div>

      {/* Error Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {Object.entries(errorStats).map(([code, count]) => (
          <div key={code} className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
            <p className="text-sm text-gray-600 dark:text-gray-400">{code} Errors</p>
            <p className="text-3xl font-bold text-red-600 mt-2">{count}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Error Type</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>All Errors</option>
              <option>404 - Not Found</option>
              <option>500 - Internal Server Error</option>
              <option>403 - Forbidden</option>
              <option>502 - Bad Gateway</option>
              <option>503 - Service Unavailable</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Time Range</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>Last 24 Hours</option>
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
              <option>Custom Range</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Search URL</label>
            <input
              type="text"
              placeholder="Filter by URL..."
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Error Logs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Errors</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Timestamp</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">URL</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {errorLogs.map((log, idx) => (
                <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">{log.timestamp}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      log.type === '404' 
                        ? 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400'
                        : log.type === '500'
                        ? 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400'
                        : 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400'
                    }`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white max-w-md truncate">{log.message}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400 max-w-xs truncate">{log.url}</td>
                  <td className="px-6 py-4 text-sm font-mono text-gray-600 dark:text-gray-400">{log.ip}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400">Showing 4 of 180 errors</p>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded hover:bg-gray-200 dark:hover:bg-gray-600">
              Previous
            </button>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded">
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Top 404s */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Common 404 Errors</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {[
            { url: '/images/old-logo.png', count: 45 },
            { url: '/blog/deleted-post', count: 32 },
            { url: '/products/unavailable.html', count: 28 },
            { url: '/assets/removed.css', count: 19 },
          ].map((item, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between">
              <span className="font-mono text-sm text-gray-900 dark:text-white">{item.url}</span>
              <span className="px-3 py-1 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-400 rounded-full text-sm font-semibold">
                {item.count} errors
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
