'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface HostingPlan {
  id: string;
  name: string;
  monthlyPrice: number;
  diskSpaceMB: number;
  bandwidthMB: number;
}

interface Server {
  id: string;
  name: string;
  hostname: string;
}

interface IpAddress {
  id: string;
  ipAddress: string;
  isShared: boolean;
}

export default function NewCustomerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [hostingPlans, setHostingPlans] = useState<HostingPlan[]>([]);
  const [servers, setServers] = useState<Server[]>([]);
  const [availableIps, setAvailableIps] = useState<IpAddress[]>([]);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    fullName: '',
    companyName: '',
    phone: '',
    address: '',
    hostingPlanId: '',
    serverId: '',
    ipAddressId: '',
    billingCycle: 'MONTHLY',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (formData.serverId) {
      fetchAvailableIps(formData.serverId);
    }
  }, [formData.serverId]);

  const fetchData = async () => {
    try {
      const [plansRes, serversRes] = await Promise.all([
        fetch('http://localhost:3001/hosting-plans'),
        fetch('http://localhost:3001/servers'),
      ]);

      if (plansRes.ok) {
        const plans = await plansRes.json();
        setHostingPlans(plans);
      }

      if (serversRes.ok) {
        const serverData = await serversRes.json();
        setServers(serverData.filter((s: Server & { isActive: boolean }) => s.isActive));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const fetchAvailableIps = async (serverId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/servers/ip-addresses/available?serverId=${serverId}`);
      if (response.ok) {
        const ips = await response.json();
        setAvailableIps(ips);
      }
    } catch (error) {
      console.error('Failed to fetch IPs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get selected plan details
      const selectedPlan = hostingPlans.find(p => p.id === formData.hostingPlanId);
      if (!selectedPlan) {
        alert('Lütfen bir hosting planı seçin');
        return;
      }

      const customerData = {
        ...formData,
        homeDirectory: `/home/${formData.username}`,
        diskQuotaMB: selectedPlan.diskSpaceMB,
        bandwidthQuotaMB: selectedPlan.bandwidthMB,
        status: 'ACTIVE',
      };

      const response = await fetch('http://localhost:3001/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(customerData),
      });

      if (response.ok) {
        const customer = await response.json();

        // Assign IP to customer if selected
        if (formData.ipAddressId) {
          await fetch(`http://localhost:3001/servers/ip-addresses/${formData.ipAddressId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ customerId: customer.id }),
          });
        }

        router.push('/customers');
      } else {
        const error = await response.json();
        alert(error.message || 'Müşteri oluşturulamadı');
      }
    } catch (error) {
      console.error('Failed to create customer:', error);
      alert('Bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <Link
          href="/customers"
          className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-4"
        >
          <ArrowLeftIcon className="h-4 w-4 mr-2" />
          Geri Dön
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">Yeni Müşteri Ekle</h1>
        <p className="mt-1 text-sm text-gray-500">
          Yeni hosting müşterisi oluşturun
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Account Information */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hesap Bilgileri</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Kullanıcı Adı * <span className="text-gray-500 font-normal">(cPanel username)</span>
              </label>
              <input
                type="text"
                name="username"
                required
                pattern="[a-z0-9]+"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="johndoe"
              />
              <p className="mt-1 text-xs text-gray-500">Sadece küçük harf ve rakam</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-posta *
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="john@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ad Soyad *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Şirket Adı
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Acme Inc."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Telefon
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="+90 555 123 4567"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Adres
              </label>
              <textarea
                name="address"
                rows={2}
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Tam adres..."
              />
            </div>
          </div>
        </div>

        {/* Hosting Configuration */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Hosting Ayarları</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Hosting Planı *
              </label>
              <select
                name="hostingPlanId"
                required
                value={formData.hostingPlanId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Plan seçin</option>
                {hostingPlans.map((plan) => (
                  <option key={plan.id} value={plan.id}>
                    {plan.name} - ${plan.monthlyPrice}/mo
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Fatura Dönemi *
              </label>
              <select
                name="billingCycle"
                required
                value={formData.billingCycle}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="MONTHLY">Aylık</option>
                <option value="QUARTERLY">3 Aylık</option>
                <option value="YEARLY">Yıllık</option>
              </select>
            </div>
          </div>
        </div>

        {/* Server Assignment */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Sunucu ve IP Ataması</h2>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Sunucu *
              </label>
              <select
                name="serverId"
                required
                value={formData.serverId}
                onChange={handleChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">Sunucu seçin</option>
                {servers.map((server) => (
                  <option key={server.id} value={server.id}>
                    {server.name} ({server.hostname})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                IP Adresi (Opsiyonel)
              </label>
              <select
                name="ipAddressId"
                value={formData.ipAddressId}
                onChange={handleChange}
                disabled={!formData.serverId}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm disabled:bg-gray-100"
              >
                <option value="">Shared IP kullan</option>
                {availableIps.map((ip) => (
                  <option key={ip.id} value={ip.id}>
                    {ip.ipAddress} ({ip.isShared ? 'Shared' : 'Dedicated'})
                  </option>
                ))}
              </select>
              {!formData.serverId && (
                <p className="mt-1 text-xs text-gray-500">Önce sunucu seçin</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link
            href="/customers"
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
          >
            İptal
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Oluşturuluyor...' : 'Müşteri Oluştur'}
          </button>
        </div>
      </form>
    </div>
  );
}
