'use client';

import { useState } from 'react';
import { ArrowTrendingUpIcon } from '@heroicons/react/24/outline';

export default function BandwidthPage() {
  const bandwidthData = [
    { date: '12-08', bandwidth: 2.4 },
    { date: '12-09', bandwidth: 3.1 },
    { date: '12-10', bandwidth: 2.8 },
    { date: '12-11', bandwidth: 3.5 },
    { date: '12-12', bandwidth: 4.2 },
    { date: '12-13', bandwidth: 3.8 },
    { date: '12-14', bandwidth: 4.5 },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
            <ArrowTrendingUpIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Bandwidth</h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Bandwidth kullanımınızı görüntüleyin</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">This Month</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">24.3 GB</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Today</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">4.5 GB</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Quota</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">100 GB</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Remaining</p>
          <p className="text-3xl font-bold text-green-600 mt-2">75.7 GB</p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Daily Bandwidth Usage (GB)</h3>
        <div className="h-64 flex items-end justify-around gap-2 border-b border-l border-gray-300 dark:border-gray-600 p-4">
          {bandwidthData.map((data, idx) => {
            const maxBandwidth = Math.max(...bandwidthData.map(d => d.bandwidth));
            const height = (data.bandwidth / maxBandwidth) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-purple-600 rounded-t" style={{ height: `${height}%` }} title={`${data.bandwidth} GB`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Bandwidth by Protocol</h3>
        <div className="space-y-3">
          {[
            { protocol: 'HTTP/HTTPS', bandwidth: 18.5, percentage: 76 },
            { protocol: 'FTP', bandwidth: 3.2, percentage: 13 },
            { protocol: 'Email (SMTP/IMAP)', bandwidth: 2.1, percentage: 9 },
            { protocol: 'Other', bandwidth: 0.5, percentage: 2 },
          ].map((item, idx) => (
            <div key={idx}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-900 dark:text-white">{item.protocol}</span>
                <span className="text-sm font-semibold text-gray-900 dark:text-white">{item.bandwidth} GB</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div className="bg-purple-600 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
