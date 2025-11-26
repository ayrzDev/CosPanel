'use client';

import { useState, useEffect } from 'react';
import {
  ServerIcon,
  PlusIcon,
  PencilIcon,
  TrashIcon,
  CheckCircleIcon,
  XCircleIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Server {
  id: string;
  name: string;
  hostname: string;
  ipAddress: string;
  nameserver1?: string;
  nameserver2?: string;
  nameserver3?: string;
  nameserver4?: string;
  maxAccounts: number;
  currentAccounts: number;
  isActive: boolean;
  createdAt: string;
  _count?: {
    customers: number;
    ipAddresses: number;
  };
}

export default function ServersPage() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServers();
  }, []);

  const fetchServers = async () => {
    try {
      // TODO: Add authentication token
      const response = await fetch('http://localhost:3001/servers');
      if (response.ok) {
        const data = await response.json();
        setServers(data);
      }
    } catch (error) {
      console.error('Failed to fetch servers:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteServer = async (id: string) => {
    if (!confirm('Bu sunucuyu silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/servers/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchServers();
      } else {
        const error = await response.json();
        alert(error.message || 'Sunucu silinemedi');
      }
    } catch (error) {
      console.error('Failed to delete server:', error);
      alert('Bir hata oluştu');
    }
  };

  const getUsagePercentage = (current: number, max: number) => {
    return Math.round((current / max) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600 bg-red-100';
    if (percentage >= 75) return 'text-orange-600 bg-orange-100';
    if (percentage >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-green-600 bg-green-100';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sunucu Yönetimi</h1>
          <p className="mt-1 text-sm text-gray-500">
            Hosting sunucularınızı ve IP adreslerinizi yönetin
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/servers/ip-addresses"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <GlobeAltIcon className="h-5 w-5 mr-2" />
            IP Adresleri
          </Link>
          <Link
            href="/servers/new"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Yeni Sunucu
          </Link>
        </div>
      </div>

      {/* Server Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ServerIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam Sunucu</dt>
                  <dd className="text-lg font-semibold text-gray-900">{servers.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-green-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Aktif</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {servers.filter((s) => s.isActive).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ServerIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam Hesap</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {servers.reduce((sum, s) => sum + (s._count?.customers || 0), 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GlobeAltIcon className="h-6 w-6 text-purple-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam IP</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {servers.reduce((sum, s) => sum + (s._count?.ipAddresses || 0), 0)}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Servers List */}
      <div className="grid grid-cols-1 gap-6">
        {servers.map((server) => {
          const usagePercent = getUsagePercentage(server._count?.customers || 0, server.maxAccounts);
          const usageColor = getUsageColor(usagePercent);

          return (
            <div key={server.id} className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-6 py-5">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center">
                      <ServerIcon className="h-8 w-8 text-blue-500 mr-3" />
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{server.name}</h3>
                        <p className="text-sm text-gray-500">{server.hostname}</p>
                      </div>
                      {server.isActive ? (
                        <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Aktif
                        </span>
                      ) : (
                        <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <XCircleIcon className="w-4 h-4 mr-1" />
                          Pasif
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs font-medium text-gray-500">IP Adresi</p>
                        <p className="mt-1 text-sm font-mono text-gray-900">{server.ipAddress}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Nameserver 1</p>
                        <p className="mt-1 text-sm font-mono text-gray-900">{server.nameserver1 || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">Nameserver 2</p>
                        <p className="mt-1 text-sm font-mono text-gray-900">{server.nameserver2 || '-'}</p>
                      </div>
                      <div>
                        <p className="text-xs font-medium text-gray-500">IP Havuzu</p>
                        <p className="mt-1 text-sm text-gray-900">{server._count?.ipAddresses || 0} IP</p>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                          Hesap Kullanımı: {server._count?.customers || 0} / {server.maxAccounts}
                        </span>
                        <span className={`text-sm font-semibold px-2 py-1 rounded ${usageColor}`}>
                          %{usagePercent}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            usagePercent >= 90
                              ? 'bg-red-600'
                              : usagePercent >= 75
                              ? 'bg-orange-500'
                              : usagePercent >= 50
                              ? 'bg-yellow-500'
                              : 'bg-green-500'
                          }`}
                          style={{ width: `${usagePercent}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Link
                      href={`/servers/${server.id}`}
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      <PencilIcon className="h-4 w-4 mr-2" />
                      Düzenle
                    </Link>
                    <button
                      onClick={() => deleteServer(server.id)}
                      className="inline-flex items-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                    >
                      <TrashIcon className="h-4 w-4 mr-2" />
                      Sil
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {servers.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Sunucu bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            Henüz sunucu eklemediniz. İlk sunucunuzu oluşturun.
          </p>
          <div className="mt-6">
            <Link
              href="/servers/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              İlk Sunucunuzu Ekleyin
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
