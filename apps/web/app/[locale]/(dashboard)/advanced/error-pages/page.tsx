'use client';

import { useState } from 'react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function ErrorPagesPage() {
  const [errorPages] = useState([
    { code: 400, name: 'Bad Request', customPage: null },
    { code: 401, name: 'Authorization Required', customPage: null },
    { code: 403, name: 'Forbidden', customPage: null },
    { code: 404, name: 'Not Found', customPage: '/errors/404.html' },
    { code: 500, name: 'Internal Server Error', customPage: '/errors/500.html' },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
            <ExclamationTriangleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Error Pages</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Özel hata sayfaları oluşturun</p>
          </div>
        </div>
      </div>

      {/* Manage Error Pages */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manage Error Pages</h3>
        </div>
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Error Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Error Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Custom Page</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {errorPages.map((error) => (
              <tr key={error.code} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4">
                  <span className="px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-sm font-medium">
                    {error.code}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{error.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 font-mono">
                  {error.customPage || <span className="text-gray-400">Default</span>}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="text-blue-600 hover:text-blue-700 text-sm mr-3">
                    {error.customPage ? 'Edit' : 'Set Custom Page'}
                  </button>
                  {error.customPage && (
                    <button className="text-red-600 hover:text-red-700 text-sm">Reset to Default</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Common Error Codes */}
      <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Common HTTP Error Codes</h4>
        <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1 list-disc list-inside">
          <li><strong>400:</strong> Hatalı istek (Bad Request)</li>
          <li><strong>401:</strong> Yetkilendirme gerekli (Unauthorized)</li>
          <li><strong>403:</strong> Erişim yasak (Forbidden)</li>
          <li><strong>404:</strong> Sayfa bulunamadı (Not Found)</li>
          <li><strong>500:</strong> Sunucu hatası (Internal Server Error)</li>
          <li><strong>503:</strong> Servis kullanılamıyor (Service Unavailable)</li>
        </ul>
      </div>
    </div>
  );
}
