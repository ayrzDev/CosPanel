'use client';

import { CodeBracketIcon } from '@heroicons/react/24/outline';

export default function PHPVersionPage() {
  const phpVersions = [
    { version: '8.3', status: 'Available', recommended: true },
    { version: '8.2', status: 'Available', recommended: false },
    { version: '8.1', status: 'Available', recommended: false },
    { version: '7.4', status: 'Available', recommended: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
            <CodeBracketIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">PHP Version Manager</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Domain bazında PHP versiyonu seçin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current PHP Version</h3>
        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-2xl font-bold text-green-700 dark:text-green-400">PHP 8.3.0</p>
          <p className="text-sm text-green-600 dark:text-green-300 mt-1">Recommended version - Latest stable release</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select PHP Version</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {phpVersions.map((php) => (
            <button
              key={php.version}
              className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 border-2 border-transparent hover:border-blue-500 rounded-lg transition-colors"
            >
              <div className="text-left">
                <p className="text-lg font-semibold text-gray-900 dark:text-white">PHP {php.version}</p>
                {php.recommended && (
                  <span className="text-xs bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-2 py-1 rounded mt-1 inline-block">
                    Recommended
                  </span>
                )}
              </div>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-sm">
                {php.status}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Domain-Specific PHP Versions</h3>
        <div className="space-y-3">
          {[
            { domain: 'siyezden.com', version: '8.3' },
            { domain: 'old.siyezden.com', version: '7.4' },
          ].map((site, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <span className="font-medium text-gray-900 dark:text-white">{site.domain}</span>
              <select className="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg">
                <option selected={site.version === '8.3'}>PHP 8.3</option>
                <option selected={site.version === '8.2'}>PHP 8.2</option>
                <option selected={site.version === '8.1'}>PHP 8.1</option>
                <option selected={site.version === '7.4'}>PHP 7.4</option>
              </select>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
