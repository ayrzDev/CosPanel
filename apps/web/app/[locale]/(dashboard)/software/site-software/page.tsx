'use client';

import { CubeIcon } from '@heroicons/react/24/outline';

export default function SiteSoftwarePage() {
  const installed = [
    { name: 'WordPress', version: '6.4.2', path: '/public_html/blog', installs: '1.2M+' },
    { name: 'Nextcloud', version: '28.0.1', path: '/public_html/cloud', installs: '450K+' },
  ];

  const available = [
    { name: 'Joomla', category: 'CMS', description: 'Content Management System', installs: '450K+' },
    { name: 'Drupal', category: 'CMS', description: 'Enterprise CMS Platform', installs: '320K+' },
    { name: 'phpMyAdmin', category: 'Database', description: 'MySQL Administration Tool', installs: '2.1M+' },
    { name: 'Roundcube', category: 'Email', description: 'Webmail Client', installs: '890K+' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg">
            <CubeIcon className="w-6 h-6 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Site Software</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Yazılım yükleyin ve yönetin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Installed Software</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Software</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Version</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Path</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {installed.map((app, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900 dark:text-white">{app.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{app.version}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{app.path}</td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 text-sm">Manage</button>
                  <button className="text-red-600 hover:text-red-700 text-sm">Uninstall</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Available Software</h3>
        </div>
        <div className="p-6 space-y-3">
          {available.map((app, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <div className="font-medium text-gray-900 dark:text-white">{app.name}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{app.description}</div>
                <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                  <span className="px-2 py-0.5 bg-gray-200 dark:bg-gray-600 rounded">{app.category}</span>
                  <span className="ml-2">{app.installs} installations</span>
                </div>
              </div>
              <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm">
                Install
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
