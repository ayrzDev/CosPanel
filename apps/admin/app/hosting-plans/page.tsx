'use client';

import { useState, useEffect } from 'react';
import { PlusIcon, ServerIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface HostingPlan {
  id: string;
  name: string;
  description?: string;
  diskSpaceMB: number;
  bandwidthMB: number;
  emailAccounts: number;
  databases: number;
  ftpAccounts: number;
  subdomains: number;
  addonDomains: number;
  parkedDomains: number;
  monthlyPrice: number;
  yearlyPrice?: number;
  features: string[];
  createdAt: string;
}

export default function HostingPlansPage() {
  const [plans, setPlans] = useState<HostingPlan[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch('http://localhost:3001/hosting-plans');
      if (response.ok) {
        const data = await response.json();
        setPlans(data);
      }
    } catch (error) {
      console.error('Failed to fetch hosting plans:', error);
    } finally {
      setLoading(false);
    }
  };

  const deletePlan = async (id: string) => {
    if (!confirm('Bu hosting planını silmek istediğinizden emin misiniz?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/hosting-plans/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchPlans();
      }
    } catch (error) {
      console.error('Failed to delete hosting plan:', error);
    }
  };

  const formatSize = (mb: number) => {
    if (mb >= 1024) {
      return `${(mb / 1024).toFixed(0)} GB`;
    }
    return `${mb} MB`;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
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
          <h1 className="text-2xl font-bold text-gray-900">Hosting Planları</h1>
          <p className="mt-1 text-sm text-gray-500">
            Hosting planlarınızı görüntüleyin ve yönetin
          </p>
        </div>
        <Link
          href="/hosting-plans/new"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5 mr-2" />
          Yeni Plan
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <ServerIcon className="h-8 w-8 text-blue-500 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">{plan.name}</h3>
                </div>
              </div>

              {plan.description && (
                <p className="text-sm text-gray-500 mb-4">{plan.description}</p>
              )}

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Disk Alanı:</span>
                  <span className="font-medium text-gray-900">{formatSize(plan.diskSpaceMB)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Bant Genişliği:</span>
                  <span className="font-medium text-gray-900">{formatSize(plan.bandwidthMB)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">E-posta Hesapları:</span>
                  <span className="font-medium text-gray-900">{plan.emailAccounts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Veritabanları:</span>
                  <span className="font-medium text-gray-900">{plan.databases}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">FTP Hesapları:</span>
                  <span className="font-medium text-gray-900">{plan.ftpAccounts}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subdomain:</span>
                  <span className="font-medium text-gray-900">{plan.subdomains}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Addon Domain:</span>
                  <span className="font-medium text-gray-900">{plan.addonDomains}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Parked Domain:</span>
                  <span className="font-medium text-gray-900">{plan.parkedDomains}</span>
                </div>
              </div>

              {plan.features.length > 0 && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Özellikler:</p>
                  <ul className="text-sm text-gray-500 space-y-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex justify-between items-baseline">
                  <span className="text-sm text-gray-500">Aylık Fiyat:</span>
                  <span className="text-2xl font-bold text-gray-900">
                    {formatCurrency(plan.monthlyPrice)}
                  </span>
                </div>
                {plan.yearlyPrice && (
                  <div className="flex justify-between items-baseline mt-2">
                    <span className="text-sm text-gray-500">Yıllık Fiyat:</span>
                    <span className="text-lg font-semibold text-gray-700">
                      {formatCurrency(plan.yearlyPrice)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Düzenle
                </button>
                <button
                  onClick={() => deletePlan(plan.id)}
                  className="flex-1 inline-flex items-center justify-center px-3 py-2 border border-red-300 shadow-sm text-sm font-medium rounded-md text-red-700 bg-white hover:bg-red-50"
                >
                  <TrashIcon className="h-4 w-4 mr-2" />
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {plans.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow">
          <ServerIcon className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Plan bulunamadı</h3>
          <p className="mt-1 text-sm text-gray-500">
            Henüz hosting planı oluşturmadınız.
          </p>
          <div className="mt-6">
            <Link
              href="/hosting-plans/new"
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
            >
              <PlusIcon className="h-5 w-5 mr-2" />
              İlk Planınızı Oluşturun
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
