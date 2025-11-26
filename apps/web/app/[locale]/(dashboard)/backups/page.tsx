'use client';

import { useState } from 'react';
import {
  ArchiveBoxIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ClockIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';

type BackupStatus = 'COMPLETED' | 'RUNNING' | 'FAILED';
type BackupScope = 'FULL' | 'DB' | 'FILES';

interface Backup {
  id: string;
  name: string;
  scope: BackupScope;
  status: BackupStatus;
  size: string;
  createdAt: string;
  sites?: number;
}

export default function BackupsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const backups: Backup[] = [
    {
      id: '1',
      name: 'Full Backup - Haftalık',
      scope: 'FULL',
      status: 'COMPLETED',
      size: '2.4 GB',
      sites: 8,
      createdAt: '2024-11-28T02:00:00',
    },
    {
      id: '2',
      name: 'Database Backup',
      scope: 'DB',
      status: 'COMPLETED',
      size: '845 MB',
      createdAt: '2024-11-27T14:30:00',
    },
    {
      id: '3',
      name: 'Files Only',
      scope: 'FILES',
      status: 'COMPLETED',
      size: '1.6 GB',
      createdAt: '2024-11-26T08:15:00',
    },
    {
      id: '4',
      name: 'Manuel Backup',
      scope: 'FULL',
      status: 'FAILED',
      size: '0 MB',
      sites: 8,
      createdAt: '2024-11-25T16:00:00',
    },
  ];

  const filteredBackups = backups.filter((backup) =>
    backup.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getScopeBadge = (scope: BackupScope) => {
    const badges = {
      FULL: { text: 'Tam Yedek', className: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' },
      DB: { text: 'Veritabanı', className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400' },
      FILES: { text: 'Dosyalar', className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' },
    };
    const badge = badges[scope];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
        {badge.text}
      </span>
    );
  };

  const getStatusBadge = (status: BackupStatus) => {
    const badges = {
      COMPLETED: {
        icon: CheckCircleIcon,
        text: 'Tamamlandı',
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      },
      RUNNING: {
        icon: ArrowPathIcon,
        text: 'Devam Ediyor',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      },
      FAILED: {
        icon: XCircleIcon,
        text: 'Başarısız',
        className: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
      },
    };
    const badge = badges[status];
    const Icon = badge.icon;
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
        <Icon className={`w-4 h-4 mr-1 ${status === 'RUNNING' ? 'animate-spin' : ''}`} />
        {badge.text}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Yedekleme Yönetimi
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Otomatik ve manuel yedeklerinizi yönetin
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          Yeni Yedek
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ArchiveBoxIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Yedek</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {backups.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Başarılı</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {backups.filter((b) => b.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Son Yedek</p>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">
                {new Date(backups[0].createdAt).toLocaleDateString('tr-TR')}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ArchiveBoxIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Boyut</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">4.8 GB</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Yedek ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Backups Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700 border-b border-gray-200 dark:border-gray-600">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Yedek Adı
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Kapsam
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Durum
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Boyut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Oluşturulma
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredBackups.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500 dark:text-gray-400">
                    Yedek bulunamadı
                  </td>
                </tr>
              ) : (
                filteredBackups.map((backup) => (
                  <tr
                    key={backup.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <ArchiveBoxIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3" />
                        <div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white block">
                            {backup.name}
                          </span>
                          {backup.sites && (
                            <span className="text-xs text-gray-500 dark:text-gray-500">
                              {backup.sites} site
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getScopeBadge(backup.scope)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(backup.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {backup.size}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {new Date(backup.createdAt).toLocaleString('tr-TR')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        {backup.status === 'COMPLETED' && (
                          <button className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30 rounded transition-colors">
                            <ArrowDownTrayIcon className="w-5 h-5" />
                          </button>
                        )}
                        <button className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded transition-colors">
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
