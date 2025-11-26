'use client';

import { BoltIcon } from '@heroicons/react/24/outline';

export default function OptimizePage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
            <BoltIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Optimize Website</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Web sitenizi hızlandırın</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Content Compression</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Enable Gzip Compression</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Compress HTML</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Compress CSS & JavaScript</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Apply Settings
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Browser Caching</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Cache Expiration (Days)</label>
            <input
              type="number"
              defaultValue="30"
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
            />
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Enable browser caching</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Settings
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Image Optimization</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Optimize images to reduce file size and improve loading speed</p>
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
          Optimize All Images
        </button>
      </div>
    </div>
  );
}
