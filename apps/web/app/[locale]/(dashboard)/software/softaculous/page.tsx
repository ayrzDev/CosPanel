'use client';

import { RocketLaunchIcon } from '@heroicons/react/24/outline';

export default function SoftaculousPage() {
  const categories = [
    { name: 'Blogs', count: 15, icon: '📝' },
    { name: 'E-Commerce', count: 8, icon: '🛒' },
    { name: 'Forums', count: 6, icon: '💬' },
    { name: 'CMS', count: 12, icon: '📄' },
    { name: 'Frameworks', count: 10, icon: '🛠️' },
    { name: 'Galleries', count: 5, icon: '🖼️' },
  ];

  const popular = [
    { name: 'WordPress', category: 'Blogs', installs: '1.2M+' },
    { name: 'WooCommerce', category: 'E-Commerce', installs: '890K+' },
    { name: 'Joomla', category: 'CMS', installs: '450K+' },
    { name: 'Drupal', category: 'CMS', installs: '320K+' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <RocketLaunchIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Softaculous Apps Installer</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">450+ uygulamayı tek tıkla kurun</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <button
              key={cat.name}
              className="flex flex-col items-center gap-2 p-6 bg-gray-50 dark:bg-gray-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 border-2 border-transparent hover:border-purple-500 rounded-lg transition-colors"
            >
              <span className="text-4xl">{cat.icon}</span>
              <span className="font-semibold text-gray-900 dark:text-white">{cat.name}</span>
              <span className="text-sm text-gray-600 dark:text-gray-400">{cat.count} apps</span>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Popular Applications</h3>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {popular.map((app, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{app.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{app.category} • {app.installs} installs</p>
              </div>
              <button className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
                Install
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">My Installations</h3>
        <div className="space-y-3">
          {[
            { app: 'WordPress', version: '6.4.2', path: '/public_html/blog', installed: '2024-01-15' },
            { app: 'WooCommerce', version: '8.4.0', path: '/public_html/shop', installed: '2024-02-20' },
          ].map((inst, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-semibold text-gray-900 dark:text-white">{inst.app} {inst.version}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">{inst.path} • Installed {inst.installed}</p>
              </div>
              <div className="flex gap-2">
                <button className="text-blue-600 hover:text-blue-700 text-sm">Manage</button>
                <button className="text-red-600 hover:text-red-700 text-sm">Uninstall</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
