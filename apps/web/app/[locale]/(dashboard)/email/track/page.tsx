'use client';

import { useState } from 'react';
import { EnvelopeIcon, CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';

export default function TrackDeliveryPage() {
  const [deliveries] = useState([
    { id: 1, from: 'admin@siyezden.com', to: 'user@example.com', subject: 'Welcome Email', status: 'delivered', sentAt: '2024-12-15 14:30' },
    { id: 2, from: 'noreply@siyezden.com', to: 'test@test.com', subject: 'Password Reset', status: 'failed', sentAt: '2024-12-15 13:15' },
    { id: 3, from: 'info@siyezden.com', to: 'contact@client.com', subject: 'Invoice #1234', status: 'delivered', sentAt: '2024-12-15 10:00' },
  ]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <EnvelopeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Track Delivery</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">E-posta gönderim durumlarını izleyin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Sent (24h)</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">3,425</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Delivered</p>
          <p className="text-3xl font-bold text-green-600 mt-2">3,398</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Failed</p>
          <p className="text-3xl font-bold text-red-600 mt-2">27</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <table className="w-full">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Sent At</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {deliveries.map((delivery) => (
              <tr key={delivery.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{delivery.from}</td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{delivery.to}</td>
                <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">{delivery.subject}</td>
                <td className="px-6 py-4">
                  {delivery.status === 'delivered' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded text-xs">
                      <CheckCircleIcon className="w-4 h-4" /> Delivered
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded text-xs">
                      <XCircleIcon className="w-4 h-4" /> Failed
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{delivery.sentAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
