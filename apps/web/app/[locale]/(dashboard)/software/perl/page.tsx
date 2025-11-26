'use client';

import { CommandLineIcon } from '@heroicons/react/24/outline';

export default function PerlModulesPage() {
  const modules = [
    { name: 'DBI', version: '1.643', installed: true },
    { name: 'CGI', version: '4.56', installed: true },
    { name: 'MIME::Base64', version: '3.16', installed: true },
    { name: 'LWP::UserAgent', version: '6.67', installed: false },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
            <CommandLineIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Perl Modules</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Perl modüllerini yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Install Module</h3>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Module name (e.g., DBI)"
            className="flex-1 px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
          />
          <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
            Install
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Installed Modules</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Module</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {modules.map((mod, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{mod.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{mod.version}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    mod.installed
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-400'
                  }`}>
                    {mod.installed ? 'Installed' : 'Not Installed'}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {mod.installed ? (
                    <button className="text-red-600 hover:text-red-700 text-sm">Uninstall</button>
                  ) : (
                    <button className="text-green-600 hover:text-green-700 text-sm">Install</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
