'use client';

import { ServerStackIcon } from '@heroicons/react/24/outline';

export default function MultiPHPManagerPage() {
  const domains = [
    { domain: 'siyezden.com', php: '8.3', handler: 'php-fpm' },
    { domain: 'old.siyezden.com', php: '7.4', handler: 'suphp' },
    { domain: 'dev.siyezden.com', php: '8.2', handler: 'php-fpm' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
            <ServerStackIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">MultiPHP Manager</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Domain bazlı PHP sürümlerini yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Domain PHP Versions</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Domain</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">PHP Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Handler</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {domains.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{item.domain}</td>
                <td className="px-6 py-4">
                  <select className="px-3 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm" defaultValue={item.php}>
                    <option value="8.3">PHP 8.3</option>
                    <option value="8.2">PHP 8.2</option>
                    <option value="8.1">PHP 8.1</option>
                    <option value="7.4">PHP 7.4</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <select className="px-3 py-1 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded text-sm" defaultValue={item.handler}>
                    <option value="php-fpm">php-fpm</option>
                    <option value="suphp">suPHP</option>
                    <option value="cgi">CGI</option>
                  </select>
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Save</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">System PHP Version</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Default PHP version for new domains</p>
        <select className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
          <option value="8.3">PHP 8.3 (Recommended)</option>
          <option value="8.2">PHP 8.2</option>
          <option value="8.1">PHP 8.1</option>
        </select>
      </div>
    </div>
  );
}
