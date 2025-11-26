'use client';

import { DocumentTextIcon } from '@heroicons/react/24/outline';

export default function RawAccessPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <DocumentTextIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Raw Access</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ham erişim loglarını indirin</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Raw Access Logs Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Raw access logs, web sunucunuza yapılan her isteğin detaylı kaydını içerir. Bu loglar Apache access_log formatındadır ve kendi analiz araçlarınızla işlenebilir.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Download Access Logs</h3>
        <div className="space-y-3">
          {[
            { file: 'access-log-2024-12-14.gz', size: '45.2 MB', date: '2024-12-14' },
            { file: 'access-log-2024-12-13.gz', size: '42.8 MB', date: '2024-12-13' },
            { file: 'access-log-2024-12-12.gz', size: '39.5 MB', date: '2024-12-12' },
            { file: 'access-log-2024-12-11.gz', size: '41.3 MB', date: '2024-12-11' },
          ].map((log, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center gap-3">
                <DocumentTextIcon className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{log.file}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{log.size} • {log.date}</p>
                </div>
              </div>
              <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm">
                Download
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Archive Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Enable log archiving (gzip compression)</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Delete logs older than 30 days</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
