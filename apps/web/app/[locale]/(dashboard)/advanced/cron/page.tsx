'use client';

import { useState } from 'react';
import { 
  ClockIcon, 
  PlusIcon,
  PlayIcon,
  PauseIcon,
  TrashIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

interface CronJob {
  id: number;
  command: string;
  schedule: string;
  nextRun: string;
  lastRun?: string;
  status: 'active' | 'paused';
  description: string;
}

export default function CronJobsPage() {
  const [cronJobs, setCronJobs] = useState<CronJob[]>([
    {
      id: 1,
      command: 'php /home/siyezden/public_html/cron/backup.php',
      schedule: '0 2 * * *',
      nextRun: '2024-12-04 02:00:00',
      lastRun: '2024-12-03 02:00:00',
      status: 'active',
      description: 'Günlük yedekleme',
    },
    {
      id: 2,
      command: 'wget -q -O /dev/null https://example.com/cron.php',
      schedule: '*/15 * * * *',
      nextRun: '2024-12-03 11:15:00',
      lastRun: '2024-12-03 11:00:00',
      status: 'active',
      description: 'API senkronizasyonu',
    },
    {
      id: 3,
      command: '/home/siyezden/scripts/cleanup.sh',
      schedule: '0 0 * * 0',
      nextRun: '2024-12-08 00:00:00',
      status: 'paused',
      description: 'Haftalık temizlik',
    },
  ]);

  const cronPresets = [
    { label: 'Her Dakika', value: '* * * * *' },
    { label: 'Her 5 Dakika', value: '*/5 * * * *' },
    { label: 'Her 15 Dakika', value: '*/15 * * * *' },
    { label: 'Her 30 Dakika', value: '*/30 * * * *' },
    { label: 'Her Saat', value: '0 * * * *' },
    { label: 'Her Gün (Gece Yarısı)', value: '0 0 * * *' },
    { label: 'Her Gün (02:00)', value: '0 2 * * *' },
    { label: 'Her Pazartesi', value: '0 0 * * 1' },
    { label: 'Her Hafta (Pazar)', value: '0 0 * * 0' },
    { label: 'Her Ay (1. Gün)', value: '0 0 1 * *' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-orange-600 dark:text-orange-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Cron Jobs
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Zamanlanmış görevlerinizi otomatikleştirin
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
            <PlusIcon className="w-5 h-5" />
            Yeni Cron Job
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <PlayIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Aktif</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {cronJobs.filter(j => j.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <PauseIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Duraklatılmış</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {cronJobs.filter(j => j.status === 'paused').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Toplam</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {cronJobs.length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Current Cron Jobs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Mevcut Cron Jobs</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Açıklama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Komut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Zamanlama
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Sonraki Çalışma
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Durum
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  İşlemler
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {cronJobs.map((job) => (
                <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="w-5 h-5 text-orange-500" />
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {job.description}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-mono text-gray-600 dark:text-gray-400 max-w-xs truncate block">
                      {job.command}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <code className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded font-mono">
                      {job.schedule}
                    </code>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                    {job.nextRun}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {job.status === 'active' ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <PlayIcon className="w-3 h-3 mr-1" />
                        Aktif
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                        <PauseIcon className="w-3 h-3 mr-1" />
                        Duraklatılmış
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-blue-900/30 p-2 rounded transition-colors">
                        <PencilSquareIcon className="w-5 h-5" />
                      </button>
                      <button className="text-yellow-600 hover:bg-yellow-50 dark:text-yellow-400 dark:hover:bg-yellow-900/30 p-2 rounded transition-colors">
                        {job.status === 'active' ? <PauseIcon className="w-5 h-5" /> : <PlayIcon className="w-5 h-5" />}
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

      {/* Cron Schedule Presets */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Hazır Zamanlama Şablonları
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {cronPresets.map((preset, idx) => (
            <div
              key={idx}
              className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-500 transition-colors cursor-pointer"
            >
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                {preset.label}
              </p>
              <code className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                {preset.value}
              </code>
            </div>
          ))}
        </div>
      </div>

      {/* Cron Syntax Helper */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-300 mb-3">
          Cron Syntax Rehberi
        </h3>
        <div className="grid grid-cols-5 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-300">*</div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">Dakika</div>
            <div className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">(0-59)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-300">*</div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">Saat</div>
            <div className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">(0-23)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-300">*</div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">Gün</div>
            <div className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">(1-31)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-300">*</div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">Ay</div>
            <div className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">(1-12)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-mono font-bold text-blue-900 dark:text-blue-300">*</div>
            <div className="text-xs text-blue-700 dark:text-blue-400 mt-1">Haftanın Günü</div>
            <div className="text-xs text-blue-600 dark:text-blue-500 mt-0.5">(0-7)</div>
          </div>
        </div>
        <div className="space-y-2 text-sm text-blue-800 dark:text-blue-400">
          <p>• <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">*</code> = Her zaman</p>
          <p>• <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">*/5</code> = Her 5 birimde bir</p>
          <p>• <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">1,15</code> = 1 ve 15'te</p>
          <p>• <code className="bg-blue-100 dark:bg-blue-900/50 px-1 rounded">1-5</code> = 1'den 5'e kadar</p>
        </div>
      </div>
    </div>
  );
}
