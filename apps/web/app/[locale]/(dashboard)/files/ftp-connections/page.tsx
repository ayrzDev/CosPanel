'use client';

import { useState, useEffect } from 'react';
import { 
  ServerIcon, 
  SignalIcon,
  ClockIcon,
  UserIcon,
  GlobeAltIcon,
  XCircleIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';

interface FTPConnection {
  id: number;
  username: string;
  ipAddress: string;
  status: 'active' | 'idle';
  connectedAt: string;
  duration: string;
  currentDirectory: string;
  transferring?: string;
}

export default function FTPConnectionsPage() {
  const [connections, setConnections] = useState<FTPConnection[]>([
    {
      id: 1,
      username: 'siyezden@siyezden.com',
      ipAddress: '91.217.119.88',
      status: 'active',
      connectedAt: '2024-12-03 10:25:30',
      duration: '00:15:42',
      currentDirectory: '/public_html/images',
      transferring: 'logo.png (2.3 MB)',
    },
    {
      id: 2,
      username: 'backup@siyezden.com',
      ipAddress: '104.28.164.100',
      status: 'idle',
      connectedAt: '2024-12-03 09:30:15',
      duration: '01:10:27',
      currentDirectory: '/backups',
    },
  ]);

  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    if (!autoRefresh) return;
    
    const interval = setInterval(() => {
      // Mock: Update durations
      setConnections(prev => prev.map(conn => {
        const [hours, minutes, seconds] = conn.duration.split(':').map(Number);
        const totalSeconds = hours * 3600 + minutes * 60 + seconds + 1;
        const newHours = Math.floor(totalSeconds / 3600);
        const newMinutes = Math.floor((totalSeconds % 3600) / 60);
        const newSeconds = totalSeconds % 60;
        return {
          ...conn,
          duration: `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`
        };
      }));
    }, 1000);

    return () => clearInterval(interval);
  }, [autoRefresh]);

  const handleDisconnect = (id: number, username: string) => {
    if (confirm(`Are you sure you want to disconnect ${username}?`)) {
      setConnections(prev => prev.filter(conn => conn.id !== id));
    }
  };

  const handleRefresh = () => {
    // Mock refresh
    console.log('Refreshing connections...');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <SignalIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                FTP Connections
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Aktif FTP bağlantılarını izleyin ve yönetin
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleRefresh}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors"
            >
              <ArrowPathIcon className="w-5 h-5" />
              Refresh
            </button>
            <label className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Auto Refresh</span>
            </label>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <SignalIcon className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Connections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {connections.filter(c => c.status === 'active').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
              <ClockIcon className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Idle Connections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {connections.filter(c => c.status === 'idle').length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <ServerIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Connections</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{connections.length}</p>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <UserIcon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">Unique Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {new Set(connections.map(c => c.username)).size}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Connections Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-gray-200 dark:border-gray-700">
        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
            Active FTP Sessions
          </h2>
        </div>
        {connections.length === 0 ? (
          <div className="p-12 text-center">
            <ServerIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 dark:text-gray-400">No active FTP connections</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    User
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    IP Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Connected At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Duration
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Current Directory
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Activity
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {connections.map((conn) => (
                  <tr key={conn.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <UserIcon className="w-5 h-5 text-blue-500" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {conn.username}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <GlobeAltIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-600 dark:text-gray-400">
                          {conn.ipAddress}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {conn.status === 'active' ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <span className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full mr-1.5 animate-pulse"></span>
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400">
                          <span className="w-2 h-2 bg-yellow-600 dark:bg-yellow-400 rounded-full mr-1.5"></span>
                          Idle
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">
                      {conn.connectedAt}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <ClockIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-sm font-mono text-gray-900 dark:text-white">
                          {conn.duration}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-mono text-gray-600 dark:text-gray-400 text-xs">
                        {conn.currentDirectory}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {conn.transferring ? (
                        <div className="flex items-center gap-2">
                          <ArrowPathIcon className="w-4 h-4 text-blue-500 animate-spin" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {conn.transferring}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleDisconnect(conn.id, conn.username)}
                        className="text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/30 p-2 rounded transition-colors"
                        title="Disconnect"
                      >
                        <XCircleIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Info Box */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex gap-3">
          <SignalIcon className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-1">
              FTP Connection Monitoring
            </h3>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>• Bu sayfa gerçek zamanlı FTP bağlantılarını gösterir</li>
              <li>• Aktif transferleri ve kullanıcı aktivitelerini izleyebilirsiniz</li>
              <li>• Auto Refresh açıksa sayfa otomatik olarak güncellenir</li>
              <li>• Şüpheli bağlantıları disconnect butonu ile sonlandırabilirsiniz</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
