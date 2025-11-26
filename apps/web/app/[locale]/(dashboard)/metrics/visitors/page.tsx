'use client';

import { useState } from 'react';
import { UsersIcon } from '@heroicons/react/24/outline';

export default function VisitorsPage() {
  const [timeRange, setTimeRange] = useState('7days');
  
  const visitData = [
    { date: '12-08', visitors: 1245, pageViews: 3421, uniqueVisitors: 892 },
    { date: '12-09', visitors: 1567, pageViews: 4234, uniqueVisitors: 1023 },
    { date: '12-10', visitors: 1432, pageViews: 3876, uniqueVisitors: 945 },
    { date: '12-11', visitors: 1789, pageViews: 4567, uniqueVisitors: 1156 },
    { date: '12-12', visitors: 2103, pageViews: 5234, uniqueVisitors: 1345 },
    { date: '12-13', visitors: 1876, pageViews: 4891, uniqueVisitors: 1203 },
    { date: '12-14', visitors: 2234, pageViews: 5678, uniqueVisitors: 1456 },
  ];

  const topPages = [
    { page: '/', views: 5678, percentage: 23 },
    { page: '/blog', views: 3421, percentage: 14 },
    { page: '/products', views: 2987, percentage: 12 },
    { page: '/about', views: 2145, percentage: 9 },
    { page: '/contact', views: 1876, percentage: 8 },
  ];

  const referrers = [
    { source: 'Direct', visitors: 4532, percentage: 42 },
    { source: 'Google Search', visitors: 3214, percentage: 30 },
    { source: 'Social Media', visitors: 1987, percentage: 18 },
    { source: 'Referral Links', visitors: 1087, percentage: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <UsersIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Visitors</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Ziyaretçi istatistiklerini görüntüleyin</p>
            </div>
          </div>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg"
          >
            <option value="24hours">Last 24 Hours</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Total Visitors</p>
          <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">12,246</p>
          <p className="text-sm text-green-600 mt-1">↑ 12.5%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Unique Visitors</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">7,620</p>
          <p className="text-sm text-green-600 mt-1">↑ 8.3%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Page Views</p>
          <p className="text-3xl font-bold text-purple-600 mt-2">31,901</p>
          <p className="text-sm text-green-600 mt-1">↑ 15.7%</p>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Avg. Session</p>
          <p className="text-3xl font-bold text-orange-600 mt-2">3:45</p>
          <p className="text-sm text-red-600 mt-1">↓ 2.1%</p>
        </div>
      </div>

      {/* Visitor Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Visitor Trends</h3>
        <div className="h-64 flex items-end justify-around gap-2 border-b border-l border-gray-300 dark:border-gray-600 p-4">
          {visitData.map((data, idx) => {
            const maxVisitors = Math.max(...visitData.map(d => d.visitors));
            const height = (data.visitors / maxVisitors) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-blue-600 rounded-t" style={{ height: `${height}%` }} title={`${data.visitors} visitors`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.date}</span>
              </div>
            );
          })}
        </div>
        <div className="mt-4 flex gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-600 rounded" />
            <span className="text-gray-700 dark:text-gray-300">Total Visitors</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-purple-600 rounded" />
            <span className="text-gray-700 dark:text-gray-300">Unique Visitors</span>
          </div>
        </div>
      </div>

      {/* Page Views Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Page Views</h3>
        <div className="h-64 flex items-end justify-around gap-2 border-b border-l border-gray-300 dark:border-gray-600 p-4">
          {visitData.map((data, idx) => {
            const maxViews = Math.max(...visitData.map(d => d.pageViews));
            const height = (data.pageViews / maxViews) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full bg-green-600 rounded-t" style={{ height: `${height}%` }} title={`${data.pageViews} page views`} />
                <span className="text-xs text-gray-600 dark:text-gray-400">{data.date}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Pages */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Top Pages</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {topPages.map((page, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-sm text-gray-900 dark:text-white">{page.page}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{page.views.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${page.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Traffic Sources</h3>
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {referrers.map((ref, idx) => (
              <div key={idx} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-900 dark:text-white">{ref.source}</span>
                  <span className="font-semibold text-gray-900 dark:text-white">{ref.visitors.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${ref.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
