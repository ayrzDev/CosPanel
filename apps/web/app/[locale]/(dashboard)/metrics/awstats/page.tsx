'use client';

import { ChartBarIcon } from '@heroicons/react/24/outline';

export default function AwstatsPage() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
            <ChartBarIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Awstats</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Advanced Web Statistics görüntüleyici</p>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <h4 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">AWStats Nedir?</h4>
        <p className="text-sm text-blue-800 dark:text-blue-300">
          AWStats, web sunucusu log dosyalarınızı analiz ederek detaylı istatistikler ve grafikler oluşturur. 
          Ziyaretçiler, sayfalar, tarayıcılar, işletim sistemleri ve daha fazlası hakkında bilgi sağlar.
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Select Domain</h3>
        <select className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg mb-4">
          <option>siyezden.com</option>
          <option>www.siyezden.com</option>
          <option>mail.siyezden.com</option>
        </select>
        <button className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg">
          View AWStats Report
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Update Statistics</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Last update: 2024-12-14 00:15:00
        </p>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
          Update Now
        </button>
      </div>

      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">💡 Tip</h4>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          AWStats istatistikleri genellikle günde bir kez otomatik olarak güncellenir. Manuel güncelleme yapmak için yukarıdaki "Update Now" butonunu kullanabilirsiniz.
        </p>
      </div>
    </div>
  );
}
