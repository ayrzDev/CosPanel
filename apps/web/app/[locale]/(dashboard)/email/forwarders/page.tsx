'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon, 
  ArrowPathIcon,
  PlusIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

interface Forwarder {
  id: number;
  from: string;
  to: string[];
  createdAt: string;
}

export default function ForwardersPage() {
  const [forwarders, setForwarders] = useState<Forwarder[]>([
    {
      id: 1,
      from: 'info@siyezden.com',
      to: ['admin@example.com', 'support@example.com'],
      createdAt: '2024-11-01',
    },
    {
      id: 2,
      from: 'sales@siyezden.com',
      to: ['sales-team@example.com'],
      createdAt: '2024-10-15',
    },
    {
      id: 3,
      from: 'support@siyezden.com',
      to: ['ticket-system@example.com', 'admin@example.com'],
      createdAt: '2024-09-20',
    },
  ]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                E-posta Forwarders
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                E-postaları otomatik olarak başka adreslere yönlendirin
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <PlusIcon className="w-5 h-5" />
            Yeni Forwarder
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArrowPathIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Forwarder</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{forwarders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Kaynak Adresleri</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{forwarders.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <EnvelopeIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Hedef Adresleri</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {forwarders.reduce((acc, f) => acc + f.to.length, 0)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forwarders Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mevcut Forwarders</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Kaynak Adres
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Hedef Adresler
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Oluşturulma
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {forwarders.map((forwarder) => (
                <tr key={forwarder.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <EnvelopeIcon className="w-5 h-5 text-blue-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {forwarder.from}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {forwarder.to.map((email, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs rounded"
                        >
                          <ArrowPathIcon className="w-3 h-3 mr-1" />
                          {email}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {forwarder.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 p-2 rounded transition-colors">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 p-2 rounded transition-colors">
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <ArrowPathIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              E-posta Yönlendirme Nasıl Çalışır?
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Kaynak adrese gelen e-postalar otomatik olarak hedef adreslere yönlendirilir</li>
              <li>• Birden fazla hedef adres ekleyebilirsiniz</li>
              <li>• Forwarder aynı zamanda kaynak adreste de e-postayı saklayabilir</li>
              <li>• Spam filtreleri yönlendirilen e-postalara da uygulanır</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
