'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  GlobeAltIcon,
  PlusIcon,
  TrashIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';

interface Domain {
  id: string;
  fqdn: string;
  domainType: 'PRIMARY' | 'ADDON' | 'SUBDOMAIN' | 'PARKED' | null;
  isPrimary: boolean;
  sslStatus: 'NONE' | 'PENDING' | 'ACTIVE' | 'EXPIRED';
  isActive: boolean;
  createdAt: string;
}

interface DomainStats {
  primaryDomains: number;
  addonDomains: number;
  subdomains: number;
  parkedDomains: number;
  totalDomains: number;
  sslEnabled: number;
  limits: {
    addonDomains: number;
    subdomains: number;
    parkedDomains: number;
  };
}

export default function DomainsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [domains, setDomains] = useState<Domain[]>([]);
  const [stats, setStats] = useState<DomainStats | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    domain: '',
    type: 'ADDON', // ADDON, SUBDOMAIN, PARKED
  });

  useEffect(() => {
    fetchDomains();
  }, []);

  const fetchDomains = async () => {
    try {
      setLoading(true);
      setError(null);

      // Get customer ID from localStorage
      const customerData = localStorage.getItem('customer_user');
      const customerId = customerData ? JSON.parse(customerData).id : '1';

      // Fetch domains
      const domainsRes = await fetch(`http://localhost:3001/domains?customerId=${customerId}`);
      if (domainsRes.ok) {
        const domainsData = await domainsRes.json();
        setDomains(domainsData);
      } else {
        console.error('Failed to fetch domains');
      }

      // Fetch stats
      const statsRes = await fetch(`http://localhost:3001/domains/customer/${customerId}/stats`);
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      } else {
        console.error('Failed to fetch domain stats');
      }
    } catch (error) {
      console.error('Error fetching domains:', error);
      setError('Domain verileri yüklenirken hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const customerData = localStorage.getItem('customer_user');
      const customerId = customerData ? JSON.parse(customerData).id : '1';

      let fqdn = formData.domain.trim();
      
      // For subdomains, ensure proper format
      if (formData.type === 'SUBDOMAIN') {
        // If user didn't include parent domain, add the primary domain
        if (!fqdn.includes('.')) {
          const primaryDomain = domains.find(d => d.isPrimary);
          if (primaryDomain) {
            fqdn = `${fqdn}.${primaryDomain.fqdn}`;
          }
        }
      }

      const response = await fetch('http://localhost:3001/domains', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fqdn,
          accountId: customerId, // Required by schema
          customerId,
          domainType: formData.type,
          isPrimary: false,
        }),
      });

      if (response.ok) {
        await fetchDomains(); // Refresh list
        setShowAddForm(false);
        setFormData({ domain: '', type: 'ADDON' });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Domain eklenirken hata oluştu');
      }
    } catch (error) {
      console.error('Error creating domain:', error);
      setError('Domain eklenirken hata oluştu');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (domainId: string, domainName: string) => {
    if (!confirm(`${domainName} domain'ini silmek istediğinizden emin misiniz?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/domains/${domainId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await fetchDomains(); // Refresh list
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Domain silinirken hata oluştu');
      }
    } catch (error) {
      console.error('Error deleting domain:', error);
      alert('Domain silinirken hata oluştu');
    }
  };

  const getDomainTypeLabel = (type: string | null) => {
    switch (type) {
      case 'PRIMARY': return 'Ana Domain';
      case 'ADDON': return 'Addon';
      case 'SUBDOMAIN': return 'Subdomain';
      case 'PARKED': return 'Parked';
      default: return 'Bilinmiyor';
    }
  };

  const getDomainTypeBadge = (type: string | null, isPrimary: boolean) => {
    if (isPrimary) {
      return <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">Ana Domain</span>;
    }
    
    const colors = {
      ADDON: 'bg-green-100 text-green-800',
      SUBDOMAIN: 'bg-purple-100 text-purple-800',
      PARKED: 'bg-gray-100 text-gray-800',
    };
    
    const color = colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    return <span className={`px-2 py-1 text-xs font-medium ${color} rounded`}>{getDomainTypeLabel(type)}</span>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Yükleniyor...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Domain Yönetimi</h1>
                <p className="text-sm text-gray-600">Domain'lerinizi yönetin</p>
              </div>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              <span>Yeni Domain</span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Add Domain Form */}
        {showAddForm && (
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Yeni Domain Ekle</h2>
            {error && (
              <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Tipi
                </label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  disabled={submitting}
                >
                  <option value="ADDON">Addon Domain</option>
                  <option value="SUBDOMAIN">Subdomain</option>
                  <option value="PARKED">Alias (Parked Domain)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Domain Adı
                </label>
                <input
                  type="text"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  placeholder={
                    formData.type === 'SUBDOMAIN'
                      ? 'blog veya blog.example.com'
                      : 'newdomain.com'
                  }
                  required
                  disabled={submitting}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.type === 'SUBDOMAIN' && 'Alt domain adını girin (örn: blog, shop)'}
                  {formData.type === 'ADDON' && 'Eklemek istediğiniz domain adını girin'}
                  {formData.type === 'PARKED' && 'Ana domain\'inizin alias\'ını girin'}
                </p>
              </div>

              {stats && (
                <div className="text-sm bg-gray-50 rounded-lg p-3">
                  <p className="font-medium text-gray-700 mb-1">Kullanım Durumu:</p>
                  <ul className="space-y-1 text-gray-600">
                    <li>• Addon Domain: {stats.addonDomains} / {stats.limits.addonDomains}</li>
                    <li>• Subdomain: {stats.subdomains} / {stats.limits.subdomains}</li>
                    <li>• Parked Domain: {stats.parkedDomains} / {stats.limits.parkedDomains}</li>
                  </ul>
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Ekleniyor...' : 'Domain Ekle'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddForm(false);
                    setFormData({ domain: '', type: 'ADDON' });
                    setError(null);
                  }}
                  disabled={submitting}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:bg-gray-100"
                >
                  İptal
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Domains List */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Domain Listesi</h2>
              {stats && (
                <p className="text-sm text-gray-600 mt-1">
                  Toplam: {stats.totalDomains} domain 
                  {stats.limits && (
                    <span className="ml-2">
                      (Addon: {stats.addonDomains}/{stats.limits.addonDomains}, 
                      Subdomain: {stats.subdomains}/{stats.limits.subdomains})
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          {error && (
            <div className="px-6 py-4 bg-red-50 border-b border-red-200">
              <div className="flex items-center space-x-2 text-red-800">
                <ExclamationCircleIcon className="w-5 h-5" />
                <span className="text-sm">{error}</span>
              </div>
            </div>
          )}

          <div className="divide-y divide-gray-200">
            {domains.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <GlobeAltIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Domain bulunamadı</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Yeni domain ekleyerek başlayın
                </p>
              </div>
            ) : (
              domains.map((domain) => (
                <div
                  key={domain.id}
                  className="px-6 py-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <GlobeAltIcon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {domain.fqdn}
                          </h3>
                          {getDomainTypeBadge(domain.domainType, domain.isPrimary)}
                        </div>
                        <div className="flex items-center space-x-4 mt-1">
                          <p className="text-sm text-gray-600">
                            Eklendi: {new Date(domain.createdAt).toLocaleDateString('tr-TR')}
                          </p>
                          {domain.sslStatus === 'ACTIVE' ? (
                            <div className="flex items-center space-x-1 text-green-600">
                              <CheckCircleIcon className="w-4 h-4" />
                              <span className="text-xs font-medium">SSL Aktif</span>
                            </div>
                          ) : domain.sslStatus === 'PENDING' ? (
                            <div className="flex items-center space-x-1 text-yellow-600">
                              <ExclamationCircleIcon className="w-4 h-4" />
                              <span className="text-xs font-medium">SSL Bekliyor</span>
                            </div>
                          ) : (
                            <div className="flex items-center space-x-1 text-orange-600">
                              <ExclamationTriangleIcon className="w-4 h-4" />
                              <span className="text-xs font-medium">SSL Yok</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      {!domain.isPrimary && (
                        <button
                          onClick={() => handleDelete(domain.id, domain.fqdn)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Domain'i Sil"
                        >
                          <TrashIcon className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <GlobeAltIcon className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-blue-900">
              <p className="font-semibold mb-2">Domain Türleri:</p>
              <ul className="space-y-1 list-disc list-inside">
                <li><strong>Ana Domain:</strong> Hosting hesabınızın birincil domain adıdır.</li>
                <li><strong>Addon Domain:</strong> Hosting hesabınıza ek olarak ekleyebileceğiniz bağımsız domain'lerdir.</li>
                <li><strong>Subdomain:</strong> Ana domain'inizin alt domain'leridir (örn: blog.example.com).</li>
                <li><strong>Alias (Parked):</strong> Ana domain'inizin alternatif adresleridir.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
