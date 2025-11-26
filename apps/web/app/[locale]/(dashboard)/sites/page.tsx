'use client';

import { useState } from 'react';
import {
  ServerIcon,
  PlusIcon,
  MagnifyingGlassIcon,
  RocketLaunchIcon,
  ArrowPathIcon,
  Cog6ToothIcon,
  TrashIcon,
  CodeBracketIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { CheckCircleIcon, XCircleIcon, ClockIcon } from '@heroicons/react/24/solid';

type Framework = 'NEXT' | 'REACT' | 'VUE' | 'STATIC' | 'NODE';
type DeployStatus = 'RUNNING' | 'COMPLETED' | 'FAILED' | 'PENDING';

interface Site {
  id: string;
  name: string;
  domain: string;
  framework: Framework;
  gitRepo?: string;
  status: DeployStatus;
  lastDeploy?: string;
  createdAt: string;
}

export default function SitesPage() {
  const [searchQuery, setSearchQuery] = useState('');

  // Mock data
  const sites: Site[] = [
    {
      id: '1',
      name: 'Main Website',
      domain: 'example.com',
      framework: 'NEXT',
      gitRepo: 'github.com/user/example',
      status: 'COMPLETED',
      lastDeploy: '2024-11-28T10:30:00',
      createdAt: '2024-01-10',
    },
    {
      id: '2',
      name: 'Test Site',
      domain: 'test.com',
      framework: 'REACT',
      gitRepo: 'github.com/user/test',
      status: 'COMPLETED',
      lastDeploy: '2024-11-27T14:20:00',
      createdAt: '2024-02-05',
    },
    {
      id: '3',
      name: 'New Project',
      domain: 'newdomain.com',
      framework: 'VUE',
      gitRepo: 'github.com/user/newproject',
      status: 'PENDING',
      createdAt: '2024-11-28',
    },
    {
      id: '4',
      name: 'Static Landing',
      domain: 'olddomain.com',
      framework: 'STATIC',
      status: 'FAILED',
      lastDeploy: '2024-11-26T09:15:00',
      createdAt: '2023-12-15',
    },
  ];

  const filteredSites = sites.filter(
    (site) =>
      site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      site.domain.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getFrameworkBadge = (framework: Framework) => {
    const badges = {
      NEXT: { text: 'Next.js', className: 'bg-black text-white dark:bg-white dark:text-black' },
      REACT: { text: 'React', className: 'bg-blue-500 text-white' },
      VUE: { text: 'Vue', className: 'bg-green-500 text-white' },
      STATIC: { text: 'Static', className: 'bg-gray-500 text-white' },
      NODE: { text: 'Node.js', className: 'bg-green-600 text-white' },
    };
    const badge = badges[framework];
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badge.className}`}>
        {badge.text}
      </span>
    );
  };

  const getStatusBadge = (status: DeployStatus) => {
    const badges = {
      COMPLETED: {
        icon: CheckCircleIcon,
        text: 'Yayında',
        className: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      },
      RUNNING: {
        icon: ArrowPathIcon,
        text: 'Deploy Ediliyor',
        className: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      },
      PENDING: {
        icon: ClockIcon,
        text: 'Beklemede',
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
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
            Site Yönetimi
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Web sitelerinizi yönetin, deploy edin ve izleyin
          </p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
          <PlusIcon className="w-5 h-5 mr-2" />
          Yeni Site
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ServerIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam Site</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{sites.length}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <CheckCircleIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Yayında</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sites.filter((s) => s.status === 'COMPLETED').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Beklemede</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sites.filter((s) => s.status === 'PENDING').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0 p-3 bg-red-100 dark:bg-red-900/30 rounded-lg">
              <XCircleIcon className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Başarısız</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {sites.filter((s) => s.status === 'FAILED').length}
              </p>
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
            placeholder="Site ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* Sites Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSites.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">
            Site bulunamadı
          </div>
        ) : (
          filteredSites.map((site) => (
            <div
              key={site.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Card Header */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                      {site.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                      {site.domain}
                    </p>
                  </div>
                  {getStatusBadge(site.status)}
                </div>
                <div className="mt-3 flex items-center space-x-2">
                  {getFrameworkBadge(site.framework)}
                  {site.gitRepo && (
                    <span className="inline-flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <CodeBracketIcon className="w-4 h-4 mr-1" />
                      Git
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 space-y-3">
                {site.lastDeploy && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Son Deploy:</span>
                    <span className="text-gray-900 dark:text-white">
                      {new Date(site.lastDeploy).toLocaleString('tr-TR')}
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Oluşturulma:</span>
                  <span className="text-gray-900 dark:text-white">
                    {new Date(site.createdAt).toLocaleDateString('tr-TR')}
                  </span>
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded transition-colors"
                    title="Deploy"
                  >
                    <RocketLaunchIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-green-600 hover:bg-green-50 dark:text-green-400 dark:hover:bg-green-900/30 rounded transition-colors"
                    title="İstatistikler"
                  >
                    <ChartBarIcon className="w-5 h-5" />
                  </button>
                  <button
                    className="p-2 text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 rounded transition-colors"
                    title="Ayarlar"
                  >
                    <Cog6ToothIcon className="w-5 h-5" />
                  </button>
                </div>
                <button
                  className="p-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 rounded transition-colors"
                  title="Sil"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
