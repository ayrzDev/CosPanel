'use client';

import { useEffect, useState } from 'react';
import {
  CpuChipIcon,
  CircleStackIcon,
  ServerIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';

export default function MetricsPage() {
  const [cpuData, setCpuData] = useState<number[]>([]);
  const [ramData, setRamData] = useState<number[]>([]);
  const [diskData, setDiskData] = useState<number[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCpuData((prev) => [...prev.slice(-29), 20 + Math.random() * 40]);
      setRamData((prev) => [...prev.slice(-29), 50 + Math.random() * 30]);
      setDiskData((prev) => [...prev.slice(-29), 60 + Math.random() * 15]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const renderMiniChart = (data: number[], color: string) => {
    const max = Math.max(...data, 100);
    const points = data
      .map((val, idx) => {
        const x = (idx / (data.length - 1 || 1)) * 100;
        const y = 100 - (val / max) * 100;
        return `${x},${y}`;
      })
      .join(' ');

    return (
      <svg className="w-full h-16" viewBox="0 0 100 100" preserveAspectRatio="none">
        <polyline
          fill="none"
          stroke={color}
          strokeWidth="2"
          points={points}
        />
      </svg>
    );
  };

  const currentCpu = cpuData[cpuData.length - 1] || 0;
  const currentRam = ramData[ramData.length - 1] || 0;
  const currentDisk = diskData[diskData.length - 1] || 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Performans Metrikleri
        </h1>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Sunucu kaynaklarınızın canlı kullanım durumunu izleyin
        </p>
      </div>

      {/* Live Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CPU */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <CpuChipIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">CPU Kullanımı</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentCpu.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="h-16">
            {cpuData.length > 0 && renderMiniChart(cpuData, '#3b82f6')}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Ortalama: {(cpuData.reduce((a, b) => a + b, 0) / (cpuData.length || 1)).toFixed(1)}%</span>
              <span>Çekirdek: 4</span>
            </div>
          </div>
        </div>

        {/* RAM */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <ServerIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">RAM Kullanımı</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentRam.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="h-16">
            {ramData.length > 0 && renderMiniChart(ramData, '#a855f7')}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Kullanılan: {((currentRam / 100) * 8).toFixed(1)} GB</span>
              <span>Toplam: 8 GB</span>
            </div>
          </div>
        </div>

        {/* Disk */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <CircleStackIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">Disk Kullanımı</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {currentDisk.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
          <div className="h-16">
            {diskData.length > 0 && renderMiniChart(diskData, '#10b981')}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
              <span>Kullanılan: {((currentDisk / 100) * 100).toFixed(0)} GB</span>
              <span>Toplam: 100 GB</span>
            </div>
          </div>
        </div>
      </div>

      {/* Network & Traffic Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Ağ Trafiği
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Gelen (Download)</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                45.2 Mbps
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }} />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-600 dark:text-gray-400">Giden (Upload)</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                12.8 Mbps
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '13%' }} />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Bu Ay İstatistikleri
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Toplam Bant Genişliği</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">128 GB</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Toplam İstek</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">2.4M</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Ortalama Yanıt Süresi</span>
              <span className="text-sm font-medium text-gray-900 dark:text-white">145ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Uptime</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">99.98%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
