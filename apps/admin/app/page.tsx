'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  UserGroupIcon, 
  ServerIcon, 
  DocumentTextIcon, 
  TicketIcon,
  ChartBarIcon,
  CreditCardIcon,
  GlobeAltIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  servers: number;
  activeServers: number;
  customers: number;
  activeCustomers: number;
  hostingPlans: number;
  invoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  tickets: number;
  openTickets: number;
  ipAddresses: number;
  usedIps: number;
}

export default function AdminHome() {
  const [stats, setStats] = useState<DashboardStats>({
    servers: 0,
    activeServers: 0,
    customers: 0,
    activeCustomers: 0,
    hostingPlans: 0,
    invoices: 0,
    paidInvoices: 0,
    pendingInvoices: 0,
    tickets: 0,
    openTickets: 0,
    ipAddresses: 0,
    usedIps: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [serversRes, customersRes, plansRes, invoicesRes, ticketsRes, ipsRes] = await Promise.all([
        fetch('http://localhost:3001/servers'),
        fetch('http://localhost:3001/customers'),
        fetch('http://localhost:3001/hosting-plans'),
        fetch('http://localhost:3001/invoices'),
        fetch('http://localhost:3001/tickets'),
        fetch('http://localhost:3001/servers/ip-addresses/all'),
      ]);

      let newStats: DashboardStats = {
        servers: 0,
        activeServers: 0,
        customers: 0,
        activeCustomers: 0,
        hostingPlans: 0,
        invoices: 0,
        paidInvoices: 0,
        pendingInvoices: 0,
        tickets: 0,
        openTickets: 0,
        ipAddresses: 0,
        usedIps: 0,
      };

      if (serversRes.ok) {
        const servers = await serversRes.json();
        newStats.servers = servers.length;
        newStats.activeServers = servers.filter((s: any) => s.isActive).length;
      }

      if (customersRes.ok) {
        const customers = await customersRes.json();
        newStats.customers = customers.length;
        newStats.activeCustomers = customers.filter((c: any) => c.status === 'ACTIVE').length;
      }

      if (plansRes.ok) {
        const plans = await plansRes.json();
        newStats.hostingPlans = plans.length;
      }

      if (invoicesRes.ok) {
        const invoices = await invoicesRes.json();
        newStats.invoices = invoices.length;
        newStats.paidInvoices = invoices.filter((i: any) => i.status === 'PAID').length;
        newStats.pendingInvoices = invoices.filter((i: any) => i.status === 'PENDING').length;
      }

      if (ticketsRes.ok) {
        const tickets = await ticketsRes.json();
        newStats.tickets = tickets.length;
        newStats.openTickets = tickets.filter((t: any) => t.status === 'OPEN' || t.status === 'IN_PROGRESS').length;
      }

      if (ipsRes.ok) {
        const ips = await ipsRes.json();
        newStats.ipAddresses = ips.length;
        newStats.usedIps = ips.filter((ip: any) => ip.customerId !== null).length;
      }

      setStats(newStats);
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { 
      name: 'Sunucular', 
      value: stats.servers, 
      subValue: `${stats.activeServers} aktif`,
      icon: ServerIcon, 
      href: '/servers', 
      color: 'bg-purple-500' 
    },
    { 
      name: 'Müşteriler', 
      value: stats.customers, 
      subValue: `${stats.activeCustomers} aktif`,
      icon: UserGroupIcon, 
      href: '/customers', 
      color: 'bg-blue-500' 
    },
    { 
      name: 'IP Adresleri', 
      value: stats.ipAddresses, 
      subValue: `${stats.usedIps} kullanımda`,
      icon: GlobeAltIcon, 
      href: '/servers/ip-addresses', 
      color: 'bg-indigo-500' 
    },
    { 
      name: 'Hosting Planları', 
      value: stats.hostingPlans, 
      icon: CreditCardIcon, 
      href: '/hosting-plans', 
      color: 'bg-green-500' 
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <main className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
  <p className="text-gray-600 mt-2">Hoşgeldiniz! UmixPanel Hosting Yönetim Paneli</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link
              key={stat.name}
              href={stat.href}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all hover:scale-105"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  {stat.subValue && (
                    <p className="text-xs text-gray-500 mt-1">{stat.subValue}</p>
                  )}
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Financial Overview & Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Invoices Card */}
        <Link href="/invoices" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Faturalar</h3>
            <DocumentTextIcon className="w-6 h-6 text-yellow-500" />
          </div>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.invoices}</p>
              <p className="text-xs text-gray-600">Toplam</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">{stats.paidInvoices}</p>
              <p className="text-xs text-gray-600">Ödendi</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.pendingInvoices}</p>
              <p className="text-xs text-gray-600">Bekliyor</p>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-sm mb-2">
              <span className="text-gray-600">Ödeme Oranı</span>
              <span className="font-semibold text-green-600">
                {stats.invoices > 0 ? Math.round((stats.paidInvoices / stats.invoices) * 100) : 0}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-green-500 h-2.5 rounded-full transition-all"
                style={{
                  width: `${stats.invoices > 0 ? (stats.paidInvoices / stats.invoices) * 100 : 0}%`,
                }}
              ></div>
            </div>
          </div>
        </Link>

        {/* Tickets Card */}
        <Link href="/tickets" className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-all">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Destek Talepleri</h3>
            <TicketIcon className="w-6 h-6 text-orange-500" />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-2xl font-bold text-gray-900">{stats.tickets}</p>
              <p className="text-xs text-gray-600">Toplam Ticket</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">{stats.openTickets}</p>
              <p className="text-xs text-gray-600">Açık/Devam Eden</p>
            </div>
          </div>
          {stats.openTickets > 0 ? (
            <div className="p-3 bg-orange-50 rounded-lg flex items-center">
              <div className="w-2 h-2 bg-orange-500 rounded-full mr-2 animate-pulse"></div>
              <span className="text-sm text-orange-700 font-medium">
                {stats.openTickets} ticket yanıt bekliyor
              </span>
            </div>
          ) : (
            <div className="p-3 bg-green-50 rounded-lg flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm text-green-700 font-medium">
                Tüm ticketlar yanıtlandı ✓
              </span>
            </div>
          )}
        </Link>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Hızlı İşlemler</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Link
            href="/servers/new"
            className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group"
          >
            <div className="p-2 bg-purple-500 rounded-lg group-hover:scale-110 transition-transform">
              <ServerIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-purple-900">Yeni Sunucu</span>
          </Link>
          <Link
            href="/customers/new"
            className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group"
          >
            <div className="p-2 bg-blue-500 rounded-lg group-hover:scale-110 transition-transform">
              <UserGroupIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-blue-900">Yeni Müşteri</span>
          </Link>
          <Link
            href="/hosting-plans/new"
            className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group"
          >
            <div className="p-2 bg-green-500 rounded-lg group-hover:scale-110 transition-transform">
              <ChartBarIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-green-900">Yeni Plan</span>
          </Link>
          <Link
            href="/servers/ip-addresses"
            className="flex items-center space-x-3 p-4 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors group"
          >
            <div className="p-2 bg-indigo-500 rounded-lg group-hover:scale-110 transition-transform">
              <GlobeAltIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-indigo-900">IP Yönetimi</span>
          </Link>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Server & Infrastructure Status */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <ServerIcon className="w-5 h-5 mr-2 text-purple-600" />
            Altyapı Durumu
          </h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                <div>
                  <span className="text-gray-900 font-medium">Sunucular</span>
                  <p className="text-xs text-gray-600">{stats.activeServers} / {stats.servers} çevrimiçi</p>
                </div>
              </div>
              <span className="text-sm font-bold text-purple-700">{stats.servers} Sunucu</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                <div>
                  <span className="text-gray-900 font-medium">IP Havuzu</span>
                  <p className="text-xs text-gray-600">{stats.usedIps} kullanımda</p>
                </div>
              </div>
              <span className="text-sm font-bold text-indigo-700">{stats.ipAddresses} IP</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div>
                  <span className="text-gray-900 font-medium">Hosting Hesapları</span>
                  <p className="text-xs text-gray-600">{stats.activeCustomers} aktif</p>
                </div>
              </div>
              <span className="text-sm font-bold text-blue-700">{stats.customers} Hesap</span>
            </div>

            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">IP Kullanım Oranı</span>
                <span className="text-sm font-semibold text-gray-900">
                  {stats.ipAddresses > 0 ? Math.round((stats.usedIps / stats.ipAddresses) * 100) : 0}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2.5">
                <div
                  className={`h-2.5 rounded-full transition-all ${
                    (stats.usedIps / stats.ipAddresses) * 100 > 80 ? 'bg-red-500' :
                    (stats.usedIps / stats.ipAddresses) * 100 > 60 ? 'bg-orange-500' :
                    'bg-indigo-500'
                  }`}
                  style={{
                    width: `${stats.ipAddresses > 0 ? (stats.usedIps / stats.ipAddresses) * 100 : 0}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
            <ClockIcon className="w-5 h-5 mr-2 text-gray-600" />
            Son Aktiviteler
          </h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border-l-4 border-green-500">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <UserGroupIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  Yeni müşteri <strong className="font-semibold">johndoe</strong> oluşturuldu
                </p>
                <p className="text-xs text-gray-500 mt-1">Şimdi</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <DocumentTextIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  Fatura <strong className="font-semibold">INV-2025-001</strong> ödendi
                </p>
                <p className="text-xs text-gray-500 mt-1">2 dakika önce</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg border-l-4 border-purple-500">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                  <ServerIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  Sunucu <strong className="font-semibold">Main Server 1</strong> yeniden başlatıldı
                </p>
                <p className="text-xs text-gray-500 mt-1">5 dakika önce</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg border-l-4 border-orange-500">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <TicketIcon className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-900">
                  Yeni destek talebi <strong className="font-semibold">#001</strong> açıldı
                </p>
                <p className="text-xs text-gray-500 mt-1">10 dakika önce</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
