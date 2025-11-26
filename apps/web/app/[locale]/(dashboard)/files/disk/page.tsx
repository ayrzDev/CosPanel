'use client';

import { CircleStackIcon, FolderIcon, DocumentIcon } from '@heroicons/react/24/outline';

export default function DiskUsagePage() {
  const usage = [
    { name: 'public_html', size: 2456, files: 1234, type: 'folder' },
    { name: 'mail', size: 1890, files: 5678, type: 'folder' },
    { name: 'backups', size: 3200, files: 45, type: 'folder' },
    { name: 'logs', size: 456, files: 234, type: 'folder' },
  ];
  const totalSize = usage.reduce((sum, item) => sum + item.size, 0);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <CircleStackIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Disk Usage</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Disk kullanımınızı analiz edin</p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Total: {totalSize.toFixed(2)} MB</h3>
        {usage.map((item, idx) => {
          const percentage = (item.size / totalSize) * 100;
          return (
            <div key={idx} className="mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="flex items-center gap-2 text-gray-900 dark:text-white">
                  <FolderIcon className="w-4 h-4" />
                  {item.name}
                </span>
                <span className="text-gray-600 dark:text-gray-400">{item.size} MB ({percentage.toFixed(1)}%)</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: `${percentage}%` }} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{item.files.toLocaleString()} files</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
