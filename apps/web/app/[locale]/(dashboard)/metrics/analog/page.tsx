'use client';

import { ChartPieIcon } from '@heroicons/react/24/outline';

export default function AnalogStatsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
            <ChartPieIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analog Stats</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Analog log analyzer istatistikleri</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">Analog Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          Analog, hızlı ve güçlü bir web log analyzer'dır. Web sunucusu loglarınızı analiz ederek 
          HTML formatında detaylı raporlar oluşturur.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Domain</h3>
        <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mb-4">
          <option>siyezden.com</option>
          <option>www.siyezden.com</option>
          <option>mail.siyezden.com</option>
        </select>
        <button className="px-6 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg">
          View Analog Report
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Report Settings</h3>
        <div className="space-y-3">
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Generate monthly reports</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" defaultChecked className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Include browser statistics</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded" />
            <span className="text-sm text-gray-700 dark:text-gray-300">Include search engine keywords</span>
          </label>
          <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
}
