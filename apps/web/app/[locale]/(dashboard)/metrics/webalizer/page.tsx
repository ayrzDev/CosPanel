'use client';

import { PresentationChartLineIcon } from '@heroicons/react/24/outline';

export default function WebalizerPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
            <PresentationChartLineIcon className="w-6 h-6 text-teal-600 dark:text-teal-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Webalizer</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Webalizer web istatistik raporları</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Webalizer Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Webalizer, web sunucusu log dosyalarını analiz ederek HTML formatında grafikli raporlar üreten hızlı bir programdır. 
          Ziyaret sayıları, kaynak ülkeler, tarayıcı türleri ve daha fazlası hakkında bilgi sağlar.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">View Reports</h3>
        <div className="space-y-3">
          {[
            { domain: 'siyezden.com', lastUpdate: '2024-12-14 00:30' },
            { domain: 'www.siyezden.com', lastUpdate: '2024-12-14 00:32' },
            { domain: 'mail.siyezden.com', lastUpdate: '2024-12-14 00:35' },
          ].map((site, idx) => (
            <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div>
                <p className="font-medium text-gray-900 dark:text-white">{site.domain}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Last updated: {site.lastUpdate}</p>
              </div>
              <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg">
                View Report
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Report Type</label>
            <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg">
              <option>Monthly Report</option>
              <option>Daily Report</option>
              <option>Hourly Report</option>
            </select>
          </div>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Group pages into directories</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Display country flags</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save & Update
          </button>
        </div>
      </div>
    </div>
  );
}
