'use client';

import { useState, useEffect } from 'react';
import {
  GlobeAltIcon,
  PlusIcon,
  TrashIcon,
  ServerIcon,
  UserIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface IpAddress {
  id: string;
  ipAddress: string;
  isShared: boolean;
  isActive: boolean;
  createdAt: string;
  server: {
    id: string;
    name: string;
    hostname: string;
  };
  customer?: {
    id: string;
    username: string;
    fullName: string;
  };
}

interface Server {
  id: string;
  name: string;
  hostname: string;
}

export default function IpAddressesPage() {
  const [ipAddresses, setIpAddresses] = useState<IpAddress[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    ipAddress: '',
    serverId: '',
    isShared: false,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [ipResponse, serverResponse] = await Promise.all([
        fetch('http://localhost:3001/servers/ip-addresses/all'),
        fetch('http://localhost:3001/servers'),
      ]);

      if (ipResponse.ok) {
        const ipData = await ipResponse.json();
        setIpAddresses(ipData);
      }

      if (serverResponse.ok) {
        const serverData = await serverResponse.json();
        setServers(serverData);
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddIp = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3001/servers/ip-addresses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAddForm(false);
        setFormData({ ipAddress: '', serverId: '', isShared: false });
        fetchData();
      } else {
        const error = await response.json();
        alert(error.message || 'IP adresi eklenemedi');
      }
    } catch (error) {
      console.error('Failed to add IP:', error);
      alert('Bir hata oluştu');
    }
  };

  const deleteIp = async (id: string) => {
    if (!confirm('Bu IP adresini silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/servers/ip-addresses/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      } else {
        const error = await response.json();
        alert(error.message || 'IP adresi silinemedi');
      }
    } catch (error) {
      console.error('Failed to delete IP:', error);
      alert('Bir hata oluştu');
    }
  };

  const assignedIps = ipAddresses.filter((ip) => ip.customer);
  const availableIps = ipAddresses.filter((ip) => !ip.customer);

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
          <h1 className="text-2xl font-bold text-gray-900">IP Adresi Yönetimi</h1>
          <p className="mt-1 text-sm text-gray-500">
            Sunucularınızdaki IP adreslerini yönetin
          </p>
        </div>
        <div className="flex space-x-3">
          <Link
            href="/servers"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            <ServerIcon className="h-5 w-5 mr-2" />
            Sunuculara Dön
          </Link>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            <PlusIcon className="h-5 w-5 mr-2" />
            Yeni IP Ekle
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-4 mb-6">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <GlobeAltIcon className="h-6 w-6 text-gray-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Toplam IP</dt>
                  <dd className="text-lg font-semibold text-gray-900">{ipAddresses.length}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Kullanılan</dt>
                  <dd className="text-lg font-semibold text-gray-900">{assignedIps.length}</dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-6 w-6 text-blue-400" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Müsait</dt>
                  <dd className="text-lg font-semibold text-gray-900">{availableIps.length}</dd>
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
                  <dt className="text-sm font-medium text-gray-500 truncate">Shared IP</dt>
                  <dd className="text-lg font-semibold text-gray-900">
                    {ipAddresses.filter((ip) => ip.isShared).length}
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Form */}
      {showAddForm && (
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Yeni IP Adresi Ekle</h2>
          <form onSubmit={handleAddIp} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  IP Adresi *
                </label>
                <input
                  type="text"
                  required
                  value={formData.ipAddress}
                  onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="192.168.1.150"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Sunucu *
                </label>
                <select
                  required
                  value={formData.serverId}
                  onChange={(e) => setFormData({ ...formData, serverId: e.target.value })}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="">Sunucu seçin</option>
                  {servers.map((server) => (
                    <option key={server.id} value={server.id}>
                      {server.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-end">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.isShared}
                    onChange={(e) => setFormData({ ...formData, isShared: e.target.checked })}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">Shared IP</span>
                </label>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                IP Ekle
              </button>
            </div>
          </form>
        </div>
      )}

      {/* IP List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                IP Adresi
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sunucu
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tip
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Atanan Müşteri
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ipAddresses.map((ip) => (
              <tr key={ip.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <GlobeAltIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-mono font-medium text-gray-900">
                      {ip.ipAddress}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{ip.server.name}</div>
                  <div className="text-sm text-gray-500">{ip.server.hostname}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      ip.isShared
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-purple-100 text-purple-800'
                    }`}
                  >
                    {ip.isShared ? 'Shared' : 'Dedicated'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ip.customer ? (
                    <div className="flex items-center">
                      <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {ip.customer.username}
                        </div>
                        <div className="text-sm text-gray-500">{ip.customer.fullName}</div>
                      </div>
                    </div>
                  ) : (
                    <span className="text-sm text-gray-400">-</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {ip.isActive ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircleIcon className="w-4 h-4 mr-1" />
                      Aktif
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <XCircleIcon className="w-4 h-4 mr-1" />
                      Pasif
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => deleteIp(ip.id)}
                    disabled={!!ip.customer}
                    className={`text-red-600 hover:text-red-900 ${
                      ip.customer ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    <TrashIcon className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {ipAddresses.length === 0 && (
          <div className="text-center py-12">
            <GlobeAltIcon className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">IP adresi bulunamadı</h3>
            <p className="mt-1 text-sm text-gray-500">
              İlk IP adresinizi eklemek için yukarıdaki butonu kullanın.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
