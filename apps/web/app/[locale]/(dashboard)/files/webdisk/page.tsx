'use client';

import { GlobeAltIcon, FolderIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

export default function WebDiskPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <GlobeAltIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Web Disk</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Dosyalarınıza web üzerinden erişin</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">WebDAV Access</h3>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <p><strong>URL:</strong> <code className="bg-blue-100 dark:bg-blue-900/50 px-2 py-1 rounded">https://siyezden.com:2078</code></p>
          <p><strong>Username:</strong> siyezden</p>
          <p><strong>Protocol:</strong> WebDAV over HTTPS</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Supported Clients</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Windows Explorer</p>
              <p className="text-xs text-gray-500">Map Network Drive</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">macOS Finder</p>
              <p className="text-xs text-gray-500">Connect to Server</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <CheckCircleIcon className="w-5 h-5 text-green-500" />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">Linux</p>
              <p className="text-xs text-gray-500">davfs2, Nautilus, Dolphin</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
